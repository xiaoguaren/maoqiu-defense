/* =========================================================================
 * 毛球防线 · FURLINE DEFENSE — 音频系统 v1
 * -------------------------------------------------------------------------
 * 纯 WebAudio，无第三方依赖。两页（index.html / battle.html）共用。
 *
 *   AUDIO.sfx('ui_click')                 播放音效
 *   AUDIO.music('lobby' | 'kitchen' | …)  切背景音乐（交叉淡入淡出，无缝循环）
 *   AUDIO.setVol('music'|'sfx'|'master', v)
 *   AUDIO.toggleMute() / AUDIO.mute(true)
 *   AUDIO.state()                          调试信息
 *
 * 资源：../assets/audio/sfx/<name>.wav、../assets/audio/music/<name>.mp3
 * 设置持久化在 localStorage['furple_audio_v1']。
 * 浏览器自动播放策略：首次用户手势（指针/键盘）时解锁 AudioContext。
 * ========================================================================= */
(function () {
  'use strict';
  if (window.AUDIO) return;

  var SFX_BASE = '../assets/audio/sfx/';
  var MUS_BASE = '../assets/audio/music/';
  var LS_KEY = 'furple_audio_v1';

  /* 语义别名 → 实际文件（与 tools/sfx_gen.py 的 SPEC 名称一一对应） */
  var ALIAS = {
    click: 'ui_click',
    tab: 'ui_tab',
    hover: 'ui_tab',
    open: 'ui_open',
    close: 'ui_close',
    back: 'ui_back',
    error: 'ui_error',
    confirm: 'ui_confirm',
    coin: 'coin',
    shard: 'coin',
    pull: 'gacha_pull',
    tick: 'gacha_tick',
    reveal: 'gacha_reveal_4',
    reveal_max: 'gacha_reveal_5',
    result: 'gacha_result',
    coin_rain: 'coin',
    deploy: 'battle_deploy',
    unit_select: 'unit_select',
    retreat: 'ui_back',
    atk_light: 'atk_light',
    atk_ranged: 'atk_ranged',
    atk_heavy: 'atk_heavy',
    heal: 'skill_heal',
    hit: 'hit_flesh',
    hit_armor: 'hit_armor',
    hit_magic: 'hit_magic',
    die: 'enemy_die',
    boss_die: 'boss_die',
    boss_roar: 'boss_roar',
    leak: 'life_lost',
    skill: 'skill_cast',
    skill_ice: 'skill_ice',
    skill_fire: 'skill_fire',
    skill_shadow: 'skill_dark',
    skill_holy: 'skill_heal',
    wave: 'wave_start',
    ready: 'battle_deploy_ready',
    win: 'victory',
    lose: 'defeat',
    speed: 'speed_toggle',
    pause: 'pause_toggle',
    warning: 'boss_roar',
    charge: 'ult_charge'
  };

  /* 预加载全部音效（顺序即优先级，前 12 个最先载入） */
  var SFX_ALL = ['ui_click', 'ui_tab', 'ui_open', 'ui_close', 'ui_back', 'ui_error', 'ui_confirm',
    'coin', 'gacha_pull', 'gacha_tick', 'gacha_reveal_3', 'gacha_reveal_4', 'gacha_reveal_5',
    'gacha_result', 'gacha_open',
    'battle_deploy', 'battle_deploy_ready', 'unit_select', 'atk_light', 'atk_ranged', 'atk_heavy',
    'hit_flesh', 'hit_armor', 'hit_magic', 'enemy_die', 'boss_die', 'boss_roar', 'life_lost',
    'wave_start', 'skill_cast', 'skill_ice', 'skill_fire', 'skill_dark', 'skill_heal', 'skill_random',
    'victory', 'defeat', 'speed_toggle', 'pause_toggle', 'ult_charge'];

  var MUS_ALL = ['music_lobby', 'music_battle_kitchen', 'music_battle_living',
    'music_battle_balcony', 'music_boss'];

  /* ------------------------------ 状态 ------------------------------ */
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}') || {}; } catch (e) { saved = {}; }
  var vol = {
    master: clamp01(numOr(saved.master, 0.85)),
    music: clamp01(numOr(saved.music, 0.55)),
    sfx: clamp01(numOr(saved.sfx, 0.9))
  };
  var muted = !!saved.muted;

  var ctx = null, masterGain = null, musicBus = null, sfxBus = null, comp = null;
  var unlocked = false, pendingMusic = null;
  var bufCache = {};        // name -> AudioBuffer
  var loadJobs = {};        // name -> Promise
  var lastPlay = {};        // name -> ts，用于节流
  var musicName = null, musicSrc = null, musicGain = null, musicToken = 0;
  var preloaded = false, prefetchStarted = false;

  function numOr(v, d) { return (typeof v === 'number' && isFinite(v)) ? v : d; }
  function clamp01(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }
  function now() { return (ctx ? ctx.currentTime : 0); }

  function persist() {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ master: vol.master, music: vol.music, sfx: vol.sfx, muted: muted })); } catch (e) { }
  }

  /* ---------------------------- 上下文 ---------------------------- */
  function build() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch (e) { return null; }
    comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.knee.value = 24;
    comp.ratio.value = 6;
    comp.attack.value = 0.004;
    comp.release.value = 0.16;
    masterGain = ctx.createGain();
    musicBus = ctx.createGain();
    sfxBus = ctx.createGain();
    musicBus.connect(masterGain);
    sfxBus.connect(masterGain);
    masterGain.connect(comp);
    comp.connect(ctx.destination);
    applyVol();
    return ctx;
  }

  function applyVol() {
    if (!ctx) return;
    var t = now();
    masterGain.gain.setTargetAtTime(muted ? 0 : vol.master, t, 0.02);
    musicBus.gain.setTargetAtTime(vol.music, t, 0.02);
    sfxBus.gain.setTargetAtTime(vol.sfx, t, 0.02);
  }

  function unlock() {
    if (!build()) return false;
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (e) { } }
    if (unlocked) return true;
    unlocked = true;
    prefetchSfx();
    if (pendingMusic) { var m = pendingMusic; pendingMusic = null; playMusic(m); }
    return true;
  }

  /* ---------------------------- 载入 ---------------------------- */
  function fetchBuf(url) {
    return fetch(url, { cache: 'force-cache' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer(); })
      .then(function (ab) { return new Promise(function (res, rej) { ctx.decodeAudioData(ab, res, rej); }); });
  }

  function loadSfx(name) {
    if (bufCache[name]) return Promise.resolve(bufCache[name]);
    if (loadJobs[name]) return loadJobs[name];
    if (!ctx) return Promise.resolve(null);
    var p = fetchBuf(SFX_BASE + name + '.wav')
      .then(function (b) { bufCache[name] = b; delete loadJobs[name]; return b; })
      .catch(function () { delete loadJobs[name]; return null; });
    loadJobs[name] = p;
    return p;
  }

  function loadMusic(name) {
    if (bufCache['M:' + name]) return Promise.resolve(bufCache['M:' + name]);
    if (loadJobs['M:' + name]) return loadJobs['M:' + name];
    if (!ctx) return Promise.resolve(null);
    var p = fetchBuf(MUS_BASE + name + '.mp3')
      .then(function (b) { bufCache['M:' + name] = b; delete loadJobs['M:' + name]; return b; })
      .catch(function () { delete loadJobs['M:' + name]; return null; });
    loadJobs['M:' + name] = p;
    return p;
  }

  function prefetchSfx() {
    if (prefetchStarted) return;
    prefetchStarted = true;
    var i = 0;
    function next() {
      if (i >= SFX_ALL.length) { preloaded = true; return; }
      var n = SFX_ALL[i++];
      loadSfx(n).then(function () {
        // 每载完一个让出主线程，避免卡顿
        if (window.requestIdleCallback) requestIdleCallback(next, { timeout: 400 });
        else setTimeout(next, 12);
      });
    }
    next();
    // 音乐也预热（大厅曲优先）
    setTimeout(function () { loadMusic('music_lobby'); }, 400);
  }

  /* ---------------------------- 播放 ---------------------------- */
  function playBuffer(buf, bus, o) {
    if (!buf || !ctx) return null;
    o = o || {};
    var t = ctx.currentTime + (o.delay || 0);
    var src = ctx.createBufferSource();
    src.buffer = buf;
    if (o.rate) src.playbackRate.value = o.rate;
    var g = ctx.createGain();
    var v = (typeof o.vol === 'number' ? o.vol : 1);
    g.gain.value = Math.max(0, v);
    src.connect(g);
    g.connect(bus);
    src.start(t);
    return src;
  }

  function sfx(name, o) {
    if (!name) return false;
    var real = ALIAS[name] || name;
    if (!ctx) {
      // 未解锁前不建上下文（避免 Chrome 警告）；手势后由队列补播
      return false;
    }
    var t = performance.now();
    var gap = (o && o.gap != null) ? o.gap : 28;
    if (lastPlay[real] && t - lastPlay[real] < gap) return false;
    lastPlay[real] = t;
    var buf = bufCache[real];
    if (!buf) { loadSfx(real); return false; }
    playBuffer(buf, sfxBus, o);
    return true;
  }

  function fadeGain(g, from, to, dur) {
    var t = ctx.currentTime;
    try { g.gain.cancelScheduledValues(t); } catch (e) { }
    g.gain.setValueAtTime(from, t);
    g.gain.linearRampToValueAtTime(to, t + dur);
  }

  function stopCurrentMusic(fade) {
    if (!musicSrc) return;
    var src = musicSrc, g = musicGain;
    musicSrc = null; musicGain = null;
    fade = fade == null ? 0.9 : fade;
    if (g) {
      fadeGain(g, g.gain.value, 0.0001, fade);
    }
    try { src.stop(ctx.currentTime + fade + 0.02); } catch (e) { }
    setTimeout(function () { try { src.disconnect(); if (g) g.disconnect(); } catch (e) { } }, (fade + 0.3) * 1000);
  }

  function music(name, o) {
    if (!name) return false;
    var real = (name.indexOf('music_') === 0) ? name : ('music_' + name.replace(/^music[-_]/, ''));
    // 语义映射：kitchen/living/balcony/boss/lobby
    if (real === 'music_battle' ) real = 'music_battle_kitchen';
    if (musicName === real && musicSrc) return true;
    if (!ctx) { pendingMusic = real; build(); return false; }
    if (ctx.state === 'suspended') {
      try { ctx.resume(); } catch (e) { }
      if (ctx.state === 'suspended') { pendingMusic = real; return false; }
    }
    playMusic(real, o);
    return true;
  }

  function playMusic(name, o) {
    o = o || {};
    if (!ctx) { pendingMusic = name; return; }
    var token = ++musicToken;
    loadMusic(name).then(function (buf) {
      if (token !== musicToken) return;
      if (!buf) { console.warn('[AUDIO] music missing:', name); return; }
      stopCurrentMusic(o.fade == null ? 0.9 : o.fade);
      var src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      var g = ctx.createGain();
      g.gain.value = 0.0001;
      src.connect(g);
      g.connect(musicBus);
      src.start(ctx.currentTime + 0.02);
      fadeGain(g, 0.0001, 1, o.fade == null ? 0.9 : o.fade);
      musicSrc = src;
      musicGain = g;
      musicName = name;
    });
  }

  function stopMusic(fade) {
    musicToken++;
    musicName = null;
    if (ctx) stopCurrentMusic(fade);
  }

  function pauseMusic() {
    if (ctx && ctx.state === 'running') { try { ctx.suspend(); } catch (e) { } }
  }
  function resumeMusic() {
    if (ctx && ctx.state === 'suspended') { try { ctx.resume(); } catch (e) { } }
  }

  /* ---------------------------- 设置面板 ---------------------------- */
  var chip = null, panel = null;

  function el(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html != null) d.innerHTML = html;
    return d;
  }

  var ICON_ON = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h3.5L13 19V5L7.5 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
  var ICON_OFF = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h3.5L13 19V5L7.5 9H4z"/><path d="M17 9l4 6M21 9l-4 6"/></svg>';

  function syncChip() {
    if (!chip) return;
    chip.innerHTML = (muted ? ICON_OFF : ICON_ON) + '<i>AUDIO</i>';
    chip.classList.toggle('is-muted', muted);
  }

  function buildUI() {
    if (chip) return;
    var host = document.querySelector('.hud-btns') || document.querySelector('.topbar');
    if (!host) return;
    chip = el('button', 'au-chip');
    chip.type = 'button';
    chip.title = '声音 / AUDIO（M 静音）';
    chip.addEventListener('click', function (ev) {
      ev.preventDefault(); ev.stopPropagation();
      var wasOpen = panel && panel.classList.contains('open');
      if (wasOpen) { closePanel(); return; }
      openPanel();
      unlock();
      sfx('ui_click');
    });
    if (host.classList.contains('hud-btns')) host.appendChild(chip);
    else {
      var ver = host.querySelector('.top-ver');
      if (ver && ver.parentNode === host) host.insertBefore(chip, ver);
      else host.appendChild(chip);
    }

    panel = el('div', 'au-panel');
    panel.innerHTML =
      '<div class="au-h"><b>AUDIO / 音频</b><span class="au-x">×</span></div>' +
      '<label class="au-row"><i>MASTER</i><input type="range" min="0" max="100" step="1" data-k="master"><b data-v="master">0</b></label>' +
      '<label class="au-row"><i>MUSIC</i><input type="range" min="0" max="100" step="1" data-k="music"><b data-v="music">0</b></label>' +
      '<label class="au-row"><i>SFX</i><input type="range" min="0" max="100" step="1" data-k="sfx"><b data-v="sfx">0</b></label>' +
      '<div class="au-f"><span class="au-mute">MUTE / 静音</span><span class="au-tag" data-tag>WEB AUDIO</span></div>';
    panel.querySelector('.au-x').addEventListener('click', function (ev) { ev.stopPropagation(); closePanel(); });
    panel.addEventListener('click', function (ev) { ev.stopPropagation(); });
    panel.querySelectorAll('input[type=range]').forEach(function (inp) {
      inp.addEventListener('input', function () {
        setVol(inp.dataset.k, (+inp.value) / 100);
      });
      inp.addEventListener('change', function () { sfx('ui_click'); });
    });
    var muteBtn = panel.querySelector('.au-mute');
    muteBtn.addEventListener('click', function () { toggleMute(); });
    document.body.appendChild(panel);

    document.addEventListener('click', function (ev) {
      if (!panel || !panel.classList.contains('open')) return;
      if (panel.contains(ev.target) || (chip && chip.contains(ev.target))) return;
      closePanel();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePanel();
    });
    syncChip();
  }

  function openPanel() {
    if (!panel) return;
    var r = chip.getBoundingClientRect();
    panel.style.top = Math.round(r.bottom + 8) + 'px';
    panel.style.left = Math.max(8, Math.round(r.right - 244)) + 'px';
    panel.classList.add('open');
    refreshPanel();
  }
  function closePanel() { if (panel) panel.classList.remove('open'); }

  function refreshPanel() {
    if (!panel) return;
    ['master', 'music', 'sfx'].forEach(function (k) {
      var inp = panel.querySelector('input[data-k="' + k + '"]');
      var lab = panel.querySelector('b[data-v="' + k + '"]');
      var v = Math.round(vol[k] * 100);
      if (inp) inp.value = v;
      if (lab) lab.textContent = v;
    });
    panel.classList.toggle('is-muted', muted);
    var tag = panel.querySelector('[data-tag]');
    if (tag) tag.textContent = muted ? 'MUTED' : 'WEB AUDIO · LIVE';
    var mb = panel.querySelector('.au-mute');
    if (mb) mb.textContent = muted ? 'UNMUTE / 取消静音' : 'MUTE / 静音';
    syncChip();
  }

  /* ---------------------------- 公开 API ---------------------------- */
  function setVol(kind, v) {
    v = clamp01(typeof v === 'number' ? v : parseFloat(v) || 0);
    if (kind === 'master' || kind === 'music' || kind === 'sfx') vol[kind] = v;
    applyVol();
    persist();
    refreshPanel();
    return vol[kind];
  }

  function mute(flag) {
    muted = !!flag;
    applyVol();
    persist();
    refreshPanel();
    return muted;
  }

  function toggleMute() {
    return mute(!muted);
  }

  function state() {
    return {
      ctx: ctx ? ctx.state : 'none',
      unlocked: unlocked,
      muted: muted,
      vol: { master: vol.master, music: vol.music, sfx: vol.sfx },
      music: musicName,
      sfxLoaded: Object.keys(bufCache).filter(function (k) { return k.indexOf('M:') !== 0; }).length,
      musicLoaded: Object.keys(bufCache).filter(function (k) { return k.indexOf('M:') === 0; }).length
    };
  }

  /* ---------------------------- 样式 ---------------------------- */
  function injectCSS() {
    if (document.getElementById('au-style')) return;
    var s = document.createElement('style');
    s.id = 'au-style';
    s.textContent = [
      '.au-chip{position:relative;display:inline-flex;align-items:center;gap:5px;height:30px;padding:0 9px;',
      'background:#0E0F12;border:1px solid #2C2F36;color:#8A8F98;cursor:pointer;font:9px/1 "JetBrains Mono",ui-monospace,monospace;',
      'letter-spacing:.12em;clip-path:polygon(0 0,100% 0,100% 100%,7px 100%,0 calc(100% - 7px));transition:background .16s,color .16s,border-color .16s;flex:none}',
      '.au-chip i{font-style:normal;opacity:.85}',
      '.au-chip:hover{background:#1A1C21;color:#EDEEF0;border-color:#3A3E47}',
      '.au-chip.is-muted{color:#E4442E;border-color:#4a2a24;background:#150F0E}',
      '.hud-btns .au-chip{margin-left:6px}',
      '.au-panel{position:fixed;width:244px;padding:12px 13px 11px;background:#101115;border:1px solid #34373F;',
      'box-shadow:0 18px 44px rgba(0,0,0,.62);z-index:99999;display:none;',
      'clip-path:polygon(0 10px,10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%);',
      'font:10px/1.35 "JetBrains Mono",ui-monospace,monospace;color:#8A8F98;letter-spacing:.1em}',
      '.au-panel.open{display:block}',
      '.au-h{display:flex;align-items:center;justify-content:space-between;padding-bottom:8px;margin-bottom:8px;border-bottom:1px solid #26282E}',
      '.au-h b{color:#EDEEF0;font-size:10px;letter-spacing:.16em;font-weight:600}',
      '.au-x{cursor:pointer;color:#6C717A;font-size:14px;line-height:1;padding:0 2px}',
      '.au-x:hover{color:#FFD400}',
      '.au-row{display:flex;align-items:center;gap:8px;padding:5px 0;cursor:pointer}',
      '.au-row i{font-style:normal;width:48px;color:#9AA0A9;font-size:9px}',
      '.au-row input{-webkit-appearance:none;appearance:none;flex:1;height:2px;background:#33373F;outline:none;cursor:pointer}',
      '.au-row input::-webkit-slider-thumb{-webkit-appearance:none;width:9px;height:13px;background:#FFD400;border:0;cursor:pointer}',
      '.au-row input::-moz-range-thumb{width:9px;height:13px;background:#FFD400;border:0;cursor:pointer}',
      '.au-row b{width:24px;text-align:right;color:#EDEEF0;font-weight:500;font-size:9px}',
      '.au-f{display:flex;align-items:center;justify-content:space-between;margin-top:9px;padding-top:8px;border-top:1px solid #26282E;gap:6px}',
      '.au-mute{cursor:pointer;color:#9AA0A9;font-size:9px;padding:3px 6px;border:1px solid #2C2F36;background:#15171C}',
      '.au-mute:hover{color:#E4442E;border-color:#5a2e26}',
      '.au-panel.is-muted .au-mute{color:#E4442E;border-color:#5a2e26}',
      '.au-tag{color:#5E636B;font-size:8px;letter-spacing:.14em}',
      '.au-panel.is-muted .au-tag{color:#E4442E}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ---------------------------- 启动 ---------------------------- */
  function boot() {
    injectCSS();
    buildUI();
    // 首次手势解锁（捕获阶段，确保早于业务逻辑）
    var once = function () {
      unlock();
      window.removeEventListener('pointerdown', once, true);
      window.removeEventListener('keydown', once, true);
    };
    window.addEventListener('pointerdown', once, true);
    window.addEventListener('keydown', once, true);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'm' || e.key === 'M') {
        var tg = e.target;
        if (tg && /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName)) return;
        toggleMute();
      }
    });
    syncChip();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.AUDIO = {
    sfx: sfx,
    music: music,
    stopMusic: stopMusic,
    pauseMusic: pauseMusic,
    resumeMusic: resumeMusic,
    setVol: setVol,
    mute: mute,
    toggleMute: toggleMute,
    unlock: unlock,
    preload: prefetchSfx,
    state: state,
    names: { sfx: SFX_ALL.slice(), music: MUS_ALL.slice() }
  };
})();

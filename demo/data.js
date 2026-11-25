window.FURPLE = {
  "game": {
    "name": "毛球防线",
    "subtitle": "毛球招募",
    "mascotId": "pet_mimi",
    "shardName": "毛球碎片",
    "shardIcon": "🧶"
  },
  "characters": [
    {
      "id": "pet_mimi",
      "name": "咪咪",
      "role": "medic",
      "roleCn": "医疗",
      "element": "random",
      "elementCn": "乱",
      "rarity": 5,
      "species": "cat",
      "speciesCn": "猫",
      "speciesEmoji": "🐈",
      "themeColor": "#E8A0B4",
      "gachaPool": true,
      "obtain": "starter",
      "mascot": true,
      "portrait": "../assets/pets/pet_mimi/portrait_1024x1536.jpg",
      "avatar": "../assets/pets/pet_mimi/avatar_256.png",
      "unit": "../assets/pets/pet_mimi/unit_512.png",
      "chibi": {
        "idle": "../assets/pets/pet_mimi/chibi/idle_512.png",
        "attack": "../assets/pets/pet_mimi/chibi/attack_512.png",
        "walk": "../assets/pets/pet_mimi/chibi/walk_512.png",
        "icon": "../assets/pets/pet_mimi/chibi/icon_128.png"
      },
      "quotes": {
        "deploy": "我来盯着，你去忙吧。",
        "skill": "都到我身后来。",
        "win": "守住了，可以摸我了。",
        "fail": "……刚才是不是有只袜子过去了？"
      },
      "skills": [
        {
          "id": "sk_heal",
          "name": "安抚呼噜",
          "desc": "半径 2.5 格内所有友军回复 520 生命，溢出转 3 秒护盾。",
          "spCost": 32,
          "initSp": 12,
          "template": "T-03_heal_burst",
          "duration": 0,
          "params": {
            "heal": 520,
            "radius": 2.5,
            "shieldOverflow": true
          }
        }
      ],
      "passive": {
        "id": "ps_regen",
        "name": "自我修复",
        "desc": "自身每秒回复 12 点生命。",
        "params": {
          "hpPerSec": 12
        }
      },
      "stats": {
        "hp": 1100,
        "atk": 300,
        "def": 110,
        "res": 0,
        "heal": 340,
        "cost": 15,
        "block": 1,
        "range": 2,
        "attackInterval": 2.0,
        "damageType": "heal"
      },
      "weaponName": "逗猫棒",
      "quirk": "部署后偶尔原地躺下舔毛 1.5 秒（期间不攻击），被敌人碰到才跳起来",
      "lore": {
        "codename": "咪咪",
        "code": "OP-01",
        "race": "菲林",
        "raceDetail": "三花猫",
        "class": "医疗",
        "element": "紊乱",
        "rarity": 5,
        "age": "3 岁",
        "origin": "城郊垃圾站",
        "tagline": "先把伤口交给我，其他的之后再说。",
        "story": "原本是城郊垃圾站附近的流浪猫，八个月大的时候在一场暴雨里被现在的博士捡回家。捡到它那天，它右耳缺了一小口，前腿有一道旧伤，缩在纸箱里一声不吭。到家后它做的第一件事，是趴在药箱上睡了一整夜——从那以后，它就对“药”有了执念。它会看着人类给自己上药，会把掉在地上的创可贴叼回盒子里，会在有人咳嗽的时候凑过去贴着听。现在它是队伍里的医疗干员，随身带着一台用扫地机器人改出来的小无人机，能撒止血粉、能拉人一把。它不太会表达，只会用脑袋顶你，然后把你按在椅子上不许动。",
        "personality": "冷淡、护短、不擅长被感谢。被摸头会装作没感觉，尾巴却会翘起来。",
        "battleStyle": "不正面接敌。绕着队友转圈，谁掉血就先贴谁；无人机撒药粉，她自己用爪子按住伤口止血。",
        "outfit": [
          "洗得发白的旧野战医疗外套，袖子太长，卷了两折",
          "左前腿缠着一圈已经磨毛的绷带",
          "脖子上挂着一枚用听诊器改的铃铛",
          "腰侧挂一只小小的铁皮药箱，箱角有磕碰的凹痕"
        ],
        "portrait": {
          "pose": "前爪按在铁皮药箱上，身体侧转 3/4，回头看向镜头",
          "props": "无人机悬在右上方，药粉微光；药箱在左下方",
          "palette": "旧白 / 磨砂粉 / 铁灰"
        },
        "chibi": {
          "pose": "坐着，一只前爪抬起来搭在药箱上，尾巴竖起，无人机漂在身侧",
          "prop": "小药箱 + 无人机"
        },
        "voiceLine": "别动。我看看。"
      }
    },
    {
      "id": "pet_yeguo",
      "name": "椰果",
      "role": "defender",
      "roleCn": "坦克",
      "element": "ice",
      "elementCn": "冰",
      "rarity": 5,
      "species": "dog",
      "speciesCn": "狗",
      "speciesEmoji": "🐕",
      "themeColor": "#8FC7E8",
      "gachaPool": true,
      "obtain": "gacha",
      "mascot": false,
      "portrait": "../assets/pets/pet_yeguo/portrait_1024x1536.jpg",
      "avatar": "../assets/pets/pet_yeguo/avatar_256.png",
      "unit": "../assets/pets/pet_yeguo/unit_512.png",
      "chibi": {
        "idle": "../assets/pets/pet_yeguo/chibi/idle_512.png",
        "attack": "../assets/pets/pet_yeguo/chibi/attack_512.png",
        "walk": "../assets/pets/pet_yeguo/chibi/walk_512.png",
        "icon": "../assets/pets/pet_yeguo/chibi/icon_128.png"
      },
      "quotes": {
        "deploy": "这里交给我，汪！",
        "skill": "精神净化——都站稳了！",
        "win": "全守住了！可以开饭了吗？",
        "fail": "对不起……饭盆我没看住。"
      },
      "skills": [
        {
          "id": "sk_spirit_purge",
          "name": "精神净化",
          "desc": "清除半径 2.5 格内所有友军的负面效果（恐惧/减速/眩晕/流血），并给予最大生命值 20% 的护盾，持续 7 秒。椰果的大招。",
          "spCost": 40,
          "initSp": 15,
          "template": "T-11_purge_shield",
          "duration": 7,
          "params": {
            "radius": 2.5,
            "shieldPct": 0.2,
            "purge": [
              "fear",
              "slow",
              "stun",
              "bleed"
            ]
          }
        }
      ],
      "passive": {
        "id": "ps_guardian_light",
        "name": "守护之光",
        "desc": "在场时全队 DEF +10、RES +10（团队物抗法抗 +10）。椰果的被动。",
        "params": {
          "teamDef": 10,
          "teamRes": 10
        }
      },
      "stats": {
        "hp": 3200,
        "atk": 280,
        "def": 480,
        "res": 10,
        "heal": 0,
        "cost": 19,
        "block": 3,
        "range": 1,
        "attackInterval": 2.4,
        "damageType": "physical"
      },
      "weaponName": "冰晶塔盾",
      "quirk": "看到红点敌人会额外冲出去半步（攻击距离 +0.3 格），但会漏看身后的敌人",
      "lore": {
        "codename": "椰果",
        "code": "OP-02",
        "race": "佩洛",
        "raceDetail": "白色博美",
        "class": "坦克",
        "element": "冰",
        "rarity": 5,
        "age": "7 岁",
        "origin": "宠物店橱窗",
        "tagline": "我站在这里，后面的就别怕了。",
        "story": "宠物店橱窗里最后一只没被买走的幼犬，天生心脏弱，跑两步就会喘，被医生断定活不过两岁。它硬是撑到了第七年。它不太叫，也不太撒娇，最大的爱好是挡在别人前面——挡门、挡风、挡陌生人、挡飞过来的球。主人第一次带它去体检，它把整个身体横在诊室门口，谁都不让进。它知道自己赢不了任何一场硬仗，但它算过：只要站得够直，别人就会绕路。现在它扛着一面比自己还大的冰晶塔盾，盾是它自己用冻住的呼出来的白气凝的，化不了。",
        "personality": "沉默、倔、把“我没事”挂在嘴边。喘的时候会躲到人看不见的地方。",
        "battleStyle": "站在最前面，盾顶在最窄的路口。攻击不强，但很少后退；盾面结霜，被撞碎的冰棱会二次溅射。",
        "outfit": [
          "加厚的护胸背心，专门护住胸口——怕心脏受凉",
          "背脊上贴着一片还在发热的暖贴",
          "四条腿都绑着磨旧的护膝",
          "尾巴上系着一根红色祈福绳，绳结已经松了"
        ],
        "portrait": {
          "pose": "半蹲立盾，头略低，盾面朝前，脚下的地面结出冰晶",
          "props": "冰晶塔盾（半透明、内部有霜纹）+ 脚边碎冰",
          "palette": "霜白 / 冰蓝 / 暖贴的一点橘"
        },
        "chibi": {
          "pose": "四脚站稳、微微下压，把一面小小的冰盾顶在身前，尾巴上的红绳飘起来",
          "prop": "迷你冰盾"
        },
        "voiceLine": "……我没事。站好了。"
      }
    },
    {
      "id": "pet_pipi",
      "name": "屁屁",
      "role": "specialist",
      "roleCn": "刺客",
      "element": "fire",
      "elementCn": "火",
      "rarity": 4,
      "species": "bird",
      "speciesCn": "鸟",
      "speciesEmoji": "🐦",
      "themeColor": "#F2C14E",
      "gachaPool": true,
      "obtain": "gacha",
      "mascot": false,
      "portrait": "../assets/pets/pet_pipi/portrait_1024x1536.jpg",
      "avatar": "../assets/pets/pet_pipi/avatar_256.png",
      "unit": "../assets/pets/pet_pipi/unit_512.png",
      "chibi": {
        "idle": "../assets/pets/pet_pipi/chibi/idle_512.png",
        "attack": "../assets/pets/pet_pipi/chibi/attack_512.png",
        "walk": "../assets/pets/pet_pipi/chibi/walk_512.png",
        "icon": "../assets/pets/pet_pipi/chibi/icon_128.png"
      },
      "quotes": {
        "deploy": "本大爷来了！让开让开！",
        "skill": "亲一口，就掉血。",
        "win": "看见没，个子小不代表好欺负。",
        "fail": "……是手指先动的嘴。"
      },
      "skills": [
        {
          "id": "sk_blood_harvest",
          "name": "采血",
          "desc": "对单体造成其当前生命 33% 的伤害（对 Boss 单次上限 900），并在 8 秒内闪避 +35%。屁屁的大招。",
          "spCost": 35,
          "initSp": 12,
          "template": "T-01_burst_single",
          "duration": 8,
          "params": {
            "hpPct": 0.33,
            "maxDamage": 900,
            "evasionAdd": 0.35
          }
        }
      ],
      "passive": {
        "id": "ps_tiger_clamp",
        "name": "飞天老虎钳",
        "desc": "攻击附加流血 10 秒，每秒 35 点真实伤害。屁屁的被动。",
        "params": {
          "dps": 35,
          "duration": 10
        }
      },
      "stats": {
        "hp": 1300,
        "atk": 380,
        "def": 140,
        "res": 0,
        "heal": 0,
        "cost": 12,
        "block": 1,
        "range": 1,
        "attackInterval": 1.8,
        "damageType": "physical"
      },
      "weaponName": "翅刃",
      "quirk": "可以部署在高台格；被近战攻击时飞起 1 秒（免疫该次伤害，冷却 10 秒）",
      "lore": {
        "codename": "屁屁",
        "code": "OP-03",
        "race": "黎博利",
        "raceDetail": "牡丹鹦鹉",
        "class": "刺客",
        "element": "火",
        "rarity": 4,
        "age": "2 岁",
        "origin": "花鸟市场",
        "tagline": "让开让开，本大爷要亲你了。",
        "story": "花鸟市场里最吵的那只，因为咬人被退过三次货。被带走那天它自己把笼子咬开一个洞，飞出来直接落在人肩膀上，从此赖着不走。它喜欢亲人的手指，因为手指上有盐；喜欢站在最高的地方俯视所有人；喜欢在别人打电话的时候插嘴，并且坚信自己在吵架里从没输过。它个子小、脾气大，被惹到会先扑上去啄一口再说。战斗时它从高台俯冲，翅膀上绑着两枚小刃，尾羽根部缠着防火布——它自己点的火，它自己也不完全控制得住。",
        "personality": "话多、记仇、极度自我中心，但会在你难过的时候安静地站到你肩上。",
        "battleStyle": "高台起飞，俯冲啄击，尾羽点火留下一道火星带；被近身就飞起来躲一次。",
        "outfit": [
          "蓝色轻量飞行背带，带金属扣和一小段牵引绳",
          "两侧翅膀各绑一枚短刃，刃口反光",
          "尾羽根部缠着一圈防火布，边缘被烧黑"
        ],
        "portrait": {
          "pose": "侧身展翅俯冲，喙张开，尾羽拖出一串火星",
          "props": "翅上短刃 + 尾后火星带",
          "palette": "明黄 / 翠绿 / 绯红（脸颊）"
        },
        "chibi": {
          "pose": "站在高台上张开双翅，一只爪子抬起，尾巴翘起冒火星",
          "prop": "翅刃 + 火苗"
        },
        "voiceLine": "亲一口，就掉血。"
      }
    },
    {
      "id": "pet_maodie",
      "name": "耄耋",
      "role": "supporter",
      "roleCn": "辅助",
      "element": "fire",
      "elementCn": "火",
      "rarity": 3,
      "species": "cat",
      "speciesCn": "猫",
      "speciesEmoji": "🐈",
      "themeColor": "#D89A4E",
      "gachaPool": true,
      "obtain": "gacha",
      "mascot": false,
      "portrait": "../assets/pets/pet_maodie/portrait_1024x1536.jpg",
      "avatar": "../assets/pets/pet_maodie/avatar_256.png",
      "unit": "../assets/pets/pet_maodie/unit_512.png",
      "chibi": {
        "idle": "../assets/pets/pet_maodie/chibi/idle_512.png",
        "attack": "../assets/pets/pet_maodie/chibi/attack_512.png",
        "walk": "../assets/pets/pet_maodie/chibi/walk_512.png",
        "icon": "../assets/pets/pet_maodie/chibi/icon_128.png"
      },
      "quotes": {
        "deploy": "老夫先看看，你们年轻人上。",
        "skill": "当年啊……（敌人开始犯困）",
        "win": "嗯，意料之中。",
        "fail": "不怪老夫，地滑。"
      },
      "skills": [
        {
          "id": "sk_old_wisdom",
          "name": "猫生经验",
          "desc": "半径 3 格内敌人移速 -45%、攻击 -15%，持续 12 秒。耄耋开始讲当年。",
          "spCost": 30,
          "initSp": 12,
          "template": "T-06_slow_field",
          "duration": 12,
          "params": {
            "slowPct": 0.45,
            "atkDown": 0.15,
            "radius": 3.0
          }
        }
      ],
      "passive": {
        "id": "ps_old_gaze",
        "name": "岁月凝视",
        "desc": "在场时半径 2 格内敌人移速 -15%。耄耋的被动。",
        "params": {
          "auraSlow": 0.15,
          "radius": 2
        }
      },
      "stats": {
        "hp": 1100,
        "atk": 340,
        "def": 110,
        "res": 0,
        "heal": 0,
        "cost": 12,
        "block": 1,
        "range": 2,
        "attackInterval": 2.2,
        "damageType": "magic"
      },
      "weaponName": "罐头",
      "quirk": "部署后偶尔原地躺下舔毛 1.5 秒（期间不攻击），被敌人碰到才跳起来",
      "lore": {
        "codename": "耄耋",
        "code": "OP-04",
        "race": "菲林",
        "raceDetail": "橘猫",
        "class": "辅助",
        "element": "火",
        "rarity": 3,
        "age": "14 岁",
        "origin": "旧城区",
        "tagline": "急什么，这街上我什么没见过。",
        "story": "在旧城区活了十四年的老猫，看过这条街所有的兴衰：谁家孩子长大走了，哪家店换了三任老板，哪年冬天特别冷。它的眼睛有点浑浊，但看人极准——谁在硬撑，谁在撒谎，它一眼就知道，然后什么都不说，只是挪过去趴在旁边。被收编那天是它自己走进来的，理由很实在：这里有暖气。它不爱动，也不爱被安排，大多数时候盘着，爪子搭在一根旧木杖上，旁边搁一盏马灯。它打起来也不急，就是慢慢跟你讲从前的事，讲着讲着，敌人就困了。",
        "personality": "慢性子、嘴碎、看得开。爱吃、爱睡、爱在别人忙的时候讲古。",
        "battleStyle": "盘坐不动，靠“讲古”让范围内的敌人犯困减速、攻击落空；马灯的光能给队友回一点精神。",
        "outfit": [
          "一件过大的旧棉袍，本来是人的，袖口都磨破了",
          "脖子上挂着一块老式怀表，表盖有划痕",
          "爪子边搁一盏旧马灯，玻璃罩熏得发黄",
          "身下垫着几张旧报纸，边角卷起来"
        ],
        "portrait": {
          "pose": "盘坐，前爪搭在木杖上，头微偏，眼睛半眯，马灯在左下方亮着",
          "props": "旧木杖 + 暖黄马灯 + 报纸",
          "palette": "旧橘 / 棉袍的土黄 / 马灯的暖光"
        },
        "chibi": {
          "pose": "盘腿坐着，一只爪子托着脸，另一只扶着木杖，头顶冒一个“Z”",
          "prop": "小马灯"
        },
        "voiceLine": "当年啊……（敌人开始犯困）"
      }
    },
    {
      "id": "pet_teddy",
      "name": "邪恶泰迪",
      "role": "caster",
      "roleCn": "术师",
      "element": "dark",
      "elementCn": "暗",
      "rarity": 4,
      "species": "dog",
      "speciesCn": "狗",
      "speciesEmoji": "🐕",
      "themeColor": "#7A4E3A",
      "gachaPool": true,
      "obtain": "gacha",
      "mascot": false,
      "portrait": "../assets/pets/pet_teddy/portrait_1024x1536.jpg",
      "avatar": "../assets/pets/pet_teddy/avatar_256.png",
      "unit": "../assets/pets/pet_teddy/unit_512.png",
      "chibi": {
        "idle": "../assets/pets/pet_teddy/chibi/idle_512.png",
        "attack": "../assets/pets/pet_teddy/chibi/attack_512.png",
        "walk": "../assets/pets/pet_teddy/chibi/walk_512.png",
        "icon": "../assets/pets/pet_teddy/chibi/icon_128.png"
      },
      "quotes": {
        "deploy": "汪。（这是威胁）",
        "skill": "拆了。",
        "win": "邪恶，胜利。",
        "fail": "是沙发先动的手。"
      },
      "skills": [
        {
          "id": "sk_demolition",
          "name": "拆家风暴",
          "desc": "半径 2 格内造成 680 法术伤害，并把敌人击退 0.6 格。泰迪的招牌。",
          "spCost": 40,
          "initSp": 15,
          "template": "T-02_aoe_magic",
          "duration": 0,
          "params": {
            "damage": 680,
            "radius": 2.0,
            "knockback": 0.6
          }
        }
      ],
      "passive": {
        "id": "ps_evil_gaze",
        "name": "邪恶低语",
        "desc": "攻击有 20% 概率使目标恐惧 1.5 秒。邪恶泰迪的被动。",
        "params": {
          "chance": 0.2,
          "fear": 1.5
        }
      },
      "stats": {
        "hp": 950,
        "atk": 700,
        "def": 110,
        "res": 10,
        "heal": 0,
        "cost": 18,
        "block": 1,
        "range": 3,
        "attackInterval": 2.3,
        "damageType": "magic"
      },
      "weaponName": "拖鞋",
      "quirk": "看到红点敌人会额外冲出去半步（攻击距离 +0.3 格），但会漏看身后的敌人",
      "lore": {
        "codename": "邪恶泰迪",
        "code": "OP-05",
        "race": "佩洛",
        "raceDetail": "棕色泰迪",
        "class": "术师",
        "element": "暗",
        "rarity": 4,
        "age": "5 岁",
        "origin": "旧公寓 4 楼",
        "tagline": "拆了。这次不是沙发。",
        "story": "一只被说“长得邪恶”的泰迪。其实它什么都不坏，只是前主人给它穿上那件红毛衣的那天，邻居说它“像个小恶魔”。那句话被记了很久，后来主人搬家，它被留了下来。它记住了那件红毛衣，也记住了被讨厌的滋味。现在它把那件毛衣穿在身上，起了球也不肯换，背上缝了几块自己找来的符文补丁。它对家具怀有深刻的敌意——沙发、拖鞋、窗帘，拆得干干净净。这套本事被它用进了法术里：把拆掉的东西变成会飞、会炸的碎片，聚在爪子前面，一颗一颗砸出去。",
        "personality": "阴沉、嘴毒、记仇，但对认下的人极其忠诚。被叫“可爱”会翻脸。",
        "battleStyle": "站后排，弓背蓄力，把拆解的碎片凝成法术球砸向敌人；被近身会用拆下来的木板做一次爆炸反击。",
        "outfit": [
          "那件起球的红色毛衣，袖口脱线，穿了很多年",
          "背上缝着几块深色符文补丁，针脚很粗",
          "腰上挂着一把卷尺和一把小锤",
          "一只前爪缠着黑胶带"
        ],
        "portrait": {
          "pose": "弓背低伏，一只前爪抬起托着法术球，脚下浮着符文裂痕",
          "props": "悬浮碎片 + 法术球 + 背后暗紫光",
          "palette": "焦糖棕 / 暗紫 / 褪色的砖红"
        },
        "chibi": {
          "pose": "弓着背，一只爪子举着一颗小法术球，另一只爪子抓着拖鞋，眼神凶狠",
          "prop": "法术球 + 拖鞋"
        },
        "voiceLine": "汪。（这是威胁）"
      }
    }
  ],
  "gacha": {
    "version": 1,
    "currency": {
      "id": "canned",
      "name": "罐头",
      "icon": "🥫",
      "desc": "招募用的罐头。只靠打关卡获得，不内购、不充值、没有每日签到。",
      "earnFrom": [
        {
          "source": "关卡首通",
          "lv_01_kitchen": 80,
          "lv_02_living": 120,
          "lv_03_balcony": 160
        },
        {
          "source": "三星评价（一次性）",
          "lv_01_kitchen": 40,
          "lv_02_living": 60,
          "lv_03_balcony": 80
        },
        {
          "source": "重复通关",
          "lv_01_kitchen": 20,
          "lv_02_living": 30,
          "lv_03_balcony": 40
        }
      ]
    },
    "pull": {
      "singleCost": 50,
      "tenCost": 450,
      "note": "十连 450，比单抽十次省 50 罐头。"
    },
    "rates": {
      "5": 0.12,
      "4": 0.28,
      "3": 0.6
    },
    "pity": {
      "fiveStar": {
        "hard": 60,
        "softStart": 45,
        "softStep": 0.06,
        "carryOver": true,
        "note": "第 45 抽起每抽 5★ 概率 +6 个百分点；第 60 抽必出 5★。抽到 5★ 计数归零，跨池继承。"
      },
      "fourStar": {
        "every": 10,
        "carryOver": true,
        "note": "连续 9 抽没出 4★ 或以上，第 10 抽必出 4★ 或以上。"
      }
    },
    "starter": {
      "canned": 300,
      "freeTen": true,
      "guaranteeNewFiveStar": true,
      "note": "新手送 300 罐头；第一次十连免费，且必出池中一个尚未拥有的 5★（当前就是椰果）。"
    },
    "newCharacterWeightBonus": 3,
    "duplicateShards": {
      "5": 80,
      "4": 30,
      "3": 10
    },
    "emptyRarityShards": {
      "4": 40,
      "3": 15
    },
    "pools": [
      {
        "id": "pool_standard",
        "name": "常驻招募 · 毛球补给",
        "permanent": true,
        "filter": {
          "gachaPool": true
        },
        "featured": [],
        "note": "所有 gachaPool=true 的角色自动进池。以后传新宠物照片、重跑 catgen.py，新角色就会自动出现在这里。"
      }
    ],
    "shop": [
      {
        "id": "shop_skin_mimi_sakura",
        "type": "skin",
        "ref": "skin_mimi_sakura",
        "cost": 120
      },
      {
        "id": "shop_skin_mimi_night",
        "type": "skin",
        "ref": "skin_mimi_night",
        "cost": 100
      },
      {
        "id": "shop_skin_yeguo_snow",
        "type": "skin",
        "ref": "skin_yeguo_snow",
        "cost": 160
      },
      {
        "id": "shop_skin_yeguo_newyear",
        "type": "skin",
        "ref": "skin_yeguo_newyear",
        "cost": 120
      },
      {
        "id": "shop_char_yeguo",
        "type": "character",
        "ref": "pet_yeguo",
        "cost": 300
      },
      {
        "id": "shop_emote_pack",
        "type": "emote",
        "ref": "emote_pack_01",
        "cost": 40
      }
    ],
    "skinPool": {
      "enabled": false,
      "rate": 0.0,
      "note": "预留：以后想让皮肤也能抽时打开，并在 pools 里加皮肤池。现在皮肤只走碎片兑换。"
    },
    "disclosure": "5★ 12%｜4★ 28%｜3★ 60%。60 抽内必出 5★（45 抽起概率递增）；每 10 抽内必出 4★ 或以上。该稀有度暂无角色时，自动转为等值毛球碎片（4★ 40 / 3★ 15）。重复角色自动转碎片（5★ 80 / 4★ 30 / 3★ 10）。",
    "guaranteeNote": "抽卡只出角色和皮肤，不出售数值；没有 VVIP、没有体力、没有每日签到。"
  },
  "skins": [
    {
      "id": "skin_mimi_default",
      "characterId": "pet_mimi",
      "name": "默认·居家日常",
      "rarity": 5,
      "default": true,
      "obtain": {
        "type": "owned"
      },
      "themeColor": "#E8A0B4",
      "style": {
        "mode": "none"
      },
      "fx": "none",
      "desc": "咪咪平时的样子。趴在数据线上，比任何装饰都好看。",
      "visual": {
        "portrait": "../assets/pets/pet_mimi/portrait_1024x1536.jpg",
        "avatar": "../assets/pets/pet_mimi/avatar_256.png",
        "unit": "../assets/pets/pet_mimi/unit_512.png",
        "thumb": "../assets/pets/pet_mimi/avatar_256.png"
      },
      "characterName": "咪咪"
    },
    {
      "id": "skin_mimi_sakura",
      "characterId": "pet_mimi",
      "name": "樱花祭·咪咪",
      "rarity": 5,
      "default": false,
      "obtain": {
        "type": "shard",
        "cost": 120
      },
      "themeColor": "#F2A9C4",
      "style": {
        "mode": "duotone",
        "accent": "#F2A9C4",
        "strength": 0.85
      },
      "fx": "petal",
      "desc": "把春天穿在身上。尾巴一扫，落英缤纷——其实是毛。",
      "unlockNote": "毛球碎片 ×120 兑换",
      "visual": {
        "portrait": "../assets/pets/pet_mimi/skins/skin_mimi_sakura/portrait_1024x1536.jpg",
        "avatar": "../assets/pets/pet_mimi/skins/skin_mimi_sakura/avatar_256.png",
        "unit": "../assets/pets/pet_mimi/skins/skin_mimi_sakura/unit_512.png",
        "thumb": "../assets/pets/pet_mimi/skins/skin_mimi_sakura/thumb_256.png"
      },
      "characterName": "咪咪"
    },
    {
      "id": "skin_mimi_night",
      "characterId": "pet_mimi",
      "name": "深夜巡逻·咪咪",
      "rarity": 4,
      "default": false,
      "obtain": {
        "type": "shard",
        "cost": 100
      },
      "themeColor": "#4A5A8A",
      "style": {
        "mode": "duotone",
        "accent": "#4A5A8A",
        "strength": 0.9
      },
      "fx": "star",
      "desc": "凌晨三点的厨房归她管。眼睛在黑暗里反光，像两颗小灯。",
      "unlockNote": "毛球碎片 ×100 兑换",
      "visual": {
        "portrait": "../assets/pets/pet_mimi/skins/skin_mimi_night/portrait_1024x1536.jpg",
        "avatar": "../assets/pets/pet_mimi/skins/skin_mimi_night/avatar_256.png",
        "unit": "../assets/pets/pet_mimi/skins/skin_mimi_night/unit_512.png",
        "thumb": "../assets/pets/pet_mimi/skins/skin_mimi_night/thumb_256.png"
      },
      "characterName": "咪咪"
    },
    {
      "id": "skin_yeguo_default",
      "characterId": "pet_yeguo",
      "name": "默认·白团子",
      "rarity": 5,
      "default": true,
      "obtain": {
        "type": "owned"
      },
      "themeColor": "#8FC7E8",
      "style": {
        "mode": "none"
      },
      "fx": "none",
      "desc": "椰果平时的样子。远看是一团棉花，近看会汪。",
      "visual": {
        "portrait": "../assets/pets/pet_yeguo/portrait_1024x1536.jpg",
        "avatar": "../assets/pets/pet_yeguo/avatar_256.png",
        "unit": "../assets/pets/pet_yeguo/unit_512.png",
        "thumb": "../assets/pets/pet_yeguo/avatar_256.png"
      },
      "characterName": "椰果"
    },
    {
      "id": "skin_yeguo_snow",
      "characterId": "pet_yeguo",
      "name": "雪原哨兵·椰果",
      "rarity": 5,
      "default": false,
      "obtain": {
        "type": "shard",
        "cost": 160
      },
      "themeColor": "#A8D8F0",
      "style": {
        "mode": "duotone",
        "accent": "#A8D8F0",
        "strength": 0.8
      },
      "fx": "snow",
      "desc": "在雪地里站岗，白到只剩黑鼻子和两只眼睛。敌人从旁边走过去都没发现他。",
      "unlockNote": "毛球碎片 ×160 兑换",
      "visual": {
        "portrait": "../assets/pets/pet_yeguo/skins/skin_yeguo_snow/portrait_1024x1536.jpg",
        "avatar": "../assets/pets/pet_yeguo/skins/skin_yeguo_snow/avatar_256.png",
        "unit": "../assets/pets/pet_yeguo/skins/skin_yeguo_snow/unit_512.png",
        "thumb": "../assets/pets/pet_yeguo/skins/skin_yeguo_snow/thumb_256.png"
      },
      "characterName": "椰果"
    },
    {
      "id": "skin_yeguo_newyear",
      "characterId": "pet_yeguo",
      "name": "新年守卫·椰果",
      "rarity": 4,
      "default": false,
      "obtain": {
        "type": "shard",
        "cost": 120
      },
      "themeColor": "#D14B3C",
      "style": {
        "mode": "tint",
        "accent": "#D14B3C",
        "strength": 0.7
      },
      "fx": "confetti",
      "desc": "红围巾、金铃铛，守岁的最后一班岗。他说今年也要第一个开饭。",
      "unlockNote": "毛球碎片 ×120 兑换",
      "visual": {
        "portrait": "../assets/pets/pet_yeguo/skins/skin_yeguo_newyear/portrait_1024x1536.jpg",
        "avatar": "../assets/pets/pet_yeguo/skins/skin_yeguo_newyear/avatar_256.png",
        "unit": "../assets/pets/pet_yeguo/skins/skin_yeguo_newyear/unit_512.png",
        "thumb": "../assets/pets/pet_yeguo/skins/skin_yeguo_newyear/thumb_256.png"
      },
      "characterName": "椰果"
    },
    {
      "id": "skin_pipi_default",
      "characterId": "pet_pipi",
      "name": "默认·小炮弹",
      "rarity": 4,
      "default": true,
      "obtain": {
        "type": "owned"
      },
      "themeColor": "#F2C14E",
      "style": {
        "mode": "none"
      },
      "fx": "none",
      "desc": "屁屁平时的样子。站在手指上，气势比整只手都大。",
      "visual": {
        "portrait": "../assets/pets/pet_pipi/portrait_1024x1536.jpg",
        "avatar": "../assets/pets/pet_pipi/avatar_256.png",
        "unit": "../assets/pets/pet_pipi/unit_512.png",
        "thumb": "../assets/pets/pet_pipi/avatar_256.png"
      },
      "characterName": "屁屁"
    },
    {
      "id": "skin_maodie_default",
      "characterId": "pet_maodie",
      "name": "默认·圆头老夫",
      "rarity": 3,
      "default": true,
      "obtain": {
        "type": "owned"
      },
      "themeColor": "#D89A4E",
      "style": {
        "mode": "none"
      },
      "fx": "none",
      "desc": "耄耋平时的样子。坐在架子上，用看透猫生的眼神看你。",
      "visual": {
        "portrait": "../assets/pets/pet_maodie/portrait_1024x1536.jpg",
        "avatar": "../assets/pets/pet_maodie/avatar_256.png",
        "unit": "../assets/pets/pet_maodie/unit_512.png",
        "thumb": "../assets/pets/pet_maodie/avatar_256.png"
      },
      "characterName": "耄耋"
    },
    {
      "id": "skin_teddy_default",
      "characterId": "pet_teddy",
      "name": "默认·毛茸茸的坏东西",
      "rarity": 4,
      "default": true,
      "obtain": {
        "type": "owned"
      },
      "themeColor": "#7A4E3A",
      "style": {
        "mode": "none"
      },
      "fx": "none",
      "desc": "邪恶泰迪平时的样子。看起来在打坐，其实在盘算下一件要拆的东西。",
      "visual": {
        "portrait": "../assets/pets/pet_teddy/portrait_1024x1536.jpg",
        "avatar": "../assets/pets/pet_teddy/avatar_256.png",
        "unit": "../assets/pets/pet_teddy/unit_512.png",
        "thumb": "../assets/pets/pet_teddy/avatar_256.png"
      },
      "characterName": "邪恶泰迪"
    }
  ],
  "levels": [
    {
      "id": "lv_01_kitchen",
      "name": "第 1 关 · 厨房",
      "theme": "厨房",
      "rewards": {
        "firstClear": 60,
        "repeat": 20,
        "threeStar": 30,
        "canned": {
          "firstClear": 80,
          "threeStar": 40,
          "repeat": 20
        }
      }
    },
    {
      "id": "lv_02_living",
      "name": "第 2 关 · 客厅",
      "theme": "客厅",
      "rewards": {
        "firstClear": 80,
        "repeat": 30,
        "threeStar": 30,
        "canned": {
          "firstClear": 120,
          "threeStar": 60,
          "repeat": 30
        }
      }
    },
    {
      "id": "lv_03_balcony",
      "name": "第 3 关 · 阳台与楼道",
      "theme": "阳台",
      "rewards": {
        "firstClear": 120,
        "repeat": 40,
        "threeStar": 40,
        "canned": {
          "firstClear": 160,
          "threeStar": 80,
          "repeat": 40
        }
      }
    }
  ],
  "missingImages": [],
  "generatedAt": "2026-11-25T19:36:41+08:00"
};

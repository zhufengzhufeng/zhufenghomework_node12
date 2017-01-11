var str = `
樱桃小丸子 卡卡西 佐助 不二周助 我爱罗 灰原哀 杀生丸
鸣人 loli 越前龙马 鼬 手冢国光 工藤新一
晓  卡嘉莉 桔梗 流川枫 春野樱
阿斯兰 小樱 毛利兰 基拉 撒加 雏田
戈薇 怪盗基德 沙加 公主 女仆 夜神月
穆 樱木花道 破面 迪达拉 saber 八神
大蛇丸 日番谷冬狮郎 宁次 迹部 雪见 菊丸英二
鹿丸 拉克丝 朽木白哉 樱桃小丸子 朽木露琪亚 四代火影
路飞 灵儿 加隆 三井寿 雅典娜 蝎
黑崎一护 路比 保鲁夫拉姆 金田一 凉宫春日 佐为
市丸银 龙葵 动漫人物 卡妙 观月初 重楼
御姐 不知火舞 酷拉皮卡 奇牙 服部平次 仙道彰
爱德华 神田 月如 麦兜 龙崎 星马烈
皮卡丘 安娜 米罗 索隆 藏马 梦比优斯
小霞 神乐 鲁路修 李小狼 忍足侑士 尼亚
不二 幸村精市 天天 小遥 手鞠 源辉二
凌波丽 奈落 星璇 塔矢亮 枢木朱雀 高桥凉介
卡卡罗特 花月 梅罗 c.c. 月 景天
白 瞬 克劳德 冲田总司 日向枣 知世
赤井秀一 李逍遥 山中井野 井上织姬 法伊
小智 奥茨玛公主 白石藏之介 铃 星矢 蓝染
黄金十二 冰河 春丽  艾奥里亚 草摩夹
明日香 絮儿 紫刘辉 日番谷 夏娜 真田幸村
该隐 月野兔 飞影 熊猫人 星马豪 一乘寺贤
盖亚 飞段 loli控 自来也 井野 皇昴流
真田弦一郎 阿散井恋次 葛力姆乔 芙蕾 樱 进藤光
乌尔奇奥拉 紫萱 李洛克 犬冢牙 麻仓叶 哪吒
伊路米 高石武 镜夜 月光疾风 美美 暗游戏
南野秀一 水银灯 三幻魔 kula 岳人 阿布罗狄
温慧 迪斯马斯克 不二殿 剑心 西野司 桃城武
潘多拉 赤尸 拓实 娜美 小狼 修罗
水户洋平 雏森桃 远坂凛 伊武深司 叮当 aeris
真飞鸟 佐井  步惊云 柳宿 叶王
山治 童虎 卡莲.休妲菲尔特 阿尔 鬼宿 涉谷有利
东城绫 油女志乃 法音 杰克 幻影旅团 乔巴
赤沙之蝎 大空翼 兜 牧绅一 阿修罗 海尔家族
真中淳平 娜可露露 小光mm chris 火渡凯 上杉达也
乱子 小杰 不二裕太 库洛洛 皇昂流 渡良濑准
老夫子 京极真 藤真健司 水野亚美 宇智波带土 弥勒
霍洛霍洛 艾斯 安倍泰明 明智光秀 飞鸟二世 露娜玛丽亚
坂田银时 仇心柳 雷元戈 相良宗介 三藏 道莲
海马濑人 于小雪 风户京介 特兰克斯 悟饭 悟天
咢 南宫煌 小茜 布玛 苦艾酒 弗利萨
穆拉弗拉达 卡罗 幽助 暗貘良 小魔女 苍星石
kadaj 珊璞 阿篱 whip 远山和叶 聂风
爱迪 巴布熊猫 琳 星野 矢吹真吾 奈奈
翠星石 哈迪斯 晴天小猪 鸣海步 伸夫 上官帅
拉姆瑟斯 姬良 刀刀 小叽 宫野明美 佐伯虎次郎
宫野志保 浦原喜助 地场卫 奈克瑟斯 夕日红 带土
本堂瑛佑 凯鲁 戴拿 橘杏 leona 独孤宁珂
宫本武藏 玄间 孙悟饭 启介 阿和 钢牙
艾吉 多尔克 和谷 神无 樱庭时央 清田信长
火澄 焰之炼金术师 秋山辽 莎丽 安倍昌浩 北大路五月
虎源太 马利克 夏莉 苏樱 丹羽大助 小泉红子
赤也 金家潘 神宗一郎 松田阵平 樱の恋 沙鲁
安倍泰继 达尔
卡卡西 佐助 不二周助 我爱罗 灰原哀 杀生丸
鸣人 loli 越前龙马 鼬 手冢国光 工藤新一卡嘉莉 桔梗 流川枫 春野樱
阿斯兰 小樱 毛利兰 基拉 撒加 雏田
戈薇 怪盗基德 沙加 公主 夜神月
穆 樱木花道 破面 迪达拉 saber 八神
大蛇丸 日番谷冬狮郎 宁次 迹部 雪见 菊丸英二
鹿丸 拉克丝 朽木白哉 樱桃小丸子 朽木露琪亚`;
var res = str.split(' ');
var getRand = function (n, m) {
    return Math.round(Math.random()*(m-n)+n);
}
var str1 = "赵钱孙李周吴郑王冯陈楚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏桃江";//0-31
var str2 = "一二三四五六七八九零壹贰叁肆伍陆柒捌玖鼠牛虎兔龙蛇马羊猴鸡狗猪";//->0-30

var arr = [];
for(var i=1;i<=5;i++){
    var obj = {};
    obj.id = i;
    obj.name = res[getRand(0,res.length-1)]
    obj.sex = getRand(0,1)
    obj.age = getRand(0,100);
    arr.push(obj);
}
var fs = require('fs')
fs.writeFileSync('./student.json',JSON.stringify(arr),'utf-8');
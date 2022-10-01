import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import BoardItem from "./BoardItem";

const BoardListContent = styled.div`
  .content {
    position: relative;
    width: 100vw;
    max-width: 1200px;
    display: flex;
    flex-direction: row;
    gap: 160px;
    .boardList {
      max-width: 800px;
    }
  }
`;

const ActionToolbar = styled.div`
  position: sticky;
  top: 40px;
  width: 100vw;
  max-width: 1200px;
  z-index: 1;
  .btn-group {
    padding: 0;
    margin: 0;
    background-color: #000;
    .btn {
      border: 1px solid #666;
      background-color: #444;
      color: #fff;
      height: 100%;
      line-height: 40px;
      font-size: 16px;
      padding: 8px 14px;
      &.active,
      &:hover {
        border: 1px solid #ccc;
        background-color: #bbb;
        color: #000;
      }
    }
  }
`;

const AdContent = styled.div`
  position: sticky;
  top: 80px;
  height: 80vh;
  width: 150px;
  background-color: #ccc;
  color: #000;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoardList = () => {
  const boardData = [
    {
      name: "Gossiping",
      activeUser: 14142,
      category: "綜合",
      title: "◎[八卦] 女板舉辦日常穿搭大賽中！",
    },
    {
      name: "Stock",
      activeUser: 5157,
      category: "學術",
      title: "◎[股票] 中秋徵文進行中 歡迎參加~",
    },
    {
      name: "C_Chat",
      activeUser: 3836,
      category: "閒談",
      title: "◎[希洽] 填問卷領P幣喔",
    },
    {
      name: "Baseball",
      activeUser: 2592,
      category: "棒球",
      title: "◎[棒球] Albert Pujols MLB 700轟!",
    },
    {
      name: "Military",
      activeUser: 1340,
      category: "軍事",
      title: "◎各國軍事討論與專業分享",
    },
    {
      name: "Lifeismoney",
      activeUser: 1301,
      category: "省錢",
      title: "◎[省錢] 省錢板 發文要有省錢點",
    },
    { name: "NBA", activeUser: 1248, category: "NBA.", title: "◎[NBA]" },
    {
      name: "HatePolitics",
      activeUser: 1098,
      category: "Hate",
      title: "◎[政黑]發文前請先詳閱板規!",
    },
    {
      name: "KoreaStar",
      activeUser: 790,
      category: "韓國",
      title: "◎[韓星] 請多多善用韓樂韓綜韓劇板",
    },
    {
      name: "car",
      activeUser: 722,
      category: "車車",
      title: "◎[汽車] 大家要注意板規1-8喔",
    },
    {
      name: "MobileComm",
      activeUser: 613,
      category: "資訊",
      title: "◎[通訊] 手機情報o資費比較o交易x",
    },
    {
      name: "home-sale",
      activeUser: 611,
      category: "房屋",
      title: "◎[房屋] 禁無關看板新聞/租賃廣告",
    },
    {
      name: "PC_Shopping",
      activeUser: 596,
      category: "硬體",
      title: "◎[電蝦] RTX40+Ryzen7000 正式發佈",
    },
    {
      name: "LoL",
      activeUser: 568,
      category: "遊戲",
      title: "◎[LoL] 2022世界賽明天清晨開打",
    },
    {
      name: "sex",
      activeUser: 540,
      category: "男女",
      title: "◎[西斯] 中秋佳節人團圓",
    },
    {
      name: "iOS",
      activeUser: 506,
      category: "系統",
      title: "◎[iOS] “動態島”的酷炫試過才懂",
    },
    {
      name: "Tech_Job",
      activeUser: 486,
      category: "工作",
      title: "◎[科技] 版規三政治水桶 7天=>30天",
    },
    {
      name: "basketballTW",
      activeUser: 474,
      category: "籃球",
      title: "◎[台籃] 跨聯盟交流賽",
    },
    {
      name: "Beauty",
      activeUser: 447,
      category: "聊天",
      title: "◎[表特] 新板主募集中",
    },
    {
      name: "Boy-Girl",
      activeUser: 435,
      category: "心情",
      title: "◎[男女] Babylon = Baby + Lonely",
    },
    {
      name: "movie",
      activeUser: 426,
      category: "綜合",
      title: "◎[電影] 請注意防雷/分類/電影點",
    },
    {
      name: "WomenTalk",
      activeUser: 407,
      category: "聊天",
      title: "◎[女孩]板主投票(@o@)/穿搭活動!!",
    },
    {
      name: "BabyMother",
      activeUser: 376,
      category: "家庭",
      title: "◎[寶媽] 0~3歲嫩幼寶/父母專屬園地",
    },
    {
      name: "joke",
      activeUser: 329,
      category: "娛樂",
      title: "◎[就可] 我就放進去一點點",
    },
    {
      name: "Japan_Travel",
      activeUser: 310,
      category: "旅遊",
      title: "◎日本航線的大航空時代要開始了",
    },
    {
      name: "NSwitch",
      activeUser: 263,
      category: "主機",
      title: "◎[NS] 5/12 薩爾達傳說 王國之淚",
    },
    {
      name: "Steam",
      activeUser: 256,
      category: "平台",
      title: "◎本板禁止買賣合購代購代刷",
    },
    {
      name: "PlayStation",
      activeUser: 253,
      category: "主機",
      title: "◎[PS5] 9/29 女神戰記 極樂淨土 ",
    },
    { name: "Kaohsiung", activeUser: 253, category: "高雄", title: "◎[高雄]" },
    {
      name: "marriage",
      activeUser: 252,
      category: "婚姻",
      title: "◎[婚姻] 歡迎光臨婚姻板",
    },
    {
      name: "AllTogether",
      activeUser: 251,
      category: "聯誼",
      title: "◎[歐兔] 明明是想靠近",
    },
    {
      name: "japanavgirls",
      activeUser: 246,
      category: "綜合",
      title: "◎AV女優板 清新、優質,神人照格式",
    },
    {
      name: "marvel",
      activeUser: 239,
      category: "生二",
      title: "◎[媽佛] 十月 coming soon",
    },
    {
      name: "Tainan",
      activeUser: 230,
      category: "台南",
      title: "◎[台南] 地震頻繁!請鄉親注意安全",
    },
    {
      name: "Elephants",
      activeUser: 224,
      category: "CPBL",
      title: "◎[兄弟] ^U^ say yes 就有可能 ^U^",
    },
    {
      name: "TaichungBun",
      activeUser: 212,
      category: "台中",
      title: "◎[台中] 違規文章自刪仍屬違規",
    },
    {
      name: "miHoYo",
      activeUser: 205,
      category: "米哈",
      title: "◎[米哈遊] 原神3.1",
    },
    {
      name: "HardwareSale",
      activeUser: 193,
      category: "買賣",
      title: "◎[硬交] 面交需注意安全社交距離",
    },
    {
      name: "creditcard",
      activeUser: 185,
      category: "理財",
      title: "◎[卡板] 善用置底閒聊避免觸犯板規",
    },
    {
      name: "KoreaDrama",
      activeUser: 185,
      category: "韓劇",
      title: "◎[韓劇] ",
    },
    {
      name: "e-shopping",
      activeUser: 184,
      category: "網購",
      title: "◎[ＥＳ] 注意板規 遠離水桶",
    },
    {
      name: "MacShop",
      activeUser: 179,
      category: "資訊",
      title: "◎增設 臨時板規 20220916 詳見置底",
    },
    {
      name: "Marginalman",
      activeUser: 162,
      category: "心情",
      title: "◎[邊緣] 10月新番準備開播",
    },
    {
      name: "TW_Entertain",
      activeUser: 153,
      category: "綜藝",
      title: "◎[台綜] 金鐘人氣節目初選 至9/30",
    },
    {
      name: "BeautySalon",
      activeUser: 144,
      category: "美容",
      title: "◎[美保] 禁止徵求 捐贈 代購 合購",
    },
    {
      name: "CFantasy",
      activeUser: 139,
      category: "玄幻",
      title: "◎[玄幻] 玄幻小說板",
    },
    {
      name: "MH",
      activeUser: 136,
      category: "狩獵",
      title: "◎[MH] MHR: Sunbreak 6.30狩獵解禁",
    },
    {
      name: "Japandrama",
      activeUser: 124,
      category: "日劇",
      title: "◎[日劇] オリバーな神",
    },
    {
      name: "TaiwanDrama",
      activeUser: 122,
      category: "臺劇",
      title: "◎[臺劇] 台北女子圖鑑",
    },
    {
      name: "CVS",
      activeUser: 121,
      category: "資訊",
      title: "◎[CVS] 便利商店板討論中",
    },
    {
      name: "KR_Entertain",
      activeUser: 118,
      category: "綜藝",
      title: "◎[韓綜] Show Me The 新板主!",
    },
    {
      name: "AC_In",
      activeUser: 116,
      category: "閒談",
      title: "◎[裏洽] 勤洗手",
    },
    {
      name: "DigiCurrency",
      activeUser: 115,
      category: "資訊",
      title: "◎[數位貨幣] ETH merge completed",
    },
    {
      name: "mobilesales",
      activeUser: 112,
      category: "資訊",
      title: "◎[Mobile] 板規不看，水桶就來",
    },
    {
      name: "China-Drama",
      activeUser: 112,
      category: "中劇",
      title: "◎[中劇] 板龜很美，請多看看他 <3",
    },
    {
      name: "ToS",
      activeUser: 110,
      category: "轉珠",
      title: "◎[神魔] [金冠] 克洛諾斯地獄",
    },
    {
      name: "Gamesale",
      activeUser: 108,
      category: "綜合",
      title: "◎[GS] 主機強迫綁XGPU一起賣會桶喔",
    },
    {
      name: "CarShop",
      activeUser: 106,
      category: "買賣",
      title: "◎[汽車買賣] 看【置底公告】再發文",
    },
    {
      name: "ONE_PIECE",
      activeUser: 105,
      category: "日本",
      title: "◎[海賊王]    1061 未來島 ",
    },
    {
      name: "Option",
      activeUser: 102,
      category: "學術",
      title: "◎[期權] 手續費洽broker板",
    },
    {
      name: "EAseries",
      activeUser: 101,
      category: "歐美",
      title: "◎[EA] 歐美影集版 ",
    },
    {
      name: "forsale",
      activeUser: 100,
      category: "買賣",
      title: "◎[跳蚤] 發文前請注意板規定",
    },
    {
      name: "Hsinchu",
      activeUser: 97,
      category: "新竹",
      title: "◎[新竹] 票券卡片商店會員、到置底",
    },
    {
      name: "PuzzleDragon",
      activeUser: 95,
      category: "轉珠",
      title: "◎[P＆D] 09/29(四)1900 山本感謝祭",
    },
    {
      name: "Bank_Service",
      activeUser: 95,
      category: "銀行",
      title: "◎[銀行服務板] 高利率數位帳戶置底",
    },
    { name: "MLB", activeUser: 95, category: "#MLB", title: "◎開幕日4/7" },
    {
      name: "SportLottery",
      activeUser: 94,
      category: "博弈",
      title: "◎[運彩] 呼籲政府開放第二家競爭",
    },
    {
      name: "BaseballXXXX",
      activeUser: 92,
      category: "棒球",
      title: "◎溫馨4X",
    },
    {
      name: "biker",
      activeUser: 91,
      category: "車車",
      title: "◎[機車] 問君能有幾多愁 恰似買到",
    },
    {
      name: "Tennis",
      activeUser: 89,
      category: "網球",
      title: "◎[網球] Thank you, Serena & Roger",
    },
    {
      name: "Salary",
      activeUser: 82,
      category: "職場",
      title: "◎[職場] 工作職場板",
    },
    {
      name: "FORMULA1",
      activeUser: 82,
      category: "賽車",
      title: "◎Next Race: 9/30-10/2 SINGAPORE",
    },
    {
      name: "StupidClown",
      activeUser: 81,
      category: "經歷",
      title: "◎ 哼哼哼哼",
    },
    {
      name: "YuanChuang",
      activeUser: 80,
      category: "原創",
      title: "◎[原創] 八月徵文：原創副本之旅",
    },
    {
      name: "Headphone",
      activeUser: 80,
      category: "資訊",
      title: "◎Dopin R.I.P 我們永遠懷念你",
    },
    {
      name: "watch",
      activeUser: 80,
      category: "購一",
      title: "◎[錶板] Show me your Watch!",
    },
    {
      name: "BabyProducts",
      activeUser: 79,
      category: "買賣",
      title: "◎歡迎分享下半年二手市集活動",
    },
    {
      name: "Insurance",
      activeUser: 76,
      category: "理財",
      title: "◎保險板-徵業務站內信劣退",
    },
    {
      name: "UmaMusume",
      activeUser: 72,
      category: "賽馬",
      title: "◎[馬娘] 殭屍數碼 燈籠怒濤/小萌(",
    },
    {
      name: "Lions",
      activeUser: 72,
      category: "CPBL",
      title: "◎10/1最後一武 與神同行",
    },
    {
      name: "MakeUp",
      activeUser: 71,
      category: "美容",
      title: "◎[美妝] 每次消費都在決定未來市場",
    },
    {
      name: "Examination",
      activeUser: 70,
      category: "考試",
      title: "◎[國考] 高普考榜示",
    },
    {
      name: "MuscleBeach",
      activeUser: 68,
      category: "美體",
      title: "◎[健身] 發文前請務必詳閱板規",
    },
    {
      name: "DIABLO",
      activeUser: 67,
      category: "線上",
      title: "◎[暗黑] D2R 全新大護身符!",
    },
    { name: "cat", activeUser: 66, category: "寵物", title: "◎喵板～" },
    {
      name: "nb-shopping",
      activeUser: 65,
      category: "硬體",
      title: "◎[筆電蝦] ",
    },
    {
      name: "Gov_owned",
      activeUser: 64,
      category: "國營",
      title: "◎[國營] 上榜心得文徵求ing",
    },
    {
      name: "WOW",
      activeUser: 61,
      category: "線上",
      title: "◎[WoW] 巨龍巨龍你擦亮眼",
    },
    {
      name: "fastfood",
      activeUser: 58,
      category: "美食",
      title: "◎[速食] 盜號盛行！注意帳號安全",
    },
    {
      name: "SakaTalk",
      activeUser: 57,
      category: "日本",
      title: "◎坂道閒聊板",
    },
    {
      name: "E-appliance",
      activeUser: 57,
      category: "資訊",
      title: "◎[家電] 發文請照規定發文",
    },
    {
      name: "PokemonGO",
      activeUser: 56,
      category: "抓寶",
      title: "◎[PMGO] 感謝有您～寫出藏在心的話",
    },
    {
      name: "Hearthstone",
      activeUser: 56,
      category: "線上",
      title: "◎[爐石] 新資料片-納撒亞古堡懸案",
    },
    {
      name: "DMM_GAMES",
      activeUser: 54,
      category: "遊戲",
      title: "◎[DMMG] 歡迎光臨DMM GAMES",
    },
    { name: "Food", activeUser: 54, category: "美食", title: "◎美食板" },
    {
      name: "give",
      activeUser: 53,
      category: "贈送",
      title: "◎[贈送] 標題不合置底文規定  刪",
    },
    {
      name: "Palmar_Drama",
      activeUser: 51,
      category: "布袋",
      title: "◎08/26 霹靂戰冥曲",
    },
    {
      name: "Brand",
      activeUser: 51,
      category: "資訊",
      title: "◎   ＊* 布蘭德 細節的價值 ＊*",
    },
    {
      name: "FATE_GO",
      activeUser: 50,
      category: "手遊",
      title: "◎[FGO] 日 10月中旬新活動開幕",
    },
    {
      name: "FITNESS",
      activeUser: 50,
      category: "美體",
      title: "◎[體適能] 徵人/轉讓文會被水桶7天",
    },
    { name: "DSLR", activeUser: 48, category: "攝影", title: "◎[攝影] 2022" },
    {
      name: "Wanted",
      activeUser: 48,
      category: "徵求",
      title: "◎[汪踢] 誠徵板主",
    },
    {
      name: "Soft_Job",
      activeUser: 48,
      category: "工作",
      title: "◎[軟工] 我從小接受嚴格的中國武術",
    },
    {
      name: "PublicServan",
      activeUser: 45,
      category: "公職",
      title: "◎[公職] 公務人員板",
    },
    {
      name: "Monkeys",
      activeUser: 45,
      category: "CPBL",
      title: "◎樂天桃猿-希望大家都平平安安",
    },
    {
      name: "Key_Mou_Pad",
      activeUser: 44,
      category: "生活",
      title: "◎[鍵鼠] 原廠保固縮水可以拒買",
    },
    {
      name: "Drama-Ticket",
      activeUser: 43,
      category: "舞臺",
      title: "◎藝文票券轉售板 開賣7日內禁徵",
    },
    {
      name: "part-time",
      activeUser: 42,
      category: "求職",
      title: "◎[打工] 111/01/01起 工資 168/hr",
    },
    {
      name: "medstudent",
      activeUser: 41,
      category: "醫藥",
      title: "◎[醫牙中醫學生板] 請先閱讀置底",
    },
    {
      name: "KanColle",
      activeUser: 41,
      category: "艦娘",
      title: "◎[艦娘] 9週年~",
    },
    {
      name: "KoreanPop",
      activeUser: 41,
      category: "音樂",
      title: "◎抵制買榜 抵制作弊，韓樂需要正義",
    },
    {
      name: "MobilePay",
      activeUser: 41,
      category: "理財",
      title: "◎刷卡回饋問題請至信用卡板",
    },
    {
      name: "model",
      activeUser: 41,
      category: "收藏",
      title: "◎這裡是Ptt模型板～拍賣日為週六",
    },
    {
      name: "SuperBike",
      activeUser: 40,
      category: "車車",
      title: "◎PTT重機板 ~ 發買賣文請詳閱置底",
    },
    {
      name: "Hip-Hop",
      activeUser: 38,
      category: "音樂",
      title: "◎[嘻哈] 大嘻哈456人即將捉對廝殺",
    },
    { name: "Taoyuan", activeUser: 38, category: "桃園", title: "◎[桃園]" },
    {
      name: "HelpBuy",
      activeUser: 38,
      category: "買賣",
      title: "◎[代買] 貼文請先看板規及置底公告",
    },
    {
      name: "hypermall",
      activeUser: 37,
      category: "購三",
      title: "◎[賣場] 討論請尊重他人",
    },
    {
      name: "NY-Yankees",
      activeUser: 37,
      category: "AL-E",
      title: "◎NYY - 全隊何時醒 ",
    },
    {
      name: "Audiophile",
      activeUser: 36,
      category: "資訊",
      title: "◎[喇音] 請詳閱置底交易文新板規",
    },
    {
      name: "TY_Research",
      activeUser: 36,
      category: "大氣",
      title: "◎系集變得太快就像龍捲風",
    },
    {
      name: "Storage_Zone",
      activeUser: 36,
      category: "硬體",
      title: "◎[儲存] FB詐騙勿買.救援要有毅力",
    },
    {
      name: "Road_Running",
      activeUser: 35,
      category: "跑步",
      title: "◎跑步版--天天跑步天天健康",
    },
    {
      name: "facelift",
      activeUser: 34,
      category: "美容",
      title: "◎[醫學美容版]　嚴禁揪團買賣廣告",
    },
    {
      name: "Digitalhome",
      activeUser: 34,
      category: "數位",
      title: "◎[電視] 2022 數位家庭板 歡迎您!",
    },
    {
      name: "DC_SALE",
      activeUser: 33,
      category: "攝影",
      title: "◎數位相機交易 - 注意詐騙",
    },
    {
      name: "BigBanciao",
      activeUser: 32,
      category: "新北",
      title: "◎[板橋] 這裡是板橋~ 板橋版",
    },
    {
      name: "Railway",
      activeUser: 22,
      category: "交通",
      title: "◎[鐵道] 天佑台灣，早日通車",
    },
  ];
  return (
    <div style={{position: 'relative'}}>
      <ActionToolbar>
        <div className="btn-group">
          <Link className="btn">熱門看板</Link>
        </div>
      </ActionToolbar>
      <BoardListContent>
        <div className="content">
          <div className="boardList">
            {boardData.map((board, key) => {
              <BoardItem />;
              const { name, activeUser, category, title } = board;
              return (
                <BoardItem
                  name={name}
                  activeUser={activeUser}
                  category={category}
                  title={title}
                />
              );
            })}
          </div>
          <AdContent>AD Content</AdContent>
        </div>
      </BoardListContent>
    </div>
  );
};

export default BoardList;

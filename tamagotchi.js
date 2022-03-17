const scriptName = "tamagotchi";

importPackage(javax.net.ssl);
importPackage(java.lang);
importPackage(java.net);
importPackage(java.io);
importPackage(org.jsoup);

const version = "1.0";


const Util = require('util');
const DB = require('db');
const PERIX = ".";
const roomName = "보드게임";
const Josa = require('josa-js');
const Timer = require('timer');
let map = DataBase.getDataBase("map.json");
    map = JSON.parse(map)


Device.acquireWakeLock(android.os.PowerManager.PARTIAL_WAKE_LOCK, '');

const Bot = {};

const SQLiteDatabase = android.database.sqlite.SQLiteDatabase; 
var db = android.database.sqlite.SQLiteDatabase.openOrCreateDatabase("/sdcard/database/tama.db",null); 


const Game = {
  main:function(room, message, sender){  
    if(message == PERIX){   
      let data = DB.find();                               Util.sendKakaoLink(room,data.getString(12)+".php?L="+data.getString(11)+"&object=assets/"+data.getString(1)+"/"+data.getString(5)+"/"+data.getString(5));
    }  
    let isCommand = message.charAt(0) == ".";
    (isCommand) ? Game.command(room, message.substr(1), sender) : "";
    },
  command : function(room, cmd, sender){
    let data = DB.find();
    
    if(DB.isExist()){
      if(data.getString(3) == 1&&data.getString(0)==null&&cmd){
        DB.naming(cmd);
        Bot.reply("'"+cmd+"'(으)로 이름을 지었습니다\n이제부터 "+cmd+"의 상태를 보려면 "+PERIX+"를 입력해주세요.\n"+PERIX+"정보를 입력하면 '"+cmd+"'의 세보정보를 볼 수 있습니다.");
        DB.editStatus(0)
        Timer.clear()
        Timer.startEvol()
        return;
      }
    }
    switch(cmd) { 
      case '시작': 
        let tama = db.rawQuery("SELECT * FROM info", null).moveToLast();
        if(tama) return Bot.reply("이미 생성된 타마가 존재합니다");
        const t = Util.randomGender();
        const query = 'INSERT INTO info (gender, birth, status, species) VALUES ("'+t.gender+'","'+String(new Date())+'",'+'1,"'+t.species+'")';
        db.execSQL(query);
        Util.sendKakaoLink(roomName,'assets/background/egg_product.png');
        Thread.sleep(20000);
        Util.sendKakaoLink(roomName,'assets/background/hatching.png');
        Thread.sleep(5000);
        Util.sendKakaoLink(roomName,'home.php?object=assets/'+t.gender+'/'+t.species+'/'+t.species);
        Thread.sleep(500);
        Bot.reply('알이 부화했습니다. 이름을 지어주세요.\nex)'+ PERIX+'이름');
      break;
      case '정보': 
        Bot.reply("이름: "+data.getString(0)+
                  "\n성별: "+data.getString(1)+
                  "\n레벨: "+data.getString(4)+
                  "\n종: "+data.getString(5)+
                  "\n애정도: "+data.getString(6)+
                  "\n배고픔: "+data.getString(7)+
                  "\n돈: "+data.getString(8))
      break;
      case '목욕':
        Util.sendKakaoLink(roomName,'bathroom.php?object=assets/'+data.getString(1)+'/'+data.getString(5)+'/'+data.getString(5))
        Bot.reply(Josa.r(data.getString(0),'이/가')+' 목욕하는 중입니다.')
        DB.editStatus(2)
        DB.editLocate("bathroom","bathroom")
        Thread.sleep(30000);
        
        DB.addDirty(20)
        DB.addAffection(10)
        DB.editStatus(0); 
        DB.editLocate("home","home");
        Bot.reply(Josa.r(data.getString(0),'이/가')+" 목욕을 끝냈습니다.\n"+"애정도가 10 올랐습니다\n현재 애정도: "+ DB.find().getString(6))
        break;
      case '밥':
        Bot.reply("아래 냉장고에서 먹일 음식의 번호를 입력해주세요.")
        Thread.sleep(1000);
        Bot.reply(data.getString(0)+"의 냉장고")
      break;
      case '지도':
        const keys = Object.keys(map)
        Bot.reply('현재 열린 맵입니다. 이동하시려면 '+PERIX+'이동 (번호)를 입력해주세요\n\n'+ keys.map((e,i)=>(i+1)+'. '+e).join('\n')) 
      break;
      default: 
      if(cmd.startsWith('이동')){
        const id = cmd.substr(3); 
        const k = Object.keys(map) 
        const m = k[id-1]; 
        let gender = data.getString(1); 
        let sp = data.getString(5); 
        if(this.selectMap){ 
          let locate = map[this.selectMap].id 
          if(!map[this.selectMap].detail[id-1]) 
            return Bot.reply('존재하지 않는 장소입니다.'); 
          let detail = map[this.selectMap].detail[id-1].id 
          DB.editLocate(locate,detail); 
          Util.sendKakaoLink(roomName,detail+'.php?L='+locate+'&object=assets/'+gender+'/'+sp+'/'+sp)                 
          this.selectMap = false; 
          return; 
          }if(!m) return Bot.reply('존재하지 않는 장소입니다.'); 
            Bot.reply(m+'에서 갈 장소를 선택해주세요.\n'+PERIX+'이동(번호)\n\n'+map[m].detail.map((e,i)=>i+1+'. '+e.name).join('\n')); 
            this.selectMap = m;
        }
      break;
    }
  },
  selectMap:false
}





function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  
  Bot.reply = (cmd) => { replier.reply(cmd); };
	 Bot.replyRoom = (cmd) => { (msg) ? Api.replyRoom(roomName, cmd) : null; };
 
	 Game.main(room, msg, sender);
  
}




(DB.isExist())?Timer.startEvol():null


function onStartCompile()
{  
  Timer.clear()
};

 

 
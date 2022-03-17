const timer = {
  evolution : function(){
      
      let level = DB.find().getString(4) 
      let affection = DB.find().getString(6)
      let gender = DB.find().getString(1)
      let caremiss = DB.find().getString(10)
      
      if(level >= 4) {
        return;
      }
          if(level==1){
            if(affection > 15){
              gender=="female"? DB.editSpecies("Yumehotchi"):DB.editSpecies("Meriritchi");
            }else{
              gender=="female"? DB.editSpecies("Pyokokotchi"):DB.editSpecies("Mokukumotchi");
            }
          }if(level==2){
            if(DB.find().affection > 15){
              if(caremiss>=0&&caremiss<=2){
                DB.editSpecies("Hanbunkotchi");
              }else if(caremiss>=3&&caremiss<=5){
                DB.editSpecies("Penribotchi");
              }else if(caremiss>=6){
                DB.editSpecies("Terukerotchi");
              }
            }else{
              if(caremiss>=0&&caremiss<=2){
                DB.editSpecies("Kurupoyotchi");
              }else if(caremiss>=3&&caremiss<=5){
                DB.editSpecies("Mettotchi");
              }else if(caremiss>=6){
                DB.editSpecies("Mokofuritchi");
              }
            }
          }else if(level == 3){
            
              if(caremiss>=0&&caremiss<=1){
                gender=="female"? DB.editSpecies("Lovelitchi"):DB.editSpecies("Mametchi");
              }else if(caremiss>=2&&caremiss<=3){
                gender=="female"? DB.editSpecies("Memetchi"):DB.editSpecies("Kuromametchi");
              }else if(caremiss>=4&&caremiss<=5){
                gender=="female"? DB.editSpecies("Nijifuwatchi"):DB.editSpecies("Kuchipatchi");
              }else if(caremiss==6){
                gender=="female"? DB.editSpecies("Pompomtchi"):DB.editSpecies("Kikitchi");
              }else if(caremiss>=7){
                gender=="female"? DB.editSpecies("Watawatatchi"):DB.editSpecies("Gozarutchi");
              }
            
              
            
          }
          DB.addLevel();
          Api.replyRoom(roomName,Josa.r(DB.find().getString(0) ,'이/가')+" 진화했습니다. '.'으로 현재 상태를 확인 할 수 있습니다.");    
          timer.clear();
          timer.evolTimerPower = setInterval(timer.evolution,DB.find().getString(4)  == 1 ? 2400000 : 86400000);    
          let minus = DataBase.getDataBase("minusState.json");
          minus = JSON.parse(minus)
          let l = DB.find().getString(4) 
          let cycle = minus[String(l)].cycle
          timer.minusStatePower = setInterval(timer.minusState,cycle)
      
     
  },
  minusState:function(){
    let minus = DataBase.getDataBase("minusState.json");
    minus = JSON.parse(minus)
    let level = DB.find().getString(4) 
    let af = DB.minusAffection(minus[String(level)].affect)
    let hu = DB.minusHungry(minus[String(level)].hungry)
    let di = DB.minusDirty(minus[String(level)].dirty)
    if(!af||!hu||!di){
        if(!af&&timer.affectAlert){
            Api.replyRoom(roomName,Josa.r(DB.find().getString(0) ,'이/가')+" 심심해요. 빨리 놀아주세요")
            timer.affectAlert = false
        }
        if(!hu&&timer.hungryAlert){
            Api.replyRoom(roomName,Josa.r(DB.find().getString(0) ,'이/가')+" 배고파요. 빨리 밥주세요!")
            timer.hungryAlert = false
        }
        DB.addCareMiss(1)
        return
    }else if(af) timer.affectAlert = true
    else if(hu) timer.hungryAlert = true
  },
  startEvol:function(){
      timer.minusStatePower = setInterval(timer.minusState,DB.find().getString(4)  == 1 ? 2400000 : 86400000);    
      let minus = DataBase.getDataBase("minusState.json");
      minus = JSON.parse(minus)
      let level = DB.find().getString(4) 
      let cycle = minus[String(level)].cycle
      timer.minusStatePower = setInterval(timer.minusState,cycle);
  },
  clear:function(){
      if(timer.evolTimerPower) clearInterval(timer.evolTimerPower)
      if(timer.minusStatePower) clearInterval(timer.minusStatePower)
      
  },
  hungryAlert:true,
  affectAlert:true,
  evolTimerPower:false,
  minusStatePower:false
}

module.exports = timer
const SECRET = require("secret");
const { KakaoLinkClient } = require('kakaolink'); 
const Kakao = new KakaoLinkClient(SECRET.JAVASCRIPT_KEY, SECRET.URL);
Kakao.login(SECRET.EMAIL, SECRET.PASSWORD); 
const baseUrl = "http://pocript.com/api/tamagotchi/";

const creatureDB = JSON.parse(DataBase.getDataBase("creatureDB.json"))
const util = {
    randomGender:function(){
        let random = Math.floor(Math.random()*2);
        let arr = ["male","female"]
        let gender = arr[random]
        let species = creatureDB[gender]["infancy"][0]
        
        return {gender:gender,species:species};
    },
    sendKakaoLink:function(roomName, imgLink){
        Kakao.sendLink(roomName, {
          link_ver: '4.0',
           template_id: 69609, 
           template_args: {
             board: baseUrl+imgLink
           } 
           }, 'custom');
    }
}

module.exports = util
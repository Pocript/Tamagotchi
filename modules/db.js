let keys = ["name","gender","birth","status","level","species","affection","hungry","money","dirty","caremiss","locate","detailLocate"];
const data = {
    init:function(){
        db.execSQL("insert into info values (1, 'devakuma', 25, 'Seoul')")
    },
    isExist:function(){
        let data = db.rawQuery("SELECT * FROM info", null).moveToLast()
        return data
    },
    find:function(){
        let data = db.rawQuery("SELECT * FROM info", null)
        data.moveToLast()
        return data;
    },
    naming:function(name){
        db.execSQL("UPDATE info SET name = '"+name+"'")
        return name
    },
    editStatus:function(s){
        db.execSQL("UPDATE info SET status = "+s)
    },
    editLocate:function(L,D){
        db.execSQL('UPDATE info SET locate = "'+L+'", detailLocate = "'+D+'"')
    },
    addAffection:function(a){
        let data = DB.find();
        if(data.getString(6) >= 20) return false
        db.execSQL('UPDATE info SET affection = affection + '+a)
    },
    minusAffection:function(a){
        let data = DB.find();
        if(data.getString(6) <= 0) return false
        db.execSQL('UPDATE info SET affection = affection - '+a)
        return true
    },
    addDirty:function(d){
        let data = DB.find();
        if(data.getString(9) >= 10) return false
        db.execSQL('UPDATE info SET dirty = dirty + '+d)
    },
    minusDirty:function(d){
        let data = DB.find();
        if(data.getString(9) <= 0) return false
        db.execSQL('UPDATE info SET dirty = dirty - '+d)
        return true
    },
    addHungry:function(h){
        let data = DB.find();
        if(data.getString(7) >= 20) return false
        db.execSQL('UPDATE info SET hungry = hungry + '+h)
    },
    minusHungry:function(h){
        let data = DB.find();
        if(data.getString(7) <= 0) return false
        db.execSQL('UPDATE info SET hungry = hungry - '+h)
        return true
    },
    addCareMiss:function(cm){
        db.execSQL('UPDATE info SET caremiss = caremiss + '+cm)
    },
    addLevel:function(){
        db.execSQL('UPDATE info SET level = level + 1')
    },
    editSpecies:function(s){
        db.execSQL('UPDATE info SET species = "'+s+'"')
    }
}

module.exports = data
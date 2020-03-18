export default {
    // 路径名转换为文件名
    fileName(n){
        return n.match(/\\([^\\^.]+)\.[^\\]*$/)[1];
    },

    //计算规整时间的时分秒
    musicTime(seconds){
       var hour=seconds/3600>0?parseInt(seconds/3600):''
       var hourMO=seconds%3600;
       var minute =hourMO/60>0?hourMO/60<10?'0'+parseInt(hourMO/60):parseInt(hourMO/60):'00'
       var minuteMo=hourMO%60;
       var second =minuteMo<10?'0'+parseInt(minuteMo):parseInt(minuteMo);


        var currentTime =  hour  + minute + ":" + second;
        return currentTime
    },
    clear(v){
        clearInterval(v)
    }

}
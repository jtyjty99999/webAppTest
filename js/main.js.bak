/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-8-1
 * Time: 下午8:39
 * To change this template use File | Settings | File Templates.
 */

/*backup small tips*/

window.ondeviceMotion = function(event){
    var ax = event.accelerationIncludingGravity.x,
    ay = event.accelerationIncludingGravity.y,
   az = event.accelerationIncludingGravity.z,
        rotation = event.rotationRate;
    if(rotation!=null){
        arAlpha = Math.round(rotation.alpha);
        arBeta = Math.round(rotation.beta);
        arGamma = Math.round(rotation.gamma);
    }

}

$('body').on('orientationchange',function(){

    switch(window.orientation){
        case 0:break;//竖屏
        case -90:break;//左旋转
        case 90:break;//右旋转
        case 180:break;//横屏
    }
})
    /*
    * config
    *
    * */

var config ={
    agent:'sy0e5c35b6',
    secret:'D8F9C23296A707A8C52274FD5FC7CAE845F07839',
    'mainApi':{
        host:'192.168.1.3',
        port:'8080',
        path:'/mirrtalkApi/userInfo/index.php'
    },
    '详细资料':'326baf',
    'login':'53f689'
}


//字典排序再散列器
function dictAndSha1ize(obj,secret){
    var array = new Array();

    //字典排序

    for(var key in obj)
    {
        array.push(key);
    }
    array.sort();

    var paramArray = new Array();

    //拼接字符串

    for(var index in array)
    {
        var key = array[index];
        paramArray.push(key + obj[key]);
    }

    //sha1化
    var source = paramArray.join("");
    console.log('source:'+source)
    var sign = hex_sha1(source);
    console.log('sign:'+sign)
    obj.sign = sign.toUpperCase();
    delete obj.secret;//清理secret
    return obj
}

/*浅拷贝,处理各种配置*/
var extend = function(result, source) {
    for (var key in source)
        result[key] = source[key];
    return result;
}




var activate = ('createTouch' in document) ? 'tap' : 'click'; //适配手机与网页
var $doc = $(document);
var boxes=document.querySelectorAll('.activeButton');
var l = boxes.length,i=0;

for(;i<l;i++){

    boxes[i].addEventListener('touchstart',function(){
    },false);//hack来样式

}


function $ajaxRequest(option,doneCallback,fallCallback){
    var opt  =     {
        type :'POST',
        url :'/projects',
        data : {},
        dataType :'json',
        timeout : 800,
        context :$('body'),
        success : function(data){
            doneCallback.call(this,data);
        },
        error :function(xhr,type){
            fallCallback.call(this,xhr,type);
        }
    }
    opt = $.extend(opt, option);
    console.log(opt)
    $.ajax(opt)
}

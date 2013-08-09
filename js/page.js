/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-8-9
 * Time: 上午11:35
 * To change this template use File | Settings | File Templates.
 */

function renderFromData(pageName,option,callback){
    var box = 'article[data-pageName='+pageName+']';
    $(box).bind('show',function(){
        $ajaxRequest(option,function(msg){
            callback.call(this,msg,pageName);
        },function(jqXHR, textStatus){
            throw new Error(textStatus)
        })
    })

}
/*var jumpers=document.querySelectorAll('.jumper');
var len = jumpers.length,j=0;

for(;j<len;j++){

    jumpers[j].addEventListener('touchend',function(){
        var title = $(this).attr('data-target');
        jumpAndRender(title);//修复点击"闪一下"的bug(没渲染完毕?)
        return false
    },false);

    jumpers[j].addEventListener('click',function(){
        var title = $(this).attr('data-target');
        jumpAndRender(title);//修复点击"闪一下"的bug(没渲染完毕?)
        return false
    },false);

}*/

$('.jumper').on(activate,function(){

    var title = $(this).attr('data-target');
    jumpAndRender(title);//修复点击"闪一下"的bug(没渲染完毕?)
    return false

})

var testData = {
    userName:'18696770041',
    agent:config.agent,
    secret:config.secret,
    serviceType:"326baf"
}
var info = {};

renderFromData('详细资料',{
    type:'POST',
    url:'http://192.168.1.3:8080/mirrtalkApi/userInfo/getUserInfoAll.php',
    data:dictAndSha1ize(testData)
},function(data,pageName){
    console.log(data.RESULT);
    var box = 'article[data-pageName='+pageName+']';
    var tpl = document.querySelector(box).innerHTML;
    var html = juicer(tpl, JSON.parse(data.RESULT));
    console.log(html)
    document.querySelector(box).innerHTML = html;
    info = {
        mirrtalkNumber:'18696770041',
        agent:config.agent,
        secret:config.secret,
        serviceType:"326baf"
    }
    $('.confirm').on(activate, function () {
        $ajaxRequest({
            type:'POST',
            url:'http://192.168.1.3:8080/mirrtalkApi/userInfo/updateUserInfo.php',
            data:dictAndSha1ize(info)
        },function(msg){
            alert(msg)
        },function(jqXHR, textStatus){
            throw new Error(textStatus)
        })
    })


})

var showed='道客数读',prev=[];
function jumpAndRender(pageName,override){
    var sel = 'article[data-pageName='+pageName+']';
    var override = override || true;//若传入false，比如后退时，不需要计入访问队列。
    var showedClassList= document.querySelector('article[data-pageName='+showed+']').classList;
    showedClassList.remove('current');
    showedClassList.add('reverse');
    var choosedClassList = document.querySelector(sel).classList;
    choosedClassList.remove('reverse');
    choosedClassList.add('current');
    $('#title').text(pageName);
    if(override){
        var k=0,l=prev.length;
        for(;k<l;k++){
            if(prev[k]==showed){
                prev.splice(k,1)
                break
            };
        }
        prev.push(showed);//维护一个访问记录队列，访问时计入队列。若队列中存在则不进入队列
    }
    showed = pageName;
    $(sel).trigger('show')
}


$('.leftBtn').on(activate,function(){

    prev.length!==0&&setTimeout(function(){
        jumpAndRender(prev[prev.length-1],false);
        prev.pop();
    },0)

})


window.onload = function(){
    document.querySelector('article[data-pageName='+showed+']').style.display='block'
}



$doc.delegate('.edit', activate, function () {
    var _this = $(this);
    var flag = _this.attr('editing'),type= _this.attr('editType') || 'text',param=_this.attr('param');
    if (flag === 'false'||flag===undefined) {
        var text = _this.text();
        var boxWidth = parseInt(_this.width())-2;
        var inner = '<input type='+type+' style="width:'+boxWidth/1.2+'px!important;padding:0px">';
        _this.html(inner);
        var input = _this.children('input');
        input.val(text);
        input.focus();
        _this.attr('editing', 'true');
        input.blur(function () {
            var _this = $(this);
            var text = _this.val();
            var father = _this.parent();
            father.html(text);
            father.attr('editing', 'false');
            father = null;
            _this.unbind('blur');
            _this = null;
            info[param]=text;

        })
    }
})
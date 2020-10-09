var show_num = [];
// draw(show_num);
function dj(index){
    draw(show_num,index);
}
function draw(show_num,index) {
    var canvas_width= $('.canvas')[index].clientWidth;
    var canvas_height=$('.canvas')[index].clientHeight;
    var canvas = $('.canvas')[index]//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "1,2,3,4,5,6,7,8,9,0";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度

    for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
        var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var txt = aCode[j];//得到随机的一个内容
        show_num[i] = txt;
        var ssx = $(window).width()/750
        var x = 10 + i * 30*ssx;//文字在canvas上的x坐标
        var y = 25*ssx + Math.random() * 8;//文字在canvas上的y坐标
        var fontS = 28*ssx
        context.font = "bold "+fontS+"px 微软雅黑";
        context.translate(x, y);
        context.rotate(deg);
        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);
        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
}
function randomColor() {//得到随机的颜色值
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

/**
 * 设置cookieId
 */
function _setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;"
};
/**
 * 获取cookieId
 */
function _getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
};
var UID= _getCookie('uid');
if (!UID) {
    UID = new Date().getTime() + Math.floor((1000 + Math.random() * 9000));
    _setCookie('uid', UID, Math.pow(999, 2))
}
var channel = getUrlParam('channel');
$('.free-test').click(function () {
    $('.mask').show();
    $('.free-test-form').show();
    dj(0);
})
$('.signUp').click(function () {
    $('.mask').show();
    $('.sign-up-form').show();
    dj(1);
})

function check(uname,age,city,mobile,code) {
    if(uname==''){
        $('.alert').show();
        $('.name-error').show();
        return false;
    }else if(city=='请选择'){
        $('.alert').show();
        $('.age-error').show();
        return false;
    }else if(city=='请选择'){
        $('.alert').show();
        $('.city-error').show();
        return false;
    }else if(mobile.length!=11){
        $('.alert').show();
        $('.mobile-error').show();
        return false;
    }else if(code!=show_num.join('')){
        $('.alert').show();
        $('.code-error').show();
        return false;
    }else{
        return true;
    }
}
var FreeLock = false;
var SignUpLock = false;
$('.sign-up-form .updateBtn').click(function () {
    // console.log(1)
    var uname = $('.sign-up-form .uname').val();
    var age = $('.sign-up-form .age').val();
    var city = $('.sign-up-form .city').val();
    var mobile = $('.sign-up-form .mobile').val();
    var code = $('.sign-up-form .code').val();

    var flag = check(uname,age,city,mobile,code);
    // console.log('flag',flag)
    if(!flag){
        return false;
    }

    if(!SignUpLock){
        SignUpLock = true;
        $.ajax({
            url: 'https://www.curioo.com.cn/backend/WebApi/guestForm',
            type: 'post',
            data:{
                uid:UID,
                user_name:uname,
                user_mobile:mobile,
                user_city:city,
                user_age:age,
                channel:channel
            },
            success:function (res) {
                if(res.code===200){
                    $('.maskItem').hide();
                    $('.sign-up-success').show();
                }
                SignUpLock = false;
            }
        })
    }
})
$('.free-test-form .updateBtn').click(function () {
    var uname = $('.free-test-form .uname').val();
    var age = $('.free-test-form .age').val();
    var city = $('.free-test-form .city').val();
    var mobile = $('.free-test-form .mobile').val();
    var code = $('.free-test-form .code').val();
    var flag = check(uname,age,city,mobile,code);
    if(!flag){
        return false;
    }
    if(!FreeLock){
        FreeLock = true;
        $.ajax({
            url: 'https://www.curioo.com.cn/backend/WebApi/guestForm',
            type: 'post',
            data:{
                uid:UID,
                user_name:uname,
                user_mobile:mobile,
                user_city:city,
                user_age:age,
                channel:channel
            },
            success:function (res) {
                if(res.code===200){
                    $('.maskItem').hide();
                    $('.free-test-success').show();
                }
                FreeLock = false;
            }
        })
    }
})
$('.iknow').click(function () {
    $('.alert').hide();
    $('.update-error').hide();
})

$('.close').click(function () {
    $('.mask').hide();
    $('.maskItem').hide();
})

$('.mask').click(function (e) {
    if(e.target.className=='mask'){
        $('.mask').hide();
        $('.maskItem').hide();
    }

})

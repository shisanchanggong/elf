﻿layui.config({
    base: 'js/module/'
}).extend({
    // formSelects: 'formSelects/formSelects-v4'
}).use(['config', 'index', 'element'], function () {
    var config = layui.config;
    var index = layui.index;
    var element = layui.element;

    // 检查是否登录
    /*
    if (!config.getToken() || config.getToken() == '') {
        location.replace('login.html');
        return;
    }
       */
    // 获取当前用户信息
    var loginUser = config.getUser();

    index.initRouter();
    element.render('nav');
    index.initLeftNav();
    index.bindEvent();

});

//
//
// //获取左侧导航栏
// function initNav(){
//     var indexNavStr = sessionStorage.getItem("index-nav");
//     var indexNav = JSON.parse(indexNavStr);
//     if(indexNav==null){
//         $.get(apiHost + "menu", {
//             token : getToken()
//         }, function (data) {
//             if(0==data.code){
//                 sessionStorage.setItem("index-nav",JSON.stringify(data.menus));
//                 initNav();
//             }else if(101==data.code){
//                 //console.log(data.message);
//                 layer.msg(data.message,{icon: 2});
//                 setTimeout(function() {
//                     loginOut();
//                 }, 1500);
//             }else{
//                 layer.msg("获取导航失败，请刷新页面",{icon: 2});
//             }
//         },"json");
//     }else{
//         layui.laytpl(sideNav.innerHTML).render(indexNav, function(html){
//             $("#index-nav").html(html);
//             layui.element.render('nav', 'index-nav');
//         });
//     }
// }
//
// //获取用户信息
// function initUserInfo(){
//     try {
//         var user = getCurrentUser();
//         //$("#userHead").attr("src", user.);
//         $("#userNickName").text(user.nickName);
//     } catch (e) {
//         console.log(e.message);
//     }
// }
//
// //退出登录
// function loginOut(){
//     layer.load(1);
//     $.ajax({
//         url: apiHost + "logout?token="+getToken(),
//         type: "POST",
//         //dataType: "JSON",
//         success: function(data){
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//             sessionStorage.removeItem("index-nav");
//             location.replace("login.html");
//         }
//     });
// }
//
// //个人信息
// function myInfo(){
//     var user = getCurrentUser();
//     if(user.sex==1){
//         user.sex = '男';
//     }else{
//         user.sex = '女';
//     }
//     var content = '<ul class="site-dir" style="padding:25px 35px 8px 35px;"><li>账号：'+user.account+'</li><li>昵称：'+user.nickName+'</li>';
//     content += '<li>手机号：'+user.phone+'</li><li>性别：'+user.sex+'</li><li>角色：'+user.roleName+'</li></ul>';
//     layer.open({
//         type: 1,
//         title: '个人信息',
//         area: '350px',
//         offset: '120px',
//         content: content,
//         btn: ['关闭'],
//         btnAlign: 'c'
//     });
// }
//
// //显示表单弹窗
// function updatePsw(){
//     layer.open({
//         type: 1,
//         title: "修改密码",
//         area: '400px',
//         offset: '120px',
//         content: $("#pswModel").html()
//     });
//     $("#pswForm")[0].reset();
//     $("#pswCancel").click(function(){
//         layer.closeAll('page');
//     });
// }
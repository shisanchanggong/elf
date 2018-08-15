layui.define(function (exports) {

    var config = {
        base_server: 'http://localhost:8080/', // 接口地址
        tableName: 'local',  // 存储表名
        autoRender: false,  // 窗口大小改变后是否自动重新渲染表格，解决layui数据表格非响应式的问题
        // 获取缓存的token
        getToken: function () {
            var t = layui.data(config.tableName).token;
            if (t) {
                return t;
            }
        },
        // 清除user
        removeToken: function () {
            layui.data(config.tableName, {
                key: 'token',
                remove: true
            });
        },
        // 缓存token
        putToken: function (token) {
            layui.data(config.tableName, {
                key: 'token',
                value: token
            });
        },
        // 导航菜单
        menus: [{
            name: '主页',
            icon: 'layui-icon-home',
            subMenus: [{
                name: 'home',
                url: 'home',
                path: 'home.html'
            }]
        }, {
            name: '系统管理',
            icon: 'layui-icon-set',
            subMenus: [{
                name: '用户管理',
                url: 'user',  // 这里url不能带斜杠，因为是用递归循环进行关键字注册，带斜杠会被q.js理解为其他注册模式
                path: 'system/user.html',
                auth: 'post:/user/query'
            }, {
                name: '角色管理',
                url: 'role',
                path: 'system/role.html',
                auth: 'get:/role'
            }, {
                name: '权限管理',
                url: 'authorities',
                path: 'system/authorities.html',
                auth: 'get:/authorities'
            }, {
                name: '系统日志',
                url: 'log',
                path: 'system/log.html',
                auth: 'get:/loginRecord'
            }]
        }],
        // 当前登录的用户
        getUser: function () {
            var u = layui.data(config.tableName).loginUser;
            if (u) {
                return JSON.parse(u);
            }
        },
        // 缓存user
        putUser: function (user) {
            layui.data(config.tableName, {
                key: 'loginUser',
                value: JSON.stringify(user)
            });
        },
        // 封装ajax请求
        req: function (url, data, success, method) {
            if ('put' == method.toLowerCase()) {
                method = 'POST';
                data._method = 'PUT';
            } else if ('delete' == method.toLowerCase()) {
                method = 'POST';
                data._method = 'DELETE';
            }
            var token = config.getToken();
            if (token) {
                data.access_token = token.access_token;
            }
            $.ajax({
                url: config.base_server + url,
                data: data,
                type: method,
                dataType: 'JSON',
                success: function (data) {
                    success(data);
                },
                error: function (xhr) {
                    console.log(xhr.status + ' - ' + xhr.statusText);
                    if (xhr.status == 401) {
                        config.removeToken();
                        layer.msg('登录过期', {icon: 2}, function () {
                            location.href = '/login.html';
                        });
                    } else {
                        success({code: xhr.status, msg: xhr.statusText});
                    }
                },
                beforeSend: function (xhr) {
                    var token = config.getToken();
                    if (token) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + token.access_token);
                    }
                }
            });
        }

    };
    exports('config', config);
});
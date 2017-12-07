import AV from 'leancloud-storage'
window.AV = AV;

var install = function(Vue, option) {
    const APP_ID = option.appId;
    const APP_KEY = option.appKey;
    
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });

    Vue.prototype.AV = AV;

    Vue.prototype.getUsers = function(opt) {
        var opt = opt || {};
        var start = opt.start || 0;
        var limit = opt.limit || 10;
        // 普通用户角色
        var role = AV.Object.createWithoutData('_Role', '5a1ef06a2f301e0063e5d67d');
        
        var query = new AV.Query('_User');
        
        query.equalTo('role', role);
        
        return new Promise(function(resolve, reject) {
            
            query.find().then(function (list) {
                query.count().then(function (count) {
                    resolve({
                        list: list,
                        start: start,
                        limit: limit,
                        total: count,
                        totalPage: Math.ceil(count / limit)
                    });
                }, function (err) {
                    reject(err);
                });
            }, function(err) {
                reject(err);
            });
        });
        
    }
}

export default {
    install: install
};
import AV from 'leancloud-storage'
window.AV = AV;

var install = function (Vue, option) {
    const APP_ID = option.appId;
    const APP_KEY = option.appKey;

    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });

    Vue.prototype.AV = AV;

    // 上传用户上传的文件
    function upUploadFils(files) {
        // 按顺序是 报名表 视频 成绩单
        var files = files || {};
        var keyArr = ['applyFile', 'videoFile', 'reportCardFile'];
        var fileList = [files.applyFile, files.videoFile, files.reportCardFile];
        var len = fileList.length;
        var fileObjects = {};
        var n = 0;
        
        return new Promise(function(resolve, reject) {
            fileList.forEach(function(fileItem, index) {
                var fileObj = new AV.File(fileItem.name, fileItem);
                fileObj.save().then(function(file){
                    // 创建一条uploadfile
                    var uploadFile = new AV.Object('UploadFile');
                    uploadFile.set('file', file);
                    uploadFile.set('fileName', fileItem.name);
                    uploadFile.save().then(function(uploadFile) {
                        // 
                        n++;
                        console.log(fileItem.name + '文件上传成功!');
                        fileObjects[keyArr[index]] = uploadFile;
                        if (n == len) {
                            resolve(fileObjects);
                        }
                    }, function(err) {
                        reject(err);
                    })
                    
                }, function(err) {
                    console.log(err);
                    reject(err);
                });
            })
        })
        
    }

    // 获得用户列表
    Vue.prototype.getUsers = function (opt) {
        var opt = opt || {};
        var start = opt.start || 0;
        var limit = opt.limit || 10;
        // 普通用户角色
        var role = AV.Object.createWithoutData('_Role', '5a1ef06a2f301e0063e5d67d');

        var query = new AV.Query('_User');

        query.equalTo('role', role);

        return new Promise(function (resolve, reject) {

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
            }, function (err) {
                reject(err);
            });
        });

    }

    // 获得项目列表 可以通过项目阶段查询 未上线->0 即将启动->1 正在进行->2 往期项目->3
    Vue.prototype.getProjects = function (opt) {
        var opt = opt || {};
        // 四种状态对应后台三个值
        var statusEnum = {
            '未上线': "0",
            '即将启动': "1",
            '正在进行': "2",
            '往期项目': "3"
        };

        var status = null;

        if (opt.stage) {
            status = statusEnum[opt.stage];
        }

        var start = opt.start || 0;
        var limit = opt.limit || 10;

        var query = new AV.Query('Project');
        if (status) {
            query.equalTo('status', status);
        };

        return new Promise(function (resolve, reject) {
            query.find().then(function (list) {
                query.count().then(function (count) {
                    resolve({
                        list: list,
                        pagination: {
                            start: start,
                            limit: limit,
                            total: count,
                            totalPage: Math.ceil(count / limit),
                        }
                    });
                }, function (err) {
                    reject(err);
                })
            }, function (err) {
                reject(err);
            });
        });
    }

    // 通过objectId获取项目详情
    Vue.prototype.getProjectById = function(opt) {
        var objectId = opt.objectId;

        var query = new AV.Query('Project');
        query.include('downloadFile');
        query.include('downloadFile.file');
        return new Promise(function(resolve, reject) {
            if (objectId) {
                query.get(objectId).then(function(project) {
                    resolve(project);
                }, function(err) {
                    reject(err);
                })
            } else {
                reject('你需要传入参数 objectId');
            }
        })
    }

    // 上传报名资料 创建一条该项目的申请 把报名表，视频和成绩单图片上传并绑定该申请
    // opt{ projectObjectId, userObjectId, applyFile, reportCardFile, videoFile}
    Vue.prototype.createApplication = function(opt) {
        var opt = opt || {};

        return new Promise(function(resolve, reject) {
            if (!opt.projectObjectId) {
                reject('需要传入参数 projectObjectId');
            } else if (!opt.userObjectId) {
                reject('需要传入参数 userObjectId');
            } else if (!opt.applyFile) {
                reject('请上传申请表');
            } else if (!opt.reportCardFile) {
                reject('请上传成绩单');
            } else if (!opt.videoFile) {
                reject('请上传自我介绍视频');
            } else {
                // 先把文件上传
                upUploadFils({
                    applyFile: opt.applyFile, // 申请表
                    videoFile: opt.videoFile, // 视频
                    reportCardFile: opt.reportCardFile  // 成绩单
                }).then(function(uploadFileObjects){
                    console.log('文件上传完成');
                    // 创建一条申请
                    var application = new AV.Object('Application');
                    var project = AV.Object.createWithoutData('Project', opt.projectObjectId);
                    var user = AV.Object.createWithoutData('_User', opt.userObjectId);
                    console.log('设置申请属性');
                    application.set('project', project); // 关联项目
                    application.set('applicant', user); // 关联用户
                    application.set('applyFile', uploadFileObjects.applyFile);  // 关联申请表
                    application.set('reportCardFile', uploadFileObjects.reportCardFile);  // 关联成绩单
                    application.set('videoFile', uploadFileObjects.videoFile);  // 关联视频文件
                    application.set('status1', "NO");
                    application.set('status2', "NO");
                    application.set('cancel', false);
                    console.log('保存申请');
                    application.save().then(function(appl){
                        resolve(appl);
                    }, function(err){
                        reject(err);
                    });
                }).catch(function(err) {
                    reject(err);
                });
            };
        });
    };

    // 注册
    Vue.prototype.register = function() {
        
    }

    // 获取下载文件
    Vue.prototype.getDownloadFiles = function(opt) {
        var opt = opt || {};
        var start = opt.start || 0;
        var limit = opt.limit || 10;

        var query = new AV.Query('DownloadFile');
        query.include('file');
        query.equalTo('type', 'newsFile');
        query.equalTo('status', '1');
        query.skip(start);
        query.limit(limit);

        return new Promise((resolve, reject) => {
            query.find().then(list => {
                query.count().then(count => {
                    resolve({
                        list: list,
                        pagination: {
                            start: start,
                            limit: limit,
                            total: count,
                            totalPage: Math.ceil(count/limit)
                        }
                    });
                });
                
            }, err => {
                reject(err);
            })
        })
    }

};

export default {
    install: install
};
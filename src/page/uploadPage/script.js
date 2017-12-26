var data = {
    reportCardFile: '', // 成绩单
    applyFile: '', // 申请表
    videoFile: '', // 视频
    project: {
        attributes: {
            downloadFile: {
                attributes: {
                    file: {
                        attributes: {

                        }
                    }
                }
            }
        }
    },
    dialogVisible: false,
    fullscreenLoading: false
}

var methods = {
    getFile(event, key) {
        this.$data[key] = event.target.files[0];
        console.log(this.$data);
    },
    submit() {
        var _this = this;
        var projectObjectId = this.$route.params.projectObjectId;
        
        this.checkApplyRepeat({
            projectObjectId: projectObjectId
        }).then(res => {
            console.log(res);
            if (res) {
                _this.fullscreenLoading = false;
                _this.$message({
                    message: '您已经申请过该项目了，不能重复申请',
                    type: 'warning'
                });
            } else {
                _this.fullscreenLoading = true;
                var opt = {
                    applyFile: _this.applyFile == '' ? null : _this.applyFile,
                    videoFile: _this.videoFile == '' ? null : _this.videoFile,
                    reportCardFile: _this.reportCardFile == '' ? null : _this.reportCardFile,
                    projectObjectId: projectObjectId,
                    userObjectId: _this.AV.User.current().id
                }

                _this.createApplication(opt).then(function (res) {
                    _this.fullscreenLoading = false;
                    _this.$message({
                        message: '申请成功',
                        type: 'success'
                    })
                }).catch(function(error){
                    _this.fullscreenLoading = false;
                    _this.$message({
                        message: error,
                        type: 'error'
                    })
                })
            }
        }).catch(function(error){
            _this.$message({
                message: error,
                type: 'error'
            })
        })
        
        
    }
}

export default {
    data: function () {
        return data;
    },
    methods: methods,
    mounted: function () {
        var _this = this;
        var projectObjectId = this.$route.params.projectObjectId;
        
        this.videoFile = '';
        this.reportCardFile = '';
        this.applyFile = '';

        this.getProjectById({
            objectId: projectObjectId
        }).then(function(res) {
            console.log(res);
            _this.project = res;
        })
    }
}
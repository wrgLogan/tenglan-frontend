var data = {
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
    textNavIndex: 1
}

var methods = {
    toUpload: function() {
        console.log(this.project);
        if (!this.AV.User.current()) {
            this.$message({
                message: '请先登录',
                type: 'warning'
            });
        } else if (this.project.attributes.status != 2){
            this.$message({
                message: '该项目不是“正在进行”的项目',
                type: 'warning'
            });
        } else {
            var projectObjectId = this.$route.params.projectObjectId;
            this.$switchTo('/upload/' + projectObjectId);
        }
    },
    setTexIndex(index) {
        console.log(index);
        this.textNavIndex = index;
    }
}

export default {
    data: function() {
        return data;
    },
    methods: methods,
    mounted: function(){
        var _this = this;
        var projectObjectId = this.$route.params.projectObjectId;
        
        this.getProjectById({
            objectId: projectObjectId
        }).then(function(res) {
            console.log(res);
            _this.project = res;
        })
    }
}
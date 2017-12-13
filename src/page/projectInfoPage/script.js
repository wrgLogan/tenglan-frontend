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
    }
}

var methods = {
    toUpload: function() {
        var projectObjectId = this.$route.params.projectObjectId;
        this.$switchTo('/upload/' + projectObjectId);
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
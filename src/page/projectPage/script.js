var data = {
    asideIndex: 0,
    readyList: [],
    ongoingList: [],
    pastList: [],
    stage: '正在进行'  // 即将启动  正在进行  往期项目
};

export default {
    data: function () {
        return data;
    },
    methods: {
        clickAsideTab: function (stage) {
            // this.asideIndex = i;
            this.stage = stage;
            console.log(stage);
            this.getProjectsByStage(stage);

            // tag.scrollIntoView();j
        },
        checkProject: function (proj) {
            // console.log(proj);
            this.$switchTo('/projectInfo/' + proj.id);
        },
        getProjectsByStage: function(stage){
            var _this = this;
            this.getProjects({
                stage: stage
            }).then(function(res) {
                _this.clearList();
                console.log(res);
                res.list.forEach(function(item){
                    item.attributes.startDate = _this.formatDate(new Date(item.attributes.startDate), 'yyyy-MM-dd');
                    if (item.attributes.status == 1) {
                        _this.readyList.push(item);
                    } else if (item.attributes.status == 2) {
                        _this.ongoingList.push(item);
                    } else if (item.attributes.status == 3) {
                        _this.pastList.push(item);
                    }
                })
            });
        },
        clearList: function() {
            this.readyList = [];
            this.ongoingList = [];
            this.pastList = [];
        }
    },
    mounted: function() {
        var _this = this;
        this.getProjectsByStage(this.stage);
    }
}
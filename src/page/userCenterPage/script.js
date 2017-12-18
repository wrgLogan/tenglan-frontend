var data = {
    asideTab: 0,
    asideIndex: 0,
    user: {
        attributes: {}
    },
    editable: false,
    messages: [],
    dialogVisible: false,
    checkedMsg: {
        attributes: {}
    },
    applications: [],
    statusEnum: {
        'IN_REVIEW': '审核中',
        'SUCCESS': '审核通过',
        'FAIL': '审核失败',
        'NEED_INTERVIEW': '需要面试',
        'DELETED': '已删除'
    }
}

export default {
    data: function() {
        return data;
    },
    methods: {
        checkAside(index) {
            this.asideIndex = index;
        },
        checkMsg(msg) {
            this.checkedMsg = msg;
            this.dialogVisible = true;
        },
        submitUser() {
            var _this = this;
            var user = this.AV.User.current();
            user.set('name', this.user.attributes.name);
            user.set('gender', this.user.attributes.gender);
            user.set('mobilePhone', this.user.attributes.mobilePhone);
            user.set('postCode', this.user.attributes.postCode);
            user.set('city', this.user.attributes.city);
            user.set('address', this.user.attributes.address);

            user.save().then(res => {
                _this.getMyUserinfo().then(user => {
                    _this.user = user;
                })
                _this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                _this.editable = false;
            })
        },
        getMsgs() {
            var _this = this;
            
            _this.getMessages({
                start: 0,
                limit: 50
            }).then(res => {
                console.log(res);
                _this.messages = res.list;
            });
        },
        getApplications() {
            var _this = this;

            _this.getMyApplications({
                start: 0,
                limit: 50
            }).then(res => {
                console.log(res);
                _this.applications = res.list;
            })
        }
    },
    mounted() {
        var _this = this;
        this.getMyUserinfo().then(user => {
            _this.user = user;
        })
    },
    watch: {
        asideIndex(value) {
            if (value == 3) {
                this.getMsgs();
            } else if (value == 4) {
                this.getApplications();
            }
        }
    }
}
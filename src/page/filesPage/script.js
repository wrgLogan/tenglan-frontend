var data = {
    fileList: []
}

export default {
    data: function() {
        return data;
    },
    methods: {
        getFiles() {
            var _this = this;

            _this.getDownloadFiles().then(res => {
                res.list.forEach(file => {
                    file.createdAt = _this.formatDate(new Date(file.createdAt), 'yyyy-MM-dd hh:mm:ss');
                })
                console.log(res.list);
                _this.fileList = res.list;
            });
        }
    },
    mounted() {
        this.getFiles();
    }
}
var data = {
    status: 'login',
    regisStep: '1',
    loginMobilePhone: '18117156782',
    loginSmscode: '480992',
    regisMobilePhone: '18117156782',
    regisSmscode: '480992',
    grade: '',
    postCode: '',
    university: '',
    name: '',
    address: ''
}

export default {
    data: function () {
        return data;
    },
    methods: {
        toRegister: function () {
            this.status = 'register';
        },
        toLogin: function () {
            this.status = 'login';
        },
        nextStep: function () {
            var _this = this;

            this.AV.User.signUpOrlogInWithMobilePhone(this.regisMobilePhone, this.regisSmscode).then(function() {
                _this.regisStep = 2;
            }, function(err) {

            })

            // this.AV.Cloud.verifySmsCode(this.regisSmscode, this.regisMobilePhone).then(function () {
            //     //验证成功
            //     _this.regisStep = 2;
            // }, function (err) {
            //     //验证失败
            // });
            
        },
        sendCode: (function () {
            var totalSeconds = 60;
            var second = totalSeconds;
            var lock = false;
            var intervalTimer = null;

            return function (event, type) {
                var _this = this;

                if (lock) {
                    return;
                }

                function smscodeDaojishi() {
                    lock = true;

                    var $target = event.target;
                    $target.innerText = second + 's后重试';

                    intervalTimer = setInterval(function () {
                        $target.innerText = (--second) + 's后重试';

                        if (second < 0) {
                            clearInterval(intervalTimer);
                            $target.innerText = '重新发送';
                            second = totalSeconds;
                            lock = false;
                        }
                    }, 1000);
                }
                console.log(this);

                if (type == 'login') {
                    // 发送验证码
                    this.AV.User.requestLoginSmsCode(_this.loginMobilePhone).then(function (success) {
                        smscodeDaojishi();
                    }, function (error) {

                    });
                } else if (type == 'register') {
                    _this.AV.Cloud.requestSmsCode({
                        mobilePhoneNumber: _this.regisMobilePhone,
                        name: '藤蓝',
                        op: '注册账号',
                        ttl: 15                     // 验证码有效时间为 10 分钟
                    }).then(function () {
                        //调用成功
                        smscodeDaojishi();
                    }, function (err) {
                        //调用失败
                    });
                }

            }
        })(),
        loginBySmscode() {
            var _this = this;
            console.log(_this.$parent);
            this.AV.User.logInWithMobilePhoneSmsCode(this.loginMobilePhone, this.loginSmscode).then(function (success) {
                _this.$message({
                    message: '登陆成功', 
                    type: 'success'
                });
                _this.$switchTo('/');
                _this.$parent.$data.user = _this.AV.User.current();
            }, function (error) {

            });
        },
        signUp() {
            var _this = this;
            
            if (this.name == '') {
                this.$message({
                    message: '请输入姓名',
                    type: 'warning'
                });
                return;
            }

            var user = this.AV.User.current();

            user.set('name', _this.name);
            user.set('university', _this.university);
            user.set('grade', _this.grade);
            user.set('address', _this.address);
            user.set('postCode', _this.postCode);
            
            user.save().then(function() {
                _this.$switchTo('/');
                _this.$parent.$data.user = _this.AV.User.current();
            })

            // console.log(_this.regisSmscode);

            // this.AV.User.signUpOrlogInWithMobilePhone(_this.regisMobilePhone, _this.regisSmscode, {
            //     'name': _this.name,
            //     'university': _this.university,
            //     'grade': _this.grade,
            //     'address': _this.address,
            //     'postCode': _this.postCode
            // }).then(function(success){
            //     _this.$switchTo('/');
            //     _this.$parent.$data.user = _this.AV.User.current().attributes;
            // });
        }
    }
}
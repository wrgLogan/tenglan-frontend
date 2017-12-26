import loginBg from '@/assets/image/loginbg1.png'
import registerBg from '@/assets/image/loginbg2.png'

var data = {
    status: 'login',
    regisStep: '1',
    loginMobilePhone: '',
    loginSmscode: '',
    regisMobilePhone: '',
    regisSmscode: '',
    grade: '',
    postCode: '',
    university: '',
    name: '',
    address: '',
    loginBg: loginBg,
    registerBg: registerBg
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

            if (this.regisMobilePhone == '') {
                _this.$message({
                    'message': '用户名不能为空',
                    'type': 'warning'
                });
                return;
            }

            // 检查用户是否已经注册过
            _this.checkUserRepeat({
                username: _this.regisMobilePhone
            }).then(isRepeat => {
                console.log(isRepeat);
                if (isRepeat) {
                    _this.$message({
                        'message': '该手机号已注册过',
                        'type': 'warning'
                    });
                } else {
                    if (_this.regisSmscode == '') {
                        _this.$message({
                            'message': '验证码不能为空',
                            'type': 'warning'
                        });
                        return;
                    }
        
                    _this.AV.User.signUpOrlogInWithMobilePhone(_this.regisMobilePhone, _this.regisSmscode).then(function() {
                        _this.regisStep = 2;
                    }, function(err) {
                        _this.$message({
                            'message': '您输入的验证码有误',
                            'type': 'error'
                        });
                    })
                }
            }).catch(err => {
                _this.$message({
                    'message': err,
                    'type': 'error'
                });
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
            
            if (this.loginMobilePhone == '') {
                _this.$message({
                    'message': '用户名不能为空',
                    'type': 'warning'
                });
                return;
            }

            if (this.loginSmscode == '') {
                _this.$message({
                    'message': '验证码不能为空',
                    'type': 'warning'
                });
                return;
            }

            this.AV.User.logInWithMobilePhoneSmsCode(this.loginMobilePhone, this.loginSmscode).then(function (success) {
                _this.$message({
                    message: '登陆成功', 
                    type: 'success'
                });
                _this.$switchTo('/');
                _this.$parent.$data.user = _this.AV.User.current();
            }, function (error) {
                _this.$message({
                    'message': '您输入的验证码有误',
                    'type': 'error'
                });
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
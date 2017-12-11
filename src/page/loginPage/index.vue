<template>
    <div class="page">
        <!-- <transition name="fade"> -->
            <div class="login-container" v-show="status == 'login'">
                <div class="overlay"></div>
                <div class="modal">
                    <div class="header">
                        <h3>登录常青藤官网</h3>
                        <p>连接你想看的全部的世界</p>
                    </div>
                    <div class="body">
                        <div class="form-group username">
                            <span class="icon"></span>
                            <input type="text" placeholder="用户名"/>
                        </div>
                        <div class="form-group phonecode">
                            <span class="icon"></span>
                            <input type="text" placeholder="手机验证码"/>
                            <div class="sendcode">发送验证码</div>
                        </div>
                        <div class="submit-btn">
                            登录
                        </div>
                    </div>
                    <div class="footer">
                        还没有账号 <a href="javascript:void(0);" @click="toRegister"> 立即注册</a>
                    </div>
                </div>
            </div>
        <!-- </transition> -->
        <!-- <transition name="fade"> -->
            <div class="register-container" v-show="status == 'register'">
                <div class="overlay"></div>
                <div class="modal">
                    <div class="header">
                        <h3>注册常青藤官网</h3>
                        <p>连接你想看的全部的世界</p>
                    </div>
                    <div class="step-line" :step="regisStep">
                        <div class="line1"></div>
                        <div class="line2"></div>
                    </div>
                    <div class="body">
                        <!-- step 1 -->
                        <div v-show="regisStep == 1">
                            <div class="form-group username" >
                                <span class="icon"></span>
                                <input type="text" placeholder="用户名(手机号)"/>
                            </div>
                            <div class="form-group phonecode">
                                <span class="icon"></span>
                                <input type="text" placeholder="手机验证码"/>
                                <div class="sendcode">发送验证码</div>
                            </div>
                            <div class="submit-btn" @click="nextStep">
                                下一步
                            </div>
                        </div>

                        <!-- step 2 -->
                        <div  v-show="regisStep == 2">
                            <div class="form-group name">
                                <span class="icon"></span>
                                <input type="text" placeholder="姓名"/>
                            </div>
                            <div class="form-group school">
                                <span class="icon"></span>
                                <input type="text" placeholder="学校"/>
                            </div>
                            <div class="form-group grade">
                                <span class="icon"></span>
                                <input type="text" placeholder="年级"/>
                            </div>
                            <div class="tixing">为了能将offer寄到您的手中，请您填写收件地址</div>
                            <div class="form-group address">
                                <span class="icon"></span>
                                <input type="text" placeholder="地址"/>
                            </div>
                            <div class="form-group mailcode">
                                <span class="icon"></span>
                                <input type="text" placeholder="邮编"/>
                            </div>
                            <div class="submit-btn" @click="register">
                                完成
                            </div>
                        </div>
                        
                    </div>
                    <div class="footer">
                        已有账号 <a href="javascript:void(0);" @click="toLogin"> 立即登录</a>
                    </div>
                </div>
            </div>
        <!-- </transition> -->
        <div class="footer">
            <div class="footer-sec2">
                COPYRIGHT Ⓒ 2017 SEESEED 沪ICP备16035344号-2网站地图
            </div>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
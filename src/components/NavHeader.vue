<template>
    <div class="nav-header">
        <section class="sec1">
            <a @click="logIn" href="javascript:void(0);" >{{ username ? username : '登录/注册'}} </a>
            <a @click="logOut" href="javascript:void(0);" style="padding-left: 10px;" v-show="username"> 登出</a>
        </section>
        <section class="sec2">
            <div class="logo">
                <img src="../assets/image/logo.png" />
            </div>
            <div class="tab-container">
                <ul>
                    <li :class="{on: nowIndex == '0'}" @click="onClickTab(0)" >首页</li>
                    <li :class="{on: nowIndex == '1'}" @click="onClickTab(1)" >项目申请</li>
                    <li :class="{on: nowIndex == '2'}" @click="onClickTab(2)" >资料下载</li>
                    <li :class="{on: nowIndex == '3'}" @click="onClickTab(3)" >个人中心</li>
                    <li :class="{on: nowIndex == '4'}" @click="onClickTab(4)" >联系我们</li>
                    <li :class="{on: nowIndex == '5'}" @click="onClickTab(5)" >使用指南</li>    
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            nowIndex: 0
        }
    },
    props: ['clickTab', 'logIn', 'logOut', 'username'],
    methods: {
        onClickTab(index) {
            this.clickTab(index);
            // this.nowIndex = index;
        },
    },
    mounted: function() {
        var $route = this.$route;

        console.log($route);
        if ($route.path == '/') {
            this.nowIndex = 0;
        } else if ($route.fullPath == '/project') {
            this.nowIndex = 1;
        } else if ($route.fullPath == '/projectInfo') {
            this.nowIndex = 2;
        } else {
            this.nowIndex = null;
        }
    },
    watch: {
        '$route': function(page) {
            console.log(page);
            if (page.fullPath == '/') {
                this.nowIndex = 0;
            } else if (page.fullPath == '/project') {
                this.nowIndex = 1;
            } else if (page.fullPath == '/files') {
                this.nowIndex = 2;
            } else if (page.fullPath == '/usercenter') {
                this.nowIndex = 3;
            } else {
                this.nowIndex = null;
            }
        }
    }
}
</script>
<style scoped>
.nav-header{
    background-color: #fff;
    /* border-bottom: 1px solid #000; */
    height: 120px;
    width: 100%;
}

.nav-header .sec1{
    width: 1150px;
    height: 30px;
    line-height: 30px;
    text-align: right;
    margin: 0 auto;
    /* padding-right: 20%; */
}

.nav-header .sec1 a{
    color: #333;
    font-size: 12px;
    text-decoration: none;
}

.nav-header .sec2{
    display: flex;
    width: 1190px;
    height: 90px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
}

.logo{
    height: 90px;
    padding: 14px 0px;
}

.logo img{
    height: 58px;
}

.tab-container{
    height: 100%;
}

.tab-container ul{
    height: 100%;
}

.tab-container li{
    color: #333;
    font-size: 16px;
    font-weight: 600;
    display: inline-block;
    height: 90px;
    line-height: 90px;
    width: 88px;
    text-align: center;
    /* margin-right: 5px; */
    cursor: pointer;
    margin: 0 10px;
}

.tab-container li:first-child{
    margin: 0;
}

.tab-container li.on{
    border-bottom: 4px solid #1d478a;
    color: #1d478a;
}
</style>
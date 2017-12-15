<template>
  <div id="app">
    <nav-header :clickTab="clickTab" :logIn="logIn" :logOut="logOut" :username="username"></nav-header>
    <transition :name="animation">
      <router-view class="page-container"></router-view>
    </transition>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader.vue'
export default {
  name: "app",
  data: function() {
    return {
      projName: '藤蓝常青藤',  // 项目名称
      user: null
    };
  },
  computed: {
    animation: function() {
      return this.$root.animation;
    },
    username: function() {
      return this.user ? this.user.attributes.name : null;
    }
  },
  components:{
    NavHeader
  },
  mounted(){
    var AV = this.AV;
    document.head.getElementsByTagName('title')[0].innerText = this.projName;

    this.user = AV.User.current();
  },
  methods: {
    goTo(page) {
      this.$switchTo(page);
    },
    clickTab(index) {
        var routeEmun = ['/', '/project', '/files', '', '', ''];
        this.$switchTo(routeEmun[index]);
    },
    logIn() {
      this.$switchTo('/login', 'fade');
    },
    logOut() {
      var _this = this;
      this.$confirm('确定要退出吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.AV.User.logOut();
          _this.user = null;
        })
      
    }
  },
};
</script>
<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  position: relative;
  height: 100%;
  width: 100%;
  /* display: flex; */
  flex-direction: column;
  overflow: auto;
  overflow-x: hidden;
}

.page-container {
  position: absolute;
  left: 0px;
  top: 120px;
  /* bottom: 0px; */
  width: 100%;
}

.el-dialog .el-dialog__header{
  background-color: #1e488b;
  text-align: center;
}
.el-dialog .el-dialog__header span{
  color: #fff;
  font-size: 16px;  
}

</style>
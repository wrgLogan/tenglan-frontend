<template>
  <div id="app">
    <nav-header :clickTab="clickTab" :login="login"></nav-header>
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
      projName: '藤蓝',  // 项目名称
    };
  },
  computed: {
    animation: function() {
      return this.$root.animation;
    }
  },
  components:{
    NavHeader
  },
  mounted(){
    var AV = this.AV;
    document.head.getElementsByTagName('title')[0].innerText = this.projName;
  },
  methods: {
    goTo(page) {
      this.$switchTo(page);
    },
    clickTab(index) {
        var routeEmun = ['/', '/project', '/files', '', '', ''];
        this.$switchTo(routeEmun[index]);
    },
    login() {
      this.$switchTo('/login', 'fade');
    },
  }
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

</style>
<template>
  <div id="app">
    
  </div>
</template>
<script>

export default {
  name: "app",
  data: function() {
    return {
      projName: '藤蓝后台管理系统',
    };
  },
  computed: {
    animation: function() {
      return this.$root.animation;
    }
  },
  components:{
    
  },
  mounted(){
    var AV = this.AV;

    
  },
  methods: {
    goTo(page) {
      this.$switchTo(page);
    }
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
  background-color: #f3f3f5;
  display: flex;
}

.page-container {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}

</style>
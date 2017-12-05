<template>
  <div class="header">
    <div class="header-cont">
      <div class="header-logo"><img src="../../static/images/head-logo.png" width="100%" /></div>
      <router-link to="/"><div class="exit" @click="exit">退出</div></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    //关闭app
    exit(){
      window.xiaolu.closeApp();
    },
  },
}
</script>

<style scoped>
body {
  background: #324961;
}
.header-cont{
  width: 94%;
  padding: 0 3%;
  height: 78px;
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #324961;
}
.header {
  width: 100%;
  height: 80px;
  /* box-shadow: 1px 1px 5px 1px #102337; */
  background: url(../../static/images/header-bottom-bg.jpg) repeat-x bottom;
  position: fixed;
  float: left;
}

.header-logo {
  width: 300px;
  float: left;
}

.exit {
  width: 80px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background: url(../../static/images/exit.png) no-repeat right;
  background-size: 40px 40px;
}
</style>



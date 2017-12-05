<template>
  <div id="app">
    <transition name="fade" mode="out-in"><!--<transition>标签让路由有过渡动画,-->
      <router-view></router-view>
    </transition>
    <myFooter v-if="this.$route.meta.tabbar"></myFooter>
  </div>
</template>

<script>
import myFooter from '@/components/footer'
export default {
  name: 'app',
  components:{
    myFooter
  },
}
</script>

<style>
body{
    background:#324961;
}
.fade-enter{
opacity: 0;
}
.fade-enter-active{
transition:opacity .3s;
}
.fade-leave{
opacity:1;
}
.fade-leave-active{
opacity:0;
transition:opacity .3s;
}
</style>

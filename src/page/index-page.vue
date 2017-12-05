<template>
  <div class="index-page">{{msg}}</div>
</template>

<script>
export default {
  name: 'indexPage',
  data(){
    return{
      msg:'首页'
    }
  }
}
</script>

<style>
.index-page{
    width: 100%;
    float: left;
    color: #fff;
}
</style>



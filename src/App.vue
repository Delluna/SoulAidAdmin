<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    // 解决刷新浏览器没有tab的问题
    $route(to, from) {
      if (to.path != '/') {
        let obj = {
          name: to.name,
          title: to.meta.title
        }
        this.$store.commit("addTab", obj)
      }
    }
  }
}
</script>

<style>
html,body,#app {
  font-family: 'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 15px;
}
</style>

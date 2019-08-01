
<template>
  <div id="app" class="wrapper">
    <nav-bar></nav-bar>
    <div class="content-wrapper">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- <bot-footer></bot-footer> -->
  </div>
</template>

<script>
import navBar from './components/navBar.vue'
import botFooter from './components/botFooter.vue'
import home from './components/home.vue'
import page1 from './components/page1.vue'
import page2 from './components/page2.vue'
import page3 from './components/page3.vue'

export default {
  name: 'app',
  components: {
    navBar,
    botFooter,
    home,
    page1,
    page2,
    page3
  }
}
</script>

<style>
</style>

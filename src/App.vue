<template>
  <div id='app'>
    <header class="header">
      <nav class="navigation">
        <ul>
          <li><router-link to="/">{{ title }}</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
    <footer class="footer">
      Copyright © {{ (new Date()).getFullYear() }} |
      Powered by <a href="https://github.com/zypeh/memetwork" target="_blank">Memetwork</a>
      Inspired by <a href="https://github.com/viko16/vue-ghpages-blog" target="_blank">vue-ghpages-blog</a>
    </footer>
  </div>
</template>

<style lang="scss" src="./style/app.scss"></style>

<script>
import config from './config.json'

export default {
  data() {
    return { title: config.blogName, keyword: '' }
  }
}
</script>
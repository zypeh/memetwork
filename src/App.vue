<template>
  <div id='app'>
    <nav class="navigation">
      <div><a router-link to="/"><img id="logo" src="favicon.png" alt="logo"></a></div>
      <ul>
        <li><router-link to="/" exact>{{ title }}</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
    <main class="content" role="main">
      <router-view></router-view>
    </main>
    <footer class="footer">
      <ul>
        <li>© zypeh {{ (new Date()).getFullYear() }}</li>
        <li>Powered by <a href="https://github.com/zypeh/memetwork" target="_blank">Memetwork</a></li>
      <ul>
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
<template>
  <div id='app'>
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

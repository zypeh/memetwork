<template>
  <div id='app'>
  </div>
</template>

<style lang="scss" src="./style/main.scss"></style>

<script>
import config from './config.json'

export default {
  data() {
    return { title: config.blogName, keyword: '' }
  }
}

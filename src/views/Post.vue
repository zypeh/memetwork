<template>
  <section class="post-view">
    <main class="content" role="main">
      <div v-if="!content">Loading ...</div>
      <article>
        <header>
          <h1>{{ title }}</h1>
          <small><time pubdate="pubdate" :datetime="this.date | formatDate" :title="this.date | formatDate" class="post-date">{{ this.date | timeago }}</time></small>
        </header>
        <div class="page-content">
          <article v-if="content" v-html="htmlFromMarkdown"></article>
        </div>
      </article>
    </main>
  </section>
</template>

<script>
import Vue from 'vue'
import api from '../api'
import config from '../config.json'
import fm from 'front-matter'
import marked from '../utils/render.js'

export default {
  name: 'postView',

  data() {
    return { title: '', date: null, content: '' }
  },

  computed: {
    htmlFromMarkdown() { return marked(this.content) }
  },

  created () {
    this.loadPost()
  },

  methods: {
    loadPost() {
      api.getDetail(this.$route.params.hash)
        .then(txt => {
          const content = fm(txt)
          this.content = content.body
          this.title = content.attributes.title
          this.date = content.attributes.date
          // Set window title
          window.document.title = `${this.title} - ${config.blogName}`
        })
        .catch(e => { console.error(e) })
    },

    newTab() {
      Vue.nextTick(() => {
        // Load the external link into new tab
        const linksArr = Array.from(document.querySelectorAll('a'))
        const currHost = window.location.host
        linksArr.map(el => {
          if (el.href && el.host !== currHost) {
            el.target = '_blank'
            el.rel = 'noopener noreferrer'
          }
        })
      })
    }
  },

  watch: { 'htmlFromMarkdown': 'newTab' }
}

</script>

<template>
  <section class="list-view">
    <main class="content" role="main">
      <div v-if="!lists">Loading ...</div>
      <article>
        <div class="page-content" v-if="lists">
          <section class="list" v-for="{ title, sha, date } in filteredList" :key="sha">
            <router-link :to="'/post/' + sha" class="item-title">{{ title }}</router-link>
            <time pubdate="pubdate" :datetime="date | formatDate" :title="date | formatDate" class="item-date">{{ date | timeago }}</time>
          </section>
        </div>
      </article>
    </main>
  <section>
</template>

<script>
import api from '../api'
import config from '../config.json'

export default {
  name: 'listView',

  data () {
    return { title: config.blogName, lists: null }
  },

  computed: {
    filteredList() {
      let keyword = (this.$route.query.keyword || '').toUpperCase()
      // Filter by title, order by publish date, in descending order
      return this.lists
        .filter(i => (i.title.toLowerCase().indexOf(keyword) !== -1))
        .sort((x, y) => (new Date(x.date) - new Date(y.date)))
    }
  },

  created() { this.loadList() },

  methods: {
    loadList() {
      window.document.title = config.blogName
      api.getList()
        .then(lists => { this.lists = lists })
        .catch(e => { console.error(e) })
    }
  },

  watch: { '$route': 'loadList' }
}
</script>

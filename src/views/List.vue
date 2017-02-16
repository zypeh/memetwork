<template>
  <section class="list-view">
    <div v-if="!lists">Loading ...</div>
    <ol v-if="lists" class="list">
      <li v-for="{ title, sha, date } in filteredList" :key="sha" class="list-item">
        <router-link :to="'/post/' + sha" class="item-title">
          {{ title }}
        </router-link>
        <br />
        <time pubdate="pubdate" :datetime="date | formatDate" :title="date | formatDate" class="item-date">{{ date | timeago }}</time>
      </li>
    </ol>
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

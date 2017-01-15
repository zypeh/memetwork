import axios from 'axios'
import 'es6-promise/auto'

import config from '../config.json'
import { onlyTitle, onlyDate } from '../utils'

/**
 * Format Github API url for content list
 * @return {String}
 */
const getListUrl = () => {
  let url = `https://api.github.com/repos/${config.repo}/contents/`
  if (config.path) url += config.path
  if (config.branch) url += `?ref=${config.branch}`
  return url
}

/**
 * Format Github API url for file content
 * @param {String} hash
 * @return {String}
 */
const getPostUrl = (hash) => `https://api.github.com/repos/${config.repo}/git/blobs/${hash}`

export default {
  getList() {
    if (window.sessionStorage &&
        window.sessionStorage.hasOwnProperty('list')) {
      // Cache hits
      // Read from sessionStorage instead
      return Promise.resolve(JSON.parse(window.sessionStorage.getItem('list')))
    } else {
      return axios.get(getListUrl())
        .then(res => res.data)
        .then(arr => {
          const list = arr.map(({ name, sha, size }) => ({
            title: onlyTitle(name),
            date: onlyDate(name),
            sha,
            size
          }))
          // save into sessionStorage
          window.sessionStorage && window.sessionStorage.setItem('list', JSON.stringify(list))
          return list
        })
    }
  },

  getDetail(hash) {
    const httpOpts = {
      headers: { Accept: 'application/vnd.github.v3.raw' }
    }
    const cacheKey = `post.${hash}`

    if (window.sessionStorage &&
        window.sessionStorage.hasOwnProperty(cacheKey)) {
      return Promise.resolve(JSON.parse(window.sessionStorage.getItem(cacheKey)))
    } else {
      return axios.get(getPostUrl(hash), httpOpts)
        .then(res => res.data)
        .then(content => {
          window.sessionStorage && window.sessionStorage.setItem(cacheKey, JSON.stringify(content))
          return content
        })
    }
  }
}

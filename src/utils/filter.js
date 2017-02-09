import Timeago from 'timeago.js'

const timeago = new Timeago(null, 'zh_CN')

export default (Vue) => {
  Vue.filter('timeago', str => {
    if (!str) return ''
    return timeago.format(new Date(str))
  })

  Vue.filter('formatDate', date => {
    return new Date(date).toLocaleDateString()
  })
}

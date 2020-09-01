<template>
  <div>
    <!-- <div class="loading" v-show="isLoading">拼命加载中...</div> -->
    <loading :loading="isLoading"/>
    <div v-show="!isLoading" v-theme:column="'narrow'" id="blogs">
      <h1>博客总览</h1>
      <div class="input-wrapper">
        <input type="text" v-model="search" placeholder="搜索">
        <i class="iconfont icon-search"></i>
        <i v-show="search" class="iconfont icon-clear" @click="clear"></i>
      </div>
      <div v-for="blog in filterredBlogs" :key="blog.id" class="blog">
        <router-link :to="'/blog/' + blog.id" >
          <h2 v-rainbow>{{blog.title | toUppetcase}}</h2>
        </router-link>
        <article>{{blog.content | snippet}}</article>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from './Loading'
import axios from 'axios'
export default {
  name: "ShowBlog",
  components: {
    Loading
  },
  props: {},
  data () {
    return {
      isLoading: true,
      search: '',
      blogs: []
    }
  },
  computed: {
    filterredBlogs() {
      return this.blogs.filter(blog => blog.title.match(this.search))
    }
  },
  filters: {
    toUppetcase (value) {
      return value.toUpperCase()
    }
  },
  directives: {
    'rainbow': {
      bind(el, binding, vnode) {
        el.style.color = "#" + Math.random().toString(16).slice(2, 8)
      }
    }
  },
  methods: {
    clear () {
      this.search = ''
    },
    fetchData () {
      // this.$http.get("https://vueblog-f782b.firebaseio.com/posts.json")
      axios.get("/posts.json")
      .then(res => {
        return res.data
      }).then(res => {
        let blogsArray = []
        for (let key in res) {
          res[key].id = key
          blogsArray.push(res[key])
        }
        this.blogs = blogsArray
        this.isLoading = false
        // console.log('isLoading', this.isLoading);
      })
    }
  },
  created () {
    this.fetchData()
  },
  activated() {
    
  },
  deactivated() {

  },
  mounted () {
    this.$eventBus.$on('editToUpdate', () => {
      console.log('editToUpdate');
      this.fetchData()
    })
    this.$eventBus.$on('publishBlog', () => {
      console.log('publishBlog');
      this.fetchData()
    })
  }
}
</script>
<style scoped>
#blogs {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}
.blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 15px #999;
}
#blogs a {
  color: #444;
  text-decoration: none;
}
input[type="text"] {
  padding: 8px;
  padding-left: 30px;
  width: 100%;
  box-sizing: border-box;
}
.icon-search,
.icon-clear {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.icon-search {
  left: 10px;
}
.icon-clear {
  right: 10px;
}
.input-wrapper {
  position: relative;
}
</style>
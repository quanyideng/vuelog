<template>
  <div v-theme:column="'narrow'" id="blogs">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索">
    <div v-for="blog in filterredBlogs" :key="blog.id" class="blog">
      <router-link :to="'/blog/' + blog.id" >
        <h2 v-rainbow>{{blog.title | toUppetcase}}</h2>
      </router-link>
      <article>{{blog.content | snippet}}</article>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShowBlog",
  components: {},
  props: {},
  data () {
    return {
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
    fetchData () {
      this.$http.get("https://vueblog-f782b.firebaseio.com/posts.json")
      .then(res => {
        // console.log('res', res);
        // this.blogs = res.body.slice(0, 10)
        // console.log('this.blogs', this.blogs);
        return res.json()
      }).then(res => {
        let blogsArray = []
        for (let key in res) {
          // console.log('key', res[key]);
          res[key].id = key
          blogsArray.push(res[key])
        }
        this.blogs = blogsArray
        // console.log('this.blogs', this.blogs);
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
  width: 100%;
  box-sizing: border-box;
}
</style>
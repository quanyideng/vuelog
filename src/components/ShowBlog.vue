<template>
  <div v-theme:column="'narrow'" id="blogs">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索">
    <div v-for="blog in filterredBlogs" :key="blog.id" class="blog">
      <router-link :to="'/blog/' + blog.id" >
        <h2 v-rainbow>{{blog.title | toUppetcase}}</h2>
      </router-link>
      <article>{{blog.body | snippet}}</article>
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
  methods: {},
  created () {
    this.$http.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        // console.log('res', res);
        this.blogs = res.body.slice(0, 10)
        // console.log('this.blogs', this.blogs);
      })
  },
  mounted () {}
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
  background: #eee;
  border: 1px dotted #aaa;
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
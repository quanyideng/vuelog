<template>
  <div id="blogs">
    <h1>博客总览</h1>
    <div v-for="blog in blogs" :key="blog.id" class="blog">
      <h2>{{blog.title}}</h2>
      <article>{{blog.body}}</article>
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
      blogs: []
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
<style>
#blogs {
  width: 800px;
  margin: 0 auto;
}
.blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}
</style>
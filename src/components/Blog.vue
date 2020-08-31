<template>
  <div id="blog" v-show="showBlog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.content}}</article>
    <p>作者： {{blog.author}}</p>
    <p>分类：</p>
    <ul>
      <li v-for="category in blog.categories" :key="category">
        {{category}}
      </li>
    </ul>
    <button @click="deleteBlog()">删除</button>
    <router-link :to="'/edit/' + id">编辑</router-link>
  </div>
</template>
<script>
export default {
  name: "Blog",
  components: {},
  props: {},
  data () {
    return {
      showBlog: false,
      id: this.$route.params.id,
      blog: {}
    }
  },
  methods: {
    deleteBlog () {
      this.$http.delete('https://vueblog-f782b.firebaseio.com/posts/' + this.id + ".json")
      .then(res => {
        console.log('deleted successfully');
        this.$router.push({path: "/"})
      })
    }
  },
  created () {
    this.$http.get('https://vueblog-f782b.firebaseio.com/posts/' + this.id + ".json")
      .then(res => {
        console.log('res', res);
        // this.blog = res.body
        return res.json()
      })
      .then(res => {
        this.blog = res
        this.showBlog = true
      })
  }
}
</script>
<style scoped>
#blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background: #eee;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 10px #999;
}
</style>
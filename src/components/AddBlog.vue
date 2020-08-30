<template>
  <div class="add-blog">
    <h2>添加博客</h2>
    <form v-if="!submitted">
      <label>博客标题</label>
      <input type="text" v-model="blog.title" required name="" id="">
      <label>博客内容</label>
      <textarea v-model="blog.content"></textarea>
      <div id="checkbox">
        <label>Vue.js</label>
        <input type="checkbox" v-model="blog.categories" value="Vue.js">
        <label>Node.js</label>
        <input type="checkbox" v-model="blog.categories" value="Node.js">
        <label>React.js</label>
        <input type="checkbox" v-model="blog.categories" value="React.js">
        <label>Angular4</label>
        <input type="checkbox" v-model="blog.categories" value="Angular4">
      </div>
      <label>作者</label>
      <select v-model="blog.author">
        <option v-for="author in authors" value="" :key="author">{{author}}</option>
      </select>
      <button @click.prevent="post" >添加博客</button>
    </form>

    <div v-if="submitted">
      <h3>您的博客已发布成功!</h3>
    </div>

    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题： {{blog.title}}</p>
      <p>博客内容</p>
      <p>{{blog.content}}</p>
      <p>博客分类</p>
      <ul>
        <li v-for="category in blog.categories" :key="category">
          {{category}}
        </li>
        <p>作者：{{blog.author}}</p>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddBlog",
  components: {},
  props: {},
  data () {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      authors: ["Rebecca", "Hawkins", "Eugene"],
      submitted: false
    }
  },
  methods: {
    post () {
      this.$http.post("https://vueblog-f782b.firebaseio.com/posts.json", this.blog)
        .then(res => {
          console.log('res', res);
          this.submitted = true
        })
    }
  },
  mounted () {}
}
</script>
<style scoped>

</style>
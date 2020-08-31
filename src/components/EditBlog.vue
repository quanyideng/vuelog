<template>
  <div class="edit-blog">
    <form v-if="!submitted">
      <h2>编辑博客</h2>
      <label for="title">博客标题：</label>
      <input type="text" v-model="blog.title" required name id="title" />
      <label for="content" class="content">博客内容：</label>
      <textarea v-model="blog.content" id="content" name="content" rows="8" cols="53"></textarea>
      <div id="checkbox">
        <label>分类：</label>
        <input type="checkbox" v-model="blog.categories" value="Vue.js" />
        <label>Vue.js</label>
        <input type="checkbox" v-model="blog.categories" value="Node.js" />
        <label>Node.js</label>
        <input type="checkbox" v-model="blog.categories" value="React.js" />
        <label>React.js</label>
        <input type="checkbox" v-model="blog.categories" value="Angular4" />
        <label>Angular4</label>
      </div>
      <br />
      <label>作者：</label>
      <select v-model="blog.author">
        <option v-for="author in authors" :key="author">{{author}}</option>
      </select>
      <button @click.prevent="post">编辑博客</button>
    </form>
    <div v-else>
      <h3>您的博客已发布成功!</h3>
      <div id="preview">
        <h3>博客预览</h3>
        <p>博客标题: {{blog.title}}</p>
        <p>博客内容:</p>
        <p>{{blog.content}}</p>
        <p>博客分类:</p>
        <ul>
          <li v-for="category in blog.categories" :key="category">{{category}}</li>
        </ul>
        <p>作者：{{blog.author}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddBlog",
  components: {},
  props: {},
  data() {
    return {
      id: this.$route.params.id,
      blog: {
        title: "",
        content: "",
        categories: [],
        author: "",
      },
      authors: ["Rebecca", "Hawkins", "Eugene"],
      submitted: false,
    };
  },
  methods: {
    post() {
      this.$http
        .post("https://vueblog-f782b.firebaseio.com/posts.json", this.blog)
        .then((res) => {
          console.log("res", res);
          this.submitted = true;
          // this.$route.push({ path: "/" });
        });
    },
    fetchData() {
      // console.log('this.id', this.id);
      this.$http.get('https://vueblog-f782b.firebaseio.com/posts/' + this.id + ".json")
        .then(res => {
          console.log('res', res);
          this.blog = res.body
        })
    }
  },
  created() {
    this.fetchData()
  },
};
</script>
<style scoped>
.edit-blog {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
label,
textarea {
  /* font-size: .8rem; */
  letter-spacing: 1px;
}
textarea {
  padding: 10px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 10px #999;
  margin-bottom: 20px;
}
label.content {
  display: block;
  margin-bottom: 10px;
}
#title {
  margin-bottom: 20px;
}
</style>
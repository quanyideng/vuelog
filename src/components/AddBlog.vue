<template>
  <div class="add-blog">
    <form v-if="!submitted" class="form">
      <h2>添加博客</h2>
      <label for="title" class="title">博客标题：</label>
      <br/>
      <input type="text" v-model="blog.title" required id="title" />
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
        <label>JavaScript</label>
      </div>
      <br />
      <div class="footer">
        <div>
          <label>作者：</label>
          <select v-model="blog.author">
            <option v-for="author in authors" :key="author">{{author}}</option>
          </select>
        </div>

        <button class="btn" @click.prevent="post">发布</button>
      </div>
    </form>
    <div v-else class="preview_wrapper">
      <h3>您的博客已发布成功!</h3>
      <div id="preview">
        <h3>博客预览</h3>
        <h4>博客标题: </h4>
        <p>{{blog.title}}</p>
        <h4>博客内容:</h4>
        <textarea :value="blog.content"></textarea>
        <h4>博客分类:</h4>
        <ul>
          <li v-for="category in blog.categories" :key="category">{{category}}</li>
        </ul>
        <p>作者：{{blog.author}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "AddBlog",
  components: {},
  props: {},
  data() {
    return {
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
      // this.$http.post("https://vueblog-f782b.firebaseio.com/posts.json", this.blog)
      // axios.post("/posts.json", this.blog)
      // axios.post("https://api2.bmob.cn/1/classes/posts", this.blog)
      //   .then((res) => {
      //     console.log('res', res);
      //     this.submitted = true;
      //     this.$eventBus.$emit('publishBlog')
      //     // this.$route.push({ path: "/" });
      //   });
      const query = this.$Bmob.Query("posts");
      query.set('title', this.blog.title)
      query.set('content', this.blog.content)
      query.set('title', this.blog.title)
      query.set('categories', this.blog.categories)
      query.set('author', this.blog.author)
      query.save()
        .then(res => {
          console.log('res', res);
          this.submitted = true;
          this.$eventBus.$emit('publishBlog')
        })
    },
  },
  mounted() {},
};
</script>
<style scoped>
.add-blog {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
}
label,
textarea {
  /* font-size: .8rem; */
  letter-spacing: 1px;
}
textarea {
  height: 400px;
  width: 660px;
  padding: 10px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 10px #999;
  margin-bottom: 40px;
}
label.content {
  display: block;
  margin-bottom: 20px;
  font-weight: bold;
}
label.title {
  display: block;
  font-weight: bold;
}
#title {
  margin-bottom: 20px;
  padding: 5px 0;
  padding-left: 10px;
  width: calc(100% - 14px);

}
.btn {
  cursor: pointer;
}
.preview_wrapper {
  padding-top: 80px;
}
.form {
  padding-top: 80px;
}
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
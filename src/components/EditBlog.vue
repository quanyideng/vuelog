<template>
  <div class="edit-blog">
    <form v-if="!submitted">
      <h2>编辑博客</h2>
      <label for="title">博客标题：</label>
      <input type="text" v-model="blog.title" required name id="title" />
      <label for="content" class="content">博客内容：</label>
      <textarea v-model="blog.content" id="content" name="content" rows="10" cols="60"></textarea>
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
      <div class="footer">
        <div>
          <label>作者：</label>
          <select v-model="blog.author">
            <option v-for="author in authors" :key="author">{{author}}</option>
          </select>
        </div>

        <button @click.prevent="put">保存</button>
      </div>
    </form>
    <div v-else>
      <h3>您的博客编辑成功!</h3>
      <div id="preview">
        <h3>博客预览</h3>
        <p>博客标题: {{blog.title}}</p>
        <p>博客内容:</p>
        <article>{{blog.content}}</article>
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
import axios from "axios";
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
    put() {
      // this.$http.put('https://vueblog-f782b.firebaseio.com/posts/' + this.id + ".json", this.blog)
      // axios.put('/posts/' + this.id + ".json", this.blog)
      //   .then((res) => {
      //     console.log("res", res);
      //     this.submitted = true;
      //     this.$eventBus.$emit('editToUpdate')
      //   });
      const query = this.$Bmob.Query("posts");
      query.set("id", this.id); //需要修改的objectId
      query.set('title', this.blog.title)
      query.set('content', this.blog.content)
      query.set('title', this.blog.title)
      query.set('categories', this.blog.categories)
      query.set('author', this.blog.author)
      query
        .save()
        .then((res) => {
          console.log(res);
          this.submitted = true;
          this.$eventBus.$emit('editToUpdate')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchData() {
      // this.$http.get('https://vueblog-f782b.firebaseio.com/posts/' + this.id + ".json")
      // axios.get("/posts/" + this.id + ".json").then((res) => {
      //   console.log("res", res);
      //   this.blog = res.data;
      // });
      const query = this.$Bmob.Query("posts");
      query.get(this.id)
        .then(res => {
          this.blog = res
        })
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
<style scoped>
.edit-blog {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 80px auto;
}
label,
textarea {
  font-size: .8rem;
  letter-spacing: 1px;
}
textarea {
  height: auto;
  padding: 10px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 10px #999;
  margin-bottom: 20px;
}
label.content {
  display: block;
  margin-bottom: 20px;
}
#title {
  margin-bottom: 20px;
}
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
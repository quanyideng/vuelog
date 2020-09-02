<template>
  <div class="add-blog">
    <form v-show="!submitted" class="form" ref="form">
      <h1>添加博客</h1>
      <label for="title" class="title">博客标题：</label>
      <br />
      <input type="text" v-model="blog.title" required id="title" placeholder="Type your blog title here..."/>
      <div class="content-box">
        <label for="content" class="content">博客内容：</label>
        <span class="preview-btn" @click="togglePreview">{{isPreview ? '关闭预览' : '打开预览'}}</span>
      </div>
      <textarea 
        id="content"
        placeholder="Type your blog content here..."
        v-model="blog.content" 
        ref="input"
        rows="6" 
        cols="60"
      >
      </textarea>

      <div id="checkbox">
        <label>分类：</label>
        <input type="checkbox" v-model="blog.categories" value="Vue.js" />
        <label>Vue.js</label>
        <input type="checkbox" v-model="blog.categories" value="Node.js" />
        <label>Node.js</label>
        <input type="checkbox" v-model="blog.categories" value="React.js" />
        <label>React.js</label>
        <input type="checkbox" v-model="blog.categories" value="JavaScript" />
        <label>JavaScript</label>
        <input type="checkbox" v-model="blog.categories" value="Python" />
        <label>Python</label>
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
    <div v-show="isPreview" id="preview">
      <div class="preview-content-wrapper" >
        <h2>{{this.blog.title}}</h2>
        <div ref="preview" class="preview-content"></div>
      </div>
    </div>
    <div v-show="submitted" class="preview_wrapper">
      <h3>您的博客已发布成功!</h3>
    </div>
  </div>
</template>
<script>
import md from "markdown";
export default {
  name: "AddBlog",
  components: {},
  props: {},
  data() {
    return {
      isPreview: false,
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
    togglePreview () {
      this.isPreview = !this.isPreview
    },
    post() {
      if (
        this.blog.title === "" &&
        this.blog.content === "" &&
        this.blog.categories.length === 0 &&
        this.blog.author === ""
      ) {
        alert("你不能发布空的博客")
        return
      }
      const query = this.$Bmob.Query("posts");
      query.set("title", this.blog.title);
      query.set("content", this.blog.content);
      query.set("title", this.blog.title);
      query.set("categories", this.blog.categories);
      query.set("author", this.blog.author);
      query.save().then((res) => {
        console.log("res", res);
        this.submitted = true;
        this.$eventBus.$emit("publishBlog");
        this.isPreview = false
      });
    },
  },
  mounted() {
    let input = this.$refs.input
    let preview = this.$refs.preview
    input.oninput = () => {
      preview.innerHTML = input.value.replace(/\n/g, '<br/>');
      // preview.innerHTML = md.markdown.toHTML(input.value);
    }
  },
};
</script>
<style scoped>
.add-blog {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 40px;
}
label,
textarea {
  letter-spacing: 1px;
}
textarea {
  height: 400px;
  width: calc(100% - 20px);
  padding: 10px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 10px #999;
  margin-bottom: 40px;
  resize: none;
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
  padding-left: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
}
.content-box {
  display: flex;
  justify-content: space-between;
}
.preview-btn {
  padding: 0 4px;
  cursor: pointer;
}
.preview-btn:hover {
  background-color: #eee;
}
.preview-content-wrapper {
  padding-bottom: 40px;
  position: absolute;
  padding-top: 80px;
  padding-left: 40px;
  padding-right: 40px;
  right: 0;
  top: 0;
  width: calc(50% - 80px);
  overflow: hidden;
}
#preview {
  height: 600px;
  width: 50%;
}
.preview-content {
  letter-spacing:2px;
  line-height: 1.5;
}
</style>
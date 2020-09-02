<template>
  <div>
    <Loading :loading="loading" />
    <div id="blog" v-show="showBlog">
      <h1>{{blog.title}}</h1>
      <div ref="content" class="content"></div>
      <p>作者： {{blog.author}}</p>
      <p>分类：</p>
      <ul>
        <li v-for="category in blog.categories" :key="category">{{category}}</li>
      </ul>
      <button @click="deleteBlog()" class="btn-delete">删除</button>
      <router-link :to="'/edit/' + id" tag="button">编辑</router-link>
    </div>
  </div>
</template>
<script>
import Loading from "./Loading";
import axios from "axios";
import md from "markdown";
export default {
  name: "Blog",
  components: {
    Loading,
  },
  props: {},
  data() {
    return {
      loading: true,
      showBlog: false,
      id: this.$route.params.id,
      blog: {},
    };
  },
  methods: {
    deleteBlog() {
      const query = this.$Bmob.Query("posts");
      query
        .destroy(this.id)
        .then((res) => {
          console.log("res", res);
          console.log("deleted successfully");
          this.$eventBus.$emit("editToUpdate");
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
  created() {
    const query = this.$Bmob.Query("posts");
    query.get(this.id)
    .then((res) => {
      console.log("res", res);
      this.blog = res;
      this.showBlog = true;
      this.loading = false;
      this.$refs.content.innerHTML = md.markdown.toHTML(this.blog.content)
    });
  },
};
</script>
<style scoped>
#blog {
  max-width: 960px;
  margin: 80px auto;
  padding: 20px;
  background: #eee;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 10px #999;
}
.btn-delete {
  margin-right: 10px;
}
.content {
  height: auto;
  width: auto;
  padding: 0 10px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 10px #999;
  background: #fff;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-size: .8rem;
}
</style>
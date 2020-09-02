<template>
  <div>
    <Loading :loading="loading" />
    <div id="blog" v-show="showBlog">
      <h1>{{blog.title}}</h1>
      <article ref="content" class="content"></article>
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
      this.$dialog
        .confirm("确定要删除吗？删除后，数据不可恢复！")
        .then( (dialog) => {
          console.log("确认");
          const query = this.$Bmob.Query("posts");
          query
            .destroy(this.id)
            .then((res) => {
              this.$eventBus.$emit("editToUpdate");
              this.$router.push({ path: "/" });
            })
            .catch((err) => {
              console.log("err", err);
            });
        })
        .catch( () => {
          console.log("取消");
        });
    },
  },
  created() {
    const query = this.$Bmob.Query("posts");
    query.get(this.id).then((res) => {
      this.blog = res;
      this.showBlog = true;
      this.loading = false;
      // this.$refs.content.innerHTML = this.blog.content
      this.$refs.content.innerHTML = md.markdown.toHTML(this.blog.content);
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
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 10px #999;
  background: #fff;
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 1rem;
  text-align: justify;
  letter-spacing: 2px;
  line-height: 1.5;
}
</style>
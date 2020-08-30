<template>
  <div id="blog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.body}}</article>
  </div>
</template>
<script>
export default {
  name: "Blog",
  components: {},
  props: {},
  data () {
    return {
      id: this.$route.params.id,
      blog: {}
    }
  },
  methods: {},
  created () {
    this.$http.get('https://jsonplaceholder.typicode.com/posts/' + this.id)
      .then(res => {
        console.log('res', res);
        this.blog = res.body
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
  border: 1px dotted #aaa;
}
</style>
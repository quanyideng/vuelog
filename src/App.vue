<template>
  <div id="app">
    <!-- <add-blog></add-blog>
    <show-blog></show-blog> -->
    <blog-header></blog-header>
    <keep-alive include="ShowBlog">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import BlogHeader from './components/BlogHeader'
import AddBlog from './components/AddBlog'
import ShowBlog from './components/ShowBlog'
import EditBlog from './components/EditBlog'

export default {
  name: 'App',
  components: {
    AddBlog,
    ShowBlog,
    BlogHeader,
    EditBlog
  }
}
</script>

<style>
body {
  margin: 0;
  /* position: relative; */
}
#app {
  /* position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  overflow-y: auto; */
}
</style>

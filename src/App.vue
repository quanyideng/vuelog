<template>
  <div id="app">
    <!-- <add-blog></add-blog>
    <show-blog></show-blog> -->
    <blog-header></blog-header>
    <router-view></router-view>
  </div>
</template>

<script>
import BlogHeader from './components/BlogHeader'
import AddBlog from './components/AddBlog'
import ShowBlog from './components/ShowBlog'

export default {
  name: 'App',
  components: {
    AddBlog,
    ShowBlog,
    BlogHeader
  }
}
</script>

<style>

</style>

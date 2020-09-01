<template>
  <nav>
    <ul>
      <li>
        <router-link to="/" exact>博客</router-link>
        <router-link to="/add" exact>写博客</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "BlogHeader",
  components: {},
  props: {},
  data () {
    return {
      
    }
  },
  methods: {},
  mounted () {}
}
</script>
<style scoped>
ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10;
}
a {
  color: #fff;
  text-decoration: none;
  padding: 16px;
  border-radius: 5px;
}
nav {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  background: #1e1e1e;
  padding: 15px 0;
}

.router-link-active {
  background: rgba(255, 255, 255, 0.8);
  color: #444;
}
</style>
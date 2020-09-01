<template>
  <div class="loading" v-show="loading">拼命加载中...</div>
</template>
<script>
export default {
  name: "Loading",
  components: {},
  props: {
    text: {
      type: String,
      default: 'Loading...'
    },
    loading: Boolean
  },
  data () {
    return {
      
    }
  },
  methods: {},
  mounted () {}
}
</script>
<style>
.loading{
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%
}
</style>
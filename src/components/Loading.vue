<template>
  <div v-show="loading" class="loading-wrapper">
    <div class="loading">拼命加载中...</div>
  </div>
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
  left: 50%;
  cursor: wait;
}
.loading-wrapper {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  cursor: wait;
}
</style>
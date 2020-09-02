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
      default: "Loading...",
    },
    loading: Boolean,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style>
.loading {
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
/* .loading {
  width: 200px;
  height: 200px;
  position: relative;
} */

/* .loading::before,
.loading::after {
  content: " ";
  position: absolute;
  width: 10px;
  height: 10px;
  background: black;
  border-radius: 50%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  animation: loading 1.5s linear infinite;
}

.loading::after {
  animation-delay: 0.75s;
}

@keyframes loading {
  0% {
    width: 0px;
    height: 0px;
    opacity: 1;
  }

  100% {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
} */
</style>
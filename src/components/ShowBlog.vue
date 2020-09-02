<template>
  <div>
    <loading :loading="isLoading"/>
    <div v-show="!isLoading" v-theme:column="'narrow'" id="blogs">
      <h1>博客总览</h1>
      <div class="input-wrapper">
        <input type="text" v-model="search" placeholder="搜索" ref="inputFocus">
        <i class="iconfont icon-search"></i>
        <i v-show="search" class="iconfont icon-clear" @click="clear"></i>
      </div>
      <div v-for="blog in filterredBlogs" :key="blog.objectId" class="blog">
        <router-link :to="'/blog/' + blog.objectId" >
          <h2 v-rainbow>{{blog.title | toUppetcase}}</h2>
          <article>{{blog.content | snippet}}</article>
        </router-link>
      </div>
      <div class="load-more" v-show="blur && !zero" @click="loadMore">
        <span>{{noMoreBlog ? '没有更多了' : '点击加载更多'}}</span>
      </div>
      <div class="load-more" v-show="zero">
        <span>还没有博客哦</span>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from './Loading'
import axios from 'axios'
import md from "markdown";
export default {
  name: "ShowBlog",
  components: {
    Loading
  },
  props: {},
  data () {
    return {
      zero: false,
      blur: true,
      noMoreBlog: false,
      isLoading: true,
      search: '',
      blogs: []
    }
  },
  computed: {
    filterredBlogs() {
      if(this.blogs.length === 0) {
        this.zero = true
      } else {
        this.zero = false
      }
      return this.blogs.filter(blog => blog.title.match(this.search))
    }
  },
  filters: {
    toUppetcase (value) {
      return value.toUpperCase()
    }
  },
  directives: {
    'rainbow': {
      bind(el, binding, vnode) {
        el.style.color = "#" + Math.random().toString(16).slice(2, 8)
      }
    }
  },
  methods: {
    refreshData() {
      const query = this.$Bmob.Query("posts");
      query.limit(5)
      query.order("-createdAt")
      query.find()
        .then(res => {
          this.blogs = res
          this.isLoading = false
          if(res.length < 5) {
            this.noMoreBlog = true
          }
        });
    },
    loadMore() {
      this.fetchData(this.blogs.length)
    },
    clear () {
      this.search = ''
    },
    fetchData (position) {
      const query = this.$Bmob.Query("posts");
      query.skip(position)
      query.limit(5)
      query.order("-createdAt")
      query.find()
        .then(res => {
          // console.log('res', res);
          this.blogs = this.blogs.concat(res)
          this.isLoading = false
          if (res.length < 5) {
            this.noMoreBlog = true
          } else {
            this.noMoreBlog = false
          }
        });
    }
  },
  created () {
    // 每次加载 5 条数据
    // 从第0条开始
    this.fetchData(0)
    // console.log('md.markdown', md.markdown);
  },
  activated() {
    
  },
  deactivated() {

  },
  mounted () {
    this.$eventBus.$on('editToUpdate', () => {
      console.log('editToUpdate');
      this.refreshData()
    })
    this.$eventBus.$on('publishBlog', () => {
      console.log('publishBlog');
      this.refreshData()
    })
    this.$refs.inputFocus.onfocus = () => {
      this.blur = false
      console.log('focus', this.blur);
    }
    this.$refs.inputFocus.onblur = () => {
      this.blur = true
      console.log('blur', this.blur);
    }
  }
}
</script>
<style scoped>
#blogs {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}
.blog, .load-more {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 15px #999;
}
#blogs a {
  color: #444;
  text-decoration: none;
}
input[type="text"] {
  padding: 8px;
  padding-left: 30px;
  width: 100%;
  box-sizing: border-box;
}
.icon-search,
.icon-clear {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.icon-search {
  left: 10px;
}
.icon-clear {
  right: 10px;
  cursor: pointer;
}
.input-wrapper {
  position: relative;
}
.load-more {
  cursor: pointer;
}
</style>
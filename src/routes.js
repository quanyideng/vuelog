import AddBlog from './components/AddBlog'
import ShowBlog from './components/ShowBlog'
import Blog from './components/Blog'

export default [
  {path: "/", component: ShowBlog},
  {path: "/add", component: AddBlog},
  {path: "/blog/:id", component: Blog}
]
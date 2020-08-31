import AddBlog from './components/AddBlog'
import ShowBlog from './components/ShowBlog'
import Blog from './components/Blog'
import EditBlog from './components/EditBlog'

export default [
  {path: "/", component: ShowBlog},
  {path: "/add", component: AddBlog},
  {path: "/blog/:id", component: Blog},
  {path: "/edit/:id", component: EditBlog}
]
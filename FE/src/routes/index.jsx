import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import DashBoard from '../pages/admin/DashBoard';
import PostList from '../pages/admin/post/PostList';
import AddPost from '../pages/admin/post/AddPost';
import EditPost from '../pages/admin/post/EditPost';
import CategoryList from '../pages/admin/category/CategoryList';
import AddCategory from '../pages/admin/category/AddCategory';
import EditCategory from '../pages/admin/category/EditCategory';
import DefaultLayout from '../layout/DefaultLayout';
import HomePage from '../pages/client/HomePage';
import PostDetail from '../pages/client/PostDetail';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: ':slug',
                element: <HomePage/>
            },
            {
                path: 'post/:slug',
                element: <PostDetail/>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '',
                element: <DashBoard />
            },
            {
                path: 'post',
                element: <PostList/>
            },
            {
                path: 'post/add',
                element: <AddPost/>
            },
            {
                path: 'post/edit/:id',
                element: <EditPost/>
            },
            {
                path: 'category',
                element: <CategoryList />
            },
            {
                path: 'category/add',
                element: <AddCategory/>
            },
            {
                path: 'category/edit/:id',
                element: <EditCategory/>
            },
        ]
    }
])

export default router
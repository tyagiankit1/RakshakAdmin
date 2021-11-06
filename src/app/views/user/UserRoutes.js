import NotFound from './NotFound'
import UserList from './UserList'
import InfluancerCreate from './InfluancerCreate'
import UserDetails from './UserDetails'

const sessionRoutes = [
    {
        path: '/user/list',
        component: UserList,
    },
    {
        path: '/influancer/create',
        component: InfluancerCreate,
    },
    {
        path: '/user/details',
        component: UserDetails,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes

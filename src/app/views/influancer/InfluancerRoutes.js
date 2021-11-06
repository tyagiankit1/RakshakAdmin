import NotFound from './NotFound'
import InfluancerList from './InfluancerList'
import InfluancerCreate from './InfluancerCreate'
import InfluancerDetails from './InfluancerDetails'

const sessionRoutes = [
    {
        path: '/influancer/list',
        component: InfluancerList,
    },
    {
        path: '/influancer/create',
        component: InfluancerCreate,
    },
    {
        path: '/influancer/details',
        component: InfluancerDetails,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes

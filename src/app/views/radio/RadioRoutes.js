import NotFound from './NotFound'
import InfluancerList from './InfluancerList'
import InfluancerCreate from './InfluancerCreate'
import InfluancerDetails from './InfluancerDetails'

const sessionRoutes = [
    {
        path: '/radio/list',
        component: InfluancerList,
    },
    {
        path: '/radio/create',
        component: InfluancerCreate,
    },
    {
        path: '/radio/details',
        component: InfluancerDetails,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes

import NotFound from './NotFound'
import DigitalList from './DigitalList'
import InfluancerCreate from './InfluancerCreate'
import InfluancerDetails from './InfluancerDetails'

const sessionRoutes = [
    {
        path: '/digital/list',
        component: DigitalList,
    },
    {
        path: '/digital/create',
        component: InfluancerCreate,
    },
    {
        path: '/digital/details',
        component: InfluancerDetails,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes

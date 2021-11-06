import NotFound from './NotFound'
import InfluancerList from './InfluancerList'
import InfluancerCreate from './InfluancerCreate'
import InfluancerDetails from './InfluancerDetails'

const sessionRoutes = [
    {
        path: '/nontraditional/list',
        component: InfluancerList,
    },
    {
        path: '/nontraditional/create',
        component: InfluancerCreate,
    },
    {
        path: '/nontraditional/details',
        component: InfluancerDetails,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes

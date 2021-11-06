import NotFound from './NotFound'
import InfluancerList from './InfluancerList'
import InfluancerCreate from './InfluancerCreate'
import InfluancerDetails from './InfluancerDetails'

const sessionRoutes = [
    {
        path: '/television/list',
        component: InfluancerList,
    },
    {
        path: '/television/create',
        component: InfluancerCreate,
    },
    {
        path: '/television/details',
        component: InfluancerDetails,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes

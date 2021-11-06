import NotFound from './NotFound'
import CinemaList from './CinemaList'
import InfluancerCreate from './InfluancerCreate'
import InfluancerDetails from './InfluancerDetails'

const sessionRoutes = [
    {
        path: '/cinema/list',
        component: CinemaList,
    },
    {
        path: '/cinema/create',
        component: InfluancerCreate,
    },
    {
        path: '/cinema/details',
        component: InfluancerDetails,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes

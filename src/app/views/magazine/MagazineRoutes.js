import NotFound from './NotFound'
import MagazineList from './MagazineList'
import InfluancerCreate from './InfluancerCreate'
import InfluancerDetails from './InfluancerDetails'

const sessionRoutes = [
    {
        path: '/magazine/list',
        component: MagazineList,
    },
    {
        path: '/magazine/create',
        component: InfluancerCreate,
    },
    {
        path: '/magazine/details',
        component: InfluancerDetails,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes

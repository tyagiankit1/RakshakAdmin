import NotFound from './NotFound'
import NewspaperList from './NewspaperList'
import InfluancerCreate from './InfluancerCreate'
import InfluancerDetails from './InfluancerDetails'

const sessionRoutes = [
    {
        path: '/newspaper/list',
        component: NewspaperList,
    },
    {
        path: '/newspaper/create',
        component: InfluancerCreate,
    },
    {
        path: '/newspaper/details',
        component: InfluancerDetails,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes

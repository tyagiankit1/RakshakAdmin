import NotFound from './NotFound'
import AirlineList from './AirlineList'
import AirlineCreate from './AirlineCreate'
import AirlineDetails from './AirlineDetails'

const sessionRoutes = [
    {
        path: '/airline/list',
        component: AirlineList,
    },
    {
        path: '/airline/create',
        component: AirlineCreate,
    },
    {
        path: '/airline/details',
        component: AirlineDetails,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes

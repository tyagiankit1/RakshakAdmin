import NotFound from './NotFound'
import QRLotList from './QRLotList'
import InfluancerCreate from './InfluancerCreate'
import InfluancerDetails from './InfluancerDetails'

const sessionRoutes = [
    {
        path: '/qrLot',
        component: QRLotList,
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

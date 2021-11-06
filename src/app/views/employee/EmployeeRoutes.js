import NotFound from './NotFound'
import EmployeeList from './EmployeeList'
import EmployeeCreate from './EmployeeCreate'
// import InfluancerDetails from './InfluancerDetails'

const sessionRoutes = [
    {
        path: '/employee/list',
        component: EmployeeList,
    },
    {
        path: '/employee/add',
        component: EmployeeCreate,
    },
    // {
    //     path: '/employee/details',
    //     component: InfluancerDetails,
    // },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes

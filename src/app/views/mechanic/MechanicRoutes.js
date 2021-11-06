import NotFound from './NotFound'
import MechanicList from './MechanicList'
import PersonalForm from './PersonalForm'
import UserDetails from './UserDetails'

const MechanicRoutes = [
    {
        path: '/mechanic/list',
        component: MechanicList,
    },
    {
        path: '/mechanic/add',
        component: PersonalForm,
    },
    {
        path: '/user/details',
        component: UserDetails,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default MechanicRoutes

import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import InfluancerReducer from './InfluancerReducer'

const RootReducer = combineReducers({
    // api: "https://admin.rakshakcode.com/api/",
    // api: "http://localhost:8082/api/",
    api: "https://21ff-122-161-50-33.ngrok.io/api/",
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    ecommerce: EcommerceReducer,
    influancer: InfluancerReducer,
})

export default RootReducer

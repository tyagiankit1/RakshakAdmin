import {
    GET_INFLUANCER_LIST
} from '../actions/InfluancerActions'

const initialState = {
    // api: 'https://admin.rakshakcode.com/api/',
    // api: 'http://localhost:8082/api/',
    api: "https://21ff-122-161-50-33.ngrok.io/api/",
    influancerList: [],
    cartList: [],
}

const InfluancerReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_INFLUANCER_LIST: {
            return {
                ...state,
                influancerList: [...action.payload],
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default InfluancerReducer

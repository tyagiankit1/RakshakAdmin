import axios from 'axios'

export const GET_INFLUANCER_LIST = 'GET_INFLUANCER_LIST'

export const getInfluancerList = (infState) => (dispatch) => {
    console.log("dispatch: ", dispatch);
    axios.get(infState.api + 'getCompleteInfluencerList').then((res) => {
        console.log("res: ", res);
        dispatch({
            type: GET_INFLUANCER_LIST,
            payload: res.data,
        })
    })
}


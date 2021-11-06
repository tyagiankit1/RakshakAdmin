import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_INFLUANCER_LIST': {
            return {
                ...state,
                'GET_INFLUANCER_LIST': action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const InfluancerContext = createContext({
    Influancer: [],
    getInfluancer: () => {},
})

export const InfluancerProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    

    const getInfluancer = async () => {
        try {
            const res = await axios.get('http://xeniumsvc.rakshakcode.com/api/getCompleteInfluencerList')
            console.log("res: ", res)
            
            dispatch({
                type: 'GET_INFLUANCER_LIST',
                payload: res.data,
            })
            return res.data;
        } catch (e) {
            console.error(e)
        }
    }
    // const createNotification = async (notification) => {
    //     try {
    //         const res = await axios.post('/api/notification/add', {
    //             notification,
    //         })
    //         dispatch({
    //             type: 'CREATE_NOTIFICATION',
    //             payload: res.data,
    //         })
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

    useEffect(() => {
        getInfluancer()
    }, [])

    return (
        <InfluancerContext.Provider
            value={{
                Influancer: state.Influancer,
                // deleteNotification,
                // clearNotifications,
                getInfluancer,
                // createNotification,
            }}
        >
            {children}
        </InfluancerContext.Provider>
    )
}

export default InfluancerContext

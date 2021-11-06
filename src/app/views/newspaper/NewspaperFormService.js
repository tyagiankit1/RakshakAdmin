import axios from 'axios'

const setHeader = (accessToken) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}

export const calculateAmount = (item) => {
    if (!item.discount) return item.price * item.quantity || 0

    if (item.discountType === '$') {
        let total = item.price * item.quantity
        return total - item.discount || 0
    } else {
        let total = item.price * item.quantity
        return total - (total * item.discount) / 100 || 0
    }
}

export const getNewspaperList = async (infState) => {
    setHeader(localStorage.accessToken)
    const response = await axios.get(infState.api+'getCompleteNewspaperList')
    console.log("response service: ", response)
    return response.data;
}

export const getInfProductList = async (infState, payload) => {
    setHeader(localStorage.accessToken)
    const response = await axios.post(infState.api+'getCompleteInfluencerProdList', payload);
    console.log("response service: ", response)
    return response.data;
}

export const saveInfData = async (infState, payload) => {
    setHeader(localStorage.accessToken)
    let image = payload.image;
    if(image === undefined){
        payload.image = ""; 
    }else{
        payload.image = image.name; 
    }
    const response = await axios.post(infState.api+'saveInfluencerDetails', payload);
    if(image !== undefined && response.data.message === "Success"){
        var bodyFormData = new FormData();
        bodyFormData.append('image', image); 
        bodyFormData.append('infId', response.data.data); 
        await axios.post(infState.api+'savingInfluancerImage', bodyFormData)
    }
    console.log("response service: ", response)
    return response.data;
}

export const updateInfData = async (infState, payload) => {
    setHeader(localStorage.accessToken)
    let image = payload.update_data.image;
    if(image === undefined){
        payload.update_data.image = ""; 
    }else{
        payload.update_data.image = image.name; 
    }
    const response = await axios.post(infState.api+'updateInfluencerDetails', payload);
    if(image !== undefined && response.data.message === "Success"){
        var bodyFormData = new FormData();
        bodyFormData.append('image', image); 
        bodyFormData.append('infId', response.data.data); 
        await axios.post(infState.api+'savingInfluancerImage', bodyFormData);
    }
    console.log("response service: ", response)
    return response.data;
}

export const saveInfProduct = async (infState, payload) => {
    setHeader(localStorage.accessToken)
    payload.image = ""; 
    const response = await axios.post(infState.api+'saveInfluencerProduct', payload);
    console.log("response service: ", response)
    return response.data;
}
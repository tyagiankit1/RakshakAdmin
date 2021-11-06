import axios from 'axios'

const setHeader = (accessToken) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;  
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] ='*';
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

export const getUserList = async (infState) => {
    setHeader(localStorage.accessToken)
    const response = await axios.post(infState.api+'getUserList', {mode:'cors'})
    console.log("response service: ", response)
    return response.data;
}

export const getVehicleList = async (infState, payload) => {
    setHeader(localStorage.accessToken)
    const response = await axios.post(infState.api+'getVehicleListByUser', {mode:'cors'}, payload)
    console.log("response service: ", response)
    return response.data;
}

export const getUserOrder = async (infState, payload) => {
    setHeader(localStorage.accessToken)
    const response = await axios.post(infState.api+'getUserOrder', {mode:'cors'}, payload)
    console.log("response service: ", response)
    return response.data;
}

export const assignQRCode = async (infState, payload) => {
    setHeader(localStorage.accessToken)
    const response = await axios.post(infState.api+'assignQRCode', {mode:'cors'}, payload)
    console.log("response service: ", response)
    return response.data;
}

export const updateQRCode = async (infState, payload) => {
    setHeader(localStorage.accessToken)
    const response = await axios.post(infState.api+'updateQRCode', {mode:'cors'}, payload)
    console.log("response service: ", response)
    return response.data;
}

export const getQRListByUser = async (infState, payload) => {
    setHeader(localStorage.accessToken)
    const response = await axios.post(infState.api+'getQRListByUser', {mode:'cors'}, payload)
    console.log("response service: ", response)
    return response.data;
}



export const getInfProductList = async (infState, payload) => {
    setHeader(localStorage.accessToken)
    const response = await axios.post(infState.api+'getCompleteInfluencerProdList', {mode:'cors'}, payload);
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
    } else if(typeof(image) === "object"){
        payload.update_data.image = image.name; 
    }else{
        payload.update_data.image = image; 
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
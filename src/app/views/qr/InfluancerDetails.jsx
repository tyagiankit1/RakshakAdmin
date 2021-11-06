import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import ReactSelect from 'react-select';
import CloseIcon from '@material-ui/icons/Close'
import useAuth from 'app/hooks/useAuth'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import {
    Card,
    Icon,
    IconButton,
    TextField,
    Typography,
    Toolbar,
    AppBar,
    Divider,
    List,
    Avatar,
    ListItem,
    ListItemText,
    Dialog,
    Button,
    Slide,
    Grid,
    Fab,
    Tabs, Tab
} from '@material-ui/core'
import { SimpleCard } from 'app/components'

import InfDetails from './Details/InfDetails'
import InfProductDetails from './Details/InfProductDetails'
import InfDataDetails from './Details/InfDataDetails'
import { updateInfData } from './QRFormService'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        padding: '1%'
    },
    avatar: {
        position: 'relative',
        left: '10%',
        height: '100px',
        width: '100px',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}))

const statusOptions = [
    {value: "Draft", label: "Draft"},
    {value: "Submitted", label: "Submitted"},
    {value: "Pending", label: "Pending"},
    {value: "Active", label: "Active"},
    {value: "In-Active", label: "In-Active"}
]


export default function InfluancerDetails(props) {
    const { user } = useAuth()
    const classes = useStyles()
    const [state, setState] = useState({})
    const [tabIndex, setTabIndex] = React.useState(0)
    const [editMode, setEditMode] = React.useState(false)
    const [status, setStatus] = React.useState(props.influancerData.status)
    const [imageLocation] = React.useState(process.env.PUBLIC_URL + "/image/" + props.influancerData.image);
    const infState = useSelector((state) => state.influancer)
    const [detailStatus, setDetailStatus] = useState(false);   
    const [editorStatus, setEditorStatus] = useState(false);   
    const [isActive, setIsActive] = useState(true)

    const [personalDetails, setPersonalDetails] = useState(props.influancerData)
    const [editorDetails, setEditorDetails] = useState(props.influancerData.data)

    useEffect(() => {
        setIsActive(false)
        if(isActive && state.contact === undefined){
            setState({
                ...state,
                contact: props.influancerData.contact,
                gender: props.influancerData.gender,
                city: props.influancerData.city,
                address: props.influancerData.address,
                category: props.influancerData.category,
                platform: props.influancerData.platform,
                followers: props.influancerData.followers,
                price: props.influancerData.prize,
                priceTagValue: props.influancerData.prize_tag,
                priceTag: (props.influancerData.prize_tag === 'On Request' ? true: false),
                data: props.influancerData.data
            })
        }
      }, [isActive]);

    

    const createRequestPayload = (personalData, editorDetails) => {
        console.log('personalData: ', personalData);
        console.log('editorDetails: ', editorDetails);

        let update_data = {  
            "image": props.influancerData.image,
            "followers": personalData.followers,   
            "city": personalData.city,   
            "address":personalData.address,   
            "category": personalData.category,     
            "platform": personalData.platform,    
            "gender": personalData.gender,   
            "prize": personalData.price,   
            "prize_tag": personalData.priceTagValue,  
            "contact": personalData.contact,   
            "data": editorDetails,
            "status": status,
            "updated_id": user.id
          }
          let payload = {influencer_id: props.influancerData.influencer_id, update_data: update_data}
          updateInfData(infState, payload).then(( data ) => {
            console.log("response: ", data);

          })

    }

    function saveDetails(personalData) {
        if(detailStatus && editMode){
            console.log('personalData: ', personalData)
            setDetailStatus(false);
            setState({
                ...state,
                contact: personalData.contact,
                gender: personalData.gender,
                city: personalData.city,
                address: personalData.address,
                category: personalData.category,
                platform: personalData.platform,
                followers: personalData.followers,
                price: personalData.price,
                priceTagValue: personalData.priceTagValue,
                priceTag: personalData.priceTag
            })
            console.log(personalData);
            if(tabIndex === 0){
                createRequestPayload(personalData, state.data);
            }
            setPersonalDetails(personalData);
            // createRequestPayload(personalData, state.data);
        }
    }
    function saveEditor(editorData) {
        if(editorStatus && editMode){
            console.log('editorData: ', editorData)
            setEditorStatus(false);
            setState({
                ...state,
                data: editorData
            })
            console.log(editorData);
            if(tabIndex === 1){
                createRequestPayload(state, editorData);
            }
            setEditorDetails(editorData);
            // createRequestPayload(state, editorData);
        }
    }

    function changeTab(tab){
        if(tabIndex === 0){
            setDetailStatus(true);
            setTimeout(() => {

                setTabIndex(tab);
            }, 1000);
            
        }else if(tabIndex === 1){
            setEditorStatus(true);
            setTimeout(() => {
                setTabIndex(tab);
            }, 1000);
        }else{
            setTabIndex(tab);
        }     
        
    }

    function handleEditMode() {
        // setEditMode(!editMode);

        if(editMode){
            // setState({
            //     ...state,
            //     detailStatus: true,
            // })
            setDetailStatus(true);
            setEditorStatus(true);
            
            setTimeout(() => {
                console.log('state submit: ', state)
                if(tabIndex === 2){
                    createRequestPayload(state, state.data);
                } 
                // createRequestPayload(); 
                setEditMode(false);
            }, 1000);
             
        }else{
            setEditMode(true);
        }
    }
    
    const handleChange = (event) => {
        setStatus(event.target.value);
    }
   
    const {
        contact,
        gender,
        city,
        address,
        category,
        platform,
        followers,
        price,
        priceTag,
        priceTagValue,
        data
    } = state

    return (
        <div>
                <AppBar className={classes.appBar}>
                    <Grid container spacing={1}>
                        <Grid item lg={9} md={12} sm={12} xs={12}  />
                        <Grid item lg={2} md={12} sm={12} xs={12} >
                        {
                            editMode ?
                            <ReactSelect
                                name="status"
                                className="text-gray"
                                options={statusOptions}
                                value={statusOptions.find(x => x.value === status)}
                                onChange={e =>
                                handleChange({
                                    target: {
                                    name: "status",
                                    value: e.value
                                    }
                                })
                                }
                            />
                            : status === 'Draft' ? <small className="border-radius-4 bg-error text-white px-2 py-2px">{status}</small>
                            : status === 'Submitted' ?  <small className="border-radius-4 bg-secondary text-white px-2 py-2px">{status}</small>
                            : status === 'Pending' ? <small className="border-radius-4 bg-primary text-white px-2 py-2px">{status}</small>
                            : status === 'Active' ? <small className="border-radius-4 bg-green text-white px-2 py-2px">{status}</small>
                            : status === 'In-Active' ? <small className="border-radius-4 bg-error text-white px-2 py-2px">{status}</small>
                            :''
                        }
                        
                        </Grid>
                        <Grid item lg={1} md={12} sm={12} xs={12} className="text-right text-white">
                            <IconButton size="small" className="text-white" onClick={handleEditMode}>
                                { !editMode ? <Icon>edit</Icon> : <Icon>save</Icon> }                                
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Toolbar>
                    <Grid container spacing={1}>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Avatar className={classes.avatar}  src={process.env.PUBLIC_URL +'/image/'+ imageLocation} />
                        <Typography variant="h6" className={classes.title}> {props.influancerData.name} </Typography>
                        <Typography variant="h6" className={classes.title}> {props.influancerData.email} </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                    <Grid item lg={11} md={12} sm={12} xs={12} spacing={3}>
                    <Card elevation={6} className="p-4" style={{backgroundColor: '#1564B3'}}>
                        <div className="flex items-center">
                            <h5 className="font-medium text-light-white m-0 ml-3">
                                Active Services
                            </h5>
                        </div>
                        <div className="pt-4 flex items-center">
                            <h2 className="m-0 text-white flex-grow">0</h2>
                            <div className="flex justify-center  text-white">
                                <Icon className="text-40">trending_up</Icon>
                            </div>
                        </div>
                    </Card>
                    </Grid> 
                    </Grid>
                    <Grid container spacing={1}>
                    <Grid item lg={11} md={12} sm={12} xs={12} spacing={3}>
                    <Card elevation={6} className="p-4" style={{backgroundColor: '#1564B3'}}>
                        <div className="flex items-center">
                            <h5 className="font-medium text-light-white m-0 ml-3">
                                Active Products
                            </h5>
                        </div>
                        <div className="pt-4 flex items-center">
                            <h2 className="m-0 text-white flex-grow">0</h2>
                            <div className="flex justify-center  text-white">
                                <Icon className="text-40">trending_up</Icon>
                            </div>
                        </div>
                    </Card>
                    </Grid>
                    </Grid>
                    </Toolbar>
                </AppBar>
                {
                    state.contact === undefined ? '' :
                
                <SimpleCard >
                <Tabs
                    className="mt-4 mb-6"
                    value={tabIndex}
                    onChange={(e, value) => changeTab(value)}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {['Details', 'Data', 'Media Options & Pricing'].map((item, ind) => (
                        <Tab
                            className="capitalize"
                            value={ind}
                            label={item}
                            key={ind}
                        />
                    ))}
                </Tabs>
                {tabIndex === 0 && <InfDetails influancerData={state} detailStatus={detailStatus} saveDetails={saveDetails} editMode={editMode} />}
                {tabIndex === 1 && <InfDataDetails influancerData={state.data} editorStatus={editorStatus} saveEditor={saveEditor} editMode={editMode} />}
                {tabIndex === 2 && <InfProductDetails influancerData={props.influancerData} />}
                </SimpleCard>
                }
        </div>
    )
}

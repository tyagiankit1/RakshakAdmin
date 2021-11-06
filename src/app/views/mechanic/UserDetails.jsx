import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import useAuth from 'app/hooks/useAuth'
import {
    Card,
    Icon,
    CircularProgress,
    Typography,
    Toolbar,
    AppBar,
    Avatar,
    Grid,
} from '@material-ui/core';
import { SimpleCard } from 'app/components';
import VehicleDetails from './VehicleDetails';
import PersonalDetails from './PersonalDetails';
import QROrderDetails from './QROrderDetails';
import QRDetails from './QRDetails';

import { getVehicleList, getUserOrder, getQRListByUser } from './InfluancerFormService'

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

export default function UserDetails(props) {
    const { user } = useAuth()
    const classes = useStyles()
    const infState = useSelector((state) => state.influancer)
    const [imageLocation] = React.useState();
    const [vehicleDataList, setVehicleDataList] = React.useState([]);    
    const [isVehicleAlive, setIsVehicleAlive] = useState(true)

    const [qrOrderList, setQROrderList] = React.useState([]);    
    const [isQROrderAlive, setIsQROrderAlive] = useState(true)

    const [qrList, setQRList] = React.useState([]);    
    const [isQRAlive, setIsQRAlive] = useState(true)
    
    useEffect(() => {
        if(isQROrderAlive){
            let payload = {
                userID: props.userData.userID
            }
            getUserOrder(infState, payload).then(( data ) => {
                console.log("response: ", data.userOrderList);
                setIsQROrderAlive(false)
                if (isQROrderAlive) setQROrderList(data.userOrderList)
            })
        }  
    }, [infState, isQROrderAlive])

    useEffect(() => {
        if(isVehicleAlive){
            let payload = {
                userID: props.userData.userID
            }
            getVehicleList(infState, payload).then(( data ) => {
                console.log("response: ", data);
                setIsVehicleAlive(false)
                if (isVehicleAlive) setVehicleDataList(data)
            })
        }
    }, [infState, isVehicleAlive])

    useEffect(() => {
        if(isQRAlive){
            let payload = {
                userID: props.userData.userID
            }
            getQRListByUser(infState, payload).then(( data ) => {
                console.log("response: ", data.qrList);
                setIsQRAlive(false)
                if (isQRAlive) setQRList(data.qrList)
            })
        }
    }, [infState, isQRAlive])


    return (
        <div>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                    <Grid container spacing={1}>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Avatar className={classes.avatar}  src={process.env.PUBLIC_URL +'/image/'+ imageLocation} />
                        <Typography variant="h6" className={classes.title}> {props.userData.name} </Typography>
                        <Typography variant="h6" className={classes.title}> {props.userData.contactNo} </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                    <Grid item lg={11} md={12} sm={12} xs={12}>
                    <Card elevation={6} className="p-4" style={{backgroundColor: '#1564B3'}}>
                        <div className="flex items-center">
                            <h5 className="font-medium text-light-white m-0 ml-3">
                                Active Vehicles
                            </h5>
                        </div>
                        <div className="pt-4 flex items-center">
                            <h2 className="m-0 text-white flex-grow">{vehicleDataList.length}</h2>
                            <div className="flex justify-center  text-white">
                                <Icon className="text-40">trending_up</Icon>
                            </div>
                        </div>
                    </Card>
                    </Grid> 
                    </Grid>
                    <Grid container spacing={1}>
                    <Grid item lg={11} md={12} sm={12} xs={12} >
                    <Card elevation={6} className="p-4" style={{backgroundColor: '#1564B3'}}>
                        <div className="flex items-center">
                            <h5 className="font-medium text-light-white m-0 ml-3">
                                Active QRs
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
                <Grid container spacing={1}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <SimpleCard key="personal" title="Personal Details">
                            <PersonalDetails personalData={props.userData} />
                        </SimpleCard>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6} >
                        <SimpleCard key="vehicle" title="Vehicle Details">
                        {
                            isVehicleAlive ? <CircularProgress className={classes.progress} /> : <VehicleDetails vehicleDataList={vehicleDataList} />
                        }
                        </SimpleCard>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6} >
                        <SimpleCard key="order" title="Order Details">
                        {
                            isQROrderAlive ? <CircularProgress className={classes.progress} /> : <QROrderDetails qrOrderList={qrOrderList} qrList={qrList} personalData={props.userData} setIsQROrderAlive={setIsQROrderAlive} setIsQRAlive={setIsQRAlive} />
                        }
                        </SimpleCard>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6} >
                        <SimpleCard key="activeQR" title="Active QR Details">
                        {
                            (isQRAlive || isVehicleAlive) ? <CircularProgress className={classes.progress} /> : <QRDetails qrList={qrList} vehicleDataList={vehicleDataList}  />
                        }
                        </SimpleCard>
                    </Grid>
                </Grid>
                {/* {
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
                {tabIndex === 0 && <InfDetails influancerData={state} detailStatus={detailStatus} editMode={editMode} />}
                {tabIndex === 1 && <InfDataDetails influancerData={state.data} editorStatus={editorStatus} editMode={editMode} />}
                {tabIndex === 2 && <InfProductDetails influancerData={props.influancerData} />}
                </SimpleCard>
                } */}
        </div>
    )
}

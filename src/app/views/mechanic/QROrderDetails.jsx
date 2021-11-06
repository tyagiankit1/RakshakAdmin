import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import ReactSelect from 'react-select';
import { CircularProgress } from '@material-ui/core'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,  
    TextField,
    Radio,
    FormControlLabel,
    RadioGroup,
    Grid,
    Fab
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { assignQRCode, updateQRCode } from './InfluancerFormService'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const orderStatusList = [
    {value: "Assigned", label: "Assigned"},
    {value: "Processed", label: "Processed"},
    {value: "Out for Delivery", label: "Out for Delivery"},
    {value: "Delivered", label: "Delivered"}
]

const QROrderDetails = (props) => {
    const classes = useStyles()
    const infState = useSelector((state) => state.influancer);
    const [userOrderList, setUserOrderList] = React.useState(props.qrOrderList);
    const [qrList, setQrList] = React.useState(props.qrList);

    const [personalData, setPersonalData] = React.useState(props.personalData);

    const [openCreateLot, setOpenCreateLot] = React.useState(false)
    const [selectedUserOrder, setSelectedUserOrder] = React.useState({});
    const [selectedOrderStatus, setSelectedOrderStatus] = React.useState("")


    function handleCreateLotOpen(userOrder) {
        console.log('userOrder: ', userOrder);
        setSelectedOrderStatus(userOrder.orderStatus);
        setSelectedUserOrder(userOrder);
        setOpenCreateLot(true);
    }

    function handleCreateLotClose() {
        setOpenCreateLot(false)
    }
    
    useEffect(() => {
        setUserOrderList(props.qrOrderList);
    }, [props.qrOrderList])

    useEffect(() => {
        setQrList(props.qrList);
    }, [props.qrList])

    const handleChange = (event) => {
        setSelectedOrderStatus(event.target.value);
    }

    const takeAction = () => {
        
        if(selectedUserOrder.orderStatus === "Requested"){
            let payload = {
                "qrcode": document.getElementById("qrcodeid").value,
                "orderData": selectedUserOrder
            }
            assignQRCode(infState, payload).then(( data ) => {
                console.log("response: ", data);
                setOpenCreateLot(false);
                props.setIsQROrderAlive(true);
                props.setIsQROrderAlive(true);
            });
        } else {
            if( qrList !== undefined){
                let qrData = qrList.find( qrData => qrData.vehicleID == selectedUserOrder.vehicleID);
                qrData.qrStatus = selectedOrderStatus;
    
                let orderData = selectedUserOrder;
                orderData.orderStatus = selectedOrderStatus;
    
                let payload = {
                    "qrData": qrData,
                    "orderData": orderData
                }
                console.log("updateQRCode: ", payload)
                updateQRCode(infState, payload).then(( data ) => {
                    console.log("response: ", data);
                    setOpenCreateLot(false);
                    props.setIsQROrderAlive(true);
                    props.setIsQROrderAlive(true);
                });
            }            
        }
    }

    return (
        <>
            {
                userOrderList.length === 0 ? <h4>No Order placed by user Yet.</h4>:
                userOrderList.map(( userOrder ) => (
                    <Accordion key={userOrder.orderID}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={[classes.heading, "mx-4"]}> {userOrder.name} </Typography>
                        <Typography className={[classes.heading, "mx-4"]}> [{userOrder.createdAt.split('T')[0]}] </Typography>
                        <Typography className={[classes.heading, "mx-4"]}> {userOrder.orderStatus} </Typography>
                        
                    </AccordionSummary>
                    <AccordionDetails>
                    <Grid container spacing={1}>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Contact No.: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {userOrder.contactNo}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Address: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {userOrder.address}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                City: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {userOrder.city}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                State: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {userOrder.state}
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Pincode: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {userOrder.pincode}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Referred By: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {userOrder.refByCode === null ? <Typography className={"text-error"}> Not Available </Typography> : userOrder.refByCode}
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Vehicle Ordered for: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {userOrder.vehicleID === null ? <Typography className={"text-error"}> Not Available </Typography> : userOrder.vehicleID}
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={ () => handleCreateLotOpen(userOrder) }
                        >
                            Take Action
                        </Button>
                    </Grid>                    
                    </AccordionDetails>
                    </Accordion>
                ))
            }
            <Dialog
                open={openCreateLot}
                onClose={handleCreateLotClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    { selectedUserOrder.orderStatus === "Requested" ? "Assign QR" : "Update Status" }
                </DialogTitle>
                <DialogContent>
                    {
                        selectedUserOrder.orderStatus === "Requested" ?
                        <TextField
                            autoFocus
                            margin="dense"
                            id="qrcodeid"
                            label="QR Code"
                            type="text"
                            fullWidth
                        />:
                        <>
                            <RadioGroup
                                name="gender1"
                                className={classes.group}
                                value={selectedOrderStatus}
                                onChange={handleChange}
                            >
                            {
                                orderStatusList.map(( orderStatus ) => (
                                    <FormControlLabel
                                        value={ orderStatus.value }
                                        control={<Radio color="default" />}
                                        label={ orderStatus.label }
                                    />
                                ))
                            }
                            </RadioGroup>
                        
                        </>
                    }
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCreateLotClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={ takeAction } >
                        { selectedUserOrder.orderStatus === "Requested" ? "Assign QR" : "Update Status" }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default QROrderDetails

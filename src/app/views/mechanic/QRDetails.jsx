import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,  
    TextField,
    TableCell,
    Card,
    TablePagination,
    Grid,
    Fab
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const QRDetails = (props) => {
    const classes = useStyles()
    const infState = useSelector((state) => state.influancer);
    const [qrList, setQrList] = React.useState(props.qrList);
    const [vehicleDataList, setVehicleDataList] = React.useState(props.vehicleDataList);
    // const [personalData, setPersonalData] = React.useState(props.personalData);

    
    useEffect(() => {
        setQrList(props.qrList);
    }, [props.qrList])

    useEffect(() => {
        setVehicleDataList(props.vehicleDataList);
    }, [props.vehicleDataList])

    function getVehicleReg(vehicleID){
        if(vehicleDataList !== undefined){
            console.log('vehicleDataList: ', vehicleDataList)
            let data =  vehicleDataList.find( vehicleData => vehicleData.vehicleID == vehicleID);
            console.log("data.regNumber: ", data.regNumber)
            return data.regNumber;
        }
    }

    return (
        <>
            {
                qrList.length === 0 ? <h4>No active QR for user Yet.</h4>:
                qrList.map(( qrDetails ) => (
                    <Accordion key={qrDetails.qrCode}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={[classes.heading, "mx-4"]}> {qrDetails.qrCode} </Typography>
                        <Typography className={[classes.heading, "mx-4"]}> [{qrDetails.createdAt.split('T')[0]}] </Typography>
                        <Typography className={[classes.heading, "mx-4"]}> {qrDetails.qrStatus} </Typography>
                        
                    </AccordionSummary>
                    <AccordionDetails>
                    <Grid container spacing={1}>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{display: 'inline-block', textAlign: 'center'}}>
                        <img
                            className="mb-8 w-90"
                            src={qrDetails.image}
                            alt=""
                        />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Primary Contact: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {qrDetails.primaryContact}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Secondary Contact: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {qrDetails.EmgContact === null ? <Typography className={"text-error"}> Not Available </Typography> : qrDetails.EmgContact}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Vehicle Ordered for: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {qrDetails.vehicleID === null ? <Typography className={"text-error"}> Not Available </Typography> : getVehicleReg(qrDetails.vehicleID)}
                        </Grid>
                    </Grid>                    
                    </AccordionDetails>
                    </Accordion>
                ))
            }
            
        </>
    )
}

export default QRDetails

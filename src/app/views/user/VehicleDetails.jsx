import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TableRow,
    TableCell,
    Icon,
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

const VehicleDetails = (props) => {
    const classes = useStyles()
    const [vehicleDataList, setVehicleDataList] = React.useState(props.vehicleDataList);

    console.log("props-------> ", props.vehicleDataList);
    useEffect(() => {
        setVehicleDataList(props.vehicleDataList);
    }, [props.vehicleDataList])

    return (
        <>
            {
                vehicleDataList.length === 0 ? <h4>No vehicle added.</h4>:
                vehicleDataList.map(( vehicleData ) => (
                    <Accordion key={vehicleData.vehicleID}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={[classes.heading, "mx-4"]}> {vehicleData.regNumber} </Typography>
                        
                    </AccordionSummary>
                    <AccordionDetails>
                    <Grid container spacing={1}>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Owner: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {vehicleData.owner}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Brand: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {vehicleData.brand}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Model: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {vehicleData.model}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Fuel Type: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {vehicleData.fuelType}
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Transmission Type: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {vehicleData.transmissionType}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Insurance: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {vehicleData.insuranceNumber === null ? <Typography className={"text-error"}> Not Available </Typography> : vehicleData.insuranceNumber}
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Insurance Expiry: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {vehicleData.insuranceExpire === null ? <Typography className={"text-error"}> Not Available </Typography> : vehicleData.insuranceExpire}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Pollution: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {vehicleData.pollutionNumber === null ? <Typography className={"text-error"}> Not Available </Typography> : vehicleData.pollutionNumber}
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                            <h5 className="font-medium m-0 ml-3">
                                Pollution Expiry: 
                            </h5>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                            {vehicleData.pollutionExpire === null ? <Typography className={"text-error"}> Not Available </Typography> : vehicleData.pollutionExpire}
                        </Grid>
                    </Grid>
                    </AccordionDetails>
                    </Accordion>
                ))
            }
        </>
    )
}

export default VehicleDetails

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
import { SimpleCard } from 'app/components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const PersonalDetails = (props) => {
    const classes = useStyles()
    const [personalData, setPersonalData] = React.useState(props.personalData);

    // useEffect(() => {
    //     setPersonalData(props.personalData);
    // }, [props.vehicleDataList])

    return (
        <>
        <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                <h5 className="font-medium m-0 ml-3">
                    Email Address: 
                </h5>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                {personalData.email}
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={6}  style={{display: 'inline-block'}}>
                <h5 className="font-medium m-0 ml-3">
                    Address: 
                </h5>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}  style={{display: 'inline-block', textAlign: 'right'}}>
                {personalData.address}
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                <h5 className="font-medium m-0 ml-3">
                    City: 
                </h5>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                {personalData.city}
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                <h5 className="font-medium m-0 ml-3">
                    State: 
                </h5>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                {personalData.state}
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block'}}>
                <h5 className="font-medium m-0 ml-3">
                    Pincode: 
                </h5>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6} style={{display: 'inline-block', textAlign: 'right'}}>
                {personalData.pincode}
            </Grid>
            </Grid>
        </>
    )
}

export default PersonalDetails

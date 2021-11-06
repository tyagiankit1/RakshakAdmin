import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { SimpleCard } from 'app/components'
import {
    IconButton,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Icon,
    Grid,
    Fab,
    Radio,
    RadioGroup,
    FormControlLabel,
    useMediaQuery
} from '@material-ui/core'

const StepForm = (props) => {
    const [state, setState] = useState({})
    
    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const {
        address
    } = state


    return (
        <Grid id={'step'+props.keyVal} container spacing={1}>
           <Grid key={'first'+props.keyVal} item lg={5} md={5} sm={12} xs={12}>
                <TextValidator
                    className="mb-4 w-full"
                    label="Address"
                    onChange={handleChange}
                    type="text"
                    name={"address"}
                    value={address || ''}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
            </Grid>
            <Grid key={'second'+props.keyVal} item lg={5} md={5} sm={12} xs={12}>
                <TextValidator
                    className="mb-4 w-full"
                    label="Address"
                    onChange={handleChange}
                    type="text"
                    name={"address"}
                    value={address || ''}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
            </Grid>
        </Grid>
    )
}

export default StepForm

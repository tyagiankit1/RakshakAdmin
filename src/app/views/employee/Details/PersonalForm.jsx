import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Fab,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@material-ui/core'
import { empRegister } from '../InfluancerFormService'

export default function PersonalForm(props) {
    const [state, setState] = useState({})
    const infState = useSelector((state) => state.influancer)

    const AddEmployee = (event) => {
        console.log("submitted");
        console.log(event);
        setState({
            ...state,
            "validate": true
        })
        // props.setDataStatus(true);
        let payload = {
            "name": state.name,
            "email": state.email,
            "contactNo": state.contact,
            "gender": state.gender,
            "address": state.address
        }
        empRegister(infState, payload).then(( data ) => {
            console.log("response: ", data);
            console.log("infState:", infState);
        })
    }
    
    if(props.personalDataStatus){
        document.getElementById('personalFormSubmit').click();
        // props.setDataStatus(false);
    }

    const handleChange = (event) => {
        event.persist()
        if(event.target.type === 'file'){
            setState({
                ...state,
                [event.target.name]: event.target.files[0],
            })
        }else{
            setState({
                ...state,
                [event.target.name]: event.target.value,
            })
        } 
    }

    const {
        picture,
        name,
        email,
        contact,
        gender,
        address
    } = state

    return (
        <ValidatorForm  onSubmit={AddEmployee} onError={() => null}>
            <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    {/* <div className="flex flex-wrap mb-6">
                    <label htmlFor="upload-single-file">
                        <Fab
                            className="capitalize"
                            color="primary"
                            component="span"
                            variant="extended"
                        >
                            <div className="flex items-center">
                                <Icon className="pr-8">cloud_upload</Icon>
                                <span>Upload Picture</span>
                            </div>
                        </Fab>
                        </label>
                        <input
                            className="hidden"
                            onChange={handleChange}
                            id="upload-single-file"
                            type="file"
                            name="picture"
                            accept="image/png, image/jpeg"
                        />
                        {picture !== undefined ?<div style={{paddingLeft: '10px'}} className="flex items-center"><span>{picture.name}</span></div> : ''}
                    </div> */}
                    
                    <TextValidator
                        className="mb-4 w-full"
                        label="Mobile Nubmer"
                        onChange={handleChange}
                        type="number"
                        name="contact"
                        value={contact || ''}
                        validators={[
                            'required',
                            'minStringLength:10',
                            'maxStringLength: 10',
                        ]}
                        errorMessages={['this field is required', 'contact should be of 10 digits']}
                    />
                    <RadioGroup
                        className="mb-4"
                        value={gender || ''}
                        name="gender"
                        onChange={handleChange}
                        row
                        validators={[
                            'required'
                        ]}
                        errorMessages={['this field is required']}
                    >
                        <FormControlLabel
                            value="Male"
                            control={<Radio color="primary" />}
                            label="Male"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="Female"
                            control={<Radio color="primary" />}
                            label="Female"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="Others"
                            control={<Radio color="primary" />}
                            label="Others"
                            labelPlacement="end"
                        />
                    </RadioGroup>

                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    
                    <TextValidator
                        className="mb-4 w-full"
                        label="Name"
                        onChange={handleChange}
                        type="text"
                        name="name"
                        value={name || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />

                    <TextValidator
                        className="mb-4 w-full"
                        label="Email"
                        onChange={handleChange}
                        type="email"
                        name="email"
                        value={email || ''}
                        validators={['required', 'isEmail']}
                        errorMessages={[
                            'this field is required',
                            'email is not valid',
                        ]}
                    />
                    
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 w-full"
                        label="Address"
                        onChange={handleChange}
                        type="text"
                        name="address"
                        value={address || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                </Grid>
            </Grid>
            <Button id="personalFormSubmit" color="primary" variant="contained" type="submit" >
                <Icon >send</Icon>
                <span className="pl-2 capitalize" >Add Employee</span>
            </Button>
        </ValidatorForm>
    )
}

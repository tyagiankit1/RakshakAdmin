import React, { useState, useEffect } from 'react'
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
import Label from 'recharts/lib/component/Label'

export default function PersonalForm(props) {
    const [state, setState] = useState({})

    const handleSubmit = (event) => {
        console.log("submitted");
        console.log(event);
        // console.log("done");
        setState({
            ...state,
            "validate": true
        })
        // props.setDataStatus(true);
        props.submitPersonalData(state);
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
        category,
        gender,
        city,
        address
    } = state

    return (
        <ValidatorForm  onSubmit={handleSubmit} onError={() => null}>
            <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <div className="flex flex-wrap mb-6">
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
                    </div>
                    
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
                    <label>                        
                            <div className="flex items-center">                               
                                <span>Category</span>
                            </div>
                        
                        </label>
                    <RadioGroup
                        className="mb-4"
                        value={category || ''}
                        name="Category"
                        onChange={handleChange}
                        row
                        validators={[
                            'required'
                        ]}
                        errorMessages={['this field is required']}
                    >
                        <FormControlLabel
                            value="Airline"
                            control={<Radio color="primary" />}
                            label="Airline"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="Airport"
                            control={<Radio color="primary" />}
                            label="Airport"
                            labelPlacement="end"
                        />
                        
                    </RadioGroup>

                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    
                    <TextValidator
                        className="mb-4 w-full"
                        label=" Name"
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
                    
                    
                    <TextValidator
                        className="mb-4 w-full"
                        label="City"
                        onChange={handleChange}
                        type="text"
                        name="city"
                        value={city || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
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
            <Button id="personalFormSubmit" color="primary" variant="contained" type="submit" style={{display: 'none'}}>
                <Icon style={{display: 'none'}}>send</Icon>
                <span className="pl-2 capitalize" style={{display: 'none'}} >Submit</span>
            </Button>
        </ValidatorForm>
    )
}

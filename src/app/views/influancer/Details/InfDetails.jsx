import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import {
    Checkbox,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Grid,
    Button,
    Icon
} from '@material-ui/core'
// import InfDetailsDialog from './InfDetailsDialog';
// import { getInfluancerList } from './InfluancerFormService'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const categoryList = [
    {value: "Art, Culture And Literature", label: "Art, Culture And Literature"},
    {value: "Automobile", label: "Automobile"},
    {value: "Business, Finance And Management", label: "Business, Finance And Management"},
    {value: "Comedy", label: "Comedy"},
    {value: "Electronics, Gadgets And Technology", label: "Electronics, Gadgets And Technology"},
    {value: "Entertainment, Fashion And Lifestyle", label: "Entertainment, Fashion And Lifestyle"},
    {value: "Food Beverage And Hospitality", label: "Food Beverage And Hospitality"},
    {value: "Gaming And Sports", label: "Gaming And Sports"},
    {value: "Health And Fitness", label: "Health And Fitness"},
    {value: "Mom And Kids", label: "Mom And Kids"},
    {value: "Music", label: "Music"},
    {value: "Others", label: "Others"},
    {value: "Photography And Wildlife", label: "Photography And Wildlife"},
    {value: "Travel And Tourism", label: "Travel And Tourism"},
    {value: "Work And Education", label: "Work And Education"}
]

const platformList = [
    {value: "Facebook", label: "Facebook"},
    {value: "Youtube", label: "Youtube"},
    {value: "Instagram", label: "Instagram"},
    {value: "Twitter", label: "Twitter"},
    {value: "Tik-Tok", label: "Tik-Tok"},
    {value: "Moj", label: "Moj"},
    {value: "Josh", label: "Josh"}
]

const filter = createFilterOptions()

const InfDetails = (props) => {
    const [state, setState] = useState({})
    const infState = useSelector((state) => state.influancer) 
    const [isActive, setIsActive] = useState(true)

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
                priceTagValue: props.influancerData.priceTagValue,
                priceTag: props.influancerData.priceTag
            })
        }
    }, [isActive])

    const handleSubmit = (event) => {
        console.log("submitted");
        console.log(event);
        // props.setDetailStatus(true);
        props.saveDetails(state);
    }

    useEffect(() => {
        if(props.detailStatus){
            handleSubmit();
            // document.getElementById('detailsFormSubmit').click();
            // props.setDetailStatus(false);
        }
    }, [props.detailStatus])

    

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

    const filterOptions = (options, params) => {
        const filtered = filter(options, params)
        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                label: `Add "${params.inputValue}"`,
            })
        }
        return filtered
    }

    const handlePriceTagChange = (name) => (event) => {        
        // setPriceTag(event.target.checked);
        if(event.target.checked){
            setState({
                ...state,
                priceTag: true,
                priceTagValue: "On Request",
            })
        }else{
            setState({
                ...state,
                priceTag: false,
                priceTagValue: "",
            })
        }
    }

    const handleDropDownChange = (event, newValue) => {
        console.log("event: ", event);
        if (newValue && newValue.label) {
            setState({
                ...state,
                [event.target.id.split('-')[0]]: newValue.label,
            })
            return
        }
    }

    const {
        picture,
        name,
        email,
        contact,
        gender,
        city,
        address,
        category,
        platform,
        followers,
        price,
        priceTag,
        priceTagValue
    } = state

    return (
        <ValidatorForm  onSubmit={handleSubmit} onError={() => null}>
            <h5 className="mt-0 mb-4 text-muted">Personal Details</h5>
            <Grid container spacing={6}>            
                <Grid item lg={4} md={4} sm={12} xs={12}>
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
                <Grid item lg={4} md={4} sm={12} xs={12}>
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
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
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
            </Grid>
            <Grid container spacing={12}>            
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
            <h5 className="mt-0 mb-4 text-muted py-4">Professional Details</h5>
            <Grid container spacing={6}>            
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <div className="form-group">
                        <Autocomplete
                            className="mb-4 w-500"
                            value={category || ''}
                            name='category'
                            id='category'
                            onChange={handleDropDownChange}
                            filterOptions={filterOptions}
                            options={categoryList}
                            getOptionLabel={(option) => {
                                // e.g value selected with enter, right from the input
                                if (typeof option === 'string') {
                                    return option
                                }
                                if (option.inputValue) {
                                    return option.inputValue
                                }
                                return option.label
                            }}
                            renderOption={(option) => option.label}
                            // style={{ width: 400 }}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                    <FormControlLabel
                        value="priceTag"
                        control={<Checkbox color="primary" checked={priceTag} onChange={handlePriceTagChange(priceTag)} />}
                        label="On Request"
                        labelPlacement="end"
                    />
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                checked={priceTag}
                                onChange={handlePriceTagChange(priceTag)}
                                color="primary"
                                value="priceTag"
                            />
                        }
                        label="On Request"
                    /> */}
                    
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <div className="form-group">
                        <Autocomplete
                            className="mb-4 w-500"
                            value={platform || ''}
                            name='platform'
                            id='platform'
                            onChange={handleDropDownChange}
                            filterOptions={filterOptions}
                            options={platformList}
                            getOptionLabel={(option) => {
                                // e.g value selected with enter, right from the input
                                if (typeof option === 'string') {
                                    return option
                                }
                                if (option.inputValue) {
                                    return option.inputValue
                                }
                                return option.label
                            }}
                            renderOption={(option) => option.label}
                            // style={{ width: 400 }}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Platform"
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                    <TextValidator
                        className="mb-4 w-full"
                        label="Price Tag"
                        onChange={handleChange}
                        type="text"
                        name="priceTagValue"
                        disabled={priceTag}
                        value={priceTagValue || ''}
                        validators={[
                            'required'
                        ]}
                        errorMessages={['this field is required']}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 w-full"
                        label="Followers"
                        onChange={handleChange}
                        type="number"
                        name="followers"
                        value={followers || ''}
                        validators={[
                            'required'
                        ]}
                        errorMessages={['this field is required']}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Price"
                        onChange={handleChange}
                        type="number"
                        name="price"
                        disabled={priceTag}
                        value={price || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                </Grid>
            </Grid>
            <Button id="detailsFormSubmit" color="primary" variant="contained" type="submit" style={{display: 'none'}}>
                <Icon style={{display: 'none'}}>send</Icon>
                <span className="pl-2 capitalize" style={{display: 'none'}} >Submit</span>
            </Button>
        </ValidatorForm>
    )
}

export default InfDetails

import React, { useState, useEffect } from 'react'
import ReactSelect from 'react-select';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Fab,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    MenuItem,
    InputLabel,
    Select
} from '@material-ui/core'

export default function ProfessionalForm(props) {
    const [state, setState] = useState({
      form: {
        category: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        gender: null,
        language: [],
        country: null,
        zipCode: ""
      },
      formErrors: {
        category: null,
        email: null,
        mobile: null,
        password: null,
        confirmPassword: null,
        gender: null,
        language: null,
        country: null
      },
      onRequest: false,
      priceTagValue: '',
      price: ''
    })
      
    
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

    const handleSubmit = (event) => {
        const { formErrors } = state;
        const errorObj = validateForm(state, formErrors, validateField);
        if (Object.keys(errorObj).length !== 0) {
          setState({ formErrors: { ...formErrors, ...errorObj } });
          return false;
        }
        // props.setDataStatus(true);
        props.submitProfessionalData(state);
    };
    
    const validateField = (name, value, refValue) => {
        let errorMsg = null;
        switch (name) {
          case "name":
            if (!value) errorMsg = "Please enter Name.";
            break;
          case "platform":
            if (!value) errorMsg = "Please enter Mobile.";
            break;
          case "category":
            if (!value) errorMsg = "Please select Category.";
            break;
          default:
            break;
        }
        return errorMsg;
      };

      const validateForm = (form, formErrors, validateFunc) => {
        const errorObj = {};
        Object.keys(formErrors).map(x => {
          let refValue = null;
          if (x === "password" || x === "confirmPassword") {
            refValue = form[x === "password" ? "confirmPassword" : "password"];
          }
          const msg = validateFunc(x, form[x], refValue);
          if (msg) errorObj[x] = msg;
        });
        return errorObj;
      };

    if(props.professionalDataStatus){
        document.getElementById('professionalFormSubmit').click();  
        // props.setDataStatus(false);      
    }

    const handleChange = (event) => {
        // event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
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

    const {
        category,
        platform,
        followers,
        prize,
        priceTag
    } = state

    return (
        <ValidatorForm  onSubmit={handleSubmit} onError={() => null}>
            <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                <div className="form-group">
                    <label>
                        Category:<span className="asterisk">*</span>
                    </label>
                    <ReactSelect
                        name="category"
                        options={categoryList}
                        value={categoryList.find(x => x.value === state.category)}
                        onChange={e =>
                        handleChange({
                            target: {
                            name: "category",
                            value: e.value
                            }
                        })
                        }
                    />
                    {state.formErrors.category && <span className="err">{state.formErrors.category}</span>}
                </div>
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
                        disabled={state.priceTag}
                        value={state.price || ''}
                    />
                    

                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    
                    <div className="form-group">
                        <label>
                            Platform:<span className="asterisk">*</span>
                        </label>
                        <ReactSelect
                            name="platform"
                            options={platformList}
                            value={platformList.find(x => x.value === state.platform)}
                            onChange={e =>
                            handleChange({
                                target: {
                                name: "platform",
                                value: e.value
                                }
                            })
                            }
                        />
                        {state.formErrors.platform && <span className="err">{state.formErrors.platform}</span>}
                    </div>
                    <div className="form-group">
                    <label>
                        Price Tag: &nbsp;&nbsp;
                    </label>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.priceTag}
                                onChange={handlePriceTagChange(priceTag)}
                                color="primary"
                                value="priceTag"
                            />
                        }
                        label="On Request"
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Price Tag"
                        onChange={handleChange}
                        type="text"
                        name="priceTagValue"
                        disabled={state.priceTag}
                        value={state.priceTagValue || ''}
                        validators={[
                            'required'
                        ]}
                        errorMessages={['this field is required']}
                    />
                    </div>

                </Grid>
                
            </Grid>
            <Button id="professionalFormSubmit" color="primary" variant="contained" type="submit" style={{display: 'none'}}>
                <Icon style={{display: 'none'}}>send</Icon>
                <span className="pl-2 capitalize" style={{display: 'none'}} >Submit</span>
            </Button>
        </ValidatorForm>
    )
}

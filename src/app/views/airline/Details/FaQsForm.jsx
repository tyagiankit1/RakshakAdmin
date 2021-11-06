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

export default function FaQsForm(props) {
    const [state, setState] = useState({})

    const handleSubmit = (event) => {
        console.log("submitted");
        console.log(event);
        setState({
            ...state,
            "validate": true
        })
        // props.setDataStatus(true);
        let faqs = [];
        if(state.que1 !== undefined && state.que1 !== ""){
            faqs.push({que: state.que1, ans: state.ans1});
        }
        if(state.que2 !== undefined && state.que2 !== ""){
            faqs.push({que: state.que2, ans: state.ans2});
        }
        if(state.que3 !== undefined && state.que3 !== ""){
            faqs.push({que: state.que3, ans: state.ans3});
        }
        if(state.que4 !== undefined && state.que4 !== ""){
            faqs.push({que: state.que4, ans: state.ans4});
        }
        if(state.que5 !== undefined && state.que5 !== ""){
            faqs.push({que: state.que5, ans: state.ans5});
        }
        props.submitFaQData(faqs);
    }
    
    if(props.faqDataStatus){
        document.getElementById('FaQsFormSubmit').click();
        // props.setDataStatus(false);
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const {
        que1,
        ans1,
        que2,
        ans2,
        que3,
        ans3,
        que4,
        ans4,
        que5,
        ans5
    } = state

    return (
        <ValidatorForm  onSubmit={handleSubmit} onError={() => null}>
            <Grid container spacing={6}>
                
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 w-full"
                        label="Question 1"
                        onChange={handleChange}
                        type="text"
                        name="que1"
                        value={que1 || ''}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Answere 1"
                        onChange={handleChange}
                        type="text"
                        name="ans1"
                        value={ans1 || ''}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 w-full"
                        label="Question 2"
                        onChange={handleChange}
                        type="text"
                        name="que2"
                        value={que2 || ''}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Answere 2"
                        onChange={handleChange}
                        type="text"
                        name="ans2"
                        value={ans2 || ''}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 w-full"
                        label="Question 3"
                        onChange={handleChange}
                        type="text"
                        name="que3"
                        value={que3 || ''}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Answere 3"
                        onChange={handleChange}
                        type="text"
                        name="ans3"
                        value={ans3 || ''}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 w-full"
                        label="Question 4"
                        onChange={handleChange}
                        type="text"
                        name="que4"
                        value={que4 || ''}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Answere 4"
                        onChange={handleChange}
                        type="text"
                        name="ans4"
                        value={ans4 || ''}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 w-full"
                        label="Question 5"
                        onChange={handleChange}
                        type="text"
                        name="que5"
                        value={que5 || ''}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Answere 5"
                        onChange={handleChange}
                        type="text"
                        name="ans5"
                        value={ans5 || ''}
                    />
                </Grid>
            </Grid>
            <Button id="FaQsFormSubmit" color="primary" variant="contained" type="submit" style={{display: 'none'}}>
                <Icon style={{display: 'none'}}>send</Icon>
                <span className="pl-2 capitalize" style={{display: 'none'}} >Submit</span>
            </Button>
        </ValidatorForm>
    )
}

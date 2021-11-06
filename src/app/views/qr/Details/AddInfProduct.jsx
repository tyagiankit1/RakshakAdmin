import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
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
import { Breadcrumb, SimpleCard } from 'app/components'
import useAuth from 'app/hooks/useAuth'
import { saveInfProduct } from '../QRFormService'
import StepForm from './StepForm'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const typeOptions = [
    { label: 'Premium Media' },
    { label: 'Popular Media' },
    { label: 'Other Media' }
]
const filter = createFilterOptions()
export default function AddInfProduct(props) {
    const { user } = useAuth()
    const classes = useStyles()
    const theme = useTheme()
    const infState = useSelector((state) => state.influancer)
    const [state, setState] = useState({})
    const [open, setOpen] = React.useState(false)
    const [fullWidth] = React.useState(true)
    const [maxWidth] = React.useState('md')
    const [stepList, setStepList] = React.useState(<StepForm id='0' />)
    const [stepCount, setStepCount] = React.useState(0);
    const [value, setValue] = React.useState(null)

    const handleSubmit = (event) => {
        console.log("submitted");
        console.log(event);
        let payload = {
            influencer_id: props.influancerData.influencer_id,
            name: state.name,
            type: state.type,
            info: state.info,
            rate_type: state.rateType,
            fixed_rate: state.fixedRate,
            card_rate: state.cardRate,
            offer_rate: state.offerRate,
            status: 'Active',
            step: {},
            "approved_by": user.id,
            "created_by": user.id,
            "updated_id": user.id
        }
        saveInfProduct(infState, payload).then(( data ) => {
            console.log("response: ", data);
          })
        console.log("payload: ", payload);
    }

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDropDownChange = (event, newValue) => {
        if (newValue && newValue.label) {
            setState({
                ...state,
                'type': newValue.label,
            })
            return
        }
    }

    const addStep = (event) => {
        let temp = stepCount;
        setStepCount(temp+1);
        document.getElementById('step'+(stepCount)).append(<StepForm keyVal={temp} />)

        // setStepList(temp);
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
    const {
        picture,
        name,
        info,
        type,
        rateType,
        fixedRate,
        offerRate,
        cardRate,
        address
    } = state

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12} className="text-center">
                    <Fab
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleClickOpen}
                    >
                        <Icon className="mr-2">add</Icon>
                        Add Media Options & Pricing
                    </Fab>
                </Grid>
            </Grid>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Influancer Product details</DialogTitle>
                <DialogContent>
                <ValidatorForm  onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={12}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 w-full"
                        label="Type"
                        onChange={handleChange}
                        type="text"
                        name="name"
                        value={name || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    
                    <RadioGroup
                        className="mb-4"
                        value={rateType || ''}
                        name="rateType"
                        onChange={handleChange}
                        row
                        validators={[
                            'required'
                        ]}
                        errorMessages={['this field is required']}
                    >
                        <FormControlLabel
                            value="On Request"
                            control={<Radio color="primary" />}
                            label="On Request"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="Fixed Rate"
                            control={<Radio color="primary" />}
                            label="Fixed Rate"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="Other"
                            control={<Radio color="primary" />}
                            label="Other"
                            labelPlacement="end"
                        />
                    </RadioGroup>
                    {
                        rateType === 'Fixed Rate' 
                        ? <TextValidator
                        className="mb-4 w-full"
                        label="Fixed Rate"
                        onChange={handleChange}
                        type="text"
                        name="fixedRate"
                        value={fixedRate || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    : rateType === 'Other' 
                    ? <TextValidator
                            className="mb-4 w-full "
                            label="Offer Rate"
                            onChange={handleChange}
                            type="text"
                            name="offerRate"
                            value={offerRate || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        : ''
                    }
                    
                    
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    
                    {/* <Autocomplete
                        className="mb-4 w-600"
                        options={typeOptions}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                value={params}
                                name="type"
                                label="Type"
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    /> */}
                    <Autocomplete
                        className="mb-4 w-500"
                        value={type || ''}
                        name='type'
                        onChange={handleDropDownChange}
                        filterOptions={filterOptions}
                        options={typeOptions}
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
                        style={{ width: 400 }}
                        freeSolo
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Category"
                                fullWidth
                            />
                        )}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Info"
                        onChange={handleChange}
                        type="text"
                        name="info"
                        value={info || ''}
                        validators={['required']}
                        errorMessages={[
                            'this field is required',
                        ]}
                    />
                    {
                        rateType === 'Other' 
                        ? <TextValidator
                            className="mb-4 w-full"
                            label="Card Rate"
                            onChange={handleChange}
                            type="text"
                            name="cardRate"
                            value={cardRate || ''}
                            validators={['required']}
                            errorMessages={[
                                'this field is required',
                            ]}
                        />
                        : ''
                    }
                    
                    
                    
                </Grid>
                
            </Grid>
            <Grid container spacing={6} title="test title">
                {stepList}
                <Grid item lg={2} md={2} sm={12} xs={12}>
                    <IconButton size="small" onClick={addStep}>
                        <Icon>add</Icon>                       
                    </IconButton>
                </Grid>
            </Grid>
            </ValidatorForm>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

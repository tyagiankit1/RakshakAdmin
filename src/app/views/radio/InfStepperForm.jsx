import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import PersonalForm from './Details/PersonalForm'
import ProfessionalForm from './Details/ProfessionalForm'
import EditorForm from './Details/EditorForm'
import FaQsForm from './Details/FaQsForm'

import useAuth from 'app/hooks/useAuth'
import { saveInfData, updateInfData } from './InfluancerFormService'

import PropTypes from 'prop-types'
import clsx from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import { amber, green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles } from '@material-ui/core/styles'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

const useStyles1 = makeStyles((theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}))

function MySnackbarContentWrapper(props) {
    const classes = useStyles1()
    const { className, message, onClose, variant, ...other } = props
    const Icon = variantIcon[variant]

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    )
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
        .isRequired,
}

export default function StepperForm() {
    const { user } = useAuth()
    const infState = useSelector((state) => state.influancer)
    const [state, setState] = useState({})
    const [personalData, setPersonalData] = useState({})
    // const [personalDataStatus, setPersonalDataStatus] = useState(false);    
    const [professionalData, setProfessionalData] = useState({})
    // const [professionalDataStatus, setProfessionalDataStatus] = useState(false);
    const [infId, setInfId] = useState("");  
    const [editorData, setEditorData] = useState("");
    // const [editorDataStatus, setEditorDataStatus] = useState(false);
    const [faqData, setFaqData] = useState([]);
    // const [faqDataStatus, setFaqDataStatus] = useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [snackBarVariant, setSnackBarVariant] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const steps = getSteps()

    const [open, setOpen] = React.useState(false)
    
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    const handleNext = () => {

        if(activeStep === 0){
            setState({
                ...state,
                'personalDataStatus': true,
            })
            // setPersonalDataStatus(true);
        }else if(activeStep === 1){
            setState({
                ...state,
                'professionalDataStatus': true,
            })
            // setProfessionalDataStatus(true);
        }else if(activeStep === 2){
            setState({
                ...state,
                'editorDataStatus': true,
            })
            // setEditorDataStatus(true);
        }else {
            setState({
                ...state,
                'faqDataStatus': true,
            })
            // setFaqDataStatus(true);
        }

        
    }

    if(personalData && personalData.validate){
        setActiveStep((prevActiveStep) => 1);
        personalData.validate = false;
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    function getSteps() {
        return [
            'Personal Details',
            'Professional Details',
            'Influancer Data',
            'Influancer FAQs',
        ]
    }
    
    function savePersonalDetails(personalData) {
        if(personalData && state.personalDataStatus ){
            setState({
                ...state,
                'personalDataStatus': false,
            })
            // setPersonalDataStatus(false);
            setPersonalData(personalData);
        }
    }

    const createRequestPayload = (status, type, professionalData, editorData, faqData) => {
        return {  
            "name": personalData.name,   
            "image": personalData.picture,  
            "followers": professionalData.followers,   
            "city": personalData.city,   
            "address":personalData.address,   
            "category": professionalData.category,     
            "platform": professionalData.platform,    
            "gender": personalData.gender,   
            "prize": professionalData.price,   
            "prize_tag": professionalData.priceTagValue,   
            "email":personalData.email,   
            "contact": personalData.contact,   
            "data": editorData,
            "faq": faqData,
            "status": status, 
            "created_by": user.id,
            "updated_id": user.id
          }
    }

    function saveProfessionalDetails(professionalData) {
        if(professionalData && state.professionalDataStatus ){
            setState({
                ...state,
                'professionalDataStatus': false,
            })
            // setProfessionalDataStatus(false);
            setProfessionalData(professionalData);
              saveInfData(infState, createRequestPayload("Draft", "create", professionalData, editorData, faqData)).then(( data ) => {
                console.log("response: ", data);
                setInfId(data.data);
                // setOpen(true);
                // setIsAlive(false)
                // if (isAlive) setInfluancerDataList(data)
                setActiveStep((prevActiveStep) => 2);
              })
            // setActiveStep((prevActiveStep) => 2);
        }
    }

    function saveEditorDetails(editorData) {
        if(editorData && state.editorDataStatus){
            console.log("editorData: ", editorData);
            setState({
                ...state,
                'editorDataStatus': false,
            })
            // setEditorDataStatus(false);
            setEditorData(editorData);
            setProfessionalData(professionalData);
              let payload = {influencer_id: infId, update_data: createRequestPayload("Draft", "update", professionalData, editorData, faqData)}
              updateInfData(infState, payload).then(( data ) => {
                console.log("response: ", data);
                setActiveStep((prevActiveStep) => 3);
              })
        }
    }

    function saveFaQDetails(faqData) {
        if(faqData && state.faqDataStatus){
            console.log("editorData: ", faqData);
            setState({
                ...state,
                'faqDataStatus': false,
            })
            // setFaqDataStatus(false);
            setFaqData(faqData);
              let payload = {influencer_id: infId, update_data: createRequestPayload("Draft", "update", professionalData, editorData, faqData)}
              updateInfData(infState, payload).then(( data ) => {
                console.log("response: ", data);
                // setInfId(data.data);
                // setActiveStep((prevActiveStep) => 3);
              })
        }
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <PersonalForm submitPersonalData={savePersonalDetails} personalDataStatus={state.personalDataStatus} />
            case 1:
                return <ProfessionalForm submitProfessionalData={saveProfessionalDetails} professionalDataStatus={state.professionalDataStatus} />
            case 2:
                return <EditorForm submitEditorData={saveEditorDetails} editorDataStatus={state.editorDataStatus} />
            default:
                return <FaQsForm submitFaQData={saveFaQDetails} faqDataStatus={state.faqDataStatus} />
        }
    }

    const {
        personalDataStatus,
        professionalDataStatus,
        editorDataStatus,
        faqDataStatus
    } = state

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography>All steps completed</Typography>
                        <Button
                            className="mt-4"
                            variant="contained"
                            color="secondary"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <div className="pt-4">
                            <Button
                                className="ml-4"
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                {
                                    activeStep === steps.length - 1
                                    ? 'Submit'
                                    : (activeStep === 0 
                                    ? 'Next'
                                    : 'Save as Draft')}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant={snackBarVariant}
                    message={snackBarMessage}
                />
            </Snackbar>
        </div>
    )
}
// const variantIcon = {
//     success: CheckCircleIcon,
//     warning: WarningIcon,
//     error: ErrorIcon,
//     info: InfoIcon,
// }

// const useStyles1 = makeStyles((theme) => ({
//     success: {
//         backgroundColor: green[600],
//     },
//     error: {
//         backgroundColor: theme.palette.error.dark,
//     },
//     info: {
//         backgroundColor: theme.palette.primary.main,
//     },
//     warning: {
//         backgroundColor: amber[700],
//     },
//     icon: {
//         fontSize: 20,
//     },
//     iconVariant: {
//         opacity: 0.9,
//         marginRight: theme.spacing(1),
//     },
//     message: {
//         display: 'flex',
//         alignItems: 'center',
//     },
// }))
// function SnackbarComponent(props) {
//     const classes = useStyles1()
//     const { className, message, onClose, variant, ...other } = props
//     const Icon = variantIcon[variant]

//     return (
//         <SnackbarContent
//             className={clsx(classes[variant], className)}
//             aria-describedby="client-snackbar"
//             message={
//                 <span id="client-snackbar" className={classes.message}>
//                     <Icon className={clsx(classes.icon, classes.iconVariant)} />
//                     {message}
//                 </span>
//             }
//             action={[
//                 <IconButton
//                     key="close"
//                     aria-label="Close"
//                     color="inherit"
//                     onClick={onClose}
//                 >
//                     <CloseIcon className={classes.icon} />
//                 </IconButton>,
//             ]}
//             {...other}
//         />
//     )
// }

// SnackbarComponent.propTypes = {
//     className: PropTypes.string,
//     message: PropTypes.node,
//     onClose: PropTypes.func,
//     variant: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
//         .isRequired,
// }

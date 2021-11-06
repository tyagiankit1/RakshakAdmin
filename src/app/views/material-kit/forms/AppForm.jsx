import React from 'react'
import SimpleForm from './SimpleForm'
import StepperForm from './StepperForm'

import EditorForm from './EditorForm'
import UploadForm from './UploadForm'
import WizardForm from './WizardForm'

import { Breadcrumb, SimpleCard } from 'app/components'

const AppForm = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Material', path: '/material' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Simple Form">
                <SimpleForm />
            </SimpleCard>
            <div className="py-3" />
            <SimpleCard title="stepper form">
                <StepperForm />
            </SimpleCard>

            <SimpleCard title="stepper form">
                <EditorForm />
            </SimpleCard>
            <SimpleCard title="stepper form">
                <WizardForm />
            </SimpleCard>
            <SimpleCard title="stepper form">
                <UploadForm />
            </SimpleCard>
        </div>
    )
}

export default AppForm

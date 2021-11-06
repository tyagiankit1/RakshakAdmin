import React from 'react'
import InfStepperForm from './InfStepperForm'
import { SimpleCard } from 'app/components'

const InfluancerCreate = () => {
    return (
        <div className="m-sm-30">
            <div className="py-3" />
            <SimpleCard title="Add New Influancer">
                <InfStepperForm />
            </SimpleCard>
        </div>
    )
}

export default InfluancerCreate

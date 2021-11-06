import React from 'react'
import InfStepperForm from './InfStepperForm'
import PersonalForm from './Details/PersonalForm'
import { SimpleCard } from 'app/components'

const EmployeeCreate = () => {
    return (
        <div className="m-sm-30">
            <div className="py-3" />
            <SimpleCard title="Add New Employee">
                <PersonalForm />
            </SimpleCard>
        </div>
    )
}

export default EmployeeCreate

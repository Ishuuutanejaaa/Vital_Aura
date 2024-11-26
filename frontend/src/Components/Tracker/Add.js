import React, { useState } from 'react'
import { addMedication } from '../Tracker/Api'
import MedicationNew from '../Tracker/MedicationNew'
import FormCompleteMsg from '../Tracker/FormCompleteMsg'

function Add() {
    const [submitMsg, setSubmitMsg] = useState({ msg: '', state: false })
    const [redirectHome, setRedirectHome] = useState(false)


    const addMedicationHandler = async (medDetails) => {
        try {
            const med = await addMedication(medDetails);
            console.log(med); // Log the response from the API
            setSubmitMsg({ msg: 'Medication added, add another or ', state: true });
        } catch (e) {
            console.log(e);
            setSubmitMsg({ msg: 'Something went wrong, try again.', state: false });
        }
    }

    return (
        <React.Fragment>
            <FormCompleteMsg submitMsg={submitMsg}
                setRedirectHome={setRedirectHome}
                redirectHome={redirectHome}
            />
            <MedicationNew submitHandler={addMedicationHandler}
                pageTitle={'Enter Medication'}
                medication={{
                    name: '',
                    totalQuantity: '',
                    dosage: '',
                    startDate: '',
                    frequency: '',
                    time: '',
                    reminder: '',
                    notes: ''
                }} />

        </React.Fragment>
    )

}

export default Add
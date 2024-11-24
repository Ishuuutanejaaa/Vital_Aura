import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getMedicationById, editMedication } from '../Api'
import MedicationNew from './MedicationNew'
import FormCompleteMsg from './FormCompleteMsg'

function Edit(props) {
    let { id } = useParams()

    let [medication, setMedication] = useState(null)

    const [submitMsg, setSubmitMsg] = useState({ msg: '', state: false })
    const [redirectHome, setRedirectHome] = useState(false)


    useEffect(() => {
        getMedication()
    }, [])

    const getMedication = async () => {
        const data = await getMedicationById(id)
        console.log(data, 'data')
        console.log('edit page id ' + id)
        setMedication(data.data)
    }


    const submitHandler = async (medData) => {
        try {
            const data = await editMedication(medication._id, medData)
            setSubmitMsg({ msg: "Medication Updated, edit another?", state: true })
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <React.Fragment>
            {
                !medication && <p>loading...</p>
            }
            {
                medication && <MedicationNew pageTitle={'Edit Medication'}
                    medication={medication} submitHandler={submitHandler} />
            }
            <FormCompleteMsg submitMsg={submitMsg}
                setRedirectHome={setRedirectHome}
                redirectHome={redirectHome} />
        </React.Fragment>
    )
}

export default Edit
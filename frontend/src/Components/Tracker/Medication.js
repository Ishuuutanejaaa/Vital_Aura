import React, { useState, useEffect } from 'react'
import './Medication.css'
import { Jumbotron } from 'reactstrap'
import { Redirect } from 'react-router-dom'

import MedicationDisplay from './MedicationDisplay'
import { getMedicationsList } from '../Api'


const Medication = (props) => {

    const [medications, setMedications] = useState([])
    const [editMedication, setEditMedication] = useState(null)

    useEffect(() => {
        refreshMedicationList()

    }, [])

    const refreshMedicationList = async () => {
        const medList = await getMedicationsList()
        setMedications(medList)
    }

    const editMed = (medID) => {
        // console.log('editMed ', medID)
        setEditMedication(medID)
        console.log('editMed again ', medID)
    }

    return (
        <div>

            <Jumbotron className='Jumbo'>
                <h1 className="display-3">Medication Tracker</h1>
                <p className="lead">Welcome, to your personal medication/supplement tracking app. </p>
            </Jumbotron>

            <MedicationDisplay medications={medications} editMed={editMed} />
            <React.Fragment>
                {
                    editMedication && <Redirect to={`/edit/id:${editMedication}`} />
                }
            </React.Fragment>
        </div>
    )
}

export default Medication
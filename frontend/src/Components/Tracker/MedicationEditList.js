import React, { useState, useEffect } from 'react'
import { Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import { getMedicationsList, deleteMedication } from '../Api'


const EditList = () => {

    const [medications, setMedications] = useState([])

    useEffect(() => {
        refreshMedicationList()

    }, [])

    const refreshMedicationList = async () => {
        const medList = await getMedicationsList()
        setMedications(medList)
    }


    const deleteMedHandler = async (id) => {
        const data = await deleteMedication(id)
        setMedications(medications.filter((medication) => medication._id !== data.data._id))
    }

    return (

        <Table hover>
            <thead>
                <tr>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Frequency Taken</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>

            {medications.map((medication) => {
                return (
                    <tbody>
                        <tr >
                            <th scope="row" key={medication._id}>{medication.name}</th>
                            <td>{medication.dosage}</td>
                            <td>{medication.frequency}</td>
                            <td><Link to={`/edit/${medication._id}`}><Button>Edit</Button></Link>
                            </td>
                            <td><Button onClick={() => deleteMedHandler(medication._id)} >
                                Delete
                        </Button></td>
                        </tr>
                    </tbody>
                )
            })}
        </Table >
    )
}

export default EditList
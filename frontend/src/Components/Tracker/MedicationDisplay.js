import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';

import { updateMedicationStatus,getMedications } from '../Tracker/Api'; // Import your API function to update medication status



const MedicationDisplay = (props) => {
    const [medications, setMedications] = useState([]);

//for checkbox
    //  // Function to handle checkbox change
    //  const handleCheckboxChange = (medicationId) => {
    //     const today = moment().format('YYYY-MM-DD');
         
    // // Call your API to update the medication taken status
    //    //await updateMedicationStatus(medicationId, { date: today, status: true });


    //     // Update the medication's taken status in state or send to backend
    //     // You might want to create a function to update the medication status in your database
    //     console.log(`Medication ${medicationId} marked as taken.`);
    // };

    const handleCheckboxChange = async (medicationId, isChecked) => {
        const today = moment().format('YYYY-MM-DD');
    
        if (isChecked) {
            // Call your API to update the medication taken status when checked
            await updateMedicationStatus(medicationId, { date: today, status: true });
    
            // Update the local state to reflect the change (mark as taken)
            setMedications(prevMedications => 
                prevMedications.map(med => 
                    med._id === medicationId 
                        ? { ...med, taken: [...med.taken, { date: today, status: true }] } 
                        : med
                )
            );
    
            console.log(`Medication ${medicationId} marked as taken.`);
        } else {
            // Call your API to update the medication taken status when unchecked
            await updateMedicationStatus(medicationId, { date: today, status: false });
    
            // Update the local state to reflect the change (mark as not taken)
            setMedications(prevMedications => 
                prevMedications.map(med => 
                    med._id === medicationId 
                        ? { ...med, taken: med.taken.filter(t => t.date !== today) } // Remove the taken record for today
                        : med
                )
            );
    
            console.log(`Medication ${medicationId} marked as not taken.`);
        }
    };
  
   
    
    
    useEffect(() => {
        const lastCheckedDate = localStorage.getItem('lastCheckedDate');
        const today = moment().format('YYYY-MM-DD');
    
        if (lastCheckedDate !== today) {
            // Resetting taken status for all medications in your state
            setMedications(prevMedications => 
                prevMedications.map(med => ({ ...med, taken: [] }))
            );
            localStorage.setItem('lastCheckedDate', today);
        }
    }, []);




    // Fetch medications when the component mounts
    // useEffect(() => {
    //     const fetchMedications = async () => {
    //         const response = await getMedications(); // Fetch medications from your API
    //         setMedications(response.data);
    //     };

    //     fetchMedications();
    // }, []);

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const response = await getMedications(); // Fetch medications from your API
                console.log('Fetched Medications:', response.data); // Log the fetched medications
                setMedications(response.data); // Set the state with the fetched medications
            } catch (error) {
                console.error('Error fetching medications:', error); // Log any errors
            }
        };
    
        fetchMedications();
    }, []);



    

    let medDaily = []
    props.medications.map((eachMed) => {

        if (eachMed.time.length) {
            eachMed.time.map(t => {
                const newMed = { ...eachMed }
                newMed.time = t
                medDaily.push(newMed)
            })
        }
    })
    // console.log("medDaily", medDaily)

    let daily = []
    let weekly = []

    daily = medDaily.filter((eachMed) => {
        return eachMed.frequency === "Daily"
    })

    weekly = medDaily.filter((eachMed) => {
        return eachMed.frequency === "Weekly"
    })

    //compare function within sort function. 
    const compare = (a, b) => {
        // console.log(moment(a.time, 'MMMM D, YYYY HH:MM'))
        if (moment(a.time, 'MMMM D, YYYY HH:MM').isBefore(moment(b.time, 'MMMM D, YYYY HH:MM'))) {
            return -1
        } else {
            return 1
        }
    }

    daily.sort(compare)
    weekly.sort(compare)

    medDaily = [...daily, ...weekly]

    const date = moment().format('YYYY-MM-DD'); // or any format you need
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Medication</th>
                    <th>Dose</th>
                    <th>Schedule</th>
                    {/* <th>Start Day</th> */}
                    <th>Time</th>
                    <th>Notes</th>
                    <th>Taken</th>
                </tr>
            </thead>

            <tbody>
            {medDaily.length && medDaily.map((medication) => {
              const isTaken = medication.taken && medication.taken.some(t => moment(t.date).isSame(moment(), 'day'));
              return (
            <tr key={medication._id}>
            <th scope="row">{medication.name}</th>
            <td>{medication.dosage}</td>
            <td>{medication.frequency}</td>
            <td>{moment(`${date} ${medication.time}`).format('h:mm a')}</td>
            <td>{medication.notes}</td>
            <td>
    <input 
        type="checkbox" 
        checked={isTaken} 
        onChange={(e) => handleCheckboxChange(medication._id, e.target.checked)} 
    />
</td>
            
        </tr>
    );
})}
            </tbody>
        </Table >
    );
}

export default MedicationDisplay;
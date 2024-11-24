import React, { useState } from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { DatePicker, Space } from 'antd'

const MedicationNew = (props) => {

    const [name, setName] = useState(props.medication.name)
    const [totalQuantity, setTotalQuantity] = useState(props.medication.totalQuantity)
    const [dosage, setDosage] = useState(props.medication.dosage)
    const [startDate, setStartDate] = useState(props.medication.startDate)
    const [frequency, setFrequency] = useState(props.medication.frequency)
    const [time, setTime] = useState(props.medication.time)
    const [reminder, setReminder] = useState(props.medication.reminder)
    const [notes, setNotes] = useState(props.medication.notes)

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !totalQuantity || !dosage || !startDate || !frequency || time.length === 0 || reminder.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }
        

        props.submitHandler({
            name,
            totalQuantity,
            dosage,
            startDate,
            frequency,
            time,
            reminder,
            notes,
            owner: 'user_id_or_username'
        }).then(() => {

        })

        setName('')
        setTotalQuantity('')
        setDosage('')
        setStartDate('')
        setFrequency('')
        setTime([])
        setReminder([])
        setNotes('')
    }

    function addSelectedTimes(event) {
        // console.log(event.target.value)
        const selectedOptions = [...event.target.selectedOptions].map(o => o.value)
        setTime(selectedOptions)
        // console.log(selectedOptions)
    }

    function addSelectedReminder(event) {
        const selectedOptions = [...event.target.selectedOptions].map(o => o.value)
        setReminder(selectedOptions)
    }

    function onChangeStartDate(date, dateString) {
        console.log(date, dateString);
        setStartDate(dateString)
    }

    return (
        <>

            <Form onSubmit={handleSubmit} >
                <FormGroup row>
                    <Label for="name" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Input
                            type="name"
                            name="name"
                            id="name"
                            placeholder="Add Medication/Suppliment name"
                            onChange={(e) => setName(e.currentTarget.value)}
                            value={name}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="totalQuantity" sm={2}>Total Quantity</Label>
                    <Col sm={10}>
                        <Input
                            type="totalQuantity"
                            name="totalQuantity"
                            id="totalQuantity"
                            placeholder="Add Total quantity of medication in bottle"
                            onChange={(e) => setTotalQuantity(e.currentTarget.value)}
                            value={totalQuantity}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="dosage" sm={2}>Dosage</Label>
                    <Col sm={10}>
                        <Input
                            type="dosage"
                            name="dosage"
                            id="dosage"
                            placeholder="Add Dosage taken in (ie 1 pill)"
                            onChange={(e) => setDosage(e.currentTarget.value)}
                            value={dosage}
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="frequency" sm={2}>Start Date</Label>
                    <Col sm={10}>
                        <Space direction="vertical">
                            <DatePicker onChange={onChangeStartDate} />
                        </Space>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="frequency" sm={2}>Frequency Taken</Label>
                    <Col sm={10}>
                        <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                            onChange={(e) => setFrequency(e.currentTarget.value)}
                        // defaultValue={{ label: "Daily", value: "Daily" }} not currently working... 
                        //find way to use default to Daily not the cheat below!!!
                        >
                            <option>Select your frequency</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>

                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="selectMulti" sm={2}>Set Time/s Taken</Label>
                    <Col sm={10}>
                        <Input
                            type="select"
                            name="selectMulti"
                            id="selectMulti"
                            multiple={true}
                            onChange={(event) => {
                                addSelectedTimes(event)
                            }}
                        >
                            <option value="07:00">7am</option>
                            <option value="08:00">8am</option>
                            <option value="09:00">9am</option>
                            <option value="10:00">10am</option>
                            <option value="11:00">11am</option>
                            <option value="12:00">12pm</option>
                            <option value="13:00">1pm</option>
                            <option value="14:00">2pm</option>
                            <option value="15:00">3pm</option>
                            <option value="16:00">4pm</option>
                            <option value="17:00">5pm</option>
                            <option value="18:00">6pm</option>
                            <option value="19:00">7pm</option>
                            <option value="20:00">8pm</option>
                            <option value="21:00">9pm</option>
                        </Input>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="selectMulti" sm={2}>Set Reminder/s</Label>
                    <Col sm={10}>
                        <Input
                            type="select"
                            name="selectMulti"
                            id="selectMulti"
                            multiple={true}
                            onChange={(event) => {
                                addSelectedReminder(event)
                            }}
                        >
                            <option value="300">5 minutes</option>
                            <option value="600">10 minutes</option>
                            <option value="900">15 minutes</option>
                            <option value="1800">30 minutes</option>
                        </Input>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="exampleText" sm={2}>Personal Notes</Label>
                    <Col sm={10}>
                        <Input
                            type="textarea"
                            name="text"
                            id="exampleText"
                            onChange={(e) => setNotes(e.currentTarget.value)}
                            value={notes}
                        />
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button input type="submit">Submit</Button>
                    </Col>
                    <Col></Col>
                </FormGroup>
            </Form >
        </>
    )
}

export default MedicationNew
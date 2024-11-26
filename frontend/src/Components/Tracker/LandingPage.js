import React from 'react'
import { Jumbotron, Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import './Landing.css'

function LandingPage() {
    let history = useHistory()
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Medication Tracker</h1>
                <p className="lead">A medication or herbal supplement tracking application.
                Add add new medication, with your daily dosage and timeframes to take it.
                You can set reminders on when to take your medication
                And track when you will need to purchase more when your stock is running low.
                </p>
                <hr className="my-2" />
                <p>Login or create an account to get started.</p>
                <p className="lead">
                    <Button onClick={() => { history.push('/login') }}>
                        Login
                </Button>
                </p>
            </Jumbotron>
        </div>
    );
}

export default LandingPage
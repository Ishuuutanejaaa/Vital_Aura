import React from 'react'
import { Redirect } from 'react-router-dom'
import { Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'

//added 
import { DatePicker, Space } from 'antd';


function FormCompleteMsg(props) {

    return (
        <React.Fragment>
            {
                props.submitMsg.msg.length > 0 &&
                <React.Fragment>
                    <Space>
                        <Alert color="info">{props.submitMsg.msg}
                            {
                                props.submitMsg.state &&
                                <Button onClick={() => props.setRedirectHome(true)}>
                                    Go to Profile
                        </Button>
                            }
                        </Alert>
                    </Space>
                </React.Fragment>
            }
            {
                props.redirectHome && <Redirect to='/profile' />
            }
        </React.Fragment>
    )
}
export default FormCompleteMsg
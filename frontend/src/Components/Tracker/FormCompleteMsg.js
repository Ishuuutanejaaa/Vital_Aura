import React from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate instead of Redirect
import { Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

// Added
import { DatePicker, Space } from 'antd';

function FormCompleteMsg(props) {
    return (
        <React.Fragment>
            {
                props.submitMsg.msg.length > 0 &&
                <React.Fragment>
                    <Space>
                        <Alert color="info">
                            {props.submitMsg.msg}
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
                // Ensure the Navigate component is wrapped in parentheses
                props.redirectHome && (
                    <Navigate to='/profile' />
                )
            }
        </React.Fragment>
    );
}

export default FormCompleteMsg;

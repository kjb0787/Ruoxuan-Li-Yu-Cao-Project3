import './JobPane.css';
import React from 'react';
import { useNavigate } from 'react-router';
import { Card } from 'react-bootstrap';

export function JobPane(props) {
    const navigate = useNavigate();

    const goToDetails = () => {
        console.log("job id: " + props.jobId);
        navigate('/job', {
            state: {
                jobId: props.jobId
            }
        });
    }

    return (
        <div class="searchResult" onClick={goToDetails}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Job Title: {props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Location: {props.location}</Card.Subtitle>
                    <Card.Text>
                        Company Name: {props.companyName}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
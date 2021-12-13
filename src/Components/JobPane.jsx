import './JobPane.css';
import React from 'react';
import { useNavigate } from 'react-router';

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
            <div>
                Job Title: {props.title}
            </div>
            <div>
                Location: {props.location}
            </div>
            <div>
                Company Name: {props.companyName}
            </div>
        </div>
    );
}
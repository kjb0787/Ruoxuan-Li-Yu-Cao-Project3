import axios from "axios";
import { useState } from "react";
import { Navigation } from "./Navigation";
import { useNavigate, useLocation } from 'react-router';
import Button from 'react-bootstrap/Button'
import { getToken } from "../util/auth";
import "./Container.css"

export default function CreateJob(props) {
    const navigate = useNavigate();
    const location = useLocation();
    //const jobId = location.state.jobId;
    const [jobData, setJobData] = useState({
        title: location.state ? location.state.title : '',
        companyName: location.state ? location.state.companyName : '',
        location: location.state ? location.state.location : '',
        description: location.state ? location.state.description : '',
        contact: location.state ? location.state.contact : '',
        website: location.state ? location.state.website : '',
    });


    const goToDetails = (jobId) => {
        navigate('/job', {
            state: {
                jobId: jobId
            }
        });
    }

    function displaySubmit() {
        if (!location.state) {
            return (<Button onClick={
                () => axios.post('/api/job', jobData, getToken())
                    .then(response => {
                        const jobId = response.data.jobId;
                        goToDetails(jobId);
                    })
                    .catch(error => { console.log(error) })
            }>Submit</Button>);
        } else {
            return (<Button className="button" onClick={
                () => axios.put('/api/job/' + location.state.jobId, jobData, getToken())
                    .then(response => {
                        const jobId = response.data.jobId;
                        goToDetails(jobId);
                    })
                    .catch(error => { console.log(error) })
            }>Submit</Button>);
        }
    }

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div className="inputContainer">
                <h5>Job Title:</h5>
                <input value={jobData.title}
                    onChange={e => setJobData({
                        ...jobData,
                        title: e.target.value
                    })} required></input>
                <h5>Company Name:</h5>
                <input value={jobData.companyName}
                    onChange={e => setJobData({
                        ...jobData,
                        companyName: e.target.value
                    })} required></input>

                <h5>Location:</h5>
                <input value={jobData.location}
                    onChange={e => setJobData({
                        ...jobData,
                        location: e.target.value
                    })} required></input>
                <h5>Description:</h5>
                <input value={jobData.description}
                    onChange={e => setJobData({
                        ...jobData,
                        description: e.target.value
                    })} required></input>
                <h5>Contact:</h5>
                <input value={jobData.contact}
                    onChange={e => setJobData({
                        ...jobData,
                        contact: e.target.value
                    })} required></input>
                <h5>Website:</h5>
                <input value={jobData.website}
                    onChange={e => setJobData({
                        ...jobData,
                        website: e.target.value
                    })}></input>
                <div className="button">{displaySubmit()}</div>
            </div>

        </div>
    );
}
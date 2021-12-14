import axios from "axios";
import { useState } from "react";
import { Navigation } from "./Navigation";
import { useNavigate } from 'react-router';
import { getToken } from "../util/auth";

export default function CreateJob() {
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        title: '',
        companyName: '',
        location: '',
        description: '',
        contact: '',
        website: '',
    });

    const [errorMsg, setError] = useState("");

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <h1>
                {errorMsg}
            </h1>

            <h5>Job Title:</h5>
            <input value={jobData.title}
                onChange={e => setJobData({
                    ...jobData,
                    title: e.target.value
                })}></input>
            <h5>Company Name:</h5>
            <input value={jobData.companyName}
                onChange={e => setJobData({
                    ...jobData,
                    companyName: e.target.value
                })}></input>

            <h5>Location:</h5>
            <input value={jobData.location}
                onChange={e => setJobData({
                    ...jobData,
                    location: e.target.value
                })}></input>
            <h5>Description:</h5>
            <input value={jobData.description}
                onChange={e => setJobData({
                    ...jobData,
                    description: e.target.value
                })}></input>
            <h5>Contact:</h5>
            <input value={jobData.contact}
                onChange={e => setJobData({
                    ...jobData,
                    contact: e.target.value
                })}></input>
            <h5>Website:</h5>
            <input value={jobData.website}
                onChange={e => setJobData({
                    ...jobData,
                    website: e.target.value
                })}></input>
            <button onClick={
                () => axios.post('/api/job', jobData, getToken())
                    .then(response => {
                        const jobId = response.data.jobId;
                        console.log(jobId);
                        navigate('/');
                    })
                    .catch(error => {
                        console.log(error)
                        setError("You are not Logged In!!!")
                    })
            }>Submit</button>

        </div>
    );
}
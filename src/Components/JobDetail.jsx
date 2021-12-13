import { Navigation } from "./Navigation";
import { useLocation } from 'react-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function JobDetail() {
    const location = useLocation();
    // console.log("printing params passed from job pane.");
    console.log(location);
    const jobId = location.state.jobId;
    // console.log(jobId);


    const findJob = () => {
        axios.get('/api/job/' + jobId)
        .then(response => setJob(response.data))
        .catch(error => setJob({
            title: 'No such job found',
            location: "N/A",
            companyName: "N/A"
        }));
    }

    // TODO: why cannot I use useState(null) here
    const [job, setJob] = useState({});
    useEffect(findJob, []);

    return (
        <div>
            <Navigation />
            <div>
                Title: {job.title}
            </div>
            <div>
                Company Name: {job.companyName}
            </div>
            <div>
                Location: {job.location}
            </div>
            <div>
                Description: {job.description}
            </div>
            <div>
                Contact: {job.contact}
            </div>
            <div>
                Website: {job.website}
            </div>
            <div>
                PostDate: {job.postDate}
            </div>
        </div>
    );
}
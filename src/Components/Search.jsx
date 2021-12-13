import { Navigation } from "./Navigation";
import { useState } from 'react';
import axios from 'axios';
import './Search.css';
import { JobPane } from "./JobPane";

export default function Search() {
    const [formInput, setFormInput] = useState('');
    const [jobs, setJobs] = useState([]);
    const [errorMsg, setError] = useState(null);

    function onSearchButtonClick() {
        if (!formInput) {
            setError("You must type in a job title.");
            return;
        }

        axios.get('/api/job/?keyword=' + formInput)
            .then(response => setJobs(response.data))
            .catch(error => setJobs([{
                title: 'No such job found',
                location: "N/A",
                companyName: "N/A"
            }]));
    }

    const searchComponents = [];
    if (jobs.length === 0) {
        // searchComponents.push((<JobPane title="No Such Job" location="N/A" companyName="N/A" />));
    } else {
        jobs.forEach((job) => {
            searchComponents.push((<JobPane title={job.title} 
                location={job.location} 
                companyName={job.companyName} 
                jobId={job._id}/>));
        });
    }

    return (
        <div>
            <Navigation />
            {errorMsg}
            <div class="searchSectionContainer">
                <div class="searchSection">
                    <input type='text' value={formInput}
                        onChange={(e) => {
                            setError(null);
                            setFormInput(e.target.value)
                        }} />
                    <button onClick={onSearchButtonClick}>
                        Search for Job
                    </button>
                </div>
            </div>

            <div class="searchResContainer">
                {searchComponents}
            </div>
        </div>
    );
}
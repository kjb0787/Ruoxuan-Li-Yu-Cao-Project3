import { Navigation } from "./Navigation";
import { useState } from 'react';
import axios from 'axios';
import './Search.css';

export default function Search() {
    const [formInput, setFormInput] = useState('');
    const [job, setJob] = useState({
      title: "", 
      location: "",
      companyName: ""
    })
    const [errorMsg, setError] = useState(null);
  
    function onSearchButtonClick() {      
      if (!formInput) {
        setError("You must type in a job title.");
        return;
      }
  
      axios.get('/api/job/' + formInput)
        .then(response => setJob(response.data))
        .catch(error => setJob({
            title: 'No such job found', 
            location: "N/A",
            companyName: "N/A"
        }));
    }

    return (
        <div>
            <Navigation />
            <div>
                {errorMsg}
                <input type='text' value={formInput}
                    onChange={(e) => {
                        setError(null);
                        setFormInput(e.target.value)
                    }} />
                <button onClick={onSearchButtonClick}>
                    Search for Job
                </button>
                <div class="searchResult">
                <div>
                    Job Title: {job.title}
                </div>
                <div>
                    Location: {job.location}
                </div>
                <div>
                    Company Name: {job.companyName}
                </div>
                </div>
            </div>
        </div>
    );
}
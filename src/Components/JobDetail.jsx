import { Navigation } from "./Navigation";
import { useLocation } from 'react-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';


export default function JobDetail() {
    const location = useLocation();
    // console.log("printing params passed from job pane.");
    // console.log(location);

    const jobId = location.state.jobId;
    // console.log(jobId);

    const navigate = useNavigate();

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
            <Card>
                <Card.Header>Company Name: {job.companyName}</Card.Header>
                <Card.Body>
                    <Card.Title>Title: {job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Location: {job.location}</Card.Subtitle>
                    <Card.Text>
                        Description: {job.description}
                    </Card.Text>
                    <Card.Text>
                        Contact: {job.contact}
                    </Card.Text>
                    <Button variant="primary" onClick={
                        () => {
                            navigate('/favorites')
                        }
                    }>Favorite</Button>
                </Card.Body>
                <Card.Body>
                    <Card.Link href={job.website}>Website: {job.website}</Card.Link>
                </Card.Body>
                <Card.Footer className="text-muted">PostDate: {job.postDate}</Card.Footer>
            </Card>
        </div>
    );
}
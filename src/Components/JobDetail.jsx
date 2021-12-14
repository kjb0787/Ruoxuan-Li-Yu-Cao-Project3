import { Navigation } from "./Navigation";
import { useLocation } from 'react-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { getToken } from "../util/auth";


export default function JobDetail() {
    const location = useLocation();
    // console.log("printing params passed from job pane.");
    // console.log(location);
    const [favorite, setFavorite] = useState(false);
    const username = localStorage.getItem("loggedIn");
    const jobId = location.state.jobId;
    const navigate = useNavigate();

    if (username) {
        axios.get('/api/job/' + jobId + '/isfavorite', getToken())
            .then(response => { setFavorite(response.data); })
            .catch(error => console.log(error));
    }


    function displayFavorites() {
        if (username && !favorite) {
            return (<Button variant="primary" onClick={
                () => {
                    axios.post('/api/job/' + jobId + '/favorite', null, getToken())
                        .then(response => { setFavorite(true) })
                        .catch(error => console.log(getToken()));
                }
            }>Favorite</Button>)
        } else if (username && favorite) {
            return (<Button variant="primary" onClick={
                () => {
                    axios.post('/api/job/' + jobId + '/unfavorite', null, getToken())
                        .then(response => { setFavorite(false) })
                        .catch(error => console.log(getToken()));
                }
            }>Unfavorite</Button>)
        }
    }

    function displayModify() {
        if (username.replace(/"/g, "") === job.creatorName) {
            return (<Button variant="primary" onClick={
                () => {
                    navigate('/create') // todo
                }
            }>Modify</Button>)
        }
    }

    function displayDelete() {
        if (username.replace(/"/g, "") === job.creatorName) {
            return (<Button variant="primary" onClick={
                () => {
                    axios.delete('/api/job/' + jobId, getToken())
                        .then(response => { navigate('/') })
                        .catch(error => console.log(getToken()));
                }
            }>Delete</Button>)
        }
    }


    const findJob = () => {
        axios.get('/api/job/' + jobId)
            .then(response => {
                setJob(response.data);
                // console.log(response.data) 
            })
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
                    {displayFavorites()}
                    {displayModify()}
                    {displayDelete()}
                </Card.Body>
                <Card.Body>
                    <Card.Link href={job.website}>Website: {job.website}</Card.Link>
                </Card.Body>
                <Card.Footer className="text-muted">PostDate: {job.postDate}</Card.Footer>
            </Card>
        </div>
    );
}
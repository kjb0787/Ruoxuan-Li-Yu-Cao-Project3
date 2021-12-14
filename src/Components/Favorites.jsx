import { useEffect, useState } from "react";
import { Navigation } from "./Navigation";
import axios from 'axios';
import { JobPane } from "./JobPane";
import { getToken } from "../util/auth";
import './Search.css';

export default function Favorites() {
    const favoritesComponent = [];
    const [favorites, setFavorites] = useState([]);

    const getFavorites = () => {
        axios.get('/api/user/favorites', getToken())
            .then(response => {
                const fav = response.data;
                setFavorites(fav);

            })
            .catch(error => console.log(error));
    }
    useEffect(() => getFavorites(), []);

    if (favorites.length > 0) {
        favorites.forEach((job) => {
            favoritesComponent.push((<JobPane title={job.title}
                location={job.location}
                companyName={job.companyName}
                jobId={job._id} />));
        });
    }

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div class="searchResContainer">
                {favoritesComponent}
            </div>
        </div>
    );
}
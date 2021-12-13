import { Navigation } from "./Navigation";
import { useNavigate } from 'react-router';
import React, { useState } from "react";
import './Home.css';

export default function Home() {
    const [formInput, setFormInput] = useState('');
    const [errorMsg, setError] = useState(null);
    const navigate = useNavigate();

    function onSearchButtonClick() {
        navigate("/search");
    }

    return (
        <div>
            <Navigation />
            <div class="searchContainer">
                <div class="searchSection">
                    {errorMsg}
                    <input type='text' value={formInput}
                        onChange={(e) => {
                            setError(null);
                            setFormInput(e.target.value)
                        }} />
                    <button class="glow-on-hover" onClick={onSearchButtonClick}>
                        Search for Job
                    </button>
                </div>
            </div>
        </div>
    );
}
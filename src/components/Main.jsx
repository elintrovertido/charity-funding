import React from "react";
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import './styles/Main.css';

function Main() {

    return (
        <>  
        <div className="container-fluid navbar-custom">
            <nav class="navbar navbar-expand-lg  ">
                    <Link class="nav-link navbar-brand header" to="/">KAIZOKU</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/browse">BrowseCampaigns</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/create">CreateCampaigns</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/contact">Contact</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link icon" to="/user"><i class="fa-solid fa-user-nurse fa-xl"></i></Link>
                            </li>
                            
                        </ul>
                    </div>

            </nav>
        </div>
        </>
    )
}

export default Main;
import React from "react";
import ReactDOM from "react-dom";
import image1 from '.././assets/image1.jpg';
import { Link } from 'react-router-dom';
import './styles/Home.css';

function Home() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <img src={image1} className="pic" alt="no pic" />
                    </div>
                    <div className="col-6">
                        <div className="block">
                            <h1>CHARITY</h1>
                            <h1>FUNDING</h1>
                            <h4>Raise funds online for medical emergencies.</h4>
                        </div>

                        <br /> <br />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim blandit volutpat maecenas volutpat blandit. In vitae turpis massa sed elementum tempus egestas. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. At tellus at urna condimentum mattis pellentesque.</p>

                        <br />

                        <div className="container-fluid text-align-center">
                            <div className="row">
                                <div className="col-6">
                                    <Link class="nav-link" to="/create">
                                        <button type="button" class="btn btn-outline-success btn-lg btn-block">Create New Campaign</button>
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <Link class="nav-link" to="/browse">
                                        <button type="button" class="btn btn-outline-warning btn-lg btn-block">Donate A Campaign</button>
                                    </Link>
                                </div>
                            </div>


                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
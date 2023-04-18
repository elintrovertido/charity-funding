import React from 'react';
import { Link } from 'react-router-dom';
import { ethers } from "ethers";
import { useState } from 'react';
import "./styles/User.css";

function User({ signer }) {

    const [address, setAddress] = useState("")
    const [balance, setBalance] = useState("")
    const [operatingSystem,setOperatingSystem] = useState("Not Known")
    const [browser,setBrowser] = useState("Not Known")

    const getSignerDetails = async () => {
        const _address = await signer.getAddress()
        setAddress(_address)
        const _balance = await signer.getBalance()
        const temp = ethers.utils.formatEther(_balance)
        setBalance(temp)

        if (window.navigator.appVersion.indexOf('Win') !== -1) {
            setOperatingSystem('Windows')
        }
        if (window.navigator.appVersion.indexOf('Mac') !== -1) {
            setOperatingSystem("MacOS")
        }
        if (window.navigator.appVersion.indexOf('X11') !== -1) {
            setOperatingSystem("UNIX OS")
        }
        if (window.navigator.appVersion.indexOf('Linux') !== -1) {
            setOperatingSystem("Linux")
        }


        if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
            setBrowser("Google Chrome")
        } else if (window.navigator.userAgent.indexOf('Firefox') !== -1) {
            setBrowser("Mozilla Firefox")
        } else if (window.navigator.userAgent.indexOf('MSIE') !== -1) {
            setBrowser("Internet Explorer")
        } else if (window.navigator.userAgent.indexOf('Edge') !== -1) {
            setBrowser("Microsoft Edge")
        } else if (window.navigator.userAgent.indexOf('Safari') !== -1) {
            setBrowser("Safari")
        } else if (window.navigator.userAgent.indexOf('Opera') !== -1) {
            setBrowser("Opera")
        }else {
            console.log('Others');
        }

    }

    getSignerDetails()

    console.log(address, balance)

    return (
        <>
            <div className="container outer-block">
                <Link class="nav-link" to="/"><h5 className="goback"> <i class="fa-sharp fa-solid fa-arrow-left"></i> Back to Home</h5></Link>
                <div className="container inner-block">

                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3>Your Account</h3>
                            </div>
                            <div className="col-6 Key">
                                Account Address
                            </div>
                            <div className="col-6 Value">
                                {address}
                            </div>
                            <div className="col-6 Key">
                                Account Balance
                            </div>
                            <div className="col-6 Value">
                                {balance}
                            </div>
                            <div className="col-6 Key">
                                System
                            </div>
                            <div className="col-6 Value">
                                {operatingSystem}
                            </div>
                            <div className="col-6 Key">
                                Browser
                            </div>
                            <div className="col-6 Value">
                                {browser}
                            </div>
                            <div className="col-6 Key">
                                Wallet
                            </div>
                            <div className="col-6 Value">
                                Metamask
                            </div>

                        </div>

                    </div>

                </div>

            </div>



        </>
    )
}



export default User;
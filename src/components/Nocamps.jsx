import React from 'react';
import ReactDOM from 'react-dom';
import './styles/Nocamps.css';
import { useState } from 'react';
import {ethers} from "ethers";

function Nocamps() {

    // const [address, setAddress] = useState('')
    // const [amount, setAmount] = useState(0)
    // const getDetails = async () => {
    //     const _provider = await new ethers.providers.Web3Provider(window.ethereum)
    //     const _signer = _provider.getSigner()
    //     const _address = await _signer.getAddress()
    //     setAddress(_address)
    //     const _amount = await _signer.getBalance()
    //     setAmount(_amount)
    // }
    // getDetails()

    return (
        <>
            <div className="container nocamps-container">
                <h1>Please Try Again</h1>
                <h5>Thanks for showing interest in CHARITY</h5>
                {/* {address}<br/>
                {amount} */}
            </div>

        </>
    )
}
export default Nocamps;
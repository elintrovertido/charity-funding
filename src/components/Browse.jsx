import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import Nocamps from "./Nocamps";
import './styles/Browse.css';



function Browse({ contract, signer }) {

  const [count, setCount] = useState(0)
  const [camps, setCamps] = useState([])
  const [amount, setAmount] = useState("")

  const getCount = async () => {
    const c = await contract.connect(signer).campaignCount()
    setCount(c.toNumber())
  }

  const getCampaigns = async () => {
    try {
      getCount()
      console.log(count)
      setCamps([])
      const campaigns = []

      for (var i = 0; i < count; i++) {
        const campaign = await contract.connect(signer).campaigns(i)
        campaigns.push(campaign)
      }
      console.log(campaigns)

      const newcamps = campaigns.map((campaign) => ({
        id: campaign[0].toNumber(),
        reciever: campaign[1],
        donor: campaign[2],
        name: campaign[3],
        description: campaign[4],
        fundingGoal: ethers.utils.formatEther(campaign[5]),
        raisedFunds: ethers.utils.formatEther(campaign[6]),
        completed: campaign[7]
      }))

      console.log(newcamps)
      setCamps(newcamps)
      console.log(camps)

    } catch (error) {
      console.log(error)
    }
  }

  const displayCamps = async () => {
    getCampaigns()
  }

  const handleClick = async (camp) => {
    console.log(amount)
    console.log(`clicked ${camp.id}`)
    if (signer !== undefined) {
      await contract.connect(signer).donate((camp.id) - 1, { value: ethers.utils.parseEther(amount) })
    }
    else {
      console.log("signer not provided")
    }

  }




  return (<>

    <div className="container">
      <Link class="nav-link" to="/"><h5 className="goback"> <i class="fa-sharp fa-solid fa-arrow-left"></i> Back to Home</h5></Link>
      <button class="btn btn-primary btn-display" onClick={displayCamps}>Click Here To Donate Campaigns</button>


      
    </div>



    <div className="container">
      {camps.length > 0 ? camps.map((camp) => (
        <div class="card w-100 display-card" key={camp.id}>
          <div class="card-body">
            <h6 class="card-title">NAME : {camp.name}</h6>
            <h6 class="card-title">DESCRIPTION : {camp.description} </h6>
            <h6 class="card-title">RECIEVER : {camp.reciever}</h6>
            <h6 class="card-title">DONOR : {camp.donor}</h6>
            <h6 class="card-title">FUNDINGGOAL : {camp.fundingGoal}</h6>
            <h6 class="card-title">RAISEDFUNDS : {camp.raisedFunds}</h6>
            <input type="text" onChange={(e) => { setAmount(e.target.value) }}></input>
            <button type="button" class="btn btn-success" onClick={() => handleClick(camp)}>DONATE</button>
          </div>
        </div>
      )) : <Nocamps/>}
    </div>



  </>)

}

export default Browse; 
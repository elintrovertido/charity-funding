import { Resolver } from '@ethersproject/providers';
import { ethers } from "ethers";
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/Create.css';

function Create({ contract, signer }) {



  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [goal, setGoal] = useState(0)
  const form = document.getElementById('form')

  const resetStates = () => {
    setName('')
    setDesc('')
    setGoal(0)
  }

  const createcampaign = async (name, desc, goal) => {
    try {
      await contract
        .connect(signer)
        .createCampaign(name, desc, ethers.utils.parseEther(goal)
        )
    } catch (error) {
      alert("Failed to create Campaign")
      console.log(error)
    }
  }


  const create = (e) => {
    if (name === '' || desc === '' || goal === 0) {
      let x = document.getElementsByClassName('form-control')
      alert("please fill the details")
      console.log('Please fill the Details', name, desc, goal)
      form.reset()
      resetStates()

    } else {
      alert("Success")
      createcampaign(name, desc, goal)

      // console.log('Success', name, desc, goal)
      form.reset()
      resetStates()
    }

    console.log(contract, signer)
  }

  return (
    <>
      <div className="container">
        <Link class="nav-link" to="/"><h5 className="goback"> <i class="fa-sharp fa-solid fa-arrow-left"></i> Back to Home</h5></Link>


        <form action="" id="form">
          <h1>Create New Campaign</h1>
          <div className="container block-create">


            <label className='form-label'>
              Campaign Name
            </label>
            <input type="text" className='form-control '
              onChange={(e) => { setName(e.target.value); }} />

            <label class="form-label">Description Of the Campaign</label>
            <textarea type='text' className='form-control'
              onChange={(e) => { setDesc(e.target.value) }} />


            <label class="form-label">Funding Goal of the Campaign</label>
            <input type='number' className='form-control'
              onChange={(e) => { setGoal(e.target.value) }} />

            <button class="btn btn-outline-success btn-create" type="button" onClick={create}>Create</button>
          </div>



        </form>

      </div>
    </>
  )
}

export default Create;
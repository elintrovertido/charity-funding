import './App.css';
import Main from "./components/Main";
import Contact from './components/Contact';
import Create from './components/Create';
import Browse from './components/Browse';
import Home from './components/Home';
import User from "./components/User"
import {useState,useEffect} from 'react';
import { ethers } from "ethers";
import abi from './contracts/Funding.json';
import { BrowserRouter , Routes, Route, Link } from "react-router-dom";


function App() {

  const [contract,setContract] = useState()
  const contractAddress = "0x01f07f6af6B0A293562CaC9a79360382d3d0cF37"
  const [provider,setProvider] = useState()
  const [signer,setSigner] = useState(null)
  const [address,setAddress ] = useState()
  const [count,setCount] = useState()
  const [campaigns,setCampaigns] = useState([])
  var display = 0

  const connect = async ()=>{
    const _provider = await new ethers.providers.Web3Provider(window.ethereum)
    setProvider(_provider)
    const _signer =  _provider.getSigner()
    setSigner(_signer)
    const _address = await _signer.getAddress()
    setAddress(_address)
  }
  
  const connectContract = async()=>{
    const _contract = await new ethers.Contract(
      contractAddress,abi.abi
    )
    setContract(_contract)
  }


  const displayCount = async ()=>{
    const _campaignCount = await contract.connect(provider).campaignCount()
    const _count = _campaignCount.toNumber()
    setCount(_count)
  }

  const createCampaign = async (name,desc,goal)=>{
    try{await contract
      .connect(signer)
      .createCampaign(name,desc,ethers.utils.parseEther(goal)
    )}catch(error){
      console.log(error)
    }  
  }

  // createCampaign("test2","desc2","0.5")

  const displayCampaigns = async ()=>{
    try{
      displayCount()
      for(let i=0;i<count;i++){
        if(campaigns.length===count){
          break;
        }
        const campaign = await contract.connect(signer).campaigns(i)
        campaigns.push(campaign)
      }
      console.log(campaigns)
    }catch(error){
      console.log(error)
    }
  } 
  // displayCampaigns()

  const displayDetails = async ()=>{
    try{
      console.log(provider,signer,address,contract)
    }catch{
      console.log("error")
    }
  }
  
  const donate = async (index,value)=>{
    if(signer !== undefined){
      await contract.connect(signer).donate(index,{value : ethers.utils.parseEther(value)})
    } 
    else{
        console.log("signer not provided")
    }
  }
 

  useEffect(()=>{
    if(window.ethereum){
      window.ethereum.request({method : 'eth_requestAccounts'})
    }else{
      alert("Install MetaMask")
    }

    // donate(4,"0.2")
    connect()
    connectContract()
  },[])


  return (
    <div className="App">
        
        {/* <button onClick = {displayCampaigns}>displayCampaigns</button>
        <button onClick = {displayDetails}>displayDetails</button>
        <button onClick = {donate(0,"0.5")}>donate</button> */}
        <BrowserRouter>
        <Main></Main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/browse" element={<Browse contract={contract} signer={signer}/>} />
          <Route path="/create" element={<Create contract={contract} signer={signer}/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/user" element={<User signer={signer}/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { TASK_COMPILE_SOLIDITY_RUN_SOLC } = require("hardhat/builtin-tasks/task-names");


async function consoleBal(a,b,c,d){

  console.log(await a.getAddress(),ethers.utils.formatEther(await a.getBalance()))
  console.log(await b.getAddress(),ethers.utils.formatEther(await b.getBalance()))
  console.log(await c.getAddress(),ethers.utils.formatEther(await c.getBalance()))
  console.log(await d.getAddress(),ethers.utils.formatEther(await d.getBalance()))
}

async function displayCampaigns(contract,a){
  const count = await contract.connect(a).campaignCount();
  for(let i=0;i<count;i++){
    const campaign = await contract.connect(a).campaigns(i);
    console.log(campaign);
  }
}

async function main() {
  const [a,b,c,d] =  await hre.ethers.getSigners();

  const Funding = await hre.ethers.getContractFactory("Funding");
  const contract = await Funding.deploy();
  await contract.deployed();
  
  consoleBal(a,b,c,d);


  console.log(`Contract Address ${contract.address} `);
  var count  =  await contract.connect(a).campaignCount();
  console.log(count);

  await contract.connect(a).createCampaign("test1","desc1",ethers.utils.parseEther("10.0"));
  await contract.connect(a).createCampaign("test2","desc2",ethers.utils.parseEther("15.0"));
  await contract.connect(a).createCampaign("test3","desc3",ethers.utils.parseEther("20.0"));
  var count  =  await contract.connect(a).campaignCount();
  console.log(count);


  console.log(`displaying campaigns`);
  displayCampaigns(contract,a);


  
  await contract.connect(b).donate(0,{value : ethers.utils.parseEther("10.0")})
  await contract.connect(c).donate(0,{value : ethers.utils.parseEther("10.0")})
  await contract.connect(d).donate(0,{value : ethers.utils.parseEther("10.0")})


  consoleBal(a,b,c,d);

  
  


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

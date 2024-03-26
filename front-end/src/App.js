import { useState, useEffect} from 'react'
import { ethers } from "ethers";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import contractJsonABI from './artifacts/contracts/Supplychain.sol/Tracking.json';
import paris1 from "./paris1.jpg"
import './App.css';
import NavBar from './components/navBar';
import AddProduct from './components/addProduct';
import TransferProduct from './components/transfertProduct';
import HomePage from './components/HomePage';
import VerifyProduct from './components/VerifyProduct';

function App() {
  const [state, setState] = useState({ 
    provider:null, 
    signer:null, 
    contract:null })
  const [account, setAccount] = useState("MetaMask Not connected");
  
  const[balance, setBalance] = useState("");
  const [txAddress, setTxAddress] = useState("");

  

  useEffect(()=>{
    const template = async() => {
      const contractAddress="0xB12B26934e5B9D554BEaBFCf09D10Bc7a2c0a8c9";
      const contractABI= contractJsonABI.abi ;
      
      try {
        const {ethereum} = window;

        //Verify is MetaMask is installed
        if (!ethereum) {
          console.log("MetaMask is not installed");
          return; 
        }
        
        const Account = await ethereum.request({
          method:"eth_requestAccounts" // get the currently connected address
        })
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
         })
        //change the state of the account.
        setAccount(Account[0]);
      
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress, 
          contractABI, 
          signer
        );
        setState({ contract, provider, signer });
        console.log("state:", state);  
        
        const balance = await provider.getBalance(Account[0]);
        setBalance(ethers.formatEther(balance) + ' ETH');
        console.log("balance", balance);

        //Get transaction address.
        const txAddress = await contract.getAddress()
        setTxAddress(txAddress);
        console.log("Tx address is", txAddress)

    } catch (error) {
        alert(error);
    }
  } 
    template();
  }, [])

  return (
    <div className='App'>
    <img src={paris1} className="img-fluid" alt=".." width="30%" />
    <p style={{ marginTop: "0px", marginLeft: "5px" }}>
      Connected MetaMask Account -- {account} 
    </p>
    <div>
      <ul>
        <li>MetaMask balance for account -- {balance}</li>
        <li>Contract address -- {txAddress}</li>
      </ul>
    </div>
    

    <div>
        <Router>
        <div>
          <NavBar /> 

          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/addProduct" element={<AddProduct state={state} /> } />
            <Route path="/transferProduct" element={<TransferProduct state={state} />} />
            <Route path="/verifyProduct" element={<VerifyProduct state={state} />}/>
        </Routes>
        </div>
        </Router>
    </div>
  </div> 
  );
}

export default App;

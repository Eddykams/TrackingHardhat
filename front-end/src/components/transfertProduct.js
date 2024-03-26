import React, { useState } from 'react';
import { ethers } from "ethers";
import "./Form.css"

const TransferProduct=({state})=>{
    const [productId, setProductId] = useState('');
    const [newOwner, setNewOwner] = useState('');
    const [locations, setLocations] = useState('');

    const transferProduct = async (event) => {
        event.preventDefault();
        const {contract} = state;
    
        try {
          // Ensure we're using the correct signer
          const signer = state.signer || new ethers.BrowserProvider(window.ethereum).getSigner();
          const contractWithSigner = contract.connect(signer);

          //const productId = document.querySelector("#productId").value;
          //const newOwner = document.querySelector("#newOwner").value;
          //const locations = document.querySelector("#locations").value;
          
          // Call the transferProduct function from your contract
          const transaction = await contractWithSigner.transferProduct(productId, newOwner, locations);
          await transaction.wait();
    
          console.log("Product transferred successfully");
          console.log(productId, newOwner, locations);
    
          // Rest form
          setProductId('');
          setNewOwner('');
          setLocations('');
        } 
        catch (error) {
          console.error("Error transferring product:", error);
          alert("An error occurred while transferring the product.");
        }
      };
    return(
    <div className="center">
      <h1>Transfer Product</h1>
      <form onSubmit={transferProduct}>
        <div className="inputbox">
          <input 
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
          <span>Product ID:</span>
        </div>
        <div className="inputbox">
          <input
            type="text"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            required
          />
          <span>New Owner Address</span>
        </div>
        <div className="inputbox">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            required
          />
          <span>Locations:</span>
        </div>
        <div className="inputbox">
             <input type="submit" value="TRANSFERT" disabled={!state.contract}/>
           </div>
      </form>
    </div>
    );
}

export default TransferProduct;
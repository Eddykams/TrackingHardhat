//import { ethers } from "ethers";
import { useState } from "react";
import "./Form.css"

const AddProduct=({state})=>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const addProduct = async(event)=>{
        event.preventDefault();
        const {contract} = state;

        const name = document.querySelector("#name").value;
        const description = document.querySelector("#description").value;

        const transaction = await contract.addProduct(name, description);
        await transaction.wait();

        console.log("Transaction succefuly")
        console.log(name, description);
        console.log(state);

        // Step 4: Reset the state (and thus the input fields)
        setName('');
        setDescription('');
    };

    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    return(
        <div className="center">
        <h1>ADD PRODUCT TO BLOCKCHAIN</h1>
         <form onSubmit={addProduct}>
           <div className="inputbox">
                <input type="text" required="required" id="name" 
                value={name} onChange={handleNameChange} />
                <span>Product Name</span>
           </div>
           <div className="inputbox">
                <input type="text" required="required" id="description"
                value={description} onChange={handleDescriptionChange} />
                <span>Product description</span>
           </div>
           <div className="inputbox">
             <input type="submit" value="ADD"  disabled={!state.contract}/>
           </div>
         </form>
           
         </div>
    )
}

export default AddProduct;

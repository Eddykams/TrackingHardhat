import { useState} from "react";
import "./verify.css";

const VerifyProduct=({state})=>{
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [currentOwner, setCurrentOwner] = useState('');
    const [currentRole, setCurrentRole] = useState('');
    const [locations, setLocations] = useState([]);

    const verifyP = async(event)=>{
        event.preventDefault();
        const {contract} = state;

        try {
            const result = await contract.verifyProduct(productId);
            setName(result[0]);
            setDescription(result[1]);
            setCurrentOwner(result[2]);
            setCurrentRole(result[3]);
            setLocations(result[4]);
        } 
        catch (error) {
            alert(error);
        }

    }
    return(
        <div className="center">
            <div className="inputbox">
                <input
                type="text" 
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter Product ID"
                />
            </div>

            <button onClick={verifyP}>Verify Product</button>

            <div className="p" >
                <h3>Product Details</h3>
                <p className="p2">Name: {name}</p>
                <p className="p1">Description: {description}</p>
                <p className="p2">Current Owner: {currentOwner}</p>
                <p className="p1">Current Role: {currentRole.toString()}</p>
                <p className="p2">Locations: {locations.join(', ')}</p>
            </div>
      </div>
    )
}

export default VerifyProduct;
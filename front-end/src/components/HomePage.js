import React from 'react';
import smile from "../smile.png";
import "./Form.css"

function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to ISKEM Class Blockchain Dev!</h1>
      <img src={smile} className="img-fluid" alt=".." width="20%" />
    </div>
  );
}

export default HomePage;

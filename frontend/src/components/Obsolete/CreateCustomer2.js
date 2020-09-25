import React from "react";
//import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Customer OnBoarding Form</h1>
      <h2>Please Input Customer Details Here</h2>
      <form>
        <div>
          Customer Name:
          <input type="text" name="customerName"/>
        </div>
      <div>
        <label>
        Customer Age: 
        <input type="number" name="customerAge" min="18"/>
        </label>
      </div>
      <div>
        <label>
        Service Officer Name: 
        <input type="text" name="serviceOfficerName"/>
        </label>
      </div>
      <div>
        <label>
        NRIC: 
        <input type="text" name="NRIC"/>
        </label>
      </div>
      <div>
        <label>
        Registration Time: 
        <input type="datetime-local" name="registrationTime"/>
        </label>
      </div>
      <div>
        <label>
        Branch Code: 
        <input type="text" name="branchCode"/>
        </label>
      </div>
      <div>
        <label>
        Image: 
        <input type="file" name="image"/>
        </label>
      </div>
      <div>
        <label>
        Product Type: <br></br>
        <input type="checkbox" id="product1" name="productType"/>
        <label for="product1"> 137 : Investor </label><br></br>
        <input type="checkbox" id="product2" name="productType"/>
        <label for="product2"> 070 : Insurance </label><br></br>
        <input type="checkbox" id="product3" name="productType"/>
        <label for="product3"> 291 : Loans </label><br></br>
        <input type="checkbox" id="product4" name="productType"/>
        <label for="product4"> 969 : Savings </label><br></br>
        <input type="checkbox" id="product5" name="productType"/>
        <label for="product5"> 555 : Credit Cards </label><br></br>

        </label>
      </div>

  <input type="submit" value="Submit" />
  <input type="reset" value="Reset"/>
  
</form>
    </div>
  );
}

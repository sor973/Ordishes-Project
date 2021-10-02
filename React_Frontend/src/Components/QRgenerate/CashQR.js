import React, { useState } from 'react';
import './CashQR.css';
import axios from 'axios'
import QRcode from 'qrcode'

const CashQR = () => {

  const [url, setURL] = useState("");
  const [name, setName] = useState("");
  const [qrcode, setQR] = useState("");
  const [errors,setError] = useState([]);

  async function postTable(e) {
    e.preventDefault()
    let x = +name;
    const Table = {
      "table" : x
    }
    
      await axios.post("http://localhost:8000/urlapi", {
        Table
      }).then((response) => {
        setURL(response.data);
        setError(null)
        console.log(response.data);
        
      }).catch (e => {
        setError(e.response.data);
        console.log(e.response.data)
      })
     
  }

  function qr(e) {
    e.preventDefault();
    if (name !== "") {
      QRcode.toDataURL(url).then(setQR);
    } else {
      console.log("error")
    }
  }

  return (
    <div className="CashQR">
      { errors && <div>{errors}</div>}
      <form onSubmit={postTable}>
        <div className="Box">Enter table :
          <input className="Input__field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit">Send Table</button>
        </div>
      </form>
      <form className = "Post__Submit">
        <button onClick={qr}>Generate QRcode</button>
      </form>
      <img src={qrcode} />
    </div>
  );
}

export default CashQR;

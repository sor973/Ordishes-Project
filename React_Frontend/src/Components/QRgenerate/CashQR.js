import React, { useState } from 'react';
import './CashQR.css';
import axios from 'axios'
import QRcode from 'qrcode'

const CashQR = () => {

  const [url, setURL] = useState("");
  const [name, setName] = useState("");
  const [qrcode, setQR] = useState("");

  async function postTable(e) {
    e.preventDefault()

    try {
      await axios.post("http://localhost:8000/urlapi", {
        name
      }).then((response) => {
        setURL(response.data);
        console.log(response.data);
      })
      // await QRcode.toDataURL(url).then(setQR);
    } catch (error) {
      console.log(error)
    }
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

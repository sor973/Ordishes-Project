import React from 'react';
// import PropTypes from 'prop-types';
import './SubCash.css'

function SubCash() {

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Commit!!!!!');
  }

  return (
    <div className="Post">
      <form className="Post__Submit" onSubmit={handleSubmit}>
        <button type="submit">Commit</button>
      </form>
    </div>
  );
}

export default SubCash;
import React from 'react'


const afterdeletepopup = () => {
  return (
    <div>
        <div className='popup-message'>
            <p>The Post is deleted.</p>
            <button onClick={()=>{window.location.reload();}}>OK</button>
        </div>
    </div>
  )
}

export default afterdeletepopup
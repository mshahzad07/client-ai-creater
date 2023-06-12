import React, { useState } from 'react';
// import { handleDelete } from '../utils';
// import { handleDelete } from '../utils'
// import Modal from 'react-modal';
// import {  deleteicon } from '../assets';

// import  {handleDelete}  from '../utils';

const DeletePopup = (_id) => {
    console.log("delete is called")
    const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDeleteimage = (_id) => {
    // Perform delete logic here
    // ...
    <handleDelete/>
    closeModal();
  };
    return (
        <>
            {/* <div>
                <div className='popup-message'>
                    <p>The Post will be deleted permanently.<br>Do you want to delete it</br></p>
                    <button >Close</button>or<button onClick={() => (handleDelete(_id))}>Delete</button>
                </div>
            </div> */}

            <div>
                <button onClick={openModal}>Open Popup</button>

                <Modal isOpen={isOpen} onRequestClose={closeModal}>
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to delete?</p>
                    <button onClick={handleDelete(_id)}>Yes</button>
                    <button onClick={closeModal}>No</button>
                </Modal>
            </div>

        </>
    )
}

export default DeletePopup
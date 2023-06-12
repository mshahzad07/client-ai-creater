import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import ReactModal from 'react-modal';
// import { useNavigate } from 'react-router-dom';


export function loginfisrtPopup(){
  // const navigate = useNavigate();
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(!isModalOpen);
  };

  // const openModal = () => {
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  // const closeModalAndNavigate = (path) => {
  //   closeModal();
  //   // if (path === '/login-page') {
  //   //   navigate('/login-page');
  //   // } else if (path === '/') {
  //   //   navigate('/');
  //   // }
  // };
  return (
    <ReactModal isOpen={openModal} onRequestClose={null} contentLabel="Loginpopup">
      <p>You are not logged in. Login first to create/edit images.</p>
      <button onClick={() => closeModalAndNavigate('/login-page')} className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 rounded-md mx-1">Login</button>
      <button onClick={() => closeModalAndNavigate('/')} className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 rounded-md mx-1">No, Thanks</button>
    </ReactModal>
  )
}
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactModal from 'react-modal';
import { download, deleteicon } from '../assets';
import { downloadImage } from '../utils';
import { FaTimes } from 'react-icons/fa';


const Card = ({ _id, name, prompt, photo, handleDeleteSuccess }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDenied, setDenied] = useState(false);

  const [Admin, setAdmin] = useState(false);


  const navigate = useNavigate();

  const Loginstatus = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      console.log('User is logged In');
      const username = localStorage.getItem('username')
      console.log('usernam is :', username)

      const password = localStorage.getItem('password')

      console.log('password is :', password)

      if (username === 'Frost Trek AI'  && password === 'msb5499176') {
        setAdmin(true)
      }
      else {
        setAdmin(false)
      }
      // console.log('User Token Is:', token);
    } else {
      console.log('User is logged Out');
      setAdmin(false)
    }
  };

  useEffect(() => {
    Loginstatus();
  }, []);


  const OpenDenied =()=>{
    setDenied(true);
  }
  const CloseDenied =()=>{
    setDenied(false);
  }

  const openPopup = () => {
    setModalOpen(true);
  };

  const closePopup = () => {
    setModalOpen(false);
  };

  const openDeletedPopup = () => {
    setDeleteModalOpen(true);
  };

  const closeDeletedPopup = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/delete/${_id}`);

      if (response.status === 200) {
        setDeleteModalOpen(true);
        console.log('Modal should open')
        const deletedId = _id;
        handleDeleteSuccess(deletedId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card p-0">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => downloadImage(_id, photo)}
              className="outline-none bg-transparent border-none mx-2"
            >
              <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
            </button>
            <button
              type="button"
              className="outline-none bg-transparent border-none mx-2"
            >
              <img
                src={deleteicon}
                alt="delete"
                onClick={() => {
                  if (Admin) {
                    openPopup();
                  } else {
                    OpenDenied();
                  }
                }}
                className="w-7 h-7 object-contain invert"
              />

            </button>
            <div>
              {isDenied && (
            <ReactModal
                isOpen={isDenied}
                onRequestClose={CloseDenied}
                contentLabel="Popup"
                className="modal fixed inset-0 flex items-center justify-center"
                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
              >
                <div className="modal-content bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={CloseDenied}
                  >
                    <FaTimes size={24} />
                  </button>
                  <p className="font-inter font-medium my-8">
                    Sorry!! Only Admin can Delete Posts.
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      to="/"
                      onClick={CloseDenied}
                      className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md"
                    >
                      OK
                    </button>
                    </div>
                  </div>


              </ReactModal>
              )}
            </div>
            <div>
              {isModalOpen && (

              
              <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closePopup}
                contentLabel="Popup"
                className="modal fixed inset-0 flex items-center justify-center"
                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
              >
                <div className="modal-content bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={closePopup}
                  >
                    <FaTimes size={24} />
                  </button>
                  <p className="font-inter font-medium my-8">
                    The image will be permanently deleted. Do you want to proceed?
                  </p>
                  <div className="flex justify-between mt-4">
                    <Link
                      to="/"
                      onClick={closePopup}
                      className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md"
                    >
                      No
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(_id);
                        closePopup();
                      }}
                      className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </ReactModal>
              )}
            </div>
            <div>
              {isDeleteModalOpen && (
                <ReactModal
                  isOpen={isDeleteModalOpen}
                  onRequestClose={closeDeletedPopup}
                  contentLabel="Popup"
                  className="modal fixed inset-0 flex items-center justify-center"
                  overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
                >
                  <div className="modal-content bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={closeDeletedPopup}
                  >
                    <FaTimes size={24} />
                  </button>
                    <p className="font-inter font-medium my-8">
                      The image has been deleted.
                    </p>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={closeDeletedPopup}
                        className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </ReactModal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
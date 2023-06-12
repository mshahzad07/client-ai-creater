import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';
import { preview, download } from '../assets';
import { getRandomPrompt, downloadImage } from '../utils';
import { FormField, Loader, Footer } from '../components';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

// import { LoggedUSer } from './LoginPage';
// import { get } from 'mongoose';





const CreatePost = () => {
  // const token = localStorage.getItem(token)

  // console.log('token is :', token)
  const fetchData = () => {
    try {
      const response = axios.fetch('http://localhost:8080/api/v1/user/login')

      if (response.status === 200) {
        const token = localStorage.getItem(token)

        console.log('token is :', token)
      }
    } catch (error) {

    }

  }
  { fetchData() }
  const getusername = () => {
    try {
      const response = axios.get(`http://localhost:8080/api/v1/user/username?token=${token}`);

      if (response.status === 200) {

        const Userdata = (response.data.username);

        console.log('username is :', username)

        const handleChange = (e) => {
          setForm({ ...form, [e.target.name]: e.target.value });
        };


      } else {

      }
    } catch (error) {

    }
  }

  { getusername() }

  // const [isSharedPopupOpen, setSharedPopupOpen] = useState(false);
  const [isSharedPopupOpen, setSharedPopupOpen] = useState(false);


  const closeSharedPopup = () => {
    setSharedPopupOpen(false)
  }

  const [isSharedErrPopupOpen, setSharedErrPopupOpen] = useState(false);



  const openSharedErrPopup = () => {
    setSharedErrPopupOpen(true);
  };

  const closeSharedErrPopup = () => {
    setSharedErrPopupOpen(false)
  }

  const location = useLocation();







  // const username = { Userdata };



  const username = localStorage.getItem('username')

  const [form, setForm] = useState({
    name: username,
    prompt: '',
    photo: '',
    resolution: 'medium', // Default resolution
    style: 'impressionist', // Default style
  });


  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === 'Backspace' || event.key === 'Delete') {
  //       event.preventDefault();
  //       setnameErr(true);
  //       console.log("You're not allowed to edit the username field.");
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);


  const handleResolutionChange = (e) => {
    setForm({ ...form, resolution: e.target.value });
  };
  const handleStyleChange = (e) => {
    setForm({ ...form, style: e.target.value });
  };
  const styleOptions = [
    { value: 'impressionist', label: 'Impressionist' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'realism', label: 'Realism' },
    { value: 'cubism', label: 'Cubism' },
    // Add additional style options as needed
  ];

  const styleSelectOptions = styleOptions.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {

    const resolution = form.resolution;
    const style = form.style;
    body: JSON.stringify({
      prompt: form.prompt,
      resolution: resolution,
      style: style,
    });


    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        const generatedPhoto = `data:image/jpeg;base64,${data.photo}`;
        setForm({ ...form, photo: generatedPhoto });

      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a proper prompt');
    }
  };

  const performShare = async () => {
    if (form.prompt && form.photo) {
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        await response.json();

        if (response.status === 200) {
          setSharedPopupOpen(true);
          console.log('response is true');
        } else {
          setSharedErrPopupOpen(true);
          console.log('response is false');
        }
        // navigate('/');
      } catch (err) {
        setSharedErrPopupOpen(true);
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    performShare();
  };



 

  return (
    <>
      <section className="max-w-7xl mx-20 ">
        <div className="max-w-7xl mx-auto ">
          <div>
            <h1 className="font-extrabold text-[white] text-[32px]">Create AI Art</h1>
          </div>
          <div>
            <p className="mt-2 text-[white] text-[14px] max-w-[auto]">Generate an imaginative image through Artificial Intelligence and also share it with the community</p>
          </div>
          <div className='flex justify-center items-center'>
            <form className="mt-16 max-w-3xl" onSubmit={(e) => { handleSubmit(e) }}>
              <div className="flex flex-col gap-5 color-white">
                <FormField
                  labelName="Your Name"
                  type="text"
                  name="name"
                  placeholder="Ex., john doe"
                  value={form.name}
                  readOnly
                />
                <FormField
                  labelName="Prompt"
                  type="text"
                  name="prompt"
                  placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                  value={form.prompt}
                  handleChange={handleChange}
                  isSurpriseMe
                  handleSurpriseMe={handleSurpriseMe}
                />
                <div className="flex flex-col">
                  <label htmlFor="style" className="text-white text-sm font-medium">
                    Style
                  </label>
                  <select
                    id="style"
                    name="style"
                    value={form.style}
                    onChange={handleStyleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                  >
                    <option value="impressionist">Impressionist</option>
                    <option value="abstract">Abstract</option>
                    <option value="realism">Realism</option>
                    <option value="cubism">Cubism</option>
                    {/* Add additional style options as needed */}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="resolution" className="text-white text-sm font-medium">
                    Resolution
                  </label>
                  <select
                    id="resolution"
                    name="resolution"
                    value={form.resolution}
                    onChange={handleResolutionChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* <div className="text-gray-900 text-sm h-80 w-80 rounded-lg focus:ring-blue-500 focus:border-blue-500  p-3 flex justify-center items-center"> */}
                <div className='flex justify-center items-center focus:ring-blue-500 focus:border-blue-500'>
                  {form.photo ? (
                    
                    <img
                      src={form.photo}
                      alt={form.prompt}
                      className="w-4/5 h-4/5 rounded-xl image-with-border"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-half h-half  opacity-100 "
                    />
                  )}

                  {generatingImg && (
                    <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                      <Loader />
                    </div>
                  )}
                  </div>
                {/* </div> */}
              </div>
              <div className="flex flex-col gap-5 color-white mt-10 bg-white rounded-md">
                <p className="my-2 text-black text-[14px] m-1 py-2" placeholder='Your Prompt'>{form.prompt}</p>
              </div>
              <div className="flex justify-center mt-5">

                <button
                  type="button"
                  onClick={generateImage}
                  className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {generatingImg ? 'Generating...' : 'Generate'}
                </button>
              </div>
              <div className="mt-10">
                <p className="mt-2 text-[white] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
                <button
                  onClick={(e) => { handleSubmit(e) }}
                  type="submit"
                  className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {loading ? 'Sharing...' : 'Share with the Community'}
                </button>
                {isSharedPopupOpen && (
                  <ReactModal
                    isOpen={isSharedPopupOpen}
                    onRequestClose={closeSharedPopup}
                    contentLabel="Popup"
                    className="modal fixed inset-0 flex items-center justify-center"
                    overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
                  >
                    <div className="modal-content bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
                      <p className="font-inter font-medium my-8">
                        Your image has been shared in the Frost Treck gallery. Continue creating more AI arts or explore the collection of shared images.
                      </p>
                      <div className="flex justify-between mt-4">
                        <button onClick={closeSharedPopup} className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md">
                          Create More Art
                        </button>
                        <Link to='/' onClick={closeSharedPopup} className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md">
                          Gallery
                        </Link>
                      </div>
                    </div>
                  </ReactModal>
                )}

                <div>
                  {isSharedErrPopupOpen && (
                    <ReactModal
                      isOpen={isSharedErrPopupOpen}
                      onRequestClose={closeSharedErrPopup}
                      contentLabel="Popup"
                      className="modal fixed inset-0 flex items-center justify-center"
                      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
                    >
                      <div className="modal-content bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
                        <p className="font-inter font-medium my-8">
                          There was an issue encountered while sharing.<br />
                          Share it again.
                        </p>
                        <div className="flex justify-between mt-4">
                          <button onClick={closeSharedErrPopup} className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md">
                            No, Thanks
                          </button>

                          <button onClick={(e) => { handleSubmit(e); closeSharedErrPopup() }} className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md">
                            Share
                          </button>
                        </div>
                      </div>
                    </ReactModal>
                  )}
                </div>


              </div>
              
            </form>
          </div>

        </div>
        <Footer />
      </section>
    </>
  );
};

export default CreatePost;
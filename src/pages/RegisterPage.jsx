import React, { useState } from 'react';
import { logo } from '../assets';
import { Link,useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import backgroundImage from '../assets/1.jpg';
import { FaTimes } from 'react-icons/fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';


const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [PasswordInvalid, setPasswordInvalid] = useState(false);
    const [Passwordlength, setPasswordlength] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState('');
    const [Emailerror, setEmailError] = useState("");
    const [EmailInvaliderror, setEmailInvaliderror] = useState("");
    const [ValidEmail, setValidEmail] = useState('');

    const [VerifiedEmail, setVerifiedEmail] = useState('');



    const [otpSent, setOtpSent] = useState('');
    const [otpReSent, setOtpReSent] = useState('');

    const [otpError, setOtpError] = useState('');
    const [OtpButton, setOtpButton] = useState('');

    const [OtpPopup, setOtpPopup] = useState('');


    const [OtpLengthError, setOtpLengthErr] = useState('');

    const [UserOtp, setUserOtp] = useState('');

    const navigate = useNavigate();


    const closeVerifiedPopup =()=>{
        setVerifiedEmail(false)
    }

    const closeRegPopup = () => {
        setIsRegistered(false)
    }
    const OpenOTPPopup = () => {
        setOtpPopup(true);
    }
    const closeOTPPopup = () => {
        setOtpPopup(false)
    }



    // const history = useHistory();
    const handleConfirmPassswordBlur = () => {
        if (password !== confirmedPassword) {
            // Display error message or handle password mismatch
            setPasswordMismatch('Password is not same');
        }
        else {
            setPasswordMismatch('');

        }
    }

    const [email, setEmail] = useState('');

    const checkUsernameValidity = async (e) => {

        try {
            // Make an API call to check if the username exists in the database
            const response = await axios.get(`http://localhost:8080/api/v1/user/Register-name-match?username=${username}`);

            if (!response.data.exists) {
                // Username is valid, continue with your form submission logic or other actions
                setError('');

                console.log('username dont exist')
            } else {
                // Invalid username
                setError('username is taken.');


                console.log('username already exist')

            }
        } catch (error) {
            console.error();
            // Handle any errors that occur during the API call
        }
    }
    const handleUsernameBlur = () => {

        if (username.trim() !== '') {
            checkUsernameValidity();
        }
        else {
            setError('')
        }
    };

    const handlePasswordBlur = () => {
        const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
        // const specialCharRegex = /^(?=.*[!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]).*$/;

        if (!alphanumericRegex.test(password)) {
            setPasswordInvalid('Password must have at least one alphabetic and one numeric character.');
            setPasswordlength('');
        } else {
            setPasswordInvalid('');

        }
    };
    const passwordlength = () => {
        if (password.length < 6) {
            setPasswordlength('Password must be longer than 6 digits');
        }
        else {
            setPasswordlength('');

        }
    }

    const checkEmailValidity = async (e) => {

        try {
            // Make an API call to check if the username exists in the database
            const response = await axios.get(`http://localhost:8080/api/v1/user/Register-email-match?email=${email}`);

            if (response.data.exists) {

                // Username is valid, continue with your form submission logic or other actions
                setEmailError('Email already exist,try another Email.')



            } else if (!response.data.exists) {
                setEmailError('')

                console.log('Email dont exist')                // Invalid username
                // setError('Username not found. Please register to create an account.');
            }
        } catch (error) {
            console.error();
            // Handle any errors that occur during the API call
        }
    }
    const handleEmailBlur = () => {
        if (email.trim() !== '') {
            if (!email.includes('@') || !email.includes('.com')) {
                // Email is invalid, throw an error message or display an error
                setEmailInvaliderror('Invalid email format')


                console.log('Invalid email format');
            }
            else {
                setEmailInvaliderror('')
                console.log('Email should be verify');
                checkEmailValidity();
            }
        }
    };

    const OTPbutton = () => {
        if (email.trim() === '') {
            setOtpButton(true);
        }
    }

    const handleSendOTP = async () => {
        console.log('OTP send req is made')
        try {
            // Make a request to your backend API to initiate OTP sending
            const response = await axios.post('http://localhost:8080/api/v1/user/sendOTP', {
                email: email
            });

            if (response.status === 200) {
                const otp = response.data.otp;
                console.log('OTP is sent to email :', email)
                console.log('OTP IS :', otp)
                // OTP sent successfully
                setOtpSent(true);
                setOtpPopup(true)
                setOtpError('');
            }

        } catch (error) {
            // Handle OTP sending error
            setOtpSent(false);
            setOtpError('Failed to send OTP. Please try again.');
            console.error(error);
        }
    };

    const ResendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/sendOTP', {
                email: email
            });

            if (response.status === 200) {
                const otp = response.data.otp;
                console.log('OTP is sent to email :', email)
                console.log('OTP IS :', otp)
                // OTP sent successfully
                setOtpReSent(true);
                setOtpError('');
                setUserOtp('')
            }
        } catch (error) {
            setOtpReSent(false);
            setOtpError('Failed to send OTP. Please try again.');
            console.error(error);
        }
    }
    


    const HandleOtpBlur = () => {
        if (UserOtp.length === 6) {
            verifyOTP(email, UserOtp);
        }
        else if (UserOtp.length !== 6) {
            setOtpLengthErr(true);
        }

    }

    const verifyOTP = async (email, UserOtp) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/verifyOTP', {
                email,
                otp: UserOtp,
            });

            if (response.status === 200) {
                // OTP verification successful
                console.log('OTP verification successful');
                setVerifiedEmail(true)
                closeOTPPopup();
                
                // Perform the desired actions after successful OTP verification
            } else {
                // OTP verification failed
                console.log('OTP verification failed');
                // Perform the desired actions after failed OTP verification
            }
        } catch (error) {
            console.error('Failed to verify OTP:', error);
            // Handle the error appropriately
        }
    };

    const handleRegistration = async (e) => {
        
        
        console.log('reg requested')
        e.preventDefault();

        // Make API request to user registration endpoint
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, email })
            });


            if (response.status === 200) {
                // User registration successful
                // Redirect or perform any necessary actions
                setIsRegistered(true);
                console.log('reg is done')
                setUsername('');
                setPassword('');
                setConfirmedPassword('');
                setEmail('');
                // history.push('/login-page');
            } else {
                // User registration failed
                // Handle error or display error message
                const errorData = await response.json();
                console.log('Registration Error:', errorData.message);
            }
        } catch (error) {
            console.log('Registration Error:', error);
            // Handle error or display error message
        }
    };

    const RegisterUser = () => {
        if (VerifiedEmail) {
            handleRegistration();
        }

    }

    return (
        <section>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="login-register-form">
                                <div className="form-holder">
                                    <div className="form-row form-head">
                                        <div className="col-xs-6">
                                            <Link to="/" className="site-brand"><img src={logo} alt="Frost Trek" /></Link>
                                        </div>
                                        <div className="col-xs-6">
                                            <div className="form-title"><img src="" alt="" /></div>
                                        </div>
                                    </div>
                                    <p className='text-white my-6 text-lg'>Register your new account here !!</p>

                                    <div className="form-row form-links">
                                        <div className="col-xs-12">
                                            <Link className="link-to active">Register</Link>
                                        </div>
                                    </div>
                                    <form>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label>Username</label>
                                                <input placeholder='Please Enter Username Here' type="text" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={handleUsernameBlur} className="form-control" required />

                                                {error && (
                                                    <div className="mb-2 -mt-8  text-red-400 ">
                                                        <div className='flex items-center'>
                                                            <FontAwesomeIcon icon={faExclamationCircle} className='mr-2' />
                                                            <p>{error}</p>
                                                        </div>
                                                    </div>)}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label>Password</label>
                                                <input placeholder='Please Enter Password Here' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" onBlur={() => { handlePasswordBlur(); passwordlength() }} required />
                                                {(Passwordlength || PasswordInvalid) && (
                                                    <div className='-mt-8 text-red-400 mb-2'>
                                                        <div className='flex items-center'>
                                                            <FontAwesomeIcon icon={faExclamationCircle} className='mr-2' />
                                                            {Passwordlength ? Passwordlength : PasswordInvalid}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label>Repeat password</label>
                                                <input placeholder='Please Enter Same Password Here' type="password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} onBlur={handleConfirmPassswordBlur} className="form-control" required />
                                                {passwordMismatch && <div className='text-red-500 -mt-8 mb-2'>
                                                    <div className='flex items-center'><FontAwesomeIcon icon={faExclamationCircle} className='mr-2' />
                                                        {passwordMismatch} </div>
                                                </div>}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label>Email</label>
                                                <div className='flex items-center'>
                                                    <input placeholder='Please Enter Email Here' type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => { handleEmailBlur(); OTPbutton(); }} className="form-control" required />
                                                </div>
                                                <div className='flex justify-end'>
                                                    <button type="button" onClick={handleSendOTP} className='-mt-6 mb-8 flex items-center font-inter font-medium bg-[#BD8B44] text-white py-1 px-3  rounded-md'> Send OTP </button>
                                                </div>
                                                {ValidEmail && (<p>Enter valid Email.</p>)}
                                                {/* {EmailInvaliderror && <div className='text-red-500 -mt-7'>{EmailInvaliderror}</div>} */}
                                                {(EmailInvaliderror || Emailerror) && (

                                                    <div className='-mt-8 text-red-400'>
                                                        <div className='flex items-center'>
                                                            <FontAwesomeIcon icon={faExclamationCircle} className='mr-2' />
                                                            {EmailInvaliderror ? EmailInvaliderror : Emailerror}
                                                        </div>
                                                    </div>

                                                )}
                                                {otpError && <p>OTP could not sent due to an issue,try again.</p>}
                                                {OtpPopup && (
                                                    <ReactModal
                                                        isOpen={OtpPopup}
                                                        onRequestClose={closeOTPPopup}
                                                        contentLabel="Popup"
                                                        className="modal  fixed inset-0 flex items-center justify-center"
                                                        overlayClassName="modal-overlay  fixed inset-0 bg-black bg-opacity-50 max-h-screen"
                                                    >
                                                        <div className="modal-content  bg-opacity-30 p-8 rounded-lg shadow-lg max-w-md mx-auto max-h-full my-auto " style={{ backgroundImage: `url(${backgroundImage})` }}>
                                                            {/* <div className="absolute inset-0 z-[-1] bg-center bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}></div> */}

                                                            <button
                                                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                                                                onClick={closeOTPPopup}
                                                            >
                                                                <FaTimes size={24} />
                                                            </button>
                                                            <div>
                                                                {otpSent && <p className='text-white'>OTP is sent to your email : {email} </p>}
                                                                <input type="text" name="UserOtp" placeholder="Enter OTP" value={UserOtp}
                                                                    onChange={(e) => setUserOtp(e.target.value)} onBlur={HandleOtpBlur} className='form-control mt-8' />
                                                                {OtpLengthError && (<p className='mt-2 text-white '>Enter only 6 digit OTP.</p>)}
                                                                <div className='flex justify-end'>
                                                                    <button onClick={ResendOtp} className='my-3 flex items-center font-inter font-medium bg-[#BD8B44] text-white py-1 px-3  rounded-md' >Resend OTP</button>
                                                                </div>
                                                                {otpReSent && (<p className='text-white my-2'>OTP is sent again.Check your Email.</p>)}
                                                                {!otpReSent && (<p className='text-white my-2'>OTP could not sent due to an issue,try again.</p>)}
                                                            </div>
                                                        </div>
                                                    </ReactModal>

                                                )}



                                            </div>
                                        </div>
                                        {VerifiedEmail && (
                                            <ReactModal
                                                isOpen={VerifiedEmail}
                                                onRequestClose={closeVerifiedPopup}
                                                contentLabel="Popup"
                                                className="modal  fixed inset-0 flex items-center justify-center"
                                                overlayClassName="modal-overlay  fixed inset-0 bg-black bg-opacity-50 max-h-screen"
                                            >
                                                <div className="modal-content  bg-opacity-30 p-8 rounded-lg shadow-lg max-w-md mx-auto max-h-full my-auto " style={{ backgroundImage: `url(${backgroundImage})` }}>
                                                    <button
                                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                                                        onClick={closeVerifiedPopup}
                                                    >
                                                        <FaTimes size={24} />
                                                    </button>
                                                    <p className='text-white mt-1'>Your email is verified.</p>
                                                    <div className="flex justify-end mt-4">
                                                    <button onClick={closeVerifiedPopup} className="flex items-center font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md">
                                                        OK
                                                    </button>
                                                    </div>
                                                  
                                                    
                                                </div>
                                            </ReactModal>
                                        )}
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <div className="submit-holder">
                                                    <button type="submit" onClick={handleRegistration}>Register</button>
                                                </div>
                                            </div>
                                        </div>
                                        {isRegistered && (
                                            <ReactModal
                                                isOpen={isRegistered}
                                                onRequestClose={closeRegPopup}
                                                contentLabel="Popup"
                                                className="modal  fixed inset-0 flex items-center justify-center"
                                                overlayClassName="modal-overlay  fixed inset-0 bg-black bg-opacity-50 max-h-screen"
                                            >
                                                <div className="modal-content  bg-opacity-30 p-8 rounded-lg shadow-lg max-w-md mx-auto max-h-full my-auto " style={{ backgroundImage: `url(${backgroundImage})` }}>

                                                    <button
                                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                                                        onClick={closeRegPopup}
                                                    >
                                                        <FaTimes size={24} />
                                                    </button>
                                                    <p className='text-white'>Your account is regestered.Now you can login.</p>
                                                    <div className="flex justify-end mt-4">
                                                    <button onClick={()=>{closeRegPopup();navigate('/')}} className="flex items-center font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md">
                                                        OK
                                                    </button>
                                                    </div>
                                                </div>
                                            </ReactModal>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage;
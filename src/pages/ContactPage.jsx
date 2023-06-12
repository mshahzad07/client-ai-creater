import React from 'react'
import { IoMdMail } from 'react-icons/io';
import { IoMdChatboxes } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
    return (
        <section>
            <div id="top-content" class="container-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 center">
                            <div class="page-title">Contact us / Support</div>
                            <div class="page-subtitle">We value your feedback and are here to assist you. If you have any questions, concerns, or suggestions, please don't hesitate to reach out to us.You can contact us through the provided contact.We strive to respond to all inquiries promptly and ensure your satisfaction. Your feedback is essential in helping us improve our services and deliver a better experience for our valued users. We appreciate your engagement and look forward to hearing from you.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="support-details container-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6 col-md-4">
                            <div class="support-box">
                                <div class="icon green"><IoMdChatboxes size={60} color="#ff9800"/></div>
                                <div class="details-holder">
                                    <div class="title">Call or Chat</div>
                                    <div class="details">
                                        <a>Tel: +(92) 305 5499176</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-4">
                            <div class="support-box">
                                <div class="icon blue"><IoMdMail size={60} color="#ff9800"/></div>
                                <div class="details-holder">
                                    <div class="title">Send e-mail</div>
                                    <div class="details">
                                        <a>frosttrek.ai.generater@gmail.com</a>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-4">
                            <div class="support-box">
                                <div class="icon purple"><FaMapMarkerAlt size={60} color="#ff9800"/></div>
                                <div class="details-holder">
                                    <div class="title">Visit us</div>
                                    <div class="details">
                                        <a href="#">Comsats University Islamabad,wah campus</a>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactPage
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import ScrollToTop from './ScrollToTop';
import { useEffect } from "react";

const Footer = () => {

    useEffect(() => {
        const { handleScrollToTop, handleScroll } = ScrollToTop();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section>
            <div className="content-above-footer">
            </div>
            <footer className="footer">
                <a href="#" className="scroll-to-top" id="scrollToTopBtn">
                    <i className="fas fa-arrow-up"></i>

                </a>
                <div className="footer-content">
                    <div className="contact-info">
                        <h3 className="contact-heading">Contact</h3>
                        <ul className="contact-list">
                            <li><FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' />Comsats University Islamabad,Wah Campus</li>
                            <li><FontAwesomeIcon icon={faEnvelope} className='mr-2' /> frosttrek.ai.generater@gmail.com</li>
                            <li><FontAwesomeIcon icon={faPhone} className='mr-2' /> 0305-5499176</li>
                        </ul>
                    </div>
                    <ul className="social-links">
                        <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                    </ul>
                </div>
                <p className="copyright">
                    &copy; Copyright 2023 <b>Frost Trek</b>. All rights reserved.
                </p>
            </footer>
        </section>
    )
}

export default Footer
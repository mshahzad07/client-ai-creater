import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from '../components';

const AboutPage = () => {
    return (
        <section>
            <div id="top-content" class="container-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 center">
                            <div class="page-title">About Us</div>
                            <div class="page-subtitle">Students of Comsats University Islamabad,Wah Campus</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-photo-sc container-fluid darkblue-bg">
                <div className="row">
                    <div className="col-md-6 photo-holder photo1">
                    </div>
                    <div className="col-md-6 text-holder text1">
                        <div className="text-box">
                            <h4>Our full story</h4>
                            <p>We are a group of final year students who have recently completed our project on AI Art Generator as part of our final year project (FYP). Our project focuses on harnessing the power of artificial intelligence to generate unique and captivating artworks. By utilizing advanced machine learning algorithms and deep neural networks, our AI Art Generator is capable of producing stunning visuals that exhibit creativity and artistic expression.

Throughout the development process, we have dedicated countless hours to research, experimentation, and refinement to ensure the highest quality and aesthetic appeal of the generated art pieces. Our goal is to provide users with a seamless and enjoyable experience, allowing them to explore the intersection of technology and art.

</p>


                        </div>
                    </div>
                </div>
            </div>
            <div className="text-photo-sc container-fluid darkblue-bg">
                <div className="row rtl-row">
                    <div className="col-md-6 text-holder text2 opposite">
                        <div className="text-box">
                            <h4>Our Dedication</h4>
                            <p>We are immensely proud of our project and the opportunities it presents for artists, enthusiasts, and anyone with an appreciation for creativity. The AI Art Generator offers a new way to explore artistic possibilities and serves as a source of inspiration for individuals seeking unique and visually captivating artworks.

We invite you to explore our AI Art Generator and immerse yourself in the world of AI-generated art. Your feedback and support are greatly appreciated as we continue to enhance our project and explore further advancements in the field of AI and art.

</p>

                            <p>Thank you for your interest and support in our FYP project.</p>

                        </div>
                    </div>
                    <div class="col-md-6 photo-holder photo2"></div>

                </div>
            </div>
            <Footer/>
        </section>
        
    )
}

export default AboutPage
import React from 'react'
import { Link } from 'react-router-dom';
// import {photo1} from '../assets'
import { blogone,blogtwo,blogthree } from '../assets';
import { Footer } from '../components';

const BlogPage = () => {
    return (
        <section>
            <div className="blog container-fluid">
                <div className="container">
                    <div className="row">
                        <div className='font-inter text-2xl	 text-white py-5'>Read our latest Blogs and explore the AI World</div>
                        <div className="col-md-12">
                            <div className="post-box summary">
                                <div className="post-photo">
                                    <img src={blogone} className='w-60 h-80 rounded-4' alt='blogphoto1'></img>
                                </div>
                                <div className="post-title">The Magic Behind AI Image Generation</div>
                                <div className="post-summary">Step behind the scenes and discover the magic of AI image generation. Through the clever use of advanced algorithms and neural networks, AI can learn from vast amounts of data to generate visually striking images. It's like having an AI-powered artist at your fingertips, capable of bringing your wildest ideas to life.</div>
                            </div>
                            <div className="post-box summary">
                                <div className="post-photo">
                                    <img src={blogthree} alt='blogphoto'className='w-60 h-80 rounded-4'></img>
                                </div>
                                <div className="post-title">From Replication to Innovation</div>
                                <div className="post-summary">Going Beyond Existing Images,
                                    AI image generation is not just about copying existing images. It's about pushing the boundaries of creativity. With style transfer, you can infuse your images with the essence of famous artists or create entirely new visual styles. Want to generate an image of a dreamy landscape? Simply input your desired colors, shapes, or objects, and watch the AI weave its magic to produce something truly unique.</div>
                            </div>
                            <div className="post-box summary">
                                <div className="post-photo">
                                    <img src={blogtwo} alt='blogphoto'className='w-60 h-80 rounded-4'></img>
                                </div>
                                <div className="post-title">Responsible Creation and Ethical Considerations</div>
                                <div className="post-summary">As we venture into this exciting territory, it's important to be mindful of ethical considerations. Deepfakes, for instance, highlight the need for responsible use and appropriate regulation of AI image generation technologies. Let's ensure that this incredible power is harnessed for positive and ethical purposes.</div>
                            </div>
                            <nav className="paging">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link prev" href="#" aria-label="Previous">
                                            <i className="hstb hstb-down-arrow"></i>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link next" href="#" aria-label="Next">
                                            <i className="hstb hstb-down-arrow"></i>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    )
}

export default BlogPage
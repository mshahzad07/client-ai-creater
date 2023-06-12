import React from 'react'

const ScrollToTop = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleScroll = () => {
        const scrollToTopBtn = document.getElementById("scrollToTopBtn");

        if (window.pageYOffset > 100) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    };

    return {
        handleScrollToTop,
        handleScroll
    };
};


export default ScrollToTop
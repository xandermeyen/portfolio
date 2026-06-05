if (typeof Swiper !== 'undefined' && document.querySelector('.skillsSwiper')) {
    const skillsSwiper = new Swiper('.skillsSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // Mobile
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // Tablet
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            // Desktop
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
}

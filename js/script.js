console.log("Hi")

import Swiper from "../node_modules/swiper/swiper-bundle.mjs"

const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,

    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        1110: {
            slidesPerView: 3,
        },
    }
})


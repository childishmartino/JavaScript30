const sliderImages = document.querySelectorAll('.slide-in');

// any time you are doing anything on scroll you probably want a debounce function somewhere
// debounce functions delays or tells a designated function to run at most x amount of times in x time frame
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
        const slideInAt = ((window.scrollY + window.innerHeight) - sliderImage.height / 2);
        // calculates where half way through image would be console.log(slideInAt)
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        // calculates where bottom of image would be console.log(imageBottom)
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    })
};

window.addEventListener('scroll', debounce(checkSlide));
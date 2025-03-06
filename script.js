// Scroll-triggered animations
document.addEventListener("scroll", function () {
    const images = document.querySelectorAll(".animated, .lazy-load");
    images.forEach(img => {
        const imgTop = img.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        if (imgTop < triggerPoint) {
            img.classList.add("visible");
        } else {
            img.classList.remove("visible");
        }
    });
});

// Progress bar
window.onscroll = function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    document.getElementById("progressBar").style.width = scrollPercentage + "%";
};

// Lazy loading for images
const lazyLoadImages = document.querySelectorAll(".lazy-load");
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add("visible");
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: "0px 0px 200px 0px"
});

lazyLoadImages.forEach(img => {
    img.dataset.src = img.src;
    img.src = "";
    observer.observe(img);
});
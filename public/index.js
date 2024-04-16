// Pause the marquee animation on hover
const newsContainer = document.querySelector('.news-container');
newsContainer.addEventListener('mouseenter', () => {
    newsContainer.style.animationPlayState = 'paused';
});

newsContainer.addEventListener('mouseleave', () => {
    newsContainer.style.animationPlayState = 'running';
});




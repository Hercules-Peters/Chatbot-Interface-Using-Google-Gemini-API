document.addEventListener('DOMContentLoaded', () => {
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.slide');
    const contentContainer = document.querySelector('.content-container');

    let startX, moveX, currentIndex = 0;

    function setActiveSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function handleSwipe() {
        if (moveX - startX > 50 && currentIndex > 0) {
            // Swipe right
            currentIndex--;
        } else if (startX - moveX > 50 && currentIndex < slides.length - 1) {
            // Swipe left
            currentIndex++;
        }

        setActiveSlide(currentIndex);
    }

    contentContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    contentContainer.addEventListener('touchmove', (e) => {
        moveX = e.touches[0].clientX;
    });

    contentContainer.addEventListener('touchend', () => {
        handleSwipe();
    });

    // For desktop: mouse events
    contentContainer.addEventListener('mousedown', (e) => {
        startX = e.clientX;
    });

    contentContainer.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) {
            moveX = e.clientX;
        }
    });

    contentContainer.addEventListener('mouseup', () => {
        handleSwipe();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            setActiveSlide(currentIndex);
        });
    });

    // Prevent default behavior for links during swipe
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (Math.abs(moveX - startX) > 5) {
                e.preventDefault();
            }
        });
    });
});


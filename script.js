document.addEventListener("DOMContentLoaded", () => {
    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.fade-in, .slide-up');
    animateElements.forEach(el => observer.observe(el));

    // --- Smooth Scrolling for Navbar Links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Audio Control ---
    const musicBtn = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    // Browser policies usually block autoplay without user interaction.
    // This button allows the user to explicitly start the music.
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '🎵 Play Our Song';
        } else {
            audio.play();
            musicBtn.innerHTML = '⏸ Pause Song';
        }
        isPlaying = !isPlaying;
    });

    // --- Lightbox Gallery ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            lightbox.style.display = "block";
            lightboxImg.src = e.target.src;
        });
    });

    // Close lightbox on 'X' click
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
    });

    // Close lightbox on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Fade-in Animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));

    // Highlight active nav link
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-links a');

    menuItem.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });

    // Portfolio Filtering Logic
    const portfolioFilterBtns = document.querySelectorAll('.filter-btn');
    const portfolioGalleryItems = document.querySelectorAll('.gallery-item');

    portfolioFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            portfolioFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioGalleryItems.forEach(item => {
                const categories = item.getAttribute('data-category')?.split(' ') || [];

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.classList.remove('hide');

                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';

                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 400);
                }
            });
        });
    });

    // Portfolio Video Play Button
    const videoGalleryItems = document.querySelectorAll('.gallery-item');

    videoGalleryItems.forEach(item => {
        const video = item.querySelector('video');
        const playBtn = item.querySelector('.play-button');

        if (video && playBtn) {
            playBtn.addEventListener('click', (event) => {
                event.stopPropagation();

                if (video.paused) {
                    video.play();
                    playBtn.style.opacity = '0';
                    playBtn.style.pointerEvents = 'none';
                } else {
                    video.pause();
                    playBtn.style.opacity = '1';
                    playBtn.style.pointerEvents = 'auto';
                }
            });

            video.addEventListener('click', () => {
                video.pause();
                playBtn.style.opacity = '1';
                playBtn.style.pointerEvents = 'auto';
            });

            video.addEventListener('ended', () => {
                playBtn.style.opacity = '1';
                playBtn.style.pointerEvents = 'auto';
            });
        }
    });

    // Scroll Highlight for Differentials
    const diffCards = document.querySelectorAll('.diff-card');

    if (diffCards.length > 0) {
        const diffOptions = {
            threshold: 0.6,
            rootMargin: "0px 0px -15% 0px"
        };

        const diffObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('highlight-active');
                } else {
                    entry.target.classList.remove('highlight-active');
                }
            });
        }, diffOptions);

        diffCards.forEach(card => diffObserver.observe(card));
    }

    // Hero Text Rotation
    const heroRotatingText = document.getElementById('hero-rotating-text');
    if (heroRotatingText) {
        const phrases = [
            "Imobiliário de alto padrão",
            "Hotelaria & Experiências",
            "Arquitetura & Design"
        ];
        let currentPhraseIndex = 0;

        setInterval(() => {
            // Initiate the slide out
            heroRotatingText.classList.remove('slide-in');
            heroRotatingText.classList.add('slide-out');

            // Wait for the slide-out animation to finish
            setTimeout(() => {
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                heroRotatingText.textContent = phrases[currentPhraseIndex];

                // Slide in with new text
                heroRotatingText.classList.remove('slide-out');
                heroRotatingText.classList.add('slide-in');
            }, 800); // Matches the 0.8s animation duration
        }, 3000); // Change text every 3 seconds
    }

    // Particles effect
    let particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-container';
        document.body.prepend(particlesContainer);
    }

    if (particlesContainer) {
        const particleCount = 200;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 2 + 1; // 1px to 3px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}vw`;
            particle.style.top = `${posY}vh`;

            const opacity = Math.random() * 0.4 + 0.1; // 0.1 to 0.5
            particle.style.opacity = opacity;

            const duration = Math.random() * 20 + 20; // 20s to 40s (slow float)
            const delay = Math.random() * -40; // Start at random point in animation

            particle.style.animation = `floatParticle ${duration}s ${delay}s infinite ease-in-out`;

            particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 300}px`);
            particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 300}px`);

            particlesContainer.appendChild(particle);
        }
    }
});
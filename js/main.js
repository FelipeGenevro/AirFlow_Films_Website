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
});
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
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px"
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

    // Helper function to extract YouTube ID
    function getYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Portfolio YouTube Video Play Button & Embed Logic
    const youtubeGalleryItems = document.querySelectorAll('.gallery-item[data-youtube-url]');

    youtubeGalleryItems.forEach(item => {
        const playBtn = item.querySelector('.play-button');
        const youtubeUrl = item.getAttribute('data-youtube-url');
        const videoId = getYouTubeId(youtubeUrl);

        if (videoId && playBtn) {
            const playVideo = () => {
                // 1. Stop and remove any other playing YouTube videos
                document.querySelectorAll('.gallery-item.playing').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('playing');
                        const iframe = otherItem.querySelector('iframe');
                        if (iframe) iframe.remove();
                    }
                });

                // 2. Add playing class to hide cover elements
                item.classList.add('playing');

                // 3. Create and append the YouTube iframe
                const iframe = document.createElement('iframe');
                // Use youtube-nocookie.com and add strict referrerpolicy to prevent Error 153
                iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
                iframe.title = "YouTube video player";
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                iframe.allowFullscreen = true;
                iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

                item.appendChild(iframe);
            };

            // Play when clicking the play button
            playBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                playVideo();
            });

            // Play when clicking anywhere on the item container if not already playing
            item.addEventListener('click', () => {
                if (!item.classList.contains('playing')) {
                    playVideo();
                }
            });
        }
    });

    // Cleanup playing videos when filter is clicked
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.gallery-item.playing').forEach(item => {
                item.classList.remove('playing');
                const iframe = item.querySelector('iframe');
                if (iframe) iframe.remove();
            });
        });
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
            }, 400); // Matches the 0.4s animation duration
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
        const particleCount = 100;

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

        // Shooting Stars Effect
        setInterval(() => {
            const star = document.createElement('div');
            star.classList.add('shooting-star');

            // Randomly spawn from either top edge or right edge
            const spawnFromTop = Math.random() > 0.5;
            let startX, startY;

            if (spawnFromTop) {
                startX = Math.random() * window.innerWidth;
                startY = -50;
            } else {
                startX = window.innerWidth + 50;
                startY = Math.random() * window.innerHeight;
            }

            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;

            const duration = Math.random() * 1.5 + 1.5;
            star.style.animation = `shootStar ${duration}s linear forwards`;

            particlesContainer.appendChild(star);

            // Clean up
            setTimeout(() => {
                star.remove();
            }, duration * 1000);

        }, 4000);

        // Twinkling Stars Effect
        setInterval(() => {
            const twinkle = document.createElement('div');
            twinkle.classList.add('twinkle-star');

            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;

            twinkle.style.left = `${posX}px`;
            twinkle.style.top = `${posY}px`;

            particlesContainer.appendChild(twinkle);

            // Clean up after 1 second
            setTimeout(() => {
                twinkle.remove();
            }, 1000);

        }, 1500); // spawn a new twinkle every 500ms
    }

    // Border Glow Hover Effect for all .border-glow-card elements
    const borderGlowCards = document.querySelectorAll('.border-glow-card');

    borderGlowCards.forEach(card => {
        const getCenterOfElement = (el) => {
            const rect = el.getBoundingClientRect();
            return [rect.width / 2, rect.height / 2];
        };

        const getEdgeProximity = (el, x, y) => {
            const [cx, cy] = getCenterOfElement(el);
            const dx = x - cx;
            const dy = y - cy;
            let kx = Infinity;
            let ky = Infinity;
            if (dx !== 0) kx = cx / Math.abs(dx);
            if (dy !== 0) ky = cy / Math.abs(dy);
            return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
        };

        const getCursorAngle = (el, x, y) => {
            const [cx, cy] = getCenterOfElement(el);
            const dx = x - cx;
            const dy = y - cy;
            if (dx === 0 && dy === 0) return 0;
            const radians = Math.atan2(dy, dx);
            let degrees = radians * (180 / Math.PI) + 90;
            if (degrees < 0) degrees += 360;
            return degrees;
        };

        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const edge = getEdgeProximity(card, x, y);
            const angle = getCursorAngle(card, x, y);

            card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3));
            card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
        });

        card.addEventListener('pointerleave', () => {
            card.style.setProperty('--edge-proximity', '0');
        });
    });

    // --- Light Point Custom Cursor ---
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    
    if (isFinePointer) {
        const cursor = document.createElement('div');
        cursor.className = 'light-point-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let isMoving = false;
        let isHoveringIframeOrInput = false;

        window.addEventListener('pointermove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isMoving) {
                cursorX = mouseX;
                cursorY = mouseY;
                isMoving = true;
            }
            
            if (!isHoveringIframeOrInput) {
                cursor.classList.add('visible');
                document.documentElement.classList.add('cursor-enabled');
            }
        });

        document.addEventListener('pointerleave', () => {
            cursor.classList.remove('visible');
        });
        document.addEventListener('pointerenter', () => {
            if (!isHoveringIframeOrInput) {
                cursor.classList.add('visible');
            }
        });

        // Loop for interpolation (spring damping)
        const lerp = 0.22; // responsive but soft tracking
        
        function animateCursor() {
            if (isMoving) {
                cursorX += (mouseX - cursorX) * lerp;
                cursorY += (mouseY - cursorY) * lerp;
                cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            }
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Event delegation for state reactivity
        document.addEventListener('pointerover', (e) => {
            const target = e.target;
            if (!target) return;

            // Accessibility rules: hide cursor over inputs & textareas & iframes
            const isIframe = target.tagName === 'IFRAME' || target.closest('iframe');
            const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input') || target.closest('textarea');
            
            if (isIframe || isInput) {
                isHoveringIframeOrInput = true;
                cursor.classList.remove('visible');
                document.documentElement.classList.remove('cursor-enabled');
                return;
            } else {
                isHoveringIframeOrInput = false;
                if (isMoving) {
                    cursor.classList.add('visible');
                    document.documentElement.classList.add('cursor-enabled');
                }
            }

            // 1. Service Card Hover (Purple)
            if (target.closest('.service-card')) {
                cursor.setAttribute('data-hover', 'service');
                return;
            }

            // 2. Differential Card Hover (Cyan)
            if (target.closest('.diff-card')) {
                cursor.setAttribute('data-hover', 'diff');
                return;
            }

            // 3. Client Card Hover (Pink)
            if (target.closest('.client-card')) {
                cursor.setAttribute('data-hover', 'client');
                return;
            }

            // 4. Portfolio Item Hover (Gold)
            if (target.closest('.gallery-item')) {
                cursor.setAttribute('data-hover', 'portfolio');
                return;
            }

            // 5. WhatsApp Button (Green)
            if (target.closest('.whatsapp-btn')) {
                cursor.setAttribute('data-hover', 'whatsapp');
                return;
            }

            // 6. Generic links / buttons / hover-triggers (White/Cream glow)
            if (
                target.closest('.btn') || 
                target.closest('.filter-btn') || 
                target.closest('.play-button') || 
                target.closest('.social-btn') || 
                target.closest('button') || 
                target.closest('a')
            ) {
                cursor.setAttribute('data-hover', 'link');
                return;
            }

            // Standard cursor (un-reacted point of light)
            cursor.removeAttribute('data-hover');
        });

        document.addEventListener('pointerout', (e) => {
            const target = e.target;
            if (!target) return;
            
            // Re-evaluate state when leaving inputs or iframes
            const isIframe = target.tagName === 'IFRAME' || target.closest('iframe');
            const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input') || target.closest('textarea');
            
            if (isIframe || isInput) {
                isHoveringIframeOrInput = false;
                if (isMoving) {
                    cursor.classList.add('visible');
                    document.documentElement.classList.add('cursor-enabled');
                }
            }
            
            cursor.removeAttribute('data-hover');
        });
    }
});
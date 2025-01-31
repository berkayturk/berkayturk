// Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryGrid = document.querySelector('.gallery-grid');

// Gallery items with copyright-free content
const galleryItems = [
    { 
        type: 'photo', 
        src: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=800',
        title: 'Aerial Beach View',
        credit: 'Unsplash'
    },
    { 
        type: 'photo', 
        src: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800',
        title: 'Mountain Range Drone Shot',
        credit: 'Unsplash'
    },
    { 
        type: 'photo', 
        src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800',
        title: 'City Aerial View',
        credit: 'Unsplash'
    },
    { 
        type: 'photo', 
        src: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800',
        title: 'Ocean Coastline',
        credit: 'Unsplash'
    },
    { 
        type: 'photo', 
        src: 'https://images.unsplash.com/photo-1504387432042-8aca7c138087?auto=format&fit=crop&w=800',
        title: 'Forest Landscape',
        credit: 'Unsplash'
    },
    { 
        type: 'video', 
        src: 'https://player.vimeo.com/video/342333493',
        title: 'Aerial Ocean Waves',
        credit: 'Pexels'
    },
    { 
        type: 'video', 
        src: 'https://player.vimeo.com/video/449739950',
        title: 'Mountain Valley Flight',
        credit: 'Pexels'
    }
];

function createGalleryItem(item) {
    const element = document.createElement('div');
    element.className = 'gallery-item fade-in';
    element.dataset.type = item.type;
    
    if (item.type === 'photo') {
        element.innerHTML = `
            <div class="gallery-image-container">
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="item-overlay">
                    <h3>${item.title}</h3>
                    <p class="credit">© ${item.credit}</p>
                </div>
            </div>
        `;
    } else {
        element.innerHTML = `
            <div class="gallery-video-container">
                <iframe src="${item.src}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                <div class="item-overlay">
                    <h3>${item.title}</h3>
                    <p class="credit">© ${item.credit}</p>
                </div>
            </div>
        `;
    }
    
    return element;
}

function filterGallery(filter) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (filter === 'all' || item.dataset.type === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize gallery
galleryItems.forEach(item => {
    galleryGrid.appendChild(createGalleryItem(item));
});

// Filter button click handlers
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterGallery(button.dataset.filter);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

// Language handling
let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    updateContent();
}

function updateContent() {
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = key.split('.').reduce((obj, i) => obj[i], translations[currentLanguage]);
        if (translation) {
            element.textContent = translation;
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = key.split('.').reduce((obj, i) => obj[i], translations[currentLanguage]);
        if (translation) {
            element.placeholder = translation;
        }
    });

    // Update gallery items
    updateGalleryTitles();
}

function updateGalleryTitles() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        const titleElement = item.querySelector('h3');
        const creditElement = item.querySelector('.credit');
        if (titleElement && creditElement) {
            const type = item.dataset.type;
            // You can add translations for gallery items if needed
            // For now, we'll keep the original titles
        }
    });
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    
    // Set initial language
    languageSelect.value = currentLanguage;
    setLanguage(currentLanguage);

    // Language change handler
    languageSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Multilingual success message
    const successMessage = currentLanguage === 'tr' 
        ? 'Mesajınız için teşekkürler! En kısa sürede size geri döneceğiz.'
        : 'Thank you for your message! We will get back to you soon.';
    
    alert(successMessage);
    contactForm.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = 0;
    fadeObserver.observe(element);
});

// Social media feed integration
// Note: You'll need to replace these with actual API calls to your social media platforms
function loadSocialFeeds() {
    const socialGrid = document.querySelector('.social-grid');
    
    // Example of loading TikTok videos (you'll need to use TikTok's actual API)
    // const tiktokVideos = await fetchTikTokVideos();
    
    // Example of loading Instagram posts (you'll need to use Instagram's actual API)
    // const instagramPosts = await fetchInstagramPosts();
    
    // Example of loading Facebook posts (you'll need to use Facebook's actual API)
    // const facebookPosts = await fetchFacebookPosts();
}

// Initialize social feeds when the page loads
window.addEventListener('load', loadSocialFeeds); 
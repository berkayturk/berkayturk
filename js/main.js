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

// Sample gallery items (replace with your actual content)
const galleryItems = [
    { type: 'photo', src: 'path/to/photo1.jpg', title: 'Aerial View 1' },
    { type: 'video', src: 'path/to/video1.mp4', title: 'Drone Flight 1' },
    // Add more items as needed
];

function createGalleryItem(item) {
    const element = document.createElement('div');
    element.className = 'gallery-item fade-in';
    element.dataset.type = item.type;
    
    if (item.type === 'photo') {
        element.innerHTML = `
            <img src="${item.src}" alt="${item.title}">
            <div class="item-overlay">
                <h3>${item.title}</h3>
            </div>
        `;
    } else {
        element.innerHTML = `
            <video src="${item.src}" controls></video>
            <div class="item-overlay">
                <h3>${item.title}</h3>
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

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
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
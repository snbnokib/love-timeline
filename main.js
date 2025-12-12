// script.js - Clean and easy to understand version

// Array of image paths
const images = [
  'pics/IMG_20240911_002859_371.jpg',
  'pics/IMG_20241026_213908_935.jpg',
  'pics/IMG_20241123_155716.jpg',
  'pics/IMG_20241221_230459.jpg',
  'pics/IMG_20250109_161654.jpg',
  'pics/IMG_20250123_143727.jpg',
  'pics/IMG_20250426_155143.jpg',
  'pics/IMG_20250525_161104.jpg',
  'pics/IMG-20250109-WA0001.jpg',
  'pics/VID_20250228_180027_exported_11655.jpg',
  'pics/IMG-20250123-WA0000.jpg',
  'pics/IMG_20250525_161210.jpg',
  // Add more images here
];

// DOM Elements
const grid = document.getElementById('grid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const closeBtn = document.getElementById('close');
const shuffleBtn = document.getElementById('shuffleBtn');
const slideshowBtn = document.getElementById('slideshowBtn');

let currentIndex = 0;
let slideInterval = null;

// Build the gallery dynamically
function buildGallery() {
  grid.innerHTML = '';
  images.forEach((src, index) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.innerHTML = `<img src='${src}' alt='Memory ${index+1}' data-index='${index}' /><div class='caption'>#${index+1}</div>`;
    tile.addEventListener('click', () => openLightbox(index));
    grid.appendChild(tile);
  });
}

// Open lightbox at selected image
function openLightbox(index) {
  currentIndex = index;
  lbImg.src = images[currentIndex];
  lightbox.classList.add('visible');
}

// Close the lightbox
function closeLightbox() {
  lightbox.classList.remove('visible');
}

// Show next image
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  lbImg.src = images[currentIndex];
}

// Show previous image
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lbImg.src = images[currentIndex];
}

// Event listeners for lightbox controls
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });

// Keyboard navigation
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowRight') nextImage();
  if(e.key === 'ArrowLeft') prevImage();
});

// Shuffle the gallery
shuffleBtn.addEventListener('click', () => {
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  buildGallery();
});

// Start and stop slideshow
function startSlideshow() {
  slideInterval = setInterval(nextImage, 2500);
  slideshowBtn.classList.add('primary');
}

function stopSlideshow() {
  clearInterval(slideInterval);
  slideInterval = null;
  slideshowBtn.classList.remove('primary');
}

slideshowBtn.addEventListener('click', () => {
  if(slideInterval) stopSlideshow();
  else startSlideshow();
});

// Initialize the gallery
buildGallery();

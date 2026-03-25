const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Changer l'icône du burger
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Animation au scroll avec intersection observer
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

animatedElements.forEach(el => observer.observe(el));

// Gestion des boutons
const githubBtn = document.getElementById('githubBtn');
if (githubBtn) {
    githubBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('🚀 Projet Recyclean — Repository GitHub (démo interactive)\n\nStack technique: Flutter + Laravel + MySQL');
    });
}

// Simuler envoi formulaire avec animation
const submitBtn = document.getElementById('submitMsg');
const feedback = document.getElementById('formFeedback');
if (submitBtn) {
    submitBtn.addEventListener('click', () => {
        feedback.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Envoi en cours...';
        setTimeout(() => {
            feedback.innerHTML = '✅ Message envoyé avec succès ! (démonstration interactive)';
            setTimeout(() => {
                feedback.style.opacity = '0';
                setTimeout(() => {
                    feedback.innerHTML = '';
                    feedback.style.opacity = '1';
                }, 800);
            }, 2000);
        }, 600);
    });
}

// Effet de défilement fluide pour tous les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
            e.preventDefault();
            targetElem.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            history.pushState(null, null, targetId);
        }
    });
});

// Effet 3D sur la carte projet (uniquement sur desktop)
const projetCard = document.querySelector('.projet-card');
if (projetCard && window.innerWidth > 768) {
    projetCard.addEventListener('mousemove', (e) => {
        const rect = projetCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        projetCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    });
    projetCard.addEventListener('mouseleave', () => {
        projetCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
}

// ========== SLIDER AUTOMATIQUE POUR LES IMAGES DU PROJET ==========
const sliderConfig = {
    // MODIFIEZ ICI AVEC VOS NOMS DE FICHIERS
    images: [
        'imgs/recyclean_img/ic_launcher.png',
    ],
    currentIndex: 0,
    intervalId: null,
    autoPlayDelay: 3000 // 3 secondes entre chaque image
};

// Fonction pour créer les slides
function createSlides() {
    const wrapper = document.getElementById('sliderWrapper');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!wrapper) return;
    
    // Vider les conteneurs
    wrapper.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Si aucune image, afficher un message par défaut
    if (sliderConfig.images.length === 0) {
        wrapper.innerHTML = `
            <div class="slide">
                <div style="text-align: center; color: white;">
                    <i class="fas fa-image" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                    <p>Aucune image disponible</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Créer les slides et les dots
    sliderConfig.images.forEach((image, index) => {
        // Créer le slide
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `
            <img src="${image}" alt="Recyclean Screenshot ${index + 1}" 
                 onerror="this.src='https://via.placeholder.com/800x600/0284c7/white?text=Image+${index+1}+non+trouvée'">
        `;
        wrapper.appendChild(slide);
        
        // Créer le dot
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === sliderConfig.currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    updateSliderPosition();
}

// Fonction pour mettre à jour la position du slider
function updateSliderPosition() {
    const wrapper = document.getElementById('sliderWrapper');
    if (!wrapper) return;
    
    const slideWidth = 100;
    wrapper.style.transform = `translateX(-${sliderConfig.currentIndex * slideWidth}%)`;
    
    // Mettre à jour les dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === sliderConfig.currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Fonction pour aller à un slide spécifique
function goToSlide(index) {
    if (index < 0) {
        index = sliderConfig.images.length - 1;
    } else if (index >= sliderConfig.images.length) {
        index = 0;
    }
    
    sliderConfig.currentIndex = index;
    updateSliderPosition();
    resetAutoPlay();
}

// Fonction pour passer au slide suivant
function nextSlide() {
    goToSlide(sliderConfig.currentIndex + 1);
}

// Fonction pour passer au slide précédent
function prevSlide() {
    goToSlide(sliderConfig.currentIndex - 1);
}

// Démarrer le défilement automatique
function startAutoPlay() {
    if (sliderConfig.images.length <= 1) return;
    
    sliderConfig.intervalId = setInterval(() => {
        nextSlide();
    }, sliderConfig.autoPlayDelay);
}

// Réinitialiser le défilement automatique
function resetAutoPlay() {
    if (sliderConfig.intervalId) {
        clearInterval(sliderConfig.intervalId);
    }
    startAutoPlay();
}

// Arrêter le défilement automatique (quand on survole le slider)
function stopAutoPlay() {
    if (sliderConfig.intervalId) {
        clearInterval(sliderConfig.intervalId);
        sliderConfig.intervalId = null;
    }
}

// Initialiser le slider
function initSlider() {
    createSlides();
    
    // Ajouter les écouteurs d'événements
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderContainer = document.querySelector('.slider-container');
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Pause au survol
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Démarrer le défilement automatique
    startAutoPlay();
}

// Vérifier les éléments déjà visibles au chargement
window.addEventListener('load', () => {
    animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
            observer.unobserve(el);
        }
    });
    
    // Initialiser le slider si l'élément existe
    if (document.getElementById('sliderWrapper')) {
        initSlider();
    }
});
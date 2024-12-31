const countdownElement = document.getElementById('countdown');
const newYearMessage = document.getElementById('new-year-message');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const themeToggle = document.getElementById('theme-toggle');
const fireworksCanvas = document.getElementById('fireworks');
const ctx = fireworksCanvas.getContext('2d');

// Set canvas size
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

// Set the target date for New Year's Eve (December 31st, 2024 at 11:59:59 PM)
const targetDate = new Date(2024, 11, 31, 10, 16, 1);

// Countdown logic
function updateCountdown() {
    const now = new Date();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
        // Hide countdown completely
        countdownElement.style.display = 'none';
        
        // Show new year message with fireworks
        newYearMessage.classList.remove('hidden');
        newYearMessage.classList.add('fade-in');
        newYearMessage.textContent = "Frohes neues! 🎉";
        
        // Start fireworks animation
        startFireworks();
        
        // Stop the interval since countdown is done
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');

    if (timeRemaining <= 10000) { // Last 10 seconds
        document.querySelectorAll('.countdown-value').forEach(el => {
            el.style.animation = 'pulse 0.5s infinite';
        });
        
    }
}

// Store interval ID to clear it later
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Fireworks animation
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 2 + 1;
        this.velocity = {
            x: Math.random() * 5 - 2.5,
            y: Math.random() * 5 - 2.5
        };
        this.alpha = 1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

let particles = [];

// Enhance fireworks for finale
function createFirework() {
    const x = Math.random() * fireworksCanvas.width;
    const y = Math.random() * fireworksCanvas.height;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#gold'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Create more particles for bigger fireworks
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    particles.forEach((particle, index) => {
        if (particle.alpha > 0) {
            particle.draw();
            particle.update();
        } else {
            particles.splice(index, 1);
        }
    });

    if (Math.random() < 0.05) {
        createFirework();
    }

    requestAnimationFrame(animateFireworks);
}

function startFireworks() {
    // Create initial burst of fireworks
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createFirework(), i * 300);
    }
    animateFireworks();
}

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
});

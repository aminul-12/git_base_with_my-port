// 🟦 Skills Section Scroll Animation
document.querySelectorAll(".skill-progress").forEach(skill => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = skill.dataset.percent || "0%";
                skill.style.width = percent;
                skill.style.opacity = 1;
                obs.unobserve(skill);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(skill);
});

// ✅ Typing Effect (Looped TypeWriter)
const phrases = [
    "Final Year CSE Student ",
    "AI/ML Researcher",
    "Compiler Explorer",
    "Creative Thinker 💡",
    "Future Innovator 🚀"
];

const typewriter = document.querySelector(".typewriter-text");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
    const currentPhrase = phrases[phraseIndex];
    const displayText = currentPhrase.slice(0, charIndex);
    typewriter.innerHTML = displayText + "<span class='cursor'>|</span>";

    if (!deleting && charIndex < currentPhrase.length) {
        charIndex++;
        setTimeout(typeLoop, 100);
    } else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeLoop, 60);
    } else {
        deleting = !deleting;
        if (!deleting) phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 1500);
    }
}
document.addEventListener("DOMContentLoaded", typeLoop);

// ✅ Scroll-to-top Button Logic
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = function () {
    scrollBtn.style.display = (document.documentElement.scrollTop > 300) ? "block" : "none";
};
scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ✅ Dark Mode Toggle + Navbar Scroll Styling
const toggle = document.getElementById("darkToggle");
toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
});
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// ✅ Show Current Year
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

// ✅ Show Live Time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-BD", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
    document.getElementById("currentTime").textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime();

// 🔥 Scroll Reveal Animation for Sections
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal-section");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 100;
        if (elementTop < windowHeight - revealPoint) {
            reveals[i].classList.add("visible");
        }
    }
}
window.addEventListener("scroll", revealOnScroll);

// ✅ Secure Thumbnail Lightbox Modal System
document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    if (thumbnails.length && lightbox && lightboxImg && closeBtn) {
        thumbnails.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }
});

// ✅ Content Protection: Copy & Right-click Blocker
function showToast(message) {
    const toast = document.getElementById("customWarning");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("copy", function (e) {
        e.preventDefault();
        window.getSelection().removeAllRanges();
        showToast("⚠ Copying this content is not allowed.");
    });

    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        showToast("⚠ Right-click has been disabled.");
    });
});
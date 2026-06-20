/* =========================================
   TECH91 FUTURISTIC WEBSITE JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       INTRO LOADER
    ========================== */

    const intro = document.getElementById("intro");
    const progressBar = document.querySelector(".loader-progress");
    const loadingText = document.getElementById("loading-text");
    const enterBtn = document.getElementById("enter-btn");

    let progress = 0;

    if (progressBar && loadingText) {

        const interval = setInterval(() => {

            progress++;

            progressBar.style.width = progress + "%";

            loadingText.innerText = `Loading ${progress}%`;

            if (progress >= 95) {

                clearInterval(interval);

                loadingText.innerText = "Experience Ready";

                if (enterBtn) {
                    enterBtn.style.display = "inline-block";

                    gsap.from(enterBtn, {
                        opacity: 0,
                        y: 20,
                        duration: 1
                    });
                }
            }

        }, 60);

    }

    /* ==========================
       ENTER EXPERIENCE
    ========================== */

    if (enterBtn) {

        enterBtn.addEventListener("click", () => {

            const music = document.getElementById("bgMusic");

            if (music) {

    music.volume = 0.3;

    music.play().catch(() => {
        console.log("Autoplay blocked by browser");
    });

}

            gsap.to("#intro", {
                opacity: 0,
                duration: 1.2,
                onComplete: () => {
                    intro.style.display = "none";
                }
            });

        });

    }

    /* ==========================
       MUSIC TOGGLE
    ========================== */

    const musicToggle = document.getElementById("musicToggle");
    const bgMusic = document.getElementById("bgMusic");

    if(bgMusic){
    bgMusic.volume = 0.25;
}

    if (musicToggle && bgMusic) {

        musicToggle.addEventListener("click", () => {

            if (bgMusic.paused) {

                bgMusic.play();

                musicToggle.innerHTML =
                    '<i class="fas fa-volume-up"></i>';

            } else {

                bgMusic.pause();

                musicToggle.innerHTML =
                    '<i class="fas fa-volume-mute"></i>';
            }

        });

    }

    /* ==========================
       GSAP HERO ANIMATION
    ========================== */

    if (typeof gsap !== "undefined") {

        gsap.from(".navbar", {
            y: -100,
            opacity: 0,
            duration: 1
        });

        gsap.from(".hero h1", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            delay: 0.3
        });

        gsap.from(".hero p", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            delay: 0.6
        });

        gsap.from(".hero-buttons", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            delay: 0.9
        });

    }

    /* ==========================
       CARD HOVER EFFECT
    ========================== */

    const cards = document.querySelectorAll(
        ".service-card, .project-card, .stat-card, .glass-box"
    );

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-10px) scale(1.02)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0px) scale(1)";

        });

    });

});

/* =========================================
   THREE.JS PARTICLE BACKGROUND
========================================= */

if (
    document.getElementById("particles-bg") &&
    typeof THREE !== "undefined"
) {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        alpha: true
    });

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    document
        .getElementById("particles-bg")
        .appendChild(renderer.domElement);

    const particlesGeometry =
        new THREE.BufferGeometry();

    const particlesCount = 2500;

    const posArray =
        new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {

        posArray[i] = (Math.random() - 0.5) * 25;

    }

    particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial =
        new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00bfff
        });

    const particlesMesh =
        new THREE.Points(
            particlesGeometry,
            particlesMaterial
        );

    scene.add(particlesMesh);

    camera.position.z = 5;

    function animateParticles() {

        requestAnimationFrame(animateParticles);

        particlesMesh.rotation.y += 0.0008;
        particlesMesh.rotation.x += 0.0003;

        renderer.render(scene, camera);

    }

    animateParticles();

    window.addEventListener("resize", () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    });

}

/* =========================================
   SCROLL PROGRESS BAR
========================================= */

window.addEventListener("scroll", () => {

    const totalHeight =
        document.body.scrollHeight -
        window.innerHeight;

    const progress =
        (window.pageYOffset / totalHeight) * 100;

    let progressBar =
        document.getElementById("scroll-progress");

    if (!progressBar) {

        progressBar = document.createElement("div");

        progressBar.id = "scroll-progress";

        progressBar.style.position = "fixed";
        progressBar.style.top = "0";
        progressBar.style.left = "0";
        progressBar.style.height = "4px";
        progressBar.style.width = "0%";
        progressBar.style.zIndex = "99999";
        progressBar.style.background =
            "linear-gradient(90deg,#00bfff,#6c63ff)";

        document.body.appendChild(progressBar);
    }

    progressBar.style.width = progress + "%";

});
const contactCube = document.getElementById("contactCube");

const inputs = document.querySelectorAll(
    ".contact-form-container input, .contact-form-container textarea"
);

let typingTimer;

inputs.forEach(input => {

    input.addEventListener("input", () => {

        contactCube.classList.add("active");

        clearTimeout(typingTimer);

        typingTimer = setTimeout(() => {
            contactCube.classList.remove("active");
        }, 1200);

    });

});

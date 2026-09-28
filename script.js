/* =====================================================
   ELEMENTS
===================================================== */

const openingScreen =
    document.getElementById("openingScreen");

const invitationCard =
    document.getElementById("invitationCard");

const tapHint =
    document.getElementById("tapHint");

const goldParticles =
    document.getElementById("goldParticles");

const blackTransition =
    document.getElementById("blackTransition");

const openingMusicButton =
    document.getElementById("openingMusicButton");

const website =
    document.getElementById("website");

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const loveStoryVideo =
    document.getElementById("loveStoryVideo");

let musicWasPlayingBeforeVideo = false;


/* =====================================================
   OPENING PAGE
===================================================== */

let invitationOpened = false;

function spawnGoldParticles() {

    if (!goldParticles) {
        return;
    }

    for (let i = 0; i < 18; i += 1) {

        const particle =
            document.createElement("span");

        particle.className = "gold-particle";
        particle.style.left = (Math.random() * 100) + "%";
        particle.style.animationDelay = (Math.random() * 1.2) + "s";
        particle.style.animationDuration = (2.6 + Math.random() * 1.6) + "s";

        goldParticles.appendChild(particle);

        setTimeout(function () {
            particle.remove();
        }, 5000);

    }

}

let cardOpened = false;

function openCard() {

    if (cardOpened) {
        return;
    }

    cardOpened = true;

    openingScreen.classList.add("opening");
    invitationCard.classList.add("open");

    if (tapHint) {
        tapHint.classList.add("hide");
    }

    spawnGoldParticles();
    startMusic();

    setTimeout(enterWebsite, 10000);

}

function enterWebsite() {

    if (invitationOpened || openingScreen.classList.contains("hide")) {
        return;
    }

    invitationOpened = true;

    if (blackTransition) {
        blackTransition.classList.add("show");
    }

    setTimeout(function () {

        openingScreen.classList.add("hide");
        openingScreen.style.display = "none";

        website.classList.remove("hidden");
        document.body.classList.remove("locked");

        if (!musicPlaying) {
            startMusic();
        }

        startPetals();
        startHearts();

        setTimeout(function () {
            if (blackTransition) {
                blackTransition.classList.remove("show");
            }
        }, 150);

    }, 650);

}

if (invitationCard) {
    invitationCard.addEventListener("click", openCard);
    invitationCard.addEventListener("touchstart", function (event) {
        event.preventDefault();
        openCard();
    }, { passive: false });
}


/* =====================================================
   MUSIC
===================================================== */

let musicPlaying = false;
const musicButtons = [musicButton, openingMusicButton].filter(Boolean);

function setMusicIcon(label) {

    musicButtons.forEach(function (button) {
        button.innerHTML = label;
    });

}

function startMusic() {

    music.volume = 0.7;

    music.play()
        .then(function () {

            musicPlaying = true;

            setMusicIcon("❚❚");

        })
        .catch(function (error) {

            musicPlaying = false;

            setMusicIcon("♫");

            console.warn("wedding.mp3 could not start playing:", error);

        });

}

music.addEventListener("error", function () {
    console.error("wedding.mp3 failed to load. Check that the file exists next to index.html.");
});


musicButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            setMusicIcon("♫");

        } else {

            startMusic();

        }

    });

});


if (website) {

    website.addEventListener("click", function () {

        if (!musicPlaying) {
            startMusic();
        }

    }, { once: true });

}


if (loveStoryVideo) {

    loveStoryVideo.addEventListener("play", function () {
        musicWasPlayingBeforeVideo = musicPlaying && !music.paused;

        if (musicWasPlayingBeforeVideo) {
            music.pause();
            musicPlaying = false;
            setMusicIcon("♫");
        }
    });

    loveStoryVideo.addEventListener("ended", function () {
        if (!musicWasPlayingBeforeVideo) {
            return;
        }

        music.play()
            .then(function () {
                musicPlaying = true;
                setMusicIcon("❚❚");
            })
            .catch(function () {
                musicPlaying = false;
                setMusicIcon("♫");
            });
    });

}


/* =====================================================
   COUNTDOWN
===================================================== */

/*
   WEDDING:
   28 AUGUST 2027
   5:30 PM
*/

const weddingDate =
    new Date("August 28, 2027 17:30:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        weddingDate - now;


    if (difference <= 0) {

        document.getElementById("days").innerText = "000";

        document.getElementById("hours").innerText = "00";

        document.getElementById("minutes").innerText = "00";

        document.getElementById("seconds").innerText = "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (difference %
            (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (difference %
            (1000 * 60)) /
            1000
        );


    document.getElementById("days").innerText =
        String(days).padStart(3, "0");

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================================
   FALLING PETALS
===================================================== */

function createPetal() {

    const container =
        document.querySelector(".petal-container");

    if (!container) return;


    const petal =
        document.createElement("div");

    petal.className = "petal";


    petal.style.left =
        Math.random() * 100 + "%";


    const size =
        Math.random() * 8 + 7;

    petal.style.width =
        size + "px";

    petal.style.height =
        size * 1.4 + "px";


    petal.style.animationDuration =
        Math.random() * 5 + 5 + "s";


    petal.style.opacity =
        Math.random() * .6 + .3;


    container.appendChild(petal);


    setTimeout(function () {

        petal.remove();

    }, 11000);

}


function startPetals() {

    setInterval(createPetal, 450);

}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createHeart() {

    const container =
        document.querySelector(".hearts-container");

    if (!container) return;


    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    heart.innerHTML = "♥";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        Math.random() * 12 + 10 + "px";


    const duration =
        Math.random() * 6 + 7;


    heart.style.animationDuration =
        duration + "s";


    container.appendChild(heart);


    setTimeout(function () {

        heart.remove();

    }, duration * 1000);

}


function startHearts() {

    setInterval(createHeart, 1200);

}


/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryImages =
    document.querySelectorAll(".gallery-item img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");


galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

        lightbox.classList.add("show");

        lightboxImage.src =
            image.src;

    });

});


closeLightbox.addEventListener("click", function () {

    lightbox.classList.remove("show");

});


lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        lightbox.classList.remove("show");

    }

});


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        lightbox.classList.remove("show");

    }

});


/* =====================================================
   RSVP
===================================================== */

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpResult =
    document.getElementById("rsvpResult");


rsvpForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("guestName").value;

    const guests =
        document.getElementById("guestCount").value;

    const attendance =
        document.getElementById("attendance").value;

    const guestMessage =
        document.getElementById("guestMessage").value.trim();

    const message = [
        "Wedding RSVP",
        `Name: ${name}`,
        `Guests: ${guests}`,
        `Attendance: ${attendance === "yes" ? "Yes, I'll be there" : "Sorry, I can't attend"}`,
        guestMessage ? `Message: ${guestMessage}` : ""
    ].filter(Boolean).join("\n");

    const whatsappUrl =
        `https://wa.me/447491389834?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    rsvpResult.textContent = "Your RSVP is ready in WhatsApp. Tap Send to confirm.";

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealItems =
    document.querySelectorAll(
        ".section, .chapter, .detail-card, .schedule-item"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealItems.forEach(function (item) {

    observer.observe(item);

});



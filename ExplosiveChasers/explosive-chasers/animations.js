gsap.registerPlugin(ScrollTrigger, SplitText);

gsap.utils.toArray(".txt-desktop").forEach((element) => {

    const split = new SplitText(element, {
        type: "words",
        mask: "words"
    });

    gsap.set(split.words, {
        y: 60,
        autoAlpha: 0
    });

    ScrollTrigger.create({
        trigger: element,
        start: "top 85%",

        onEnter: () => {
            gsap.fromTo(split.words,
                { y: 60, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 2.5,
                    stagger: 0.12,
                    ease: "power3.out",
                    overwrite: true
                }
            );
        },

        onEnterBack: () => {
            gsap.fromTo(split.words,
                { y: -60, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 2.5,
                    stagger: 0.12,
                    ease: "power3.out",
                    overwrite: true
                }
            );
        }
    });

});


gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".txt-1").forEach((text) => {

    ScrollTrigger.create({
        trigger: text,
        start: "top 85%",

        onEnter: () => {
            gsap.fromTo(text,
                {
                    filter: "blur(15px)",
                    opacity: 0,
                    y: 20
                },
                {
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: true
                }
            );
        },

        onEnterBack: () => {
            gsap.fromTo(text,
                {
                    filter: "blur(15px)",
                    opacity: 0,
                    y: -20
                },
                {
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: true
                }
            );
        }
    });

});

gsap.utils.toArray("#information>.block-media").forEach((element) => {

    ScrollTrigger.create({
        trigger: element,
        start: "top 85%",

        onEnter: () => {
            gsap.fromTo(element,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power2.out",
                    overwrite: true
                }
            );
        },

        onEnterBack: () => {
            gsap.fromTo(element,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power1.out",
                    overwrite: true
                }
            );
        }
    });

});




gsap.utils.toArray(".gallery-panel").forEach((element) => {

    ScrollTrigger.create({
        trigger: element,
        start: "top 85%",

        onEnter: () => {
            gsap.fromTo(element,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    overwrite: true
                }
            );
        },

        onEnterBack: () => {
            gsap.fromTo(element,
                { y: -80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    overwrite: true
                }
            );
        }
    });

});




gsap.utils.toArray(".gallery-photo").forEach((element) => {

    ScrollTrigger.create({
        trigger: element,
        start: "top 85%",

        onEnter: () => {
            gsap.fromTo(element,
                { y: -80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 2,
                    ease: "power3.out",
                    overwrite: true
                }
            );
        },

        onEnterBack: () => {
            gsap.fromTo(element,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 2,
                    ease: "power3.out",
                    overwrite: true
                }
            );
        }
    });

});

gsap.utils.toArray("#youtube").forEach((element) => {

    ScrollTrigger.create({
        trigger: element,
        start: "top 85%",

        onEnter: () => {
            gsap.fromTo(element,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 3,
                    ease: "power3.out",
                    overwrite: true
                }
            );
        },

        onEnterBack: () => {
            gsap.fromTo(element,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power1.out",
                    overwrite: true
                }
            );
        }
    });

});


gsap.utils.toArray("#get>.block-media").forEach((element) => {

    ScrollTrigger.create({
        trigger: element,
        start: "top 85%",

        onEnter: () => {
            gsap.fromTo(element,
                { scale: 0.7, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: "back.out(5.7)",
                    overwrite: true
                }
            );
        },

        onEnterBack: () => {
            gsap.fromTo(element,
                { scale: 0.7, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: "back.out(1.3)",
                    overwrite: true
                }
            );
        }
    });

});



gsap.utils.toArray("#description-img").forEach((element) => {

    ScrollTrigger.create({
        trigger: element,
        start: "top 85%",

        onEnter: () => {
            gsap.fromTo(element,
                {
                    filter: "blur(20px)",
                    opacity: 0,
                    scale: 0.95
                },
                {
                    filter: "blur(0px)",
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: true
                }
            );
        },

        onEnterBack: () => {
            gsap.fromTo(element,
                {
                    filter: "blur(20px)",
                    opacity: 0,
                    scale: 0.95
                },
                {
                    filter: "blur(0px)",
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: true
                }
            );
        }
    });

});



gsap.to(".btn-yt", {
    backgroundPosition: "200% 50%",
    duration: 5,
    ease: "none",
    repeat: -1
});

gsap.to(".itch-link>.btn-get", {
    scale: 1.08,
    duration: 0.75,
    ease: "power3.inOut",
    repeat: -1,
    yoyo: true
});


/* ==========================================================================
   Gradient follows the mouse (white / green tint over the pictures)
   The mouse position (left -> right) over a picture slides the gradient from
   left to right. Settings live in tint.css:
     --tint-follow          1 = on, 0 = off
     --tint-follow-range    how far it slides (in %)
     --tint-follow-speed    smoothness in seconds
   You can also override them for one section, e.g.  .gallery { --tint-follow-range: 80; }
   ========================================================================== */
(function () {
    // mouse / pen only – on touch screens there is no hover
    var tinted = document.querySelectorAll(".block-media, .block");

    function setting(el, name, fallback) {
        var v = parseFloat(getComputedStyle(el).getPropertyValue(name));
        return isNaN(v) ? fallback : v;
    }

    // the element that actually carries the tint for a given hover target
    function tintTarget(el) {
        if (el.classList.contains("block")) {
            // on the mobile layout the block's own background carries the tint (its .block-media is hidden)
            var media = el.querySelector(":scope > .block-media");
            if (media && getComputedStyle(media).display !== "none") return null;
            return el;
        }
        return el;
    }

    tinted.forEach(function (el) {
        var target = tintTarget(el);
        if (!target) return;

        el.addEventListener("pointermove", function (e) {
            if (e.pointerType === "touch") return;
            if (setting(target, "--tint-follow", 1) < 0.5) return;

            var rect = el.getBoundingClientRect();
            if (!rect.width) return;
            var ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));   // 0 = left edge, 1 = right edge
            var range = setting(target, "--tint-follow-range", 50);
            var shift = (ratio - 0.5) * 2 * range;                                       // -range … +range  (%)

            gsap.to(target, {
                "--tint-shift": shift + "%",
                duration: setting(target, "--tint-follow-speed", 0.6),
                ease: "power2.out",
                overwrite: "auto"
            });
        });

        el.addEventListener("pointerleave", function (e) {
            if (e.pointerType === "touch") return;
            gsap.to(target, {
                "--tint-shift": "0%",
                duration: setting(target, "--tint-follow-speed", 0.6) * 1.5,
                ease: "power2.out",
                overwrite: "auto"
            });
        });
    });
})();

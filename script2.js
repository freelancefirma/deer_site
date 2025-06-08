



console.log("DOM ready?", document.readyState);
console.log("Hero element:", document.querySelector(".hero_section"));

gsap.registerPlugin(ScrollTrigger);
CustomEase.create("myCubic", "M0,0 C0.1,0 0,0.99 1,1");
CustomEase.create("superEase", "M0,0 C1,0 0,1.3 1,1");
CustomEase.create("superEase2", "M0,0 C1,-0.48 0,1.3 1,1");

//Brand name effect.......................................................................................

const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 769px)",
    isMobile: "(max-width: 768px)",
  },
  (context) => {
    const { isDesktop, isMobile } = context.conditions;

    ScrollTrigger.getAll().forEach((st) => st.kill());

    const startValue = isDesktop ? "top -30%" : "top -12%";
    const endValue = isDesktop ? "bottom 50%" : "bottom 5%";
    const brandText = document.querySelector(".brand_name");
    const text_hero = brandText.textContent;
    brandText.innerHTML = "";

    const chars = text_hero.split("");
    const middle = Math.floor(chars.length / 2);

    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("brand_char");
      brandText.appendChild(span);
    });

    const spans = document.querySelectorAll(".brand_char");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero_section",
        start: startValue,
        // end: endValue,
        markers: false,
        toggleActions: "play none play reverse",
        invalidateOnRefresh: true,
      },
    });

    spans.forEach((span, i) => {
      const offset = (i - middle) * 60;
      tl.to(
        span,
        {
          x: offset,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.7,
          ease: "superEase2",
        },
        0
      );
    });

    gsap.to(".slogan", {
      y: 170,
      opacity: 0,
      filter: "blur(3px)",
      duration: 1.3,
      ease: "superEase",
      scrollTrigger: {
        trigger: ".hero_section",
        start: isDesktop ? "top -40%" : "top -17%",
        // end: isDesktop ? "bottom top" : "bottom top",
        toggleActions: "play none play reverse",
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    //About text effect........................................................................................
    gsap.from(".deer_logo", {
      scale: 0,
      filter: "blur(15px)",
      duration: 1.7,
      ease: "superEase",
      scrollTrigger: {
        trigger: ".about_section",
        start: isDesktop ? "top 45%" : "top 55%",
        end: isDesktop ? "top -35%" : "top -5%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".about_me", {
      y: -150,
      opacity: 0,
      filter: "blur(3px)",
      duration: 1.5,
      ease: "myCubic",
      scrollTrigger: {
        trigger: ".about_section",
        start: isDesktop ? "top 20%" : "top 55%",
        end: isDesktop ? "top -35%" : "top -15%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".about_description", {
      y: 50,
      opacity: 0,
      // scale: 0.4,
      filter: "blur(10px)",
      duration: 1.3,
      ease: "myCubic",
      scrollTrigger: {
        trigger: ".about_section",
        start: isDesktop ? "top 45%" : "top 55%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".about_branch_l", {
      y: -650,
      opacity: 0,
      scale: 0,
      filter: "blur(10px)",
      duration: 1.3,
      ease: "myCubic",
      scrollTrigger: {
        trigger: ".about_section",
        start: isDesktop ? "top 45%" : "top 55%",
        end: isDesktop ? "top -39%" : "top -20%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".about_branch_b", {
      x: 450,
      opacity: 0,
      scale: 1,
      delay: 1,
      filter: "blur(10px)",
      duration: 1.7,
      ease: "myCubic",
      scrollTrigger: {
        trigger: ".about_section",
        start: isDesktop ? "top 35%" : "top 55%",
        end: isDesktop ? "top -41%" : "top -20%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".about_branch_t", {
      x: -650,
      opacity: 0,
      // scale: 0.4,
      duration: 1.6,
      ease: "myCubic",
      scrollTrigger: {
        trigger: ".about_section",
        start: isDesktop ? "top 45%" : "top 55%",
        end: isDesktop ? "top -45%" : "top -25%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".about_branch_r", {
      y: 450,
      opacity: 1,
      scale: 0.8,
      filter: "blur(10px)",
      duration: 1.9,
      ease: "myCubic",
      scrollTrigger: {
        trigger: ".about_section",
        start: isDesktop ? "top 45%" : "top 55%",
        end: isDesktop ? "top -45%" : "top -30%",
        toggleActions: "play reverse play reverse",
      },
    });

    if (isDesktop) {
      gsap.from(".about_deer", {
        y: 50,
        opacity: 0.16,
        scale: 0.8,
        filter: "blur(0.3vw)",
        duration: 1.9,
        ease: "myCubic",
        scrollTrigger: {
          trigger: ".about_section",
          start: isDesktop ? "top 10%" : "top 40%",
          end: isDesktop ? "bottom 70%" : "bottom 10%",
          toggleActions: "play reverse play reverse",
        },
      });
    } else {
      gsap.fromTo(
        ".about_deer",
        { y: "10vw", opacity: 0.16, scale: 0.8, filter: "blur(0.3vw)" },
        {
          y: 0,
          opacity: 1,
          scale: 1.3,
          filter: "blur(0vw)",
          ease: "myCubic",
          duration: 1.9,
          scrollTrigger: {
            trigger: ".about_section",
            start: "top 40%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse", // при выходе назад анимация отыграется в обратную сторону
          },
        }
      );
    }

    //Text fly on scroll...................................................................................
    const text = `Hi, I’m John — a designer, dreamer, and storyteller from the heart of the woods. Rooted in nature and inspired by quiet moments, I create websites that feel like home — warm, authentic, and thoughtfully crafted. Whether it’s a cozy online shop, a rustic portfolio, or a brand that wants to speak softly but clearly — I’m here to help bring it to life.`;
    const container = document.getElementById("flyText");
    let animations = [];

    function initAnimation(isDesktop) {
      animations.forEach(({ animation, trigger }) => {
        animation.kill();
        trigger.kill();
      });
      animations = [];
      container.innerHTML = "";

      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("flychar");
        container.appendChild(span);

        const anim = gsap.to(span, {
          x: gsap.utils.random(-150, 150),
          y: gsap.utils.random(-300, 300),
          rotate: gsap.utils.random(-180, 180),
          opacity: 0,
          duration: 0.3,
          ease: isDesktop ? "none" : "superEase",
          scrollTrigger: {
            trigger: ".about_section",
            start: isDesktop ? "top -40%" : "top 30%",
            // end: "bottom bottom",
            scrub: isDesktop ? 5 : 3,
            // toggleActions: isDesktop ? undefined : "play reverse play reverse",
          },
        });

        animations.push({ animation: anim, trigger: anim.scrollTrigger });
      });
    }
    initAnimation(isDesktop);

    window.addEventListener("resize", () => {
      const newIsDesktop = window.innerWidth > 768;
      if (newIsDesktop !== isDesktop) {
        initAnimation(newIsDesktop);
      }
    });

    //Leaf fly on scroll......................................................................................
    for (let i = 0; i <= 31; i++) {
      const leaf = $("#leaf_" + i);
      gsap.to(leaf, {
        x: gsap.utils.random(-200, 500),
        y: gsap.utils.random(-200, 2500),
        rotate: gsap.utils.random(-180, 180),
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 5,

        },
      });
    }
    for (let i = 0; i <= 31; i++) {
      const leaf = $("#leaf2_" + i);
      gsap.to(leaf, {
        x: gsap.utils.random(-200, 500),
        y: gsap.utils.random(-200, 2500),
        rotate: gsap.utils.random(-180, 180),
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 5,
        },
      });
    }
    //Leaf fly...............................................................................................
    for (let i = 0; i <= 6; i++) {
      const leaf = document.getElementById(`leaf_fly_${i}`);
      if (!leaf) continue;

      gsap.to(leaf, {
        x: `+=${gsap.utils.random(-300, 300)}`,
        y: `+=${gsap.utils.random(-50, 100)}`,
        rotation: gsap.utils.random(-10, 360),
        scale: gsap.utils.random(0.95, 1.2),
        duration: gsap.utils.random(10, 7),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        repeatRefresh: true,
        transformOrigin: "50% 50%",
      });
    }
    for (let i = 0; i <= 6; i++) {
      const leaf = document.getElementById(`leaf2_fly_${i}`);
      if (!leaf) continue;

      gsap.to(leaf, {
        x: `+=${gsap.utils.random(-300, 300)}`,
        y: `+=${gsap.utils.random(-50, 100)}`,
        rotation: gsap.utils.random(-10, 360),
        scale: gsap.utils.random(0.95, 1.2),
        duration: gsap.utils.random(10, 7),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        repeatRefresh: true,
        transformOrigin: "50% 50%",
      });
    }

    //Horns curve wiggle......................................................................................
    for (let i = 0; i <= 7; i++) {
      const el = document.getElementById(`curve_${i}`);
      if (!el) continue;

      const wiggle = gsap.to(el, {
        rotation: gsap.utils.random(-10, 10),
        x: gsap.utils.random(-5, 5),
        y: gsap.utils.random(-5, 5),
        duration: gsap.utils.random(1, 2),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        transformOrigin: "50% 50%",
      });
    }

    //Projects logo wiggle.......................................................................................................
    gsap.from(".projects_logo", {
      scale: 0,
      filter: "blur(6px)",
      duration: 1.4,
      ease: "superEase",
      scrollTrigger: {
        trigger: ".projects_section",
        start: "top 80%",
        end: isDesktop ? "top -10%" : "top -5%",
        toggleActions: "play reverse play reverse",
      },
    });
    ["#bird_0", "#bird_1", "#bird_2"].forEach((id, index) => {
      gsap.to(id, {
        y: "+=3",
        rotation: "+=3",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1,
      });
    });
    ["#el_0", "#el_1"].forEach((id, i) => {
      gsap.to(id, {
        rotation: "random(-2, 6)",
        transformOrigin: "50% 100%", // снизу по центру
        duration: gsap.utils.random(2, 3),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });

    //Projects title.............................................................................................................
    gsap.from(".projects_title", {
      y: -100,
      opacity: 0,
      filter: "blur(3px)",
      delay: 1,
      duration: 1.3,
      ease: "myCubic",
      scrollTrigger: {
        trigger: ".projects_section",
        start: "top 80%",
        end: isDesktop ? "top -10%" : "top -8%",
        toggleActions: "play reverse play reverse",
        markers: false,
      },
    });

    const items2 = [...document.querySelectorAll(".item")].slice(0, 10);
    gsap.from(items2, {
      scrollTrigger: {
        trigger: ".grid",
        start: "top 80%",
        end: isDesktop ? "bottom 30%" : undefined,
        toggleActions: "play reverse play reverse",
        markers: false,
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.6,
      ease: "myCubic",
    });

    //Projects gallery...........................................................................................................................
    if (isDesktop) {
      const items = document.querySelectorAll(".item");
      console.log(
        "isDesktop =",
        isDesktop,
        "window.innerWidth =",
        window.innerWidth
      );

      items.forEach((item) => {
        let isExpanded = false;

        item.addEventListener("click", () => {
          const rect = item.getBoundingClientRect();
          const expandedWidth = window.innerWidth * 0.5;
          let xOffset = 0;

          if (rect.left + expandedWidth > window.innerWidth) {
            xOffset = window.innerWidth - (rect.left + expandedWidth);
          }
          if (rect.left + xOffset < 0) {
            xOffset = -rect.left;
          }

          if (!isExpanded) {
            // Открыть
            gsap.to(item, {
              width: isDesktop ? "50vw" : "90vw",
              height: isDesktop ? (50 * 9) / 16 + "vw" : (90 * 9) / 16 + "vw",
              opacity: 1,
              x: xOffset,
              zIndex: 10,
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.4)",
              duration: 0.3,
              ease: "superEase",
            });
            items.forEach((other) => {
              if (other !== item) {
                gsap.to(other, {
                  filter: "blur(4px)",
                  duration: 0.5,
                  ease: "myCubic",
                });
              }
            });
            isExpanded = true;
          } else {
            // Закрыть
            gsap.to(item, {
              width: "",
              height: "",
              x: 0,
              zIndex: 1,
              boxShadow: "",
              duration: 0.5,
              ease: "myCubic",
            });
            items.forEach((other) => {
              gsap.to(other, {
                filter: "blur(0px)",
                duration: 0.5,
                ease: "myCubic",
              });
            });
            isExpanded = false;
          }
        });

        item.addEventListener("mouseleave", () => {
          if (isExpanded) {
            gsap.to(item, {
              width: "",
              height: "",
              x: 0,
              zIndex: 1,
              boxShadow: "",
              duration: 0.5,
              ease: "myCubic",
            });
            items.forEach((other) => {
              gsap.to(other, {
                filter: "blur(0px)",
                duration: 0.5,
                ease: "myCubic",
              });
            });
            isExpanded = false;
          }
        });
      });
    } else {
      const items = document.querySelectorAll(".item");
      let currentIndex = -1;

      let scale = 1;
      let posX = 0;
      let posY = 0;
      let lastX = 0;
      let lastY = 0;
      let isDragging = false;
      let touchStartTime = 0;
      let isLongPress = false;

      function resetItem(item) {
        gsap.to(item, {
          width: "",
          height: "",
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          zIndex: 1,
          boxShadow: "",
          filter: "blur(0px)",
          duration: 0.5,
          ease: "myCubic",
          overwrite: "auto",
        });
      }

      function blurOthers(except) {
        items.forEach((el) => {
          gsap.to(el, {
            filter: except && el !== except ? "blur(4px)" : "blur(0px)",
            duration: 0.5,
            ease: "myCubic",
            overwrite: "auto",
          });
        });
      }

      function switchTo(newIndex) {
        if (newIndex < 0) newIndex = items.length - 1;
        else if (newIndex >= items.length) newIndex = 0;

        if (newIndex === currentIndex) return;

        if (currentIndex !== -1) resetItem(items[currentIndex]);
        currentIndex = newIndex;

        gsap.to(items[currentIndex], {
          width: isDesktop ? "50vw" : "90vw",
          height: isDesktop ? (50 * 9) / 16 + "vw" : (90 * 9) / 16 + "vw",
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          zIndex: 10,
          boxShadow: "0 5px 20px rgba(0,0,0,0.4)",
          filter: "blur(0px)",
          duration: 0.5,
          ease: "myCubic",
          overwrite: "auto",
        });

        blurOthers(items[currentIndex]);

        scale = 1;
        posX = 0;
        posY = 0;
        lastX = 0;
        lastY = 0;
      }

      items.forEach((item, index) => {
        item.addEventListener("click", () => {
          if (currentIndex === index) {
            resetItem(item);
            blurOthers(null);
            currentIndex = -1;
          } else {
            switchTo(index);
          }
        });

        item.addEventListener("mouseleave", () => {
          if (currentIndex === index && isDesktop) {
            resetItem(item);
            blurOthers(null);
            currentIndex = -1;
          }
        });

        let initialDistance = null;
        let initialScale = 1;

        item.addEventListener("touchstart", (e) => {
          if (currentIndex !== index) return;
          touchStartTime = Date.now();
          isLongPress = false;
          isDragging = false;

          if (e.touches.length === 2) {
            initialDistance = getDistance(e.touches[0], e.touches[1]);
            initialScale = scale;
          } else if (e.touches.length === 1) {
            setTimeout(() => {
              if (
                Date.now() - touchStartTime >= 300 &&
                e.touches.length === 1
              ) {
                isLongPress = true;
                isDragging = true;
                lastX = e.touches[0].clientX - posX;
              }
            }, 300);
          }
        });

        item.addEventListener(
          "touchmove",
          (e) => {
            if (currentIndex !== index) return;
            e.preventDefault();
            if (e.touches.length === 2 && initialDistance) {
              const newDistance = getDistance(e.touches[0], e.touches[1]);
              scale = initialScale * (newDistance / initialDistance);
              scale = Math.min(Math.max(1, scale), 4);
              gsap.set(item, { scale });
            } else if (e.touches.length === 1 && isDragging && isLongPress) {
              posX = e.touches[0].clientX - lastX;
              gsap.set(item, { x: posX, y: 0 });
            }
          },
          { passive: false }
        );

        item.addEventListener("touchend", (e) => {
          if (currentIndex !== index) return;
          if (e.touches.length < 2) initialDistance = null;
          if (e.touches.length === 0) {
            isDragging = false;
            isLongPress = false;
            touchStartTime = 0;
          }
        });
      });

      function getDistance(touch1, touch2) {
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
      }

      // SWIPE С ПОДДЕРЖКОЙ X и Y + оттягивание
      let swipeStartX = 0;
      let swipeStartY = 0;
      let swipeEndX = 0;
      let swipeEndY = 0;

      document.addEventListener("touchstart", (e) => {
        if (currentIndex === -1) return;
        swipeStartX = e.touches[0]?.clientX || 0;
        swipeStartY = e.touches[0]?.clientY || 0;
        swipeEndX = swipeStartX;
        swipeEndY = swipeStartY;
      });

      document.addEventListener("touchmove", (e) => {
        if (currentIndex === -1) return;
        if (e.touches.length > 0) {
          swipeEndX = e.touches[0].clientX;
          swipeEndY = e.touches[0].clientY;
          const dx = swipeEndX - swipeStartX;
          const dy = swipeEndY - swipeStartY;

          // Оттягивание по оси X
          if (Math.abs(dx) > Math.abs(dy)) {
            gsap.to(items[currentIndex], {
              x: dx > 0 ? "2vw" : "-2vw",
              duration: 0.2,
              overwrite: "auto",
            });
          }
          // Оттягивание по оси Y
          else {
            gsap.to(items[currentIndex], {
              y: dy > 0 ? "2vh" : "-2vh",
              duration: 0.2,
              overwrite: "auto",
            });
          }
        }
      });

      document.addEventListener("touchend", () => {
        if (currentIndex === -1) return;

        const diffX = swipeEndX - swipeStartX;
        const diffY = swipeEndY - swipeStartY;

        let targetIndex = currentIndex;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
          targetIndex += diffX > 0 ? -1 : 1;
        }

        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
          targetIndex += diffY > 0 ? -2 : 2;
        }

        // Если индекс выходит за границы — закрываем
        if (targetIndex < 0 || targetIndex >= items.length || targetIndex > 9) {
          resetItem(items[currentIndex]);
          blurOthers(null);
          currentIndex = -1;
        } else {
          switchTo(targetIndex);
        }

        // Сброс оттягивания
        if (currentIndex !== -1) {
          gsap.to(items[currentIndex], {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "myCubic",
            overwrite: "auto",
          });
        }

        swipeStartX = swipeStartY = swipeEndX = swipeEndY = 0;
      });
    }

    //Contact.............................................................................................................
    gsap.from(".contact_mailbox", {
      opacity: 0,
      rotateX: 67,
      rotateY: 0,
      filter: "blur(3px)",
      duration: 2.5,
      ease: "superEase2",
      scrollTrigger: {
        trigger: ".footer_section",
        start: "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".contact_me", {
      y: 100,
      opacity: 0,
      filter: "blur(3px)",
      delay: 1,
      duration: 1,
      ease: "myCubic",
      scrollTrigger: {
        trigger: ".footer_section",
        start:isDesktop ? "top 80%" : "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".contact_description", {
      opacity: 0,
      rotateX: 67,
      rotateY: 0,
      filter: "blur(3px)",
      duration: 2.5,
      ease: "superEase2",
      scrollTrigger: {
        trigger: ".footer_section",
        start:isDesktop ? "top 70%" : "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".send_massage", {
      y: -100,
      opacity: 0,
      filter: "blur(0.3vw)",
      delay: 1,
      duration: 1.2,
      ease: "myCubic",
      scrollTrigger: {
        trigger: ".footer_section",
        start:isDesktop ? "top 60%" : "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".massage_input", {
      opacity: 0,
      rotateX: 67,
      rotateY: 0,
      filter: "blur(3px)",
      delay: 1,
      duration: 2.5,
      ease: "superEase2",
      scrollTrigger: {
        trigger: ".footer_section",
        start:isDesktop ? "top 70%" : "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".subscribe", {
      y: -100,
      opacity: 0,
      filter: "blur(3px)",
      delay: 2,
      duration: 1,
      ease: "myCubic",
      scrollTrigger: {
        trigger: ".footer_section",
        start:isDesktop ? "top 60%" : "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".contact_input", {
      height: 0,
      opacity: 0.5,
      rotateX: 67,
      rotateY: 0,
      filter: "blur(3px)",
      duration: 2.5,
      ease: "superEase2",
      scrollTrigger: {
        trigger: ".footer_section",
        start:isDesktop ? "top 60%" : "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });

       gsap.from(".button", {
      y: -100,
      opacity: 0,
      filter: "blur(3px)",
      delay: 1,
      duration: 1,
      ease: "myCubic",
      scrollTrigger: {
        trigger: ".footer_section",
        start:isDesktop ? "top 60%" : "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });

    //Input effect...............................................................................................
    jQuery(document).ready(function ($) {
      const input_email = $(".input_email");
      const input_message = $(".massage_text");
      const email_button = $(".button");
      const baseVW = isDesktop ? 15 : 43.9;
      const perCharVW = 0.7;
      const maxVW = isDesktop ? 23 : 60;
      const thresholdChars = 16;

      input_email.on("input", function () {
        const email = input_email.val();
        const charCount = email.length;
        let newVW = baseVW;

        if (charCount > thresholdChars) {
          newVW += (charCount - thresholdChars) * perCharVW;
        }
        if (newVW > maxVW) newVW = maxVW;

        input_email.css("width", `${newVW}vw`);
        $(".massage_text").css("width", `${newVW}vw`);
      });

           input_message.on("input", function () {
        const message = input_message.val();
        const charCount = message.length;
        let newVW = baseVW;

        if (charCount > thresholdChars) {
          newVW += (charCount - thresholdChars) * perCharVW;
        }
        if (newVW > maxVW) newVW = maxVW;

        input_message.css("width", `${newVW}vw`);
        $(".massage_text").css("width", `${newVW}vw`);
      });

      const subscribe = $(".subscribe_text_button");
      const subscribed = $(".subscribed_text_button");

      //click
      email_button.click(function (e) {
        e.preventDefault();

        const email = input_email.val().trim();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

        if (!isValid) {
          input_email.addClass("wiggle");
          $(".subscribe").css({
            filter: "blur(0.3vw)",
            transform: "translateY(-5vw)",
            display: "none",
          });

          setTimeout(() => {
            $(".correct_email").css({
              display: "block",
              filter: "blur(0vw)",
              transform: "translateY(0vw)",
            });
          }, 100);

          setTimeout(() => {
            input_email.removeClass("wiggle");
          }, 1500);
          return;
        }

        // Анимации при валидном email
        subscribe.css({
          filter: "blur(2vw)",
          transform: "translateY(15vw)",
        });

        subscribed.css({
          filter: "blur(0vw)",
          transform: "translateY(0vw)",
        });

        $(".correct_email").css({
          display: "none",
          filter: "blur(0.3vw)",
          transform: "translateY(-5vw)",
        });

        $(".subscribe").css({
          filter: "blur(0.3vw)",
          transform: "translateY(-5vw)",
          display: "none",
        });

        $(".success_email").css({
          display: "block",
          filter: "blur(0vw)",
          transform: "translateY(0vw)",
        });

        $.ajax({
          url: mythemeData.ajax_url,
          type: "POST",
          data: {
            action: "save_user_email",
            email: email,
            nonce: mythemeData.nonce,
          },
          success: function (response) {
            if (response.success) {
              input_email.val("");
              $(".contact_input").append(
                '<p style="color: green;">' + response.data.message + "</p>"
              );
            } else {
              $(".contact_input").append(
                '<p style="color: red;">' + response.data.message + "</p>"
              );
            }
          },
          error: function () {
            $(".contact_input").append(
              '<p style="color: red;">Ошибка сервера. Попробуйте позже.</p>'
            );
          },
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*"); // Убивает все активные твины
    };
  }
);

// const textarea = document.querySelector('.massage_text');

// // после загрузки страницы или когда текст вставляется
// textarea.scrollTop = parseFloat(getComputedStyle(textarea).fontSize) * 2;

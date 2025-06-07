const items = document.querySelectorAll(".item");
console.log('isDesktop =', isDesktop, 'window.innerWidth =', window.innerWidth);


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
        width:isDesktop ? "50vw" : "90vw",
        height:isDesktop ? (50 * 9) / 16 + "vw": (90 * 9) / 16 + "vw",
        opacity: 1,
        x: xOffset,
        zIndex: 10,
        boxShadow: "0 5px 50px rgba(0, 0, 0, 0.4)",
        duration: 0.5,
        ease: "myCubic",
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




//Projects gallery...........................................................................................................................
const items = document.querySelectorAll(".item");
let currentIndex = -1; // индекс раскрытого элемента, -1 если ничего

// Переменные для зума/панорамирования
let scale = 1;
let posX = 0;
let posY = 0;
let lastX = 0;
let lastY = 0;
let isDragging = false;
let isSwiping = false; // Флаг для свайпа
let touchStartX = 0; // Начальная позиция касания

// Функция сброса стилей item в исходное состояние
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

// Сделать остальные элементы размытыми или сбросить блюр
function blurOthers(except) {
  items.forEach((el) => {
    if (except === null) {
      gsap.to(el, {
        filter: "blur(0px)",
        duration: 0.5,
        ease: "myCubic",
        overwrite: "auto",
      });
    } else if (el !== except) {
      gsap.to(el, {
        filter: "blur(4px)",
        duration: 0.5,
        ease: "myCubic",
        overwrite: "auto",
      });
    } else {
      gsap.to(el, {
        filter: "blur(0px)",
        duration: 0.5,
        ease: "myCubic",
        overwrite: "auto",
      });
    }
  });
}

// Переключиться на новый элемент с цикличностью
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
    boxShadow: "0 5px 50px rgba(0, 0, 0, 0.4)",
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

// Обработчик клика - открыть/закрыть элемент
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (currentIndex === index) {
      // Закрываем текущий
      resetItem(item);
      blurOthers(null);
      currentIndex = -1;
    } else {
      switchTo(index);
    }
  });

  // Для десктопа - закрытие при mouseleave
  item.addEventListener("mouseleave", () => {
    if (currentIndex === index && isDesktop) {
      resetItem(item);
      blurOthers(null);
      currentIndex = -1;
    }
  });

  // Обработка тача для зума и панорамирования
  let initialDistance = null;
  let initialScale = 1;

  item.addEventListener("touchstart", (e) => {
    if (currentIndex !== index) return;
    touchStartX = e.touches[0]?.clientX || 0; // Запоминаем начальную позицию
    if (e.touches.length === 2) {
      // Pinch start
      initialDistance = getDistance(e.touches[0], e.touches[1]);
      initialScale = scale;
      isDragging = false; // Отключаем перетаскивание при зуме
      isSwiping = false;
    } else if (e.touches.length === 1) {
      // Drag start
      lastX = e.touches[0].clientX - posX;
      lastY = e.touches[0].clientY - posY;
      isDragging = true;
      isSwiping = false;
    }
  });

  item.addEventListener("touchmove", (e) => {
    if (currentIndex !== index) return;
    e.preventDefault();
    const currentX = e.touches[0]?.clientX || 0;
    const deltaX = Math.abs(currentX - touchStartX);

    // Если движение больше 50px, считаем это свайпом
    if (deltaX > 50 && e.touches.length === 1) {
      isDragging = false; // Отключаем перетаскивание
      isSwiping = true;
    }

    if (e.touches.length === 2 && initialDistance) {
      // Pinch zoom
      const newDistance = getDistance(e.touches[0], e.touches[1]);
      scale = initialScale * (newDistance / initialDistance);
      scale = Math.min(Math.max(1, scale), 4);
      gsap.set(item, { scale: scale });
    } else if (e.touches.length === 1 && isDragging && !isSwiping) {
      // Drag pan (только если не свайп)
      posX = e.touches[0].clientX - lastX;
      posY = e.touches[0].clientY - lastY;
      gsap.set(item, { x: posX, y: posY });
    }
  }, { passive: false });

  item.addEventListener("touchend", (e) => {
    if (currentIndex !== index) return;
    if (e.touches.length < 2) initialDistance = null;
    if (e.touches.length === 0) {
      isDragging = false;
      isSwiping = false;
    }
  });
});

// Вспомогательная функция для расчёта расстояния
function getDistance(touch1, touch2) {
  const dx = touch2.clientX - touch1.clientX;
  const dy = touch2.clientY - touch1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

// Свайп для переключения картинок
let swipeStartX = 0;
let swipeEndX = 0;

document.addEventListener("touchstart", (e) => {
  if (currentIndex === -1) return;
  swipeStartX = e.touches[0]?.clientX || 0;
  swipeEndX = swipeStartX;
});

document.addEventListener("touchmove", (e) => {
  if (currentIndex === -1) return;
  if (e.touches.length > 0) {
    swipeEndX = e.touches[0].clientX;
  }
});

document.addEventListener("touchend", () => {
  if (currentIndex === -1) return;
  const diffX = swipeEndX - swipeStartX;

  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      switchTo(currentIndex - 1);
    } else {
      switchTo(currentIndex + 1);
    }
  }

  swipeStartX = 0;
  swipeEndX = 0;
});


//............................................
const items = document.querySelectorAll(".item");
let currentIndex = -1; // индекс раскрытого элемента, -1 если ничего

// Переменные для зума/панорамирования
let scale = 1;
let posX = 0;
let posY = 0;
let lastX = 0;
let lastY = 0;
let isDragging = false;
let touchStartTime = 0; // Время начала касания
let isLongPress = false; // Флаг долгого касания

// Функция сброса стилей item в исходное состояние
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

// Сделать остальные элементы размытыми или сбросить блюр
function blurOthers(except) {
  items.forEach((el) => {
    if (except === null) {
      gsap.to(el, {
        filter: "blur(0px)",
        duration: 0.5,
        ease: "myCubic",
        overwrite: "auto",
      });
    } else if (el !== except) {
      gsap.to(el, {
        filter: "blur(4px)",
        duration: 0.5,
        ease: "myCubic",
        overwrite: "auto",
      });
    } else {
      gsap.to(el, {
        filter: "blur(0px)",
        duration: 0.5,
        ease: "myCubic",
        overwrite: "auto",
      });
    }
  });
}

// Переключиться на новый элемент с цикличностью
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
    boxShadow: "0 5px 50px rgba(0, 0, 0, 0.4)",
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

// Обработчик клика - открыть/закрыть элемент
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (currentIndex === index) {
      // Закрываем текущий
      resetItem(item);
      blurOthers(null);
      currentIndex = -1;
    } else {
      switchTo(index);
    }
  });

  // Для десктопа - закрытие при mouseleave
  item.addEventListener("mouseleave", () => {
    if (currentIndex === index && isDesktop) {
      resetItem(item);
      blurOthers(null);
      currentIndex = -1;
    }
  });

  // Обработка тача для зума и панорамирования
  let initialDistance = null;
  let initialScale = 1;

  item.addEventListener("touchstart", (e) => {
    if (currentIndex !== index) return;
    touchStartTime = Date.now(); // Запоминаем время касания
    isLongPress = false;
    isDragging = false;

    if (e.touches.length === 2) {
      // Pinch start
      initialDistance = getDistance(e.touches[0], e.touches[1]);
      initialScale = scale;
    } else if (e.touches.length === 1) {
      // Ждём долгое касание для drag
      setTimeout(() => {
        if (Date.now() - touchStartTime >= 300 && e.touches.length === 1) {
          isLongPress = true;
          isDragging = true;
          lastX = e.touches[0].clientX - posX;
          lastY = e.touches[0].clientY - posY;
        }
      }, 300);
    }
  });

  item.addEventListener("touchmove", (e) => {
    if (currentIndex !== index) return;
    e.preventDefault();
    if (e.touches.length === 2 && initialDistance) {
      // Pinch zoom
      const newDistance = getDistance(e.touches[0], e.touches[1]);
      scale = initialScale * (newDistance / initialDistance);
      scale = Math.min(Math.max(1, scale), 4);
      gsap.set(item, { scale: scale });
    } else if (e.touches.length === 1 && isDragging && isLongPress) {
      // Drag pan (только после долгого касания)
      posX = e.touches[0].clientX - lastX;
      posY = e.touches[0].clientY - lastY;
      gsap.set(item, { x: posX, y: posY });
    }
  }, { passive: false });

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

// Вспомогательная функция для расчёта расстояния
function getDistance(touch1, touch2) {
  const dx = touch2.clientX - touch1.clientX;
  const dy = touch2.clientY - touch1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

// Свайп для переключения картинок
let swipeStartX = 0;
let swipeEndX = 0;

document.addEventListener("touchstart", (e) => {
  if (currentIndex === -1) return;
  swipeStartX = e.touches[0]?.clientX || 0;
  swipeEndX = swipeStartX;
});

document.addEventListener("touchmove", (e) => {
  if (currentIndex === -1) return;
  if (e.touches.length > 0) {
    swipeEndX = e.touches[0].clientX;
  }
});

document.addEventListener("touchend", () => {
  if (currentIndex === -1) return;
  const diffX = swipeEndX - swipeStartX;

  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      switchTo(currentIndex - 1);
    } else {
      switchTo(currentIndex + 1);
    }
  }

  swipeStartX = 0;
  swipeEndX = 0;
});
class Slideshow {
constructor(containerSelector, data, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    this.data = data;
    this.container.style.maxWidth = options.maxWidth || '60%';
    this.speed = options.speed || 4000;
    this.slideIndex = 1;
    this.timer = null;
    this.isPaused = false;
    this.isVisible = false;
    this.touchStart = 0;
    this.inner = this.container.querySelector('.slides-inner');
    this.prevBtn = this.container.querySelector('.prev');
    this.nextBtn = this.container.querySelector('.next');
    this.init();
  }

  init() {
    this.data.forEach((slide) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'mySlides fade';
      slideDiv.onclick = () => this.togglePause();
      slideDiv.innerHTML = `<img src="https://kep.pince.eu/${slide.src}.webp" style="width:100%">`;
      //<div class="text">${slide.text}</div>
      this.inner.appendChild(slideDiv);
    });
    this.prevBtn.onclick = () => this.plusSlides(-1);
    this.nextBtn.onclick = () => this.plusSlides(1);
    this.setupSwipe();
    this.setupObserver();
    this.showSlides(this.slideIndex);
  }

  showSlides(n) {
    const slides = this.container.querySelectorAll('.mySlides');
    if (n > slides.length) this.slideIndex = 1;
    if (n < 1) this.slideIndex = slides.length;
    slides.forEach(s => s.style.display = "none");
    slides[this.slideIndex - 1].style.display = "block";
    this.startTimer();
  }

  plusSlides(n) {
    this.isPaused = false;
    this.inner.style.opacity = "1";
    this.showSlides(this.slideIndex += n);
  }

  startTimer() {
    clearTimeout(this.timer);
    if (this.isVisible && !this.isPaused) {
      this.timer = setTimeout(() => this.plusSlides(1), this.speed);
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.inner.style.opacity = this.isPaused ? "0.8" : "1";
    if (!this.isPaused) this.startTimer();
    else clearTimeout(this.timer);
  }

  setupObserver() {
    const observer = new IntersectionObserver(entries => {
      this.isVisible = entries[0].isIntersecting;
      if (this.isVisible) this.startTimer();
      else clearTimeout(this.timer);
    }, { threshold: 0.5 });
    observer.observe(this.container);
  }

  setupSwipe() {
    this.container.addEventListener('touchstart', e => {
      this.touchStart = e.changedTouches[0].screenX;
    }, { passive: true });

    this.container.addEventListener('touchend', e => {
      const touchEnd = e.changedTouches[0].screenX;
      const threshold = 50;
      if (this.touchStart - touchEnd > threshold) this.plusSlides(1);
      if (this.touchStart - touchEnd < -threshold) this.plusSlides(-1);
    }, { passive: true });
  }
}

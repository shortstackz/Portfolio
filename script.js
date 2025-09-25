const wolf = document.querySelector('.wolf');
const sections = document.querySelectorAll('.section');
let lastScrollY = 0; // store previous scroll position

// Fade-in sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

// Wolf movement: section-relative, responsive, flip on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const scrollingDown = scrollY > lastScrollY; // detect scroll direction

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const nextSectionTop = sections[index + 1]?.offsetTop || Infinity;

    if(scrollY >= sectionTop && scrollY < nextSectionTop){
      // Append wolf to current section
      if(section !== wolf.parentElement){
        section.appendChild(wolf.parentElement);
      }

      // Horizontal position relative to scroll within section
      const sectionScrollPercent = (scrollY - sectionTop) / sectionHeight;
      const maxX = window.innerWidth - wolf.offsetWidth;
      const speedFactor = 1;
      let wolfX = sectionScrollPercent * maxX * speedFactor;

      // Wrap-around
      wolfX = wolfX % maxX;

      // Flip horizontally based on scroll direction
      const scaleX = scrollingDown ? 1 : -1;
      wolf.style.transform = `translateX(${wolfX}px) scaleX(${scaleX})`;
    }
  });

  lastScrollY = scrollY; // update last scroll
});

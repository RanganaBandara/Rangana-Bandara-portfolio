/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal (both scroll down and up)
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        if (direction === 'down' || direction === 'up') {
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      },
      group: 'skills'
    });
    new Waypoint({
      element: item,
      offset: '100%',
      handler: function(direction) {
        if (direction === 'up') {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = '1px';
          });
        }
      },
      group: 'skills-reset'
    });
    new Waypoint({
      element: item,
      offset: '0%',
      handler: function(direction) {
        if (direction === 'down') {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = '1px';
          });
        }
      },
      group: 'skills-reset'
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Animate the about section on reveal (both scroll down and up)
   */
  let aboutSection = document.querySelector('.about .content');
  if (aboutSection) {
    new Waypoint({
      element: aboutSection,
      offset: '80%',
      handler: function(direction) {
        if (direction === 'down' || direction === 'up') {
          aboutSection.classList.add('about-animate');
        }
      },
      group: 'about'
    });
    new Waypoint({
      element: aboutSection,
      offset: '100%',
      handler: function(direction) {
        if (direction === 'up') {
          aboutSection.classList.remove('about-animate');
        }
      },
      group: 'about-reset'
    });
    new Waypoint({
      element: aboutSection,
      offset: '0%',
      handler: function(direction) {
        if (direction === 'down') {
          aboutSection.classList.remove('about-animate');
        }
      },
      group: 'about-reset'
    });
  }

  /**
   * Animate the resume section on reveal (both scroll down and up)
   */
  let resumeSection = document.querySelector('.resume .container');
  if (resumeSection) {
    new Waypoint({
      element: resumeSection,
      offset: '80%',
      handler: function(direction) {
        if (direction === 'down' || direction === 'up') {
          resumeSection.classList.add('resume-animate');
        }
      },
      group: 'resume'
    });
    new Waypoint({
      element: resumeSection,
      offset: '100%',
      handler: function(direction) {
        if (direction === 'up') {
          resumeSection.classList.remove('resume-animate');
        }
      },
      group: 'resume-reset'
    });
    new Waypoint({
      element: resumeSection,
      offset: '0%',
      handler: function(direction) {
        if (direction === 'down') {
          resumeSection.classList.remove('resume-animate');
        }
      },
      group: 'resume-reset'
    });
  }

  /**
   * Animate the portfolio section on reveal (both scroll down and up)
   */
  let portfolioSection = document.querySelector('.portfolio.section');
  if (portfolioSection) {
    new Waypoint({
      element: portfolioSection,
      offset: '80%',
      handler: function(direction) {
        if (direction === 'down' || direction === 'up') {
          portfolioSection.classList.add('portfolio-animate');
        }
      },
      group: 'portfolio'
    });
    new Waypoint({
      element: portfolioSection,
      offset: '100%',
      handler: function(direction) {
        if (direction === 'up') {
          portfolioSection.classList.remove('portfolio-animate');
        }
      },
      group: 'portfolio-reset'
    });
    new Waypoint({
      element: portfolioSection,
      offset: '0%',
      handler: function(direction) {
        if (direction === 'down') {
          portfolioSection.classList.remove('portfolio-animate');
        }
      },
      group: 'portfolio-reset'
    });
  }

  /**
   * Animate the contact section on reveal (both scroll down and up)
   */
  let contactSection = document.querySelector('.contact.section');
  if (contactSection) {
    new Waypoint({
      element: contactSection,
      offset: '80%',
      handler: function(direction) {
        if (direction === 'down' || direction === 'up') {
          contactSection.classList.add('contact-animate');
        }
      },
      group: 'contact'
    });
    new Waypoint({
      element: contactSection,
      offset: '100%',
      handler: function(direction) {
        if (direction === 'up') {
          contactSection.classList.remove('contact-animate');
        }
      },
      group: 'contact-reset'
    });
    new Waypoint({
      element: contactSection,
      offset: '0%',
      handler: function(direction) {
        if (direction === 'down') {
          contactSection.classList.remove('contact-animate');
        }
      },
      group: 'contact-reset'
    });
  }

})();
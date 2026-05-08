import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { BtnPrimary } from "../../../../shared/btn-primary/btn-primary";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, BtnPrimary, RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  ngAfterViewInit() {
    this.initMarquee();
    this.initSwiper();
    this.initBottomBar();
  }

  initMarquee() {
    const marqueeIds = ['marquee-partner', 'marquee'];
    marqueeIds.forEach((id) => {
      const marquee = document.getElementById(id);
      if (marquee) {
        marquee.innerHTML = marquee.innerHTML + marquee.innerHTML;
      }
    });
  }

  initSwiper() {
    new Swiper('#timeline', {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      speed: 800,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        768: { slidesPerView: 3, spaceBetween: 30 },
        1200: { slidesPerView: 3, spaceBetween: 50 },
      },
    });
  }

  initBottomBar() {
    const bottomBar = document.querySelector('.bottom_bar_about');
    const links = document.querySelectorAll('.bottom_bar_about .box a');
    const sections = document.querySelectorAll('section[id]');

    // Show/Hide on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        bottomBar?.classList.add('active');
      } else {
        bottomBar?.classList.remove('active');
      }
    });

    // Intersection Observer for active link
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            links.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    // Smooth scroll with Lenis
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const lenis = (window as any).lenis;

        if (lenis && targetId) {
          lenis.scrollTo(targetId, {
            offset: -80,
            duration: 1.5,
          });
        } else {
          const target = document.querySelector(targetId || '');
          if (target) {
            window.scrollTo({ top: (target as HTMLElement).offsetTop - 80, behavior: 'smooth' });
          }
        }
      });
    });
  }
}

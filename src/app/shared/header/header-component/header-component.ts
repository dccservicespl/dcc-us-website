import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.initHeaderScroll();
    this.initMegaMenu();
    this.initCountryDropdown();
  }

  initHeaderScroll() {
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 600) {
        header?.classList.add('active');
      } else {
        header?.classList.remove('active');
      }
    });
  }

  initMegaMenu() {
    const megaMenu = document.querySelector('.mega-menu');
    if (!megaMenu) return;

    megaMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    const links = megaMenu.querySelectorAll('.menu-link-item, .badge');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          const navEl = document.getElementById('mainNav');
          if (navEl) {
            const bsCollapse = new (window as any).bootstrap.Collapse(navEl);
            bsCollapse.hide();
          }
        }
      });
    });
  }

  initCountryDropdown() {
    const dropdown = document.getElementById('countryDropdown');
    if (!dropdown) return;

    const trigger = dropdown.querySelector('.country-trigger');
    const currentText = document.getElementById('currentText');
    const currentFlag = document.getElementById('currentFlag') as HTMLImageElement;
    const items = dropdown.querySelectorAll('.country-item');

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    items.forEach((item) => {
      item.addEventListener('click', () => {
        const value = item.getAttribute('data-value') || '';
        const flagSrc = item.getAttribute('data-flag') || '';

        if (currentText) currentText.textContent = value;
        if (currentFlag) {
          currentFlag.src = flagSrc;
          currentFlag.alt = value;
        }

        dropdown.classList.remove('open');
      });
    });

    window.addEventListener('click', () => {
      dropdown.classList.remove('open');
    });
  }
}

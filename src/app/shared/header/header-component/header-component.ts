import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    this.closeMegaMenuOnRouteChange();
  }

  closeMegaMenuOnRouteChange() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const megaMenus = document.querySelectorAll('.mega-menu');
      const dropdowns = document.querySelectorAll('.nav-item.dropdown');
      const dropdown = document.getElementById('countryDropdown');
      const navEl = document.getElementById('mainNav');

      // ✅ Force remove hover effect
      dropdowns.forEach((item) => {
        item.classList.remove('show');
        (item as HTMLElement).blur(); // remove focus
      });

      // ✅ Hide all mega menus manually
      megaMenus.forEach((menu) => {
        (menu as HTMLElement).style.visibility = 'hidden';
        (menu as HTMLElement).style.opacity = '0';
        (menu as HTMLElement).style.pointerEvents = 'none';
      });

      // ✅ Close country dropdown
      dropdown?.classList.remove('open');

      // ✅ Close mobile nav
      if (navEl && window.innerWidth < 992) {
        const bsCollapse = (window as any).bootstrap?.Collapse.getInstance(navEl);
        bsCollapse?.hide();
      }

      // ✅ Reset after small delay (allow new page load)
      setTimeout(() => {
        megaMenus.forEach((menu) => {
          (menu as HTMLElement).style.visibility = '';
          (menu as HTMLElement).style.opacity = '';
          (menu as HTMLElement).style.pointerEvents = '';
        });
      }, 50);
    });
  }

  constructor(private router: Router) {}

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
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');

    dropdowns.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('menu-open');
      });

      item.addEventListener('mouseleave', () => {
        item.classList.remove('menu-open');
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

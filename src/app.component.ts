import { AfterViewInit, Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from './app/shared/header/header-component/header-component';
import { FooterComponent } from './app/shared/footer/footer-component/footer-component';
import { filter } from 'rxjs/operators';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    ToastModule,
    ConfirmDialogModule,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <p-toast key="root-msgs"></p-toast>
    <p-confirmDialog key="root-dialog" />
    <app-header-component></app-header-component>
    <router-outlet></router-outlet>
    <app-footer-component></app-footer-component>
  `,
  styles: [`
    :host {
      display: block;
      visibility: visible !important;
      opacity: 1 !important;
      transition: opacity 0.4s ease;
    }
  `]
})
export class AppComponent implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.revealApp();
    this.initLenis();
    this.initHeaderScroll();
    this.handleRouteScroll(); // ✅ scroll fix
  }

  // ✅ Remove loader and show app
  revealApp() {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.classList.add('hide');
      setTimeout(() => loader.remove(), 400);
    }

    const appRoot = document.querySelector('app-root') as HTMLElement;
    if (appRoot) {
      appRoot.style.visibility = 'visible';
      appRoot.style.opacity = '1';
    }
  }

  // ✅ Lenis smooth scroll
  initLenis() {
   const lenis = new Lenis();

    (window as any).lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  // ✅ Header active on scroll
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

  // ✅ MAIN FIX: Reset scroll on every route change
  handleRouteScroll() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        // Use Lenis (primary)
        (window as any).lenis?.scrollTo(0, { immediate: true });

        // Fallback (safety)
        window.scrollTo({ top: 0, behavior: 'auto' });

      });
  }
}
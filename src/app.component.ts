import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from './app/shared/header/header-component/header-component';
import { FooterComponent } from './app/shared/footer/footer-component/footer-component';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ToastModule, ConfirmDialogModule, HeaderComponent, FooterComponent],
  template: `
    <p-toast key="root-msgs"></p-toast>
    <p-confirmDialog key="root-dialog" />
    <app-header-component></app-header-component>
    <router-outlet></router-outlet>
    <app-footer-component></app-footer-component>
  `,
  // ✅ App starts invisible, fades in smoothly
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

  ngAfterViewInit() {
    this.revealApp();       // ✅ Hide loader, show app
    this.initLenis();
    this.initHeaderScroll();
  }

  revealApp() {
    // 1. Remove the initial loader
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.classList.add('hide');
      setTimeout(() => loader.remove(), 400); // remove from DOM after fade
    }

    // 2. Reveal the app-root
    const appRoot = document.querySelector('app-root') as HTMLElement;
    if (appRoot) {
      appRoot.style.visibility = 'visible';
      appRoot.style.opacity = '1';
    }
  }

  initLenis() {
    const lenis = new Lenis();
    (window as any).lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
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
}
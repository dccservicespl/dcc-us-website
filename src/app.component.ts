import { AfterViewInit, Component, inject } from '@angular/core';
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
  template: `<p-toast key="root-msgs"></p-toast>
    <p-confirmDialog key="root-dialog" />
    <app-header-component></app-header-component>
    <router-outlet></router-outlet>
    `,

})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.initLenis();
    this.initHeaderScroll();
  }

  initLenis() {
    const lenis = new Lenis();
    (window as any).lenis = lenis; // make globally available

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

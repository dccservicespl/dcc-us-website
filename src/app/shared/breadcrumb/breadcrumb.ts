// src/app/shared/breadcrumb/breadcrumb.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss'
})
export class BreadcrumbComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  breadcrumbs: Breadcrumb[] = [];

  ngOnInit() {
    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
    });
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children = route.children;
    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const routeURL = child.snapshot.url.map(s => s.path).join('/');
      const fullUrl = routeURL ? `${url}/${routeURL}` : url;
      const label = child.snapshot.data['breadcrumb'];

      if (label) breadcrumbs.push({ label, url: fullUrl });

      return this.buildBreadcrumbs(child, fullUrl, breadcrumbs);
    }

    return breadcrumbs;
  }
}
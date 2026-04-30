import { Component } from '@angular/core';
import { BtnPrimary } from "../../../../shared/btn-primary/btn-primary";
import { BtnLine } from "../../../../shared/btn-line/btn-line";
import { BreadcrumbComponent } from "../../../../shared/breadcrumb/breadcrumb";
@Component({
  selector: 'app-automate',
  standalone: true,
  imports: [BtnPrimary, BtnLine, BreadcrumbComponent],
  templateUrl: './automate.html',
  styleUrl: './automate.scss',
})
export class Automate {}

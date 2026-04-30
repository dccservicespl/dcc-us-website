import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-line',
  imports: [],
  templateUrl: './btn-line.html',
  styleUrl: './btn-line.scss',
})
export class BtnLine {
  @Input() label: string = 'Contact Us';
}

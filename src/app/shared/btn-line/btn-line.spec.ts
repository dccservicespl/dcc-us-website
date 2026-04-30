import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLine } from './btn-line';

describe('BtnLine', () => {
  let component: BtnLine;
  let fixture: ComponentFixture<BtnLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnLine],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnLine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

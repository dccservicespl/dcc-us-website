import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDevelopment } from './application-development';

describe('ApplicationDevelopment', () => {
  let component: ApplicationDevelopment;
  let fixture: ComponentFixture<ApplicationDevelopment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationDevelopment],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationDevelopment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryStore } from './grocery-store';

describe('GroceryStore', () => {
  let component: GroceryStore;
  let fixture: ComponentFixture<GroceryStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroceryStore],
    }).compileComponents();

    fixture = TestBed.createComponent(GroceryStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

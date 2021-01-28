import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartdropComponent } from './cartdrop.component';

describe('CartdropComponent', () => {
  let component: CartdropComponent;
  let fixture: ComponentFixture<CartdropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartdropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

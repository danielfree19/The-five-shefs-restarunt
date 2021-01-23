import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForderComponent } from './forder.component';

describe('ForderComponent', () => {
  let component: ForderComponent;
  let fixture: ComponentFixture<ForderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

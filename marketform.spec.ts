import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Marketform } from './marketform';

describe('Marketform', () => {
  let component: Marketform;
  let fixture: ComponentFixture<Marketform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marketform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Marketform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMAgroup } from './dmagroup';

describe('DMAgroup', () => {
  let component: DMAgroup;
  let fixture: ComponentFixture<DMAgroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DMAgroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DMAgroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

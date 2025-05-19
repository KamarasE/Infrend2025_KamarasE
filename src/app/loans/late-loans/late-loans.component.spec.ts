import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateLoansComponent } from './late-loans.component';

describe('LateLoansComponent', () => {
  let component: LateLoansComponent;
  let fixture: ComponentFixture<LateLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateLoansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

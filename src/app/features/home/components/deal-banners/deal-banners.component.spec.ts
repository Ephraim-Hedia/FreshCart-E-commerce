import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealBannersComponent } from './deal-banners.component';

describe('DealBannersComponent', () => {
  let component: DealBannersComponent;
  let fixture: ComponentFixture<DealBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealBannersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DealBannersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

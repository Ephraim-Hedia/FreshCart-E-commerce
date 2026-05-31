import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistItemComponent } from './wishlist-item.component';

describe('WishlistItemComponent', () => {
  let component: WishlistItemComponent;
  let fixture: ComponentFixture<WishlistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

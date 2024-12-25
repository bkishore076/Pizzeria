import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderpizzaComponent } from './orderpizza.component';

describe('OrderpizzaComponent', () => {
  let component: OrderpizzaComponent;
  let fixture: ComponentFixture<OrderpizzaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderpizzaComponent]
    });
    fixture = TestBed.createComponent(OrderpizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildurpizzaComponent } from './buildurpizza.component';

describe('BuildurpizzaComponent', () => {
  let component: BuildurpizzaComponent;
  let fixture: ComponentFixture<BuildurpizzaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildurpizzaComponent]
    });
    fixture = TestBed.createComponent(BuildurpizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

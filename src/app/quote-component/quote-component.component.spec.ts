import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteComponentComponent } from './quote-component.component';

describe('QuoteComponentComponent', () => {
  let component: QuoteComponentComponent;
  let fixture: ComponentFixture<QuoteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

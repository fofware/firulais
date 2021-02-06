import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdListPublicComponent } from './prod-list-public.component';

describe('ProdListPublicComponent', () => {
  let component: ProdListPublicComponent;
  let fixture: ComponentFixture<ProdListPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdListPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdListPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

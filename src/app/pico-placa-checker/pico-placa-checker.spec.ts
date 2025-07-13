import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicoPlacaChecker } from './pico-placa-checker';

describe('PicoPlacaChecker', () => {
  let component: PicoPlacaChecker;
  let fixture: ComponentFixture<PicoPlacaChecker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicoPlacaChecker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicoPlacaChecker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsInputComponent } from './settings-input.component';

describe('SettingsInputComponent', () => {
  let component: SettingsInputComponent;
  let fixture: ComponentFixture<SettingsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

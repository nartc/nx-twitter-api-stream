import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebFrameworksComponent } from './web-frameworks.component';

describe('WebFrameworksComponent', () => {
  let component: WebFrameworksComponent;
  let fixture: ComponentFixture<WebFrameworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebFrameworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebFrameworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

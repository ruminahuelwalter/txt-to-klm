import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabKmlComponent } from './tab-kml.component';

describe('TabKmlComponent', () => {
  let component: TabKmlComponent;
  let fixture: ComponentFixture<TabKmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabKmlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabKmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

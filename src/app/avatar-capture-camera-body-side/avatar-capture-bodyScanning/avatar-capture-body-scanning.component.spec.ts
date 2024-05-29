import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AvatarCaptureBodyScanningSideComponent} from './avatar-capture-body-scanning.component';

describe('AvatarCaptureBodyScanningComponent', () => {
  let component: AvatarCaptureBodyScanningSideComponent;
  let fixture: ComponentFixture<AvatarCaptureBodyScanningSideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarCaptureBodyScanningSideComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarCaptureBodyScanningSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

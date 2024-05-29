import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AvatarCaptureBodyScanningComponent} from './avatar-capture-body-scanning.component';

describe('AvatarCaptureBodyScanningComponent', () => {
  let component: AvatarCaptureBodyScanningComponent;
  let fixture: ComponentFixture<AvatarCaptureBodyScanningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarCaptureBodyScanningComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarCaptureBodyScanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

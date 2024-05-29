import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AvatarCaptureFaceScanningComponent} from './avatar-capture-face-scanning.component';

describe('AvatarCaptureFaceScanningComponent', () => {
  let component: AvatarCaptureFaceScanningComponent;
  let fixture: ComponentFixture<AvatarCaptureFaceScanningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarCaptureFaceScanningComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarCaptureFaceScanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

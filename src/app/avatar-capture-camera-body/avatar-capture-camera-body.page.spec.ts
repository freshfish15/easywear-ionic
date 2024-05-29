import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarCaptureCameraBodyPage } from './avatar-capture-camera-body.page';

describe('AvatarCaptureCameraBodyPage', () => {
  let component: AvatarCaptureCameraBodyPage;
  let fixture: ComponentFixture<AvatarCaptureCameraBodyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarCaptureCameraBodyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarCaptureCameraBodyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

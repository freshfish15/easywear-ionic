import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarCaptureEnteringDataPage } from './avatar-capture-entering-data.page';

describe('AvatarCaptureEnteringDataPage', () => {
  let component: AvatarCaptureEnteringDataPage;
  let fixture: ComponentFixture<AvatarCaptureEnteringDataPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarCaptureEnteringDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarCaptureEnteringDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

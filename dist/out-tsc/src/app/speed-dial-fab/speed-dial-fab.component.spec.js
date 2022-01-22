import { async, TestBed } from '@angular/core/testing';
import { SpeedDialFabComponent } from './speed-dial-fab.component';
describe('SpeedDialFabComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpeedDialFabComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SpeedDialFabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=speed-dial-fab.component.spec.js.map
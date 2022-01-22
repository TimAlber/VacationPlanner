import { TestBed } from '@angular/core/testing';
import { EmailServiceService } from './email-service.service';
describe('EmailServiceService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(EmailServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=email-service.service.spec.js.map
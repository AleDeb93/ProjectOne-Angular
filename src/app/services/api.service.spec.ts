import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let injector: TestBed;
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    injector = getTestBed();
    service = injector.inject(ApiService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of users', () => {
    const page = 1;
    const perPage = 10;

    service.getList(0, page, perPage).subscribe(users => {
      expect(users).toBeTruthy();
    });

    const req = httpMock.expectOne(request => request.url.includes('/users') && request.method === 'GET');
    expect(req.request.params.get('page')).toEqual(page.toString());
    expect(req.request.params.get('per_page')).toEqual(perPage.toString());

    req.flush({/* Mock della risposta */ });
  });

  it('should handle API error for getUserList', () => {
    service.getList(0, 1, 10).subscribe(
      () => { },
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(request => request.url.includes('/users') && request.method === 'GET');
    req.error(new ErrorEvent('network error'), { status: 404 });
  });

  it('should search user by name', () => {
    const searchString = 'John Doe';

    service.searchRecord(0, searchString).subscribe(users => {
      expect(users).toBeTruthy();
    });

    const req = httpMock.expectOne(request => request.url.includes('/users') && request.method === 'GET');

    const url = new URL(req.request.url);
    const searchParams = new URLSearchParams(url.search);
    const actualSearchString = searchParams.get('name');

    expect(actualSearchString).toEqual(searchString);

    req.flush({/* Mock della risposta */ });
  });
});

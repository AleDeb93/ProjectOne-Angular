import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersApiService } from './users-api.service';

describe('UsersApiService', () => {
  let service: UsersApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule],
      providers: [UsersApiService]
    });
    service = TestBed.inject(UsersApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a DELETE request to delete a user', () => {
    const userId = 123;
    service.deleteUser(userId).subscribe();

    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should send a POST request to create a new user', () => {
    const user = { name: 'John', email: 'john@example.com' };
    service.createUser(user).subscribe();

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
    req.flush({});
  });

  it('should send a GET request to fetch user details', () => {
    const userId = '456';
    service.getUserDetails(userId).subscribe();

    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsApiService } from './posts-api.service';
import { ApiService } from '../services/api.service';

describe('PostsApiService', () => {
  let service: PostsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsApiService, ApiService]
    });
    service = TestBed.inject(PostsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica che non ci siano richieste HTTP in sospeso
  });

  it('should create a user post', () => {
    const userID = '123';
    const postData = { title: 'Test Post', body: 'This is a test post' };

    service.createUserPost(userID, postData).subscribe(response => {
      expect(response).toBeTruthy(); // Verifica che la risposta esista
      // Aggiungi ulteriori asserzioni se necessario, ad esempio per verificare il corpo della risposta
    });

    const request = httpMock.expectOne(`https://gorest.co.in/public/v2/users/${userID}/posts`);
    expect(request.request.method).toBe('POST'); // Verifica che la richiesta sia di tipo POST
    expect(request.request.body).toEqual(postData); // Verifica che il corpo della richiesta sia corretto

    request.flush({}); // Mock della risposta del server
  });
});

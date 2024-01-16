import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AppModule } from '../../app.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: jasmine.SpyObj<Router>;
  let consoleErrorSpy: jasmine.Spy;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getList']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    consoleErrorSpy = spyOn(console, 'error');

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, AppModule],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in successfully with valid token', fakeAsync(() => {
    mockApiService.getList.and.returnValue(of({}));
    component.token = 'validToken';

    component.login();
    tick();

    expect(mockApiService.token).toEqual('validToken');
    expect(mockSnackBar.open).toHaveBeenCalledWith('Accesso effettuato', '', { duration: 1000 });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    expect(component.logOn).toBeTrue();
  }));

  it('should handle invalid token error', fakeAsync(() => {
    const error = { message: 'Invalid token' };
    mockApiService.getList.and.returnValue(throwError(error));
    component.token = 'invalidToken';

    component.login();
    tick();

    expect(mockApiService.token).toEqual('');
    expect(mockSnackBar.open).toHaveBeenCalledWith('Token non valido', '', { duration: 1000 });
    expect(console.error).toHaveBeenCalledWith(error);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(component.logOn).toBeFalse();
  }));

  it('should handle empty token', () => {
    component.token = '';
    component.login();

    expect(mockSnackBar.open).toHaveBeenCalledWith('Token non inserito', '', { duration: 1000 });
  });
});

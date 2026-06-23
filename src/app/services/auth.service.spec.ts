import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

describe('AuthService (Pruebas de Integración con MSW)', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('debería hacer un POST a login y retornar el token', async () => {
    const res = await firstValueFrom(service.login({ email: 'test@test.com', password: '123' }));
    expect(res.token).toBe('fake-jwt-token-12345');
    expect(res.user.email).toBe('admin@caja.com');
  });
});

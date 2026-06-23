import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { PagoService } from './pago.service';
import { firstValueFrom } from 'rxjs';

describe('PagoService (Pruebas con MSW)', () => {
  let service: PagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(PagoService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería hacer un GET y retornar un pago usando MSW', async () => {
    const pago = await firstValueFrom(service.getPago(5));
    expect(pago).toBeTruthy();
    expect(pago.id).toBe(5);
    expect(pago.monto).toBe(1500);
  });

  it('debería hacer un PATCH para registrar el pago', async () => {
    const res = await firstValueFrom(service.registrarPago(5, 500));
    expect(res).toBe('Pago registrado exitosamente');
  });
});

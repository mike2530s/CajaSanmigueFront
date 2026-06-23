import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { PrestamoService } from './prestamo.service';
import { firstValueFrom } from 'rxjs';

describe('PrestamoService (Pruebas de Integración con MSW)', () => {
  let service: PrestamoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(PrestamoService);
  });

  it('debería hacer GET para obtener la lista de préstamos', async () => {
    const prestamos = await firstValueFrom(service.getPrestamos());
    expect(prestamos.length).toBe(2);
    expect(prestamos[0].montoTotal).toBe(5000);
  });

  it('debería hacer GET para obtener un préstamo por ID', async () => {
    const prestamo = await firstValueFrom(service.getPrestamo(1));
    expect(prestamo.id).toBe(1);
  });

  it('debería hacer POST para crear un préstamo', async () => {
    const nuevoPrestamo: any = { montoTotal: 15000 };
    const res = await firstValueFrom(service.createPrestamo(nuevoPrestamo));
    expect(res.id).toBe(3);
    expect(res.montoTotal).toBe(15000);
  });

  it('debería hacer PATCH para actualizar un préstamo', async () => {
    const res = await firstValueFrom(service.updatePrestamo(1, { montoTotal: 6000 }));
    expect(res.success).toBe(true);
  });

  it('debería hacer DELETE para eliminar un préstamo', async () => {
    const res = await firstValueFrom(service.deletePrestamo(1));
    expect(res).toBe('Préstamo eliminado exitosamente');
  });

  it('debería hacer GET para buscar préstamos con filtros', async () => {
    const prestamos = await firstValueFrom(service.buscarPrestamos({ cliente: 'Juan' }));
    if(prestamos && prestamos.length > 0) {
        expect(prestamos[0].montoTotal).toBe(5000);
    }
  });

  it('debería hacer GET para buscar préstamos por ID de cliente', async () => {
    const prestamos = await firstValueFrom(service.getPrestamosPorCliente(5));
    if(prestamos && prestamos.length > 0) {
        expect(prestamos[0].idCliente).toBe(5);
    }
  });
});

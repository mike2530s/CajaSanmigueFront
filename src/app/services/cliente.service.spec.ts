import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ClienteService } from './cliente.service';
import { firstValueFrom } from 'rxjs';

describe('ClienteService (Pruebas de Integración con MSW)', () => {
  let service: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(ClienteService);
  });

  it('debería hacer GET para obtener la lista de clientes', async () => {
    const clientes = await firstValueFrom(service.getClientes());
    expect(clientes.length).toBe(2);
    expect(clientes[0].nombre).toBe('Juan');
  });

  it('debería hacer GET para obtener un cliente por ID', async () => {
    const cliente = await firstValueFrom(service.getCliente(1));
    expect(cliente.id).toBe(1);
  });

  it('debería hacer POST para crear un cliente', async () => {
    const nuevoCliente: any = { nombre: 'Nuevo', telefono: '999' };
    const res = await firstValueFrom(service.createCliente(nuevoCliente));
    expect(res.id).toBe(3);
    expect(res.nombre).toBe('Nuevo');
  });

  it('debería hacer PATCH para actualizar un cliente', async () => {
    const res = await firstValueFrom(service.updateCliente(1, { nombre: 'Juan Actualizado' }));
    expect(res.success).toBe(true);
  });

  it('debería hacer DELETE para eliminar un cliente', async () => {
    const res = await firstValueFrom(service.deleteCliente(1));
    expect(res.success).toBe(true);
  });

  it('debería hacer GET con params para buscar clientes', async () => {
    const clientes = await firstValueFrom(service.buscarClientes({ nombre: 'Juan' }));
    expect(clientes[0].nombre).toBe('Juan Buscado');
  });
});

import { http, HttpResponse } from 'msw';

export const handlers = [
  // ===============================
  // AUTH
  // ===============================
  http.post('http://localhost:5054/api/Auth/login', async ({ request }) => {
    return HttpResponse.json({
      token: 'fake-jwt-token-12345',
      user: { id: 1, email: 'admin@caja.com' }
    });
  }),

  // ===============================
  // PAGOS
  // ===============================
  http.get('http://localhost:5054/api/Pago/:id', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.id),
      monto: 1500,
      fecha: new Date().toISOString()
    });
  }),
  http.patch('http://localhost:5054/api/Pago/:id', () => {
    return HttpResponse.text('Pago registrado exitosamente');
  }),

  // ===============================
  // CLIENTES
  // ===============================
  http.get('http://localhost:5054/api/Cliente', () => {
    return HttpResponse.json([
      { id: 1, nombre: 'Juan', telefono: '123' },
      { id: 2, nombre: 'Maria', telefono: '456' }
    ]);
  }),
  http.get('http://localhost:5054/api/Cliente/buscar', ({ request }) => {
    // Para endpoints con query params
    return HttpResponse.json([
      { id: 1, nombre: 'Juan Buscado', telefono: '123' }
    ]);
  }),
  http.get('http://localhost:5054/api/Cliente/:id', ({ params }) => {
    return HttpResponse.json({ id: Number(params.id), nombre: 'Juan', telefono: '123' });
  }),
  http.post('http://localhost:5054/api/Cliente', async ({ request }) => {
    const body = await request.json() as any;
    return HttpResponse.json({ id: 3, ...body });
  }),
  http.patch('http://localhost:5054/api/Cliente/:id', () => {
    return HttpResponse.json({ success: true, message: 'Cliente actualizado' });
  }),
  http.delete('http://localhost:5054/api/Cliente/:id', () => {
    return HttpResponse.json({ success: true, message: 'Cliente eliminado' });
  }),

  // ===============================
  // PRESTAMOS
  // ===============================
  http.get('http://localhost:5054/api/Prestamo', () => {
    return HttpResponse.json([
      { id: 1, montoTotal: 5000 },
      { id: 2, montoTotal: 10000 }
    ]);
  }),
  http.get('http://localhost:5054/api/Prestamo/cliente/:idCliente', ({ params }) => {
    return HttpResponse.json([
      { id: 1, idCliente: Number(params.idCliente), montoTotal: 5000 }
    ]);
  }),
  http.get('http://localhost:5054/api/Prestamo/buscar', () => {
    return HttpResponse.json([
      { id: 1, montoTotal: 5000 }
    ]);
  }),
  http.get('http://localhost:5054/api/Prestamo/:id', ({ params }) => {
    return HttpResponse.json({ id: Number(params.id), montoTotal: 5000 });
  }),
  http.post('http://localhost:5054/api/Prestamo', async ({ request }) => {
    const body = await request.json() as any;
    return HttpResponse.json({ id: 3, ...body });
  }),
  http.patch('http://localhost:5054/api/Prestamo/:id', () => {
    return HttpResponse.json({ success: true });
  }),
  http.delete('http://localhost:5054/api/Prestamo/:id', () => {
    return HttpResponse.text('Préstamo eliminado exitosamente');
  })
];

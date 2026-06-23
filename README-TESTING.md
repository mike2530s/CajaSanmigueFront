# Pruebas de Integración con MSW y Vitest

Este documento explica de manera detallada cómo funciona la infraestructura de pruebas de integración configurada en el proyecto `CajaSanmigueFront`, cumpliendo con los requerimientos de la tarea.

## ¿Qué se implementó?

Para lograr pruebas de integración reales que simulen peticiones a todos los endpoints sin necesidad de tener el backend encendido, se implementó la siguiente pila tecnológica moderna:

1. **Vitest**: Un *test runner* moderno, rápido y nativo para Vite (que es el motor de construcción detrás de Angular 19). Reemplaza a las antiguas herramientas Karma y Jasmine.
2. **MSW (Mock Service Worker)**: Una herramienta estándar en la industria para simular APIs. En lugar de interceptar las cosas a nivel del framework (con `HttpTestingController`), MSW intercepta las peticiones **a nivel de red**. Esto significa que Angular hace una petición HTTP 100% real, y MSW se interpone antes de que salga de Node.js, devolviendo la respuesta simulada.
3. **Vitest UI**: Una interfaz gráfica (`@vitest/ui`) que nos permite visualizar cómodamente qué pruebas pasan y cuáles fallan en el navegador.

---

## Archivos clave de la simulación (Mocks)

### 1. `src/mocks/handlers.ts`
Aquí es donde definimos el comportamiento de los "endpoints falsos". Contiene una lista de *interceptores*.
Por ejemplo, si la aplicación hace una petición `GET` a `http://localhost:5054/api/Cliente`, MSW la intercepta y devuelve un JSON con una lista estática de clientes.
*Todos los endpoints usados por los servicios han sido agregados aquí (GET, POST, PATCH, DELETE, búsquedas, etc.).*

### 2. `src/mocks/server.ts`
Su contenido es muy pequeño pero fundamental.
```typescript
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```
**¿Para qué sirve?**
Toma los endpoints definidos en `handlers.ts` y crea un servidor virtual dentro de Node.js, dejándolos listos para escuchar peticiones durante las pruebas.

### 3. `src/test-setup.ts`
Este es el archivo que se ejecuta **antes** de que comience a correr cualquier prueba en Vitest. 
Aquí importamos el `server` (creado en el paso anterior) y le damos las siguientes órdenes:
- `beforeAll(() => server.listen())`: Prende el servidor MSW antes de iniciar los test.
- `afterEach(() => server.resetHandlers())`: Limpia la memoria después de cada test para que no se contaminen entre sí.
- `afterAll(() => server.close())`: Apaga el servidor al terminar todas las pruebas.

---

## Estructura de las Pruebas (.spec.ts)

Siguiendo las instrucciones, cada componente/servicio tiene un archivo `.spec.ts` donde se orquestan las pruebas:

- **Un `describe` por componente/servicio**: Agrupa todas las pruebas relacionadas a ese módulo.
- **Varios `it`**: Cada `it` valida un endpoint específico o un comportamiento (por ejemplo, "debería hacer un GET", "debería hacer un POST").
- **Promesas modernas**: Se usó `firstValueFrom(service.metodo())` con `async/await` para esperar las respuestas de la API de forma limpia, reemplazando el callback anticuado `done()`.

### ¿Por qué los archivos terminan en `.spec.ts`?
En Angular y en el ecosistema general de TypeScript, la terminación **`.spec.ts`** significa "Specification" (Especificación). Esta es la convención universal para nombrar a los archivos de pruebas. Herramientas como Vitest buscan automáticamente en el proyecto cualquier archivo con este sufijo para ejecutarlo, separando así el código de tu aplicación del código de tus pruebas.

Ejemplo de `cliente.service.spec.ts`:
```typescript
describe('ClienteService (Pruebas de Integración con MSW)', () => {
  // ... configuración (TestBed con provideHttpClient real)

  it('debería hacer GET para obtener la lista de clientes', async () => {
    // La petición sale, MSW la intercepta y devuelve datos falsos
    const clientes = await firstValueFrom(service.getClientes());
    expect(clientes.length).toBe(2);
  });
});
```

---

## ¿Cómo ejecutar las pruebas?

Abre una terminal en la raíz de `CajaSanmigueFront` y ejecuta:

```bash
npm run test:ui
```

Esto abrirá la interfaz gráfica de Vitest en tu navegador (usualmente en el puerto 51204). Aquí podrás tomar captura de pantalla demostrando que **todas las pruebas están orquestadas con describe/it** y que los endpoints simulados pasan con éxito.

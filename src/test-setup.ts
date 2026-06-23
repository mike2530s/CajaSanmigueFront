import { TransformStream } from 'node:stream/web';
Object.assign(globalThis, { TransformStream });

import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { server } from './mocks/server';

// Iniciar servidor de MSW antes de todas las pruebas
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
// Limpiar handlers después de cada prueba
afterEach(() => server.resetHandlers());
// Cerrar servidor al terminar todas las pruebas
afterAll(() => server.close());

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

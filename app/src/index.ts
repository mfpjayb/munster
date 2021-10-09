import 'reflect-metadata';
import { setupApp, renderApp } from 'munster-core';
import { AppModule } from './app/app.module';

/**
 * route params
 * router events
 *  - on route change
 * store
 * props
 * attributes
 * transformer
 */

setupApp();

renderApp(document.getElementById('app-root'), AppModule);
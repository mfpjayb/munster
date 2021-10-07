import 'reflect-metadata';
import { setupApp } from '../framework/core/app/setup-app';
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

setupApp('app-root', AppModule);

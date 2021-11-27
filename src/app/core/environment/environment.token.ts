import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Environment } from './environment.model';

export const ENVIRONMENT = new InjectionToken<Environment>('globalConfig', {
  providedIn: 'root',
  factory: () => environment,
});

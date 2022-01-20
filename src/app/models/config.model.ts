import { Application } from './application.model';
import { Enterprise } from './enterprise.model';
import { Site } from './site.model';

export interface Config {
  applications: Application[];
  enterprise: Enterprise[];
  sites: Site[];
}

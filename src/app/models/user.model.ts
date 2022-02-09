import { FormGroup } from '@angular/forms';
import { UserCities } from './user-cities.model';

export class User {
  public ppic: string | ArrayBuffer;
  public active: string;
  public name: string;
  public email: string;
  public emailAlert: boolean;
  public deviceAlert: boolean;
  public centralAlert: boolean;
  public siteEquipmentAlert: boolean;
  public securityAlert: boolean;
  public cities: UserCities[];
  // public cities: any[];
  public id: number;
  public form?: FormGroup;
  // public details?: User[];
}

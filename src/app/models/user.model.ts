import { FormGroup } from '@angular/forms';

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
  public cities: any[];
  public id: number;
  public form?: FormGroup;
}

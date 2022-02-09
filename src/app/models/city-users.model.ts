import { User } from './user.model';

export interface CityUsers {
  accessLevel: number;
  details?: User;
  userId: number;
}

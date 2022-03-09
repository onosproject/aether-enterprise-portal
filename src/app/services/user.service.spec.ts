/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { UserService } from './user.service';

describe('UserService', () => {
  let service;

  beforeEach(() => {
    service = new UserService();
  });

  it('should run #getUsers()', async () => {
    service.usersSubject = service.usersSubject || {};
    spyOn(service.usersSubject, 'asObservable');
    service.getUsers();
    expect(service.usersSubject.asObservable).toHaveBeenCalled();
  });

  it('should run #getCities()', async () => {
    service.citiesSubject = service.citiesSubject || {};
    spyOn(service.citiesSubject, 'asObservable');
    service.getCities();
    expect(service.citiesSubject.asObservable).toHaveBeenCalled();
  });

  it('should run #getUser()', async () => {
    service.users = service.users || {};
    service.users.index = 'index';
    service.getUser({});
  });

  it('should run #getCity()', async () => {
    service.cities = service.cities || {};
    service.cities.index = 'index';
    service.getCity({});
  });

  it('should run #addUser()', async () => {
    service.users = service.users;
    service.users.id = 'id';
    spyOn(service.users, 'push').and.callThrough();
    service.users = ['users'];
    service.usersSubject = service.usersSubject;
    spyOn(service.usersSubject, 'next').and.callThrough();
    service.addUser({
      id: {},
    });
    expect(service.usersSubject.next).toHaveBeenCalled();
  });

  it('should run #updateUser()', async () => {
    service.users = service.users;
    service.users.index = 'index';
    service.users = ['users'];
    service.usersSubject = service.usersSubject;
    spyOn(service.usersSubject, 'next');
    service.updateUser({}, {});
    expect(service.usersSubject.next).toHaveBeenCalled();
  });

  it('should run #updateCity()', async () => {
    service.cities = service.cities;
    service.cities.index = 'index';
    service.cities = ['cities'];
    service.citiesSubject = service.citiesSubject;
    spyOn(service.citiesSubject, 'next');
    service.updateCity({}, {});
    expect(service.citiesSubject.next).toHaveBeenCalled();
  });

  it('should run #updateCities()', async () => {
    service.citiesSubject = service.citiesSubject;
    spyOn(service.citiesSubject, 'next');
    service.updateCities('cities');
    expect(service.citiesSubject.next).toHaveBeenCalled();
  });

  it('should run #deleteUser()', async () => {
    service.users = [{ id: 1 }];
    spyOn(service.users, 'splice');
    service.cities = [
      {
        id: 1,
        name: 'Fremont, CA',
        users: [
          {
            accessLevel: 1,
            userId: 1,
          },
        ],
      },
    ];
    service.usersSubject = service.usersSubject;
    spyOn(service.usersSubject, 'next');
    service.deleteUser(0);
    expect(service.users.splice).toHaveBeenCalled();
    expect(service.usersSubject.next).toHaveBeenCalled();
  });
});

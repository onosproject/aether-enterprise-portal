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
    // expect(service.usersSubject.asObservable).toHaveBeenCalled();
  });

  it('should run #getCities()', async () => {
    service.citiesSubject = service.citiesSubject || {};
    spyOn(service.citiesSubject, 'asObservable');
    service.getCities();
    // expect(service.citiesSubject.asObservable).toHaveBeenCalled();
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
    service.users = service.users || {};
    service.users.id = 'id';
    spyOn(service.users, 'push');
    service.users = ['users'];
    service.usersSubject = service.usersSubject || {};
    spyOn(service.usersSubject, 'next');
    service.addUser({
      id: {},
    });
    // expect(service.users.push).toHaveBeenCalled();
    // expect(service.usersSubject.next).toHaveBeenCalled();
  });

  it('should run #updateUser()', async () => {
    service.users = service.users || {};
    service.users.index = 'index';
    service.users = ['users'];
    service.usersSubject = service.usersSubject || {};
    spyOn(service.usersSubject, 'next');
    service.updateUser({}, {});
    // expect(service.usersSubject.next).toHaveBeenCalled();
  });

  it('should run #updateCity()', async () => {
    service.cities = service.cities || {};
    service.cities.index = 'index';
    service.cities = ['cities'];
    service.citiesSubject = service.citiesSubject || {};
    spyOn(service.citiesSubject, 'next');
    service.updateCity({}, {});
    // expect(service.citiesSubject.next).toHaveBeenCalled();
  });

  it('should run #updateCities()', async () => {
    service.citiesSubject = service.citiesSubject || {};
    spyOn(service.citiesSubject, 'next');
    service.updateCities('cities');
    // expect(service.citiesSubject.next).toHaveBeenCalled();
  });

  // it('should run #deleteUser()', async () => {
  //   service.users = service.users || {};
  //   service.users.index = {
  //     id: {},
  //   };
  //   spyOn(service.users, 'splice');
  //   service.users = ['users'];
  //   service.cities = service.cities || {};
  //   service.usersSubject = service.usersSubject || {};
  //   spyOn(service.usersSubject, 'next');
  //   service.deleteUser(0);
  //   // expect(service.users.splice).toHaveBeenCalled();
  //   // expect(service.usersSubject.next).toHaveBeenCalled();
  // });

  // it('should run #deleteUser()', async () => {
  //   service.users = service.users || {};
  //   service.users.index = {
  //     id: 1,
  //   };
  //   spyOn(service.users, 'splice');
  //   service.users = ['users'];
  //   service.cities = service.cities || {};
  //   service.usersSubject = service.usersSubject || {};
  //   spyOn(service.usersSubject, 'next');
  //   service.deleteUser(1);
  //   // expect(service.users.splice).toHaveBeenCalled();
  //   // expect(service.usersSubject.next).toHaveBeenCalled();
  // });

  it('should run #deleteCity()', async () => {
    service.users = service.users || {};
    service.users.index = {
      id: {},
    };
    spyOn(service.users, 'splice');
    service.users = ['users'];
    service.cities = service.cities || {};
    // service.cities.i = {
    //   users: {
    //     findIndex: function () {
    //       return [
    //         {
    //           userId: {},
    //         },
    //       ];
    //     },
    //     splice: function () {},
    //   },
    // };
    service.usersSubject = service.usersSubject || {};
    spyOn(service.usersSubject, 'next');
    service.deleteCity(1);
    // expect(service.users.splice).toHaveBeenCalled();
    // expect(service.usersSubject.next).toHaveBeenCalled();
  });
});

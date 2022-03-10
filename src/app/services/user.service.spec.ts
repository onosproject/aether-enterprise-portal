/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { City } from '../models/city.model';

describe('UserService', () => {
  let service;

  beforeEach(() => {
    service = new UserService();
  });

  it('should run #getUsers()', () => {
    service.users = [
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 1,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Guy Gooey',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 2,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/mary-jane.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Mary Jane',
        email: 'MaryJane@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 3,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'test',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 4,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 5,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 6,
        cities: [],
      },
    ];
    service.getUsers().subscribe((res) => {
      expect(res).toEqual([
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 1,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/guy-gooey.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'Guy Gooey',
          email: 'GuyGooey@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 2,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/mary-jane.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Mary Jane',
          email: 'MaryJane@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 3,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/guy-gooey.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'test',
          email: 'GuyGooey@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 4,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 5,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 6,
          cities: [],
        },
      ]);
    });
  });

  it('should run #getCities()', () => {
    service.cities = [
      {
        id: 1,
        name: 'Fremont, CA',
        users: [
          {
            accessLevel: 1,
            userId: 1,
          },
          {
            accessLevel: 2,
            userId: 2,
          },
          {
            accessLevel: 3,
            userId: 3,
          },
          {
            accessLevel: 2,
            userId: 4,
          },
          {
            accessLevel: 3,
            userId: 5,
          },
        ],
      },
      {
        id: 2,
        name: 'Berlin, DE',
        users: [
          {
            accessLevel: 1,
            userId: 5,
          },
        ],
      },
    ];
    service.getCities().subscribe((res) => {
      expect(res).toEqual([
        {
          id: 1,
          name: 'Fremont, CA',
          users: [
            {
              accessLevel: 1,
              userId: 1,
            },
            {
              accessLevel: 2,
              userId: 2,
            },
            {
              accessLevel: 3,
              userId: 3,
            },
            {
              accessLevel: 2,
              userId: 4,
            },
            {
              accessLevel: 3,
              userId: 5,
            },
          ],
        },
        {
          id: 2,
          name: 'Berlin, DE',
          users: [
            {
              accessLevel: 1,
              userId: 5,
            },
          ],
        },
      ]);
    });
  });

  it('should run #getUser()', () => {
    service.users = [
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 1,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Guy Gooey',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 2,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/mary-jane.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Mary Jane',
        email: 'MaryJane@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 3,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'test',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 4,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 5,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 6,
        cities: [],
      },
    ];
    const value = service.getUser(0);
    expect(value).toEqual({
      ppic: '../../assets/CommonAssets/john-fivegee.svg',
      active: '../../assets/CommonAssets/active-dot.svg',
      name: 'Don Fivegee',
      email: 'DonFivegee@ttesla.com',
      emailAlert: true,
      deviceAlert: true,
      centralAlert: true,
      siteEquipmentAlert: false,
      securityAlert: true,
      id: 1,
      cities: [],
    });
  });

  it('should run #getCity()', () => {
    service.cities = [
      {
        id: 1,
        name: 'Fremont, CA',
        users: [
          {
            accessLevel: 1,
            userId: 1,
          },
          {
            accessLevel: 2,
            userId: 2,
          },
          {
            accessLevel: 3,
            userId: 3,
          },
          {
            accessLevel: 2,
            userId: 4,
          },
          {
            accessLevel: 3,
            userId: 5,
          },
        ],
      },
      {
        id: 2,
        name: 'Berlin, DE',
        users: [
          {
            accessLevel: 1,
            userId: 5,
          },
        ],
      },
    ];
    const value = service.getCity(0);
    expect(value).toEqual({
      id: 1,
      name: 'Fremont, CA',
      users: [
        {
          accessLevel: 1,
          userId: 1,
        },
        {
          accessLevel: 2,
          userId: 2,
        },
        {
          accessLevel: 3,
          userId: 3,
        },
        {
          accessLevel: 2,
          userId: 4,
        },
        {
          accessLevel: 3,
          userId: 5,
        },
      ],
    });
  });

  it('should run #addUser()', () => {
    service.addUser({
      ppic: '../../assets/CommonAssets/john-fivegee.svg',
      active: '../../assets/CommonAssets/active-dot.svg',
      name: 'Don Fivegee',
      email: 'DonFivegee@ttesla.com',
      emailAlert: true,
      deviceAlert: true,
      centralAlert: true,
      siteEquipmentAlert: false,
      securityAlert: true,
      id: 1,
      cities: [],
    });
    expect(service.users).toEqual([
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 1,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Guy Gooey',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 2,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/mary-jane.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Mary Jane',
        email: 'MaryJane@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 3,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'test',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 4,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 5,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 6,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 7,
        cities: [],
      },
    ]);
    expect(service.usersSubject).toEqual(
      new BehaviorSubject<User[]>([
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 1,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/guy-gooey.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'Guy Gooey',
          email: 'GuyGooey@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 2,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/mary-jane.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Mary Jane',
          email: 'MaryJane@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 3,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/guy-gooey.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'test',
          email: 'GuyGooey@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 4,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 5,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 6,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 7,
          cities: [],
        },
      ])
    );
  });

  it('should run #updateUser()', () => {
    service.updateUser(0, {
      ppic: '../../assets/CommonAssets/john-fivegee.svg',
      active: '../../assets/CommonAssets/active-dot.svg',
      name: 'Don Fivegee',
      email: 'DonFivegee@ttesla.com',
      emailAlert: true,
      deviceAlert: true,
      centralAlert: true,
      siteEquipmentAlert: false,
      securityAlert: true,
      id: 1,
      cities: [],
    });
    expect(service.users).toEqual([
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 1,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Guy Gooey',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 2,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/mary-jane.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Mary Jane',
        email: 'MaryJane@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 3,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'test',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 4,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 5,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 6,
        cities: [],
      },
    ]);
    expect(service.usersSubject).toEqual(
      new BehaviorSubject<User[]>([
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 1,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/guy-gooey.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'Guy Gooey',
          email: 'GuyGooey@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 2,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/mary-jane.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Mary Jane',
          email: 'MaryJane@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 3,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/guy-gooey.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'test',
          email: 'GuyGooey@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 4,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 5,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 6,
          cities: [],
        },
      ])
    );
  });

  it('should run #updateCity()', () => {
    service.updateCity(0, {
      id: 1,
      name: 'Fremont, CA',
      users: [
        {
          accessLevel: 1,
          userId: 1,
        },
        {
          accessLevel: 2,
          userId: 2,
        },
        {
          accessLevel: 3,
          userId: 3,
        },
        {
          accessLevel: 2,
          userId: 4,
        },
        {
          accessLevel: 3,
          userId: 5,
        },
      ],
    });
    expect(service.cities).toEqual([
      {
        id: 1,
        name: 'Fremont, CA',
        users: [
          {
            accessLevel: 1,
            userId: 1,
          },
          {
            accessLevel: 2,
            userId: 2,
          },
          {
            accessLevel: 3,
            userId: 3,
          },
          {
            accessLevel: 2,
            userId: 4,
          },
          {
            accessLevel: 3,
            userId: 5,
          },
        ],
      },
      {
        id: 2,
        name: 'Berlin, DE',
        users: [
          {
            accessLevel: 1,
            userId: 5,
          },
        ],
      },
    ]);
    expect(service.citiesSubject).toEqual(
      new BehaviorSubject<City[]>([
        {
          id: 1,
          name: 'Fremont, CA',
          users: [
            {
              accessLevel: 1,
              userId: 1,
            },
            {
              accessLevel: 2,
              userId: 2,
            },
            {
              accessLevel: 3,
              userId: 3,
            },
            {
              accessLevel: 2,
              userId: 4,
            },
            {
              accessLevel: 3,
              userId: 5,
            },
          ],
        },
        {
          id: 2,
          name: 'Berlin, DE',
          users: [
            {
              accessLevel: 1,
              userId: 5,
            },
          ],
        },
      ])
    );
  });

  it('should run #updateCities()', () => {
    service.updateCities([
      {
        id: 1,
        name: 'Fremont, CA',
        users: [
          {
            accessLevel: 1,
            userId: 1,
          },
          {
            accessLevel: 2,
            userId: 2,
          },
          {
            accessLevel: 3,
            userId: 3,
          },
          {
            accessLevel: 2,
            userId: 4,
          },
          {
            accessLevel: 3,
            userId: 5,
          },
        ],
      },
    ]);
    expect(service.citiesSubject).toEqual(
      new BehaviorSubject<City[]>([
        {
          id: 1,
          name: 'Fremont, CA',
          users: [
            {
              accessLevel: 1,
              userId: 1,
            },
            {
              accessLevel: 2,
              userId: 2,
            },
            {
              accessLevel: 3,
              userId: 3,
            },
            {
              accessLevel: 2,
              userId: 4,
            },
            {
              accessLevel: 3,
              userId: 5,
            },
          ],
        },
      ])
    );
  });

  it('should run #deleteUser()', () => {
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
    service.users = [
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 1,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Guy Gooey',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 2,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/mary-jane.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Mary Jane',
        email: 'MaryJane@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 3,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'test',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 4,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 5,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 6,
        cities: [],
      },
    ];
    service.deleteUser(0);
    expect(service.users).toEqual([
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Guy Gooey',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 2,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/mary-jane.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Mary Jane',
        email: 'MaryJane@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 3,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/guy-gooey.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'test',
        email: 'GuyGooey@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 4,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 5,
        cities: [],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/inactive-dot.svg',
        name: 'Don Fivegee',
        email: 'DonFivegee@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 6,
        cities: [],
      },
    ]);
    expect(service.cities).toEqual([
      {
        id: 1,
        name: 'Fremont, CA',
        users: [],
      },
    ]);
    expect(service.usersSubject).toEqual(
      new BehaviorSubject<User[]>([
        {
          ppic: '../../assets/CommonAssets/guy-gooey.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'Guy Gooey',
          email: 'GuyGooey@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 2,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/mary-jane.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Mary Jane',
          email: 'MaryJane@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 3,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/guy-gooey.svg',
          active: '../../assets/CommonAssets/active-dot.svg',
          name: 'test',
          email: 'GuyGooey@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 4,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 5,
          cities: [],
        },
        {
          ppic: '../../assets/CommonAssets/john-fivegee.svg',
          active: '../../assets/CommonAssets/inactive-dot.svg',
          name: 'Don Fivegee',
          email: 'DonFivegee@ttesla.com',
          emailAlert: true,
          deviceAlert: true,
          centralAlert: true,
          siteEquipmentAlert: false,
          securityAlert: true,
          id: 6,
          cities: [],
        },
      ])
    );
  });
});

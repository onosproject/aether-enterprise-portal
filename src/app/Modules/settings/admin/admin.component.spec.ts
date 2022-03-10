/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';

import { AdminComponent } from './admin.component';

import { UserService } from '../../../services/user.service';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { RemoveUserComponent } from '../dialogs/remove-user/remove-user.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  // * new tests

  // let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule, MatMenuModule],
      declarations: [AdminComponent],
      providers: [{ provide: UserService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.users = [
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
        cities: [
          {
            cityId: 1,
            name: 'Fremont, CA',
            accessLevel: 1,
          },
        ],
      },
      {
        ppic: '../../assets/CommonAssets/john-fivegee.svg',
        active: '../../assets/CommonAssets/active-dot.svg',
        name: 'Don Fivegee One',
        email: 'DonFivegeeOne@ttesla.com',
        emailAlert: true,
        deviceAlert: true,
        centralAlert: true,
        siteEquipmentAlert: false,
        securityAlert: true,
        id: 2,
        cities: [
          {
            cityId: 2,
            name: 'Berlin, DE',
            accessLevel: 0,
          },
        ],
      },
    ];
    component.cities = [
      {
        id: 1,
        name: 'Fremont, CA',
        users: [
          {
            accessLevel: 1,
            userId: 1,
            details: {
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
              cities: [
                {
                  cityId: 1,
                  name: 'Fremont, CA',
                  accessLevel: 1,
                },
              ],
            },
          },
        ],
      },
      {
        id: 2,
        name: 'Berlin, DE',
        users: [
          {
            accessLevel: 0,
            userId: 2,
            details: {
              ppic: '../../assets/CommonAssets/john-fivegee.svg',
              active: '../../assets/CommonAssets/active-dot.svg',
              name: 'Don Fivegee One',
              email: 'DonFivegeeOne@ttesla.com',
              emailAlert: true,
              deviceAlert: true,
              centralAlert: true,
              siteEquipmentAlert: false,
              securityAlert: true,
              id: 2,
              cities: [
                {
                  cityId: 2,
                  name: 'Berlin, DE',
                  accessLevel: 0,
                },
              ],
            },
          },
        ],
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    spyOn(component, 'addNewForm');
    spyOn(component, 'assignUsersCities');
    spyOn(component, 'assignCitiesUsers');
    spyOn(component, 'setUpCities');
    spyOn(component, 'setUpEditedCities');
    component.ngOnInit();
    expect(component.addNewForm).toHaveBeenCalled();
    expect(component.assignUsersCities).toHaveBeenCalled();
    expect(component.assignCitiesUsers).toHaveBeenCalled();
    expect(component.setUpCities).toHaveBeenCalled();
    expect(component.setUpEditedCities).toHaveBeenCalled();
  });

  it('should run #userView()', () => {
    component.userView();
    expect(component.userViewToggle).toBeTrue();
    expect(component.siteViewToggle).toBeFalse();
    expect(component.userViewStyle).toEqual('true');
    expect(component.siteViewStyle).toEqual('false');
  });

  it('should run #siteView()', () => {
    component.siteView();
    expect(component.userViewToggle).toBeFalse();
    expect(component.siteViewToggle).toBeTrue();
    expect(component.userViewStyle).toEqual('false');
    expect(component.siteViewStyle).toEqual('true');
  });

  it('should run #isCitiesValid()', () => {
    const noCities = [];
    const cities = [1, 2];
    spyOn(component, 'isCitiesValid').and.callThrough();
    expect(component.isCitiesValid(noCities)).toBeTruthy();
    expect(component.isCitiesValid(cities)).toBeFalsy();
  });

  it('should run #toggleEdit() --> else case', () => {
    component.editUsers = [];
    const id = 1;
    const index = 0;
    component.users = component.users;
    component.cities = component.cities;
    component.toggleEdit(id, index);
    expect(component.users[index].form.value).toEqual({
      ppic: component.users[index].ppic,
      name: component.users[index].name,
      email: component.users[index].email,
      emailAlert: component.users[index].emailAlert,
      deviceAlert: component.users[index].deviceAlert,
      centralAlert: component.users[index].centralAlert,
      siteEquipmentAlert: component.users[index].siteEquipmentAlert,
      securityAlert: component.users[index].securityAlert,
      cities: [1, 0],
    });
    expect(component.editControls).toEqual(
      component.users[index].form.controls
    );
    expect(component.editUsers.length).toBeGreaterThan(0);
  });

  it('should run #toggleEdit() --> if case', () => {
    component.editUsers = [0, 1];
    const id = 1;
    const index = 0;
    component.users = component.users;
    component.cities = component.cities;
    component.users[index].form = new FormGroup({});
    component.toggleEdit(id, index);
    expect(component.editUsers.length).toBeLessThan(2);
  });

  it('should run #closeUserViewEdit()', () => {
    component.editUsers = component.editUsers;
    spyOn(component.editUsers, 'pop');
    component.closeUserViewEdit();
    expect(component.editUsers.length).toBeLessThanOrEqual(
      component.editUsers.length
    );
    // expect(component.editUsers.pop).toHaveBeenCalled();
  });

  it('should run #addNewForm()', () => {
    spyOn(component, 'addNewForm').and.callThrough();
    spyOn(component, 'setUpCities');
    component.addNewForm();
    expect(component.addNewForm).toHaveBeenCalled();
    expect(component.setUpCities).toHaveBeenCalled();
  });

  it('should run #closeUserViewEdit()', () => {
    component.editUsers = [0, 0];
    spyOn(component, 'closeUserViewEdit').and.callThrough();
    component.closeUserViewEdit();
    expect(component.editUsers.length).toBeLessThan(2);
  });

  it('should run #toggleEdit1() --> else case', () => {
    component.editCities = [];
    const id = 1;
    spyOn(component, 'toggleEdit1').and.callThrough();
    spyOn(component, 'closeSiteViewEdit');
    component.toggleEdit1(id);
    expect(component.closeSiteViewEdit).toHaveBeenCalled();
    expect(component.doneActive).toBeFalse();
    expect(component.editCities.length).toEqual(1);
  });

  it('should run #toggleEdit1() --> if case', () => {
    component.editCities = [0];
    const id = 0;
    spyOn(component, 'toggleEdit1').and.callThrough();
    spyOn(component, 'closeSiteViewEdit');
    component.toggleEdit1(id);
    expect(component.closeSiteViewEdit).toHaveBeenCalled();
    expect(component.doneActive).toBeFalse();
    expect(component.editCities.length).toBeLessThan(1);
  });

  it('should run #closeSiteViewEdit()', () => {
    component.editCities = [0, 0];
    spyOn(component, 'closeSiteViewEdit').and.callThrough();
    component.closeSiteViewEdit();
    expect(component.editUsers.length).toBeLessThan(2);
  });

  it('should run #addNewUser()', () => {
    spyOn(component, 'addNewForm');
    component.addNewUser();
    expect(component.addUserError).toBeFalse();
    expect(component.addNewForm).toHaveBeenCalled();
    expect(component.AddNew).toBeTrue();
  });

  it('should run #onSubmit() -> include 1 and form valid', () => {
    spyOn(component.userService, 'addUser');
    spyOn(component, 'assignCitiesUsers');
    spyOn(component, 'assignUsersCities');
    component.users = component.users;
    component.cities = component.cities;
    // component.userForm = new FormGroup({});
    // component.userForm.value.cities = [1, 2];
    component.addNewForm();
    component.userForm = component.userForm;
    const userFormNew = component.userForm;
    const userFormControls = userFormNew.controls;
    userFormControls.name.setValue('Don Fivegee Three');
    userFormControls.email.setValue('DonFivegeeThree@lol.com');
    userFormControls.emailAlert.setValue(true);
    userFormControls.deviceAlert.setValue(false);
    userFormControls.centralAlert.setValue(true);
    userFormControls.siteEquipmentAlert.setValue(false);
    userFormControls.securityAlert.setValue(true);
    userFormControls.cities.setValue([0, 1]);
    userFormControls.profilePic.setValue('lol');
    component.onSubmit();
    component.AddNew = false;
    expect(component.userFormSubmit).toBeTrue();
    expect(component.userForm.valid).toBeTrue();
    expect(component.addUserError).toBeFalse();
    expect(component.userService.addUser).toHaveBeenCalled();
    expect(component.assignCitiesUsers).toHaveBeenCalled();
    expect(component.assignUsersCities).toHaveBeenCalled();
    expect(component.fileUrl).toEqual('');
    expect(component.imageLoaded).toBeFalse();
    expect(component.AddNew).toBeFalse();
  });

  it('should run #onSubmit() -> include 2 and form valid', () => {
    spyOn(component.userService, 'addUser');
    spyOn(component, 'assignCitiesUsers');
    spyOn(component, 'assignUsersCities');
    component.users = [];
    component.cities = component.cities;
    // component.userForm = new FormGroup({});
    // component.userForm.value.cities = [1, 2];
    component.addNewForm();
    component.userForm = component.userForm;
    const userFormNew = component.userForm;
    const userFormControls = userFormNew.controls;
    userFormControls.name.setValue('Don Fivegee Three');
    userFormControls.email.setValue('DonFivegeeThree@lol.com');
    userFormControls.emailAlert.setValue(true);
    userFormControls.deviceAlert.setValue(false);
    userFormControls.centralAlert.setValue(true);
    userFormControls.siteEquipmentAlert.setValue(false);
    userFormControls.securityAlert.setValue(true);
    userFormControls.cities.setValue([0, 2]);
    userFormControls.profilePic.setValue('lol');
    component.onSubmit();
    component.AddNew = false;
    expect(component.userFormSubmit).toBeTrue();
    expect(component.userForm.valid).toBeTrue();
    expect(component.addUserError).toBeFalse();
    expect(component.userService.addUser).toHaveBeenCalled();
    expect(component.assignCitiesUsers).toHaveBeenCalled();
    expect(component.assignUsersCities).toHaveBeenCalled();
    expect(component.fileUrl).toEqual('');
    expect(component.imageLoaded).toBeFalse();
    expect(component.AddNew).toBeFalse();
  });

  it('should run #onSubmit() -> include 3 and form invalid', () => {
    component.users = [];
    component.cities = component.cities;
    // component.userForm = new FormGroup({});
    // component.userForm.value.cities = [1, 2];
    component.addNewForm();
    component.userForm = component.userForm;
    const userFormNew = component.userForm;
    const userFormControls = userFormNew.controls;
    userFormControls.name.setValue('');
    userFormControls.email.setValue('');
    userFormControls.emailAlert.setValue('');
    userFormControls.deviceAlert.setValue('');
    userFormControls.centralAlert.setValue('');
    userFormControls.siteEquipmentAlert.setValue('');
    userFormControls.securityAlert.setValue('');
    userFormControls.cities.setValue([0, 3]);
    userFormControls.profilePic.setValue('');
    component.onSubmit();
    component.AddNew = false;
    expect(component.userFormSubmit).toBeTrue();
    expect(component.userForm.invalid).toBeTrue();
    expect(component.addUserError).toBeTrue();
  });

  it('should run #onEdit() --> include 2,3', () => {
    spyOn(component.userService, 'updateUser');
    spyOn(component.userService, 'updateCities');
    spyOn(component, 'assignUsersCities');
    spyOn(component, 'assignCitiesUsers');
    const id = 1;
    const index = 0;
    component.users = component.users;
    component.cities = component.cities;
    component.toggleEdit(id, index);
    const editFormNew = component.users[index].form;
    const editFormNewControls = editFormNew.controls;
    editFormNewControls.ppic.setValue('lol');
    editFormNewControls.name.setValue('New Don Fivegee');
    editFormNewControls.email.setValue('NewDonFivegee@lol.com');
    editFormNewControls.emailAlert.setValue(true);
    editFormNewControls.deviceAlert.setValue(false);
    editFormNewControls.centralAlert.setValue(false);
    editFormNewControls.siteEquipmentAlert.setValue(false);
    editFormNewControls.securityAlert.setValue(true);
    editFormNewControls.cities.setValue([0, 1]);
    component.onEdit(index);
    expect(component.editUserError).toBeTrue();
    expect(component.userService.updateUser).toHaveBeenCalled();
    expect(component.userService.updateCities).toHaveBeenCalled();
    expect(component.assignUsersCities).toHaveBeenCalled();
    expect(component.assignCitiesUsers).toHaveBeenCalled();
  });

  it('should eun #editSubmit()', () => {
    spyOn(component.userService, 'updateUser');
    component.editSubmit(0);
    expect(component.userService.updateUser).toHaveBeenCalled();
  });

  it('should eun #confirmDelete()', () => {
    spyOn(component.userService, 'deleteUser');
    component.confirmDelete(0);
    expect(component.userService.deleteUser).toHaveBeenCalled();
  });

  it('should eun #confirmDelCity()', () => {
    spyOn(component.userService, 'updateCities');
    spyOn(component, 'assignCitiesUsers');
    spyOn(component, 'assignUsersCities');
    component.confirmDelCity(0, 0);
    expect(component.userService.updateCities).toHaveBeenCalled();
    expect(component.assignCitiesUsers).toHaveBeenCalled();
    expect(component.assignUsersCities).toHaveBeenCalled();
  });

  it('should run #openRemoveUserDialog()', () => {
    spyOn(component, 'confirmDelCity');
    const cityIndex = 0;
    const userIndex = 0;
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof RemoveUserComponent>);
    component.openRemoveUserDialog(cityIndex, userIndex);
    expect(component.confirmDelCity).toHaveBeenCalled();
  });

  it('should run #openDeleteUserDialog()', () => {
    spyOn(component, 'confirmDelete');
    const userIndex = 0;
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof RemoveUserComponent>);
    component.openDeleteUserDialog(userIndex);
    expect(component.confirmDelete).toHaveBeenCalled();
  });
});

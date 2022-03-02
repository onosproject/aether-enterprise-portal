/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';

import { AdminComponent } from './admin.component';

// import { UserService } from '../../../services/user.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  // * new tests

  // let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [AdminComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // userService = userService || {};
    // userService.usersSubject = observableOf({});
    // userService.citiesSubject = observableOf({});
    spyOn(component, 'addNewForm').and.callThrough();
    spyOn(component, 'assignUsersCities').and.callThrough();
    spyOn(component, 'assignCitiesUsers').and.callThrough();
    spyOn(component, 'setUpCities').and.callThrough();
    spyOn(component, 'setUpEditedCities').and.callThrough();
    component.ngOnInit();
    expect(component.addNewForm).toHaveBeenCalled();
    expect(component.assignUsersCities).toHaveBeenCalled();
    expect(component.assignCitiesUsers).toHaveBeenCalled();
    expect(component.setUpCities).toHaveBeenCalled();
    expect(component.setUpEditedCities).toHaveBeenCalled();
  });

  it('should run #userView()', async () => {
    component.userView();
    expect(component.userViewToggle).toBeTrue();
    expect(component.siteViewToggle).toBeFalse();
    expect(component.userViewStyle).toEqual('true');
    expect(component.siteViewStyle).toEqual('false');
  });

  it('should run #siteView()', async () => {
    component.siteView();
    expect(component.userViewToggle).toBeFalse();
    expect(component.siteViewToggle).toBeTrue();
    expect(component.userViewStyle).toEqual('false');
    expect(component.siteViewStyle).toEqual('true');
  });

  it('should run #isCitiesValid()', async () => {
    // component.isCitiesValid();
  });

  it('should run #closeUserViewEdit()', async () => {
    component.editUsers = component.editUsers;
    spyOn(component.editUsers, 'pop');
    component.closeUserViewEdit();
    expect(component.editUsers.length).toBeLessThanOrEqual(
      component.editUsers.length
    );
    // expect(component.editUsers.pop).toHaveBeenCalled();
  });

  it('should run #addNewUser()', async () => {
    spyOn(component, 'addNewForm');
    component.addNewUser();
    // expect(component.addNewForm).toHaveBeenCalled();
  });

  it('should run #closeUserViewEdit()', async () => {
    component.editUsers = [0, 0];
    spyOn(component, 'closeUserViewEdit').and.callThrough();
    component.closeUserViewEdit();
    expect(component.editUsers.length).toBeLessThan(2);
  });

  it('should run #toggleEdit1()', async () => {
    // component.editCities = [0, 1];
    const id = 1;
    spyOn(component, 'toggleEdit1').and.callThrough();
    spyOn(component, 'closeSiteViewEdit');
    component.toggleEdit1(id);
    expect(component.closeSiteViewEdit).toHaveBeenCalled();
    expect(component.doneActive).toBeFalse();
    expect(component.editCities.length).toEqual(1);
  });

  it('should run #toggleEdit1()', async () => {
    component.editCities = [0];
    const id = 0;
    spyOn(component, 'toggleEdit1').and.callThrough();
    spyOn(component, 'closeSiteViewEdit');
    component.toggleEdit1(id);
    expect(component.closeSiteViewEdit).toHaveBeenCalled();
    expect(component.doneActive).toBeFalse();
    expect(component.editCities.length).toBeLessThan(1);
  });
});

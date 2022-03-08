/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms/';
import { RouterTestingModule } from '@angular/router/testing';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', () => {
    component.form = component.formBuilder.group({
      email: component.email,
      password: component.password,
    });
    spyOn(component.formBuilder, 'group');
    component.ngOnInit();
    expect(component.formBuilder.group).toHaveBeenCalled();
  });

  it('should run #getErrorMessage()', () => {
    component.email = component.email;
    spyOn(component.email, 'hasError');
    component.password = component.password;
    spyOn(component.password, 'hasError');
    component.getErrorMessage();
    expect(component.email.hasError).toHaveBeenCalled();
    expect(component.password.hasError).toHaveBeenCalled();
  });

  it('should run #goToForgotPassword()', () => {
    component.route = component.route;
    spyOn(component.route, 'navigate');
    component.goToForgotPassword();
    expect(component.route.navigate).toHaveBeenCalled();
  });
});

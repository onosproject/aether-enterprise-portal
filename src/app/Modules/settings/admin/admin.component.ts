import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { User } from '../../../models/user.model';
import { City } from '../../../models/city.model';
import { UserService } from '../../../services/user.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
}
interface Permission {
  viewValue: string;
}
@Component({
  selector: 'aep-admin',
  templateUrl: './admin.component.html',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.1s ease-out', style({ height: 500, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 500, opacity: 1 }),
        animate('0.1s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
  styles: [],
})
export class AdminComponent implements OnInit {
  constructor(private userService: UserService, public dialog: MatDialog) {}

  // Boolean Triggers
  AddNew: boolean = false;
  EditUser: boolean = false;
  userViewToggle: boolean = true;
  siteViewToggle: boolean = false;
  allComplete: boolean = false;
  editMode = false;

  // Checkbox Triggers
  checked = false;

  // variables
  id: number;
  toggle: any;
  editObject: any;
  siteViewStyle: string = 'false';
  userViewStyle: string = 'true';

  // Arrays and Subscription
  users: User[] = [];
  cities: City[] = [];
  editUsers: number[] = [];
  editCities: number[] = [];
  subscription: Subscription;
  citySubscription: Subscription;

  ngOnInit(): void {
    // subscriptions
    this.subscription = this.userService.usersSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );

    this.citySubscription = this.userService.citiesSubject.subscribe(
      (cities: City[]) => {
        this.cities = cities;
      }
    );

    // functions on Init
    this.assignUsersCities();
    this.assignCitiesUsers();
    this.setUpCities();
    this.setUpEditedCities();
  }

  task: Task = {
    name: 'Select Alert Categories',
    completed: false,
    color: 'primary',
  };

  // Permissions array (Select, R, W, R/W)
  permissions: Permission[] = [
    { viewValue: 'Select' },
    { viewValue: 'R' },
    { viewValue: 'W' },
    { viewValue: 'R/W' },
  ];

  // form controls
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  // formGroups
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    cities: new FormArray([]),
  });

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    cities: new FormArray([]),
  });

  // Toggling userView and SiteView
  userView(): void {
    this.userViewToggle = true;
    this.siteViewToggle = false;
    this.userViewStyle = 'true';
    this.siteViewStyle = 'false';
    // console.log(a)
  }

  siteView(): void {
    this.siteViewToggle = true;
    this.userViewToggle = false;
    this.siteViewStyle = 'true';
    this.userViewStyle = 'false';
    // console.log(a)
  }

  // functions
  assignUsersCities(): void {
    this.users = this.users.map((user) => {
      const cities1 = [];
      this.cities.forEach((city) => {
        const index = city.users.findIndex(
          (userCity) => user.id === userCity.userId
        );
        if (index >= 0) {
          cities1.push({
            cityId: city.id,
            name: city.name,
            accessLevel: city.users[index].accessLevel,
          });
        }
      });
      user.cities = cities1;
      user.form = new FormGroup({});
      console.log(user, user.cities);
      return user;
    });
  }

  assignCitiesUsers(): void {
    this.cities = this.cities.map((city) => {
      city.users = city.users.map((user) => {
        const userIndex = this.users.findIndex(
          (cityUser) => cityUser.id === user.userId
        );
        user.details = this.users[userIndex];
        return user;
      });
      return city;
    });
    console.log(this.cities);
  }

  // for userView edit
  toggleEdit(id: number, index: number): void {
    console.log(id, index);
    const editIndex = this.editUsers.indexOf(id);
    if (editIndex >= 0) {
      console.log("if")
      this.editUsers.splice(editIndex, 1);
    } else {
      console.log("else")
      const cities = new FormArray([]);
      for (let i = 0; i < this.cities.length; i++) {
        const cityIndex = this.users[index].cities.findIndex(
          (city) => city.cityId === this.cities[i].id
        );
        cities.push(
          new FormControl(
            cityIndex >= 0 ? this.users[index].cities[cityIndex].accessLevel : 0
          )
        );
      }
      console.log(this.users[index])
      this.users[index].form = new FormGroup({
        ppic: new FormControl(this.users[index].ppic),
        name: new FormControl(this.users[index].name, Validators.required),
        email: new FormControl(this.users[index].email, Validators.required),
        cities: cities,
      });
      this.editUsers.push(id);
    }
    console.log(this.editUsers);
  }

  // for siteView edit
  toggleEdit1(id: number): void {
    const editCityIndex = this.editCities.indexOf(id);
    if (editCityIndex >= 0) {
      this.editCities.splice(editCityIndex, 1);
    } else {
      this.editCities.push(id);
    }
  }

  getEditControl(editForm: FormGroup, param: string): FormControl {
    return editForm.get(param) as FormControl;
  }

  getCitiesControl(cityIndex: number, formGroup: FormGroup): FormControl {
    const cities = formGroup.get('cities') as FormArray;
    const control = cities.controls[cityIndex] as FormControl;
    return control;
  }

  setUpCities(): void {
    const cities = this.userForm.get('cities') as FormArray;
    for (let i = 0; i < this.cities.length; i++) {
      cities.push(new FormControl(0));
    }
  }

  onSubmit(): void {
    // this.userService.addUser(this.userForm.value);
    const id =
      this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
    this.users.push({
      id: id,
      ppic: this.userForm.value.ppic,
      active: this.userForm.value.active,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      cities: this.userForm.value.cities,
    });
    for (let i = 0; i < this.cities.length; i++) {
      console.log('forloop');
      if (this.userForm.value.cities[i] > 0) {
        this.cities[i].users.push({
          userId: id,
          accessLevel: this.userForm.value.cities[i],
        });
      }
    }
    this.assignCitiesUsers();
    console.log(this.cities, this.users);
  }

  // getControlEdit(cityIndex):FormControl {
  //   const cities = this.editForm.get('cities') as FormArray;
  //   const control = cities.controls[cityIndex] as FormControl;
  //   return control;
  // }

  setUpEditedCities(): void {
    const cities = this.editForm.get('cities') as FormArray;
    for (let i = 0; i < this.cities.length; i++) {
      cities.push(new FormControl(0));
    }
  }

  onEdit(index: number): void {
    console.log(this.userService.getUser(index));
    const id = this.users[index].id;
    const form = this.users[index].form.value;
    const user = this.users[index];
    user.ppic = form.ppic;
    user.name = form.name;
    user.email = form.email;
    user.cities = [];
    for (let i = 0; i < this.cities.length; i++) {
      const userIndex = this.cities[i].users.findIndex(
        (cityUser) => cityUser.userId === id
      );
      const accessLevel = form.cities[i];
      if (userIndex >= 0) {
        if (accessLevel === 0) {
          this.cities[i].users.splice(userIndex, 1);
        } else {
          this.cities[i].users[userIndex].accessLevel = accessLevel;
        }
      } else if (accessLevel > 0) {
        this.cities[i].users.push({
          userId: user.id,
          accessLevel: accessLevel,
        });
      }
    }
    this.userService.updateUser(index, user);
    this.userService.updateCities(this.cities);
    this.assignUsersCities();
    this.assignCitiesUsers();
    this.toggleEdit(id, index);
    console.log(this.cities, this.users);
  }

  editSubmit(userIndex: number): void {
    console.log(userIndex, 'yes');
    this.userService.updateUser(userIndex, this.userForm.value);
    console.log(userIndex);
  }

  confirmDelete(userIndex: number): void {
    this.editObject = this.userService.deleteUser(userIndex);
  }

  confirmDelCity(cityIndex: number, userIndex: number): void {
    // this.editObject = this.userService.deleteUser(i);
    this.cities[cityIndex].users.splice(userIndex, 1);
    this.userService.updateCities(this.cities);
    this.assignCitiesUsers();
    this.assignUsersCities();
  }
}

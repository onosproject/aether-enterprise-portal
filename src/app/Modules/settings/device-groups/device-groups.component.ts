import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aep-device-groups',
  templateUrl: './device-groups.component.html',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: 500, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 500, opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
  styleUrls: [],
})
export class DeviceGroupsComponent implements OnInit {
  //var
  //anankiFormGroup: FormGroup;

  addNewdeviceGroupForm: boolean = false;
  expandId: boolean = true;
  hideRightBx: boolean = true;
  panelOpenState = false;
  editDeviceGroupForm: boolean = false;
  editAddDeviceGroup: boolean = false;

  selectedSite: any = '';

  siteSubscription: Subscription;

  siteDeviceGroups: any[] = [];

  siteDevices: any[] = [];

  config: any[] = [];

  selectedDevices: any[] = [];

  editDeviceGroup: number[] = [];

  remainingDevices: any[] = [];

  editDeviceGroupFormFun(): any {
    this.editDeviceGroupForm = true;
    // this.hideRightBx = false;
  }
  editDeviceGroupFormFunClose(): void {
    this.editDeviceGroupForm = false;
    // this.hideRightBx = true;
  }
  editAddDeviceGroupFun(): void {
    this.editAddDeviceGroup = true;
  }

  hideRightBxFn(): void {
    //this.hideRightBx = false;
    this.panelOpenState = true;
  }

  addNewdeviceGroupFormFun(): void {
    this.addNewdeviceGroupForm = true;
  }
  addNewdeviceGroupFormClose(): void {
    this.addNewdeviceGroupForm = false;
  }
  collapseSlice(): void {
    this.panelOpenState = true;
    this.hideRightBx = true;
  }
  openPanel(): void {
    this.panelOpenState = false;
    this.hideRightBx = false;
  }

  // forms
  firstFormGroup = new FormGroup({
    newDeviceGroup: new FormControl('', Validators.required),
    newIpDomain: new FormControl('', Validators.required),
    newDescription: new FormControl('', Validators.required),
    newDevice: new FormControl('', Validators.required),
  });

  deviceGroupEditForm = new FormGroup({
    newDeviceGroup: new FormControl('', Validators.required),
    newIpDomain: new FormControl('', Validators.required),
    newDescription: new FormControl('', Validators.required),
    newDevice: new FormControl('', Validators.required),
  });

  constructor(
    public deviceService: DeviceSimService
  ) {}

  ngOnInit(): void {
    this.assignSelectedSite();
  }

  changeSelection(id: number, deviceIndex: number): void {
    console.log(this.siteDevices[0][deviceIndex].selected);
    if (this.siteDevices[0][deviceIndex].selected == 1) {
      this.siteDevices[0][deviceIndex].selected = 0;
      this.selectedDevices.push(id);
    } else {
      this.siteDevices[0][deviceIndex].selected = 1;
      for (let i = 0; i < this.selectedDevices.length; i++) {
        if (this.selectedDevices[i] == id) {
          this.selectedDevices.splice(i, 1);
        }
      }
    }
    console.log(this.selectedDevices);
    console.log(this.siteDevices);
  }

  addNewDeviceG(): any {
    let deviceSerialNumbers: any[] = [];
    deviceSerialNumbers = this.selectedDevices;
    this.siteDeviceGroups[0].push({
      'display-name': this.firstFormGroup.value.newDeviceGroup,
      description: this.firstFormGroup.value.newDescription,
      devices: deviceSerialNumbers,
    });
    this.dataConvert();
    // console.log(this.selectedDevices);
    this.selectedDevices = [];
    this.addNewdeviceGroupForm = !this.addNewdeviceGroupForm;
    // console.log(this.siteDeviceGroups);
  }

  assignSelectedSite(): any {
    console.log(this.deviceService.mySite1);
    this.siteSubscription = this.deviceService.getSite().subscribe((data) => {
      // console.log(data);
      this.selectedSite = data;
      console.log(this.selectedSite);
      this.fetchData();
    });
  }

  fetchData(): any {
    this.deviceService.getData().subscribe((result) => {
      const configArray: any[] = [];
      configArray.push(result);
      this.config = configArray;
      configArray.map((item) => {
        const sitesDevicesGroups: any[] = [];
        const sitesConfig = item.sites;
        const sitesDevices: any[] = [];
        sitesConfig.map((site) => {
          if (site['site-id'] === this.selectedSite) {
            sitesDevicesGroups.push(site['device-groups']);
            console.log(
              'This is Local site-deviceGroups array',
              this.selectedSite,
              sitesDevicesGroups
            );
          }
          if (site['site-id'] === this.selectedSite) {
            sitesDevices.push(site.devices);
            console.log(
              'This is Local site-devices array',
              this.selectedSite,
              sitesDevices
            );
            sitesDevices.forEach((siteDevice) => {
              siteDevice.forEach((singleDevice, singleDeviceIndex) => {
                siteDevice[singleDeviceIndex].selected = 1;
                // console.log(siteDevice[singleDeviceIndex])
              });
            });
          }
        });
        // console.log(sitesDevicesGroups);
        // console.log(sitesDevices);
        this.siteDevices = sitesDevices;
        this.siteDeviceGroups = sitesDevicesGroups;
        this.dataConvert();
        // this.test1();
      });
      console.log(
        'This is a global device-groups array for a site',
        this.siteDeviceGroups
      );
      console.log(
        'This is a global devices-array for a site',
        this.siteDevices
      );
      console.log(this.config);
    });
  }

  dataConvert(): any {
    this.siteDeviceGroups.forEach((deviceGroups) => {
      console.log(deviceGroups);
      deviceGroups.forEach((deviceGroup) => {
        deviceGroup.devices.forEach((groupedDevice, groupedDeviceIndex) => {
          this.siteDevices.forEach((siteDevices) => {
            siteDevices.forEach((siteDevice, siteDeviceIndex) => {
              if (
                deviceGroup.devices[groupedDeviceIndex] ==
                siteDevices[siteDeviceIndex]['serial-number']
              ) {
                const deviceInfo: any = {
                  'display-name': siteDevices[siteDeviceIndex]['display-name'],
                  location: siteDevices[siteDeviceIndex].location,
                  'serial-number': siteDevices[siteDeviceIndex]['serial-number']
                };
                deviceGroup.devices.splice(groupedDeviceIndex, 1, deviceInfo);
                // console.log('alert');
              } else {
                const remainingDevices: any[] = []
                const deviceInfo: any = {
                  'display-name': siteDevices[siteDeviceIndex]['display-name'],
                  location: siteDevices[siteDeviceIndex].location,
                  'serial-number': siteDevices[siteDeviceIndex]['serial-number']
                };
                remainingDevices.push({deviceInfo})
                this.remainingDevices = remainingDevices
              }
            });
          });
        });
      });
    });
  }

  editTrigger(index: number): any {
    const editDeviceGroupIndex = this.editDeviceGroup.indexOf(index);
    if (editDeviceGroupIndex >= 0) {
      this.editDeviceGroup.splice(editDeviceGroupIndex, 1);
    } else {
      this.siteDeviceGroups[0][index].form = new FormGroup({
        newDeviceGroup: new FormControl(this.siteDeviceGroups[0][index]['display-name']),
        // newIpDomain: new FormControl(this.siteDeviceGroups[0][index]),
        newDescription: new FormControl(this.siteDeviceGroups[0][index].description),
      });
      this.editDeviceGroup.push(index);
    }
  }

  getEditControl(deviceGroupEditForm: FormGroup, param: string): FormControl {
    return deviceGroupEditForm.get(param) as FormControl;
  }

  deleteDevicesInGroups(groupIndex: number, deviceIndex: number): any {
    this.siteDeviceGroups[0][groupIndex].devices.splice(deviceIndex, 1);
    console.log(this.siteDeviceGroups)
  }


  // testing
  // test1(): any {
  //   this.siteDevices.forEach((device, deviceIndex) => {
  //     console.log(device, deviceIndex);
  //   });
  // }

  /*acc form */
  isLinear = false;
  // firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
}
// function newFormCOntrol(arg0: null): any {
//   throw new Error('Function not implemented.');
// }

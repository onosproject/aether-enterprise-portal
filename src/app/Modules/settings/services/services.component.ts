import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { trigger, style, animate, transition } from '@angular/animations';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DeleteServiceComponent } from '../dialogs/delete-service/delete-service.component';

@Component({
  selector: 'aep-services',
  templateUrl: './services.component.html',
  // animations: [
  //   trigger('inOutAnimation', [
  //     transition(':enter', [
  //       style({ height: 0, opacity: 0 }),
  //       animate('0.5s ease-out', style({ height: 500, opacity: 1 })),
  //     ]),
  //     transition(':leave', [
  //       style({ height: 500, opacity: 1 }),
  //       animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
  //     ]),
  //   ]),
  // ],
  styles: [],
})
export class ServicesComponent implements OnInit {
  //var
  anankiFormGroup: FormGroup;
  addNewServiceForm: boolean = false;
  editServiceForm: boolean = false;

  // new Data
  protocolList: string[] = [
    'protocol-1',
    'protocol-2',
    'protocol-3',
    'protocol-4',
    'protocol-5',
  ];
  portStartList: number[] = [4201, 4202, 4203, 4204, 4205, 4206];
  portEndList: number[] = [8201, 8202, 8203, 8204, 8205, 8206];
  mbrList: number[] = [1, 5, 10, 15, 20];

  config = [];

  selectedSite: string = '';

  siteApplications = [];

  siteSubscription: Subscription;

  editService: number[] = [];

  addServiceFormGroup = new FormGroup({
    // appName: new FormControl('', Validators.required),
    // newProtocol: new FormControl('', Validators.required),
    // newPortStart: new FormControl('', Validators.required),
    // newAddress: new FormControl('', Validators.required),
    // newMbr: new FormControl('', Validators.required),
    // newPortEnd: new FormControl('', Validators.required),
  });

  addNewServiceError: boolean = false;

  editServiceFormGroup = new FormGroup({
    // appName: new FormControl('', Validators.required),
    // newProtocol: new FormControl('', Validators.required),
    // newPortStart: new FormControl('', Validators.required),
    // newAddress: new FormControl('', Validators.required),
    // newMbr: new FormControl('', Validators.required),
    // newPortEnd: new FormControl('', Validators.required),
  });

  editServiceFormError: boolean = false;

  constructor(
    public deviceService: DeviceSimService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.anankiFormGroup = new FormGroup({
    //   appName: new FormControl(null),
    //   protocol: new FormControl(null),
    //   portStart: new FormuControl(null),
    //   mbr: new FormControl(null),
    //   portEnd: new FormControl(),
    // });
    this.assignSelectedSite();
  }

  newServiceFormGroup(): void {
    this.addServiceFormGroup = new FormGroup({
      appName: new FormControl('', Validators.required),
      newProtocol: new FormControl('', Validators.required),
      newPortStart: new FormControl('', Validators.required),
      newAddress: new FormControl('', Validators.required),
      newMbr: new FormControl('', Validators.required),
      newPortEnd: new FormControl('', Validators.required),
    });
  }

  assignSelectedSite(): void {
    // console.log(this.deviceService.mySite1);
    this.siteSubscription = this.deviceService.getSite().subscribe((data) => {
      // console.log(data);
      this.selectedSite = data;
      // console.log(this.selectedSite);
      this.fetchData();
    });
  }

  addNewService(): void {
    this.addNewServiceError = false;
    if (this.addServiceFormGroup.invalid) {
      this.addNewServiceError = true;
    } else if (this.addServiceFormGroup.valid) {
      this.siteApplications.push({
        'display-name': this.addServiceFormGroup.value.appName,
        protocol: this.addServiceFormGroup.value.newProtocol,
        portStart: this.addServiceFormGroup.value.newPortStart,
        address: this.addServiceFormGroup.value.newAddress,
        mbr: this.addServiceFormGroup.value.newMbr,
        portEnd: this.addServiceFormGroup.value.newPortEnd,
        deviceName: 'device-1',
      });
      this.addNewServiceForm = !this.addNewServiceForm;
      this.addNewServiceError = false;
    }
    // console.log(this.siteApplications);
  }

  editTrigger(serviceIndex: number): void {
    this.addNewServiceForm = false;
    this.editServiceFormError = false;
    this.closeEdit();
    const editServiceIndex = this.editService.indexOf(serviceIndex);
    if (editServiceIndex >= 0) {
      this.editService.splice(editServiceIndex, 1);
    } else {
      this.siteApplications[serviceIndex].form = new FormGroup({
        appName: new FormControl(
          this.siteApplications[serviceIndex]['display-name'],
          Validators.required
        ),
        newProtocol: new FormControl(
          this.siteApplications[serviceIndex].protocol,
          Validators.required
        ),
        newPortStart: new FormControl(
          this.siteApplications[serviceIndex].portStart,
          Validators.required
        ),
        newAddress: new FormControl(
          this.siteApplications[serviceIndex].address,
          Validators.required
        ),
        newMbr: new FormControl(
          this.siteApplications[serviceIndex].mbr,
          Validators.required
        ),
        newPortEnd: new FormControl(
          this.siteApplications[serviceIndex].portEnd,
          Validators.required
        ),
      });
      this.editService.push(serviceIndex);
      this.editServiceFormGroup = this.siteApplications[serviceIndex].form;
    }
  }

  getEditControl(editServiceForm: FormGroup, param: string): FormControl {
    return editServiceForm.get(param) as FormControl;
  }

  closeEdit(): void {
    this.editService.pop();
  }

  fetchData(): void {
    this.deviceService.getData().subscribe((result) => {
      const configArray = [];
      const siteSlices = [];
      const siteApplications = [];
      const globalApplications = [];
      configArray.push(result);
      this.config = configArray;
      // console.log(this.config);
      configArray.forEach((config) => {
        config.applications.forEach((configApp) => {
          globalApplications.push(configApp);
        });

        // console.log(globalApplications);
        // console.log(config.sites);
        config.sites.forEach((siteConfig) => {
          // console.log(siteConfig);
          if (siteConfig['site-id'] == this.selectedSite) {
            siteSlices.push(siteConfig.slices);
            // console.log(siteSlices);
            siteSlices[0].forEach((siteSlice) => {
              // console.log(siteSlice.applications)
              // siteApplications.push(siteSlice.applications);
              siteSlice.applications.forEach((application) => {
                // console.log(application);
                siteApplications.push({ application });
                // console.log(siteApplications);
              });
              for (
                let siteAppIndex = 0;
                siteAppIndex < siteApplications.length;
                siteAppIndex++
              ) {
                for (
                  let appIndex = 0;
                  appIndex < globalApplications.length;
                  appIndex++
                ) {
                  // console.log(
                  //   globalApplications.length,
                  //   siteApplications,
                  //   globalApplications[appIndex]['application-id']
                  // );
                  if (
                    siteApplications[siteAppIndex].application ==
                    globalApplications[appIndex]['application-id']
                  ) {
                    const appInfo = {
                      'display-name':
                        globalApplications[appIndex]['display-name'],
                      'application-id':
                        globalApplications[appIndex]['application-id'],
                    };
                    siteApplications.splice(siteAppIndex, 1, appInfo);
                  }
                }
              }
              // console.log(siteApplications);
            });
            for (let i = 0; i < siteApplications.length; i++) {
              siteApplications[i].protocol = 'protocol-1';
              siteApplications[i].portStart = 4201;
              siteApplications[i].portEnd = 8201;
              siteApplications[i].address = 'address-1';
              siteApplications[i].deviceName = 'device-1';
              siteApplications[i].mbr = 15;
            }
          }
        });
      });
      this.siteApplications = siteApplications;
      // console.log(this.siteApplications);
    });
  }

  onEdit(serviceIndex: number): void {
    this.editServiceFormError = false;
    if (this.editServiceFormGroup.invalid) {
      this.editServiceFormError = true;
    } else if (this.editServiceFormGroup.valid) {
      const service = this.siteApplications[serviceIndex];
      const editForm = this.siteApplications[serviceIndex].form.value;
      service['display-name'] = editForm.appName;
      service.protocol = editForm.newProtocol;
      service.portStart = editForm.newPortStart;
      service.portEnd = editForm.newPortEnd;
      service.address = editForm.newAddress;
      service.mbr = 15;
      service.deviceType = 'device-1';
      this.closeEdit();
    }
  }

  deleteService(serviceIndex: number): void {
    this.siteApplications.splice(serviceIndex, 1);
  }

  openDeleteServiceDialog(serviceIndex: number): void {
    const dialogRef = this.dialog.open(DeleteServiceComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.deleteService(serviceIndex);
      }
      this.closeEdit();
    });
  }

  // dataConvert(): {

  // }

  addNewServiceFormFun(): void {
    this.newServiceFormGroup();
    this.closeEdit();
    this.addNewServiceForm = true;
    this.editServiceForm = false;
  }
  editServiceFormFun(): void {
    this.addNewServiceForm = false;
    this.editServiceForm = true;
  }
  editServiceFormClose(): void {
    this.editServiceForm = false;
  }
}

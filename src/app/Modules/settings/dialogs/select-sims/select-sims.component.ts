import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeviceSimService } from 'src/app/services/device-sim.service';

@Component({
  selector: 'aep-select-sims',
  templateUrl: './select-sims.component.html',
  styles: [],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class SelectSimsComponent implements OnInit {
  selectedSim: string = '';

  config: any[] = [];

  selectedSite: any = '';

  inventorySims: any[] = []

  sims: any[] = [
    // {
    //   id: 1,
    //   simNumber: "72348723473240",
    //   isSelected: false,
    // },
    // {
    //   simNumber: "72348723473241",
    //   isSelected: false,
    // },
    // {
    //   simNumber: "72348723473242",
    //   isSelected: false,
    // },
    // {
    //   simNumber: "72348723473243",
    //   isSelected: false,
    // },
    // {
    //   simNumber: "72348723473244",
    //   isSelected: false,
    // },
    // {
    //   simNumber: "72348723473245",
    //   isSelected: false,
    // },
    // {
    //   simNumber: "72348723473246",
    //   isSelected: false,
    // },
    // {
    //   simNumber: "72348723473247",
    //   isSelected: false,
    // },
    // {
    //   simNumber: "72348723473248",
    //   isSelected: false,
    // },
    // {
    //   simNumber: "72348723473249",
    //   isSelected: false,
    // },
    // {
    //   simNumber: "72348723473250",
    //   isSelected: false,
    // },
    // {
    //   simNumber: "72348723473251",
    //   isSelected: false,
    // },
  ];

  constructor(
    public deviceService: DeviceSimService,
    public dialogRef: MatDialogRef<SelectSimsComponent> // @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.assignSelectedSite1();
    this.assignSelectedSims();
  }

  assignSelectedSite1(): any {
    console.log('Hi');
    console.log(this.deviceService.getSite());
    this.deviceService.getSite().subscribe((data) => {
      console.log(data);
      this.selectedSite = data;
      console.log(this.selectedSite);
      this.fetchSims();
    });
  }

  fetchSims(): any {
    this.deviceService.getData().subscribe((aetherConfig) => {
      const configArray: any[] = [];
      configArray.push(aetherConfig);
      configArray.map((item) => {
        // const simsArray: any[] = [];
        const sitesConfig = item.sites;
        console.log(item.sites);
        sitesConfig.map((site) => {
          console.log(site['display-name']);
          if (site['display-name'] === this.selectedSite) {
            console.log(site.sims);
            this.sims.push(site.sims);
            console.log(
              'This is Local sims array',
              this.selectedSite,
              this.sims
            );
          }
        });
      });
    });
    console.log(this.sims);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeSelection(simIccid: string): void {
    this.selectedSim = simIccid;
    // this.getSelectedSims()
  }

  selectSimFinal(): void {
    console.log(this.selectedSim);
    this.deviceService.mySim(this.selectedSim);
  }

  assignSelectedSims(): any {
    this.deviceService.getSims().subscribe((data) => {
      console.log(data)
      this.inventorySims = data;
    })
  }
}

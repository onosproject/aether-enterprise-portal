import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SettingsRoutingModule } from './Modules/settings/settings-routing.module';
import { SettingsModule } from './Modules/settings/settings.module';
import { MaterialModule } from './Modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarModule } from './components/header/navbar/navbar.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent,],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SettingsRoutingModule,
    SettingsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NavbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

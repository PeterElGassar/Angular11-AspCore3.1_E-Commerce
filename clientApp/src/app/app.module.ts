import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ErrorInterceptors } from './core/error.interceptors';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    SlickCarouselModule,
    ButtonModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS , useClass :ErrorInterceptors,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

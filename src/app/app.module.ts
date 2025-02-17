import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// SEGURANÇA
import { AuthInterceptor } from './security/authentication-interceptor';
// MODULOS
import { HomeModule } from './home/home.module';
import { ProjetosModule } from './projetos/projetos.module';
import { SobreModule } from './sobre/sobre.module';
import { LoginModule } from './login/login.module';
import { MatCommonModule } from '@angular/material/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ProfileModule } from './profile/profile.module';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { UserManagerModule } from './user-management/user-manager.module';
// LINGUA
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ProjetosModule,
    SobreModule,
    LoginModule,
    BrowserAnimationsModule,
    MatCommonModule,
    NavBarComponent,
    ProfileModule,
    HttpClientModule,
    UserManagerModule
  ],
  providers: [
    FormBuilder,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { SolveModelComponent } from './components/solve-model/solve-model.component';
import { InitializeModelComponent } from './components/solve-model/initialize-model/initialize-model.component';
import { ParameterEstimationComponent } from './components/solve-model/parameter-estimation/parameter-estimation.component';
import { ResultsNumericSolveComponent } from './components/results-numeric-solve/results-numeric-solve.component';
import { ResultsParameterComponent } from './components/results-parameter/results-parameter.component';
import { ModelComponent } from './components/model/model.component';
import { UserManualComponent } from './components/user-manual/user-manual.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PresentationComponent,
    SolveModelComponent,
    InitializeModelComponent,
    ParameterEstimationComponent,
    ResultsNumericSolveComponent,
    ResultsParameterComponent,
    ModelComponent,
    UserManualComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShowStudentsComponent } from './show-students/show-students.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StudentDetailsComponent } from './student-details/student-details.component';

const routes : Routes = [
  {path : '', component: HomeComponent},
  {path:'show-students', component: ShowStudentsComponent },
  {path:'show-students/:id', component: StudentDetailsComponent}
  ]
  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowStudentsComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

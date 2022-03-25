import { AuthService } from './../services/auth.service';
import { StudentService } from './../services/student.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  studentForm: FormGroup;
  selectedGrade: string;
  selectedStandard: string;
  isLogin: boolean = false;
  error: string;
  isError: boolean = false;

  standards: string[] = ['1st Standard','2nd Standard'];
  grades: string[] = ['Grade A', 'Grade B'];

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private studentService: StudentService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {

    this.studentForm = this.fb.group({
      stu_name: ['',[Validators.required]],
      stu_age: ['',[Validators.required, Validators.min(1), Validators.max(20)]],
      stu_std: ['',[Validators.required]],
      stu_grade : ['',[Validators.required]],
      stu_mobile: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
  }

  addStudent(ngstudentForm: FormGroupDirective){

    if(this.studentForm.valid){

      var student_details = {
        name: this.studentForm.get('stu_name').value,
        age: this.studentForm.get('stu_age').value,
        standard: this.studentForm.get('stu_std').value,
        grade: this.studentForm.get('stu_grade').value,
        mobile: this.studentForm.get('stu_mobile').value
      } as Student;

      this.studentService.createStudent(student_details).then(result =>{
        if(result){
          ngstudentForm.resetForm();
          this.studentForm.reset();
        }
      });
    }
  }

  showStudents(){
    this.route.navigate(['/show-students']);
  }

  login(){
    this.authService.signInWithGoogle().then(result=>{
      if(result){
        this.isLogin = true;
      }
      else{
        this.isError = true;
        this.error = "Login Failed";
        this.isLogin = false;
      }
    })
    
  }

  

}

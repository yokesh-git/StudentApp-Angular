import { StudentService } from './../services/student.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  studentForm: FormGroup;
  error: boolean=false;
  selectedGrade: string;
  selectedStandard: string;

  standards: string[] = ['1st Standard','2nd Standard'];
  grades: string[] = ['Grade A', 'Grade B'];

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private studentService: StudentService
    ) { }

  ngOnInit(): void {

    this.studentForm = this.fb.group({
      stu_name: ['',[Validators.required]],
      stu_age: ['',[Validators.required]],
      stu_std: ['',[Validators.required]],
      stu_grade : ['',[Validators.required]],
      stu_mobile: ['',[Validators.required, Validators.maxLength(10)]]
    });
  }

  addStudent(){

    if(this.studentForm.valid){

      var student_details = {
        name: this.studentForm.get('stu_name').value,
        age: this.studentForm.get('stu_age').value,
        standard: this.studentForm.get('stu_std').value,
        grade: this.studentForm.get('stu_grade').value,
        mobile: this.studentForm.get('stu_mobile').value
      } as Student;

      this.studentService.createStudent(student_details);
      this.studentForm.reset();
      
    }
    else{
      this.error = true;
    }
    
    
  }

  showStudents(){
    console.log("Show page");
    this.route.navigate(['/show-students']);
  }

}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './../Models/student.model';
import { StudentService } from './../services/student.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  studentId: string;
  error: string;
  student: Student;
  isUpdate: Boolean = false;
  studentForm: FormGroup;
  standards: string[] = ['1st Standard','2nd Standard'];
  grades: string[] = ['Grade A', 'Grade B'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private route: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.studentService.getStudentById(this.studentId).subscribe(result=>{
      if(result==null){
        this.error = "Error fetching data";
      }
      else{
        this.student = result;
      }
    });

    this.studentForm = this.fb.group({
      stu_name: ['',[Validators.required]],
      stu_age: ['',[Validators.required]],
      stu_std: ['',[Validators.required]],
      stu_grade : ['',[Validators.required]],
      stu_mobile: ['',[Validators.required]]
    })
  }
  

  backToStudents(){
    this.route.navigate([`/show-students`]);
  }

  deleteStudent(studentId: string){
    this.studentService.deleteStudent(studentId);
    this.route.navigate([`/show-students`]);
  }

  switch(){
    if(this.isUpdate){
      this.isUpdate = false;
    }
    else{
      this.studentForm.get('stu_name').setValue(this.student.name);
      this.studentForm.get('stu_age').setValue(this.student.age);
      this.studentForm.get('stu_std').setValue(this.student.standard);
      this.studentForm.get('stu_grade').setValue(this.student.grade);
      this.studentForm.get('stu_mobile').setValue(this.student.mobile);
      this.isUpdate = true;
    }
  }

  updateStudent(){
    //console.log("Update Method");
    if(this.studentForm.valid){
      var student_details = {
        name: this.studentForm.get('stu_name').value,
        age: this.studentForm.get('stu_age').value,
        standard: this.studentForm.get('stu_std').value,
        grade: this.studentForm.get('stu_grade').value,
        mobile: this.studentForm.get('stu_mobile').value
      } as Student;

      this.studentService.updateStudent(this.studentId,student_details);
      this.isUpdate = false;
    }
  }

}

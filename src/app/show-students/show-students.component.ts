import { Router } from '@angular/router';
import { StudentService } from './../services/student.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.css']
})
export class ShowStudentsComponent implements OnInit {

  students: Student[];

  constructor(

    private firestore : AngularFirestore,
    private studentService: StudentService,
    private route: Router

    ) { }

  ngOnInit(): void {

    this.studentService.getAllStudents().subscribe(result=>{
      this.students = result.map(item =>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Object
        } as Object as Student
      })
    });
  }

  studentDetails(studentId: string){
    this.route.navigate([`/show-students/${studentId}`]);
  }

  backToHome(){
    this.route.navigate(['add-students']);
  }

}

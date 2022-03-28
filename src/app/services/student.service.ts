import { SanckbarService } from './sanckbar.service';
import { Student } from './../Models/student.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  dbStudent = 'students';

  constructor(
    private firestore : AngularFirestore,
    private snackBar: SanckbarService
  ) { }

  createStudent(student_details: Student){
    return this.firestore.collection(this.dbStudent).add(student_details);
  }

  getAllStudents(){
    return this.firestore.collection(this.dbStudent).snapshotChanges();
  }

  getStudentById(studentId: string){
    
      return this.firestore.doc<Student>(`${this.dbStudent}/${studentId}`).snapshotChanges().pipe(
        map(doc => {
          if(doc.payload.exists) {
            return {
              id: doc.payload.id,
              ...doc.payload.data()
            } as Student;
          } else {
            return null;
          }
        })
      );
    }

    deleteStudent(studentId: string){
      this.firestore.doc(`${this.dbStudent}/${studentId}`).delete();
    }

    updateStudent(studentId:string, student : Student){
      return this.firestore.doc(`${this.dbStudent}/${studentId}`).update(student).then(res=>{
        this.snackBar.openSnackBar("Update Successful","Dismiss");
      }).catch(err=>{
        this.snackBar.openSnackBar("Update Failed","Dismiss")
      });
    }


  }

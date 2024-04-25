package Project.School.Management.controller;

import Project.School.Management.model.Student;
import Project.School.Management.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")

public class StudentController {

    private final StudentService studentService;
    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity createStudent(@RequestBody Student student){
        studentService.createStudent(student);
        return ResponseEntity.ok().build();

    }

    @PutMapping("/{id}/{ClassId}")
    public ResponseEntity ChangeStudentClass(@PathVariable String id, @PathVariable String ClassId){
        studentService.ChangeStudentClass(id, ClassId);
        return ResponseEntity.ok().build();
    }



}

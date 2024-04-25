package Project.School.Management.controller;

import Project.School.Management.model.Student;
import Project.School.Management.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @GetMapping
    public ResponseEntity getAllStudents(){
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    public ResponseEntity getStudentById(@PathVariable String id){
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @PutMapping("/{id}/{ClassId}")
    public ResponseEntity ChangeStudentClass(@PathVariable String id, @PathVariable String ClassId){
        studentService.ChangeStudentClass(id, ClassId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteStudent(@PathVariable String id){
        studentService.deleteStudent(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/sendMedicalCertificate/{id}")
    public ResponseEntity<String> sendMedicalCertificate(@PathVariable String id , @RequestParam("certif") MultipartFile file){
        try{
            studentService.sendMedicalCertificate(id, file);
            return ResponseEntity.ok("Medical Certificate sent successfully");
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body("Medical Certificate not sent");
        }
    }



}

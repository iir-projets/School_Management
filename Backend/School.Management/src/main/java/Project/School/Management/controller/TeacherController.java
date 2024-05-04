package Project.School.Management.controller;

import Project.School.Management.model.Teacher;
import Project.School.Management.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher")
public class TeacherController {
    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping
    public List<Teacher> getAllTeachers(){
        return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable String id){
        return teacherService.getTeacherById(id);
    }

    @PostMapping
    public ResponseEntity createTeacher(@RequestBody Teacher teacher){
        teacherService.createTeacher(teacher);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteTeacher(@PathVariable String id){
        teacherService.deleteTeacher(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping
    public ResponseEntity updateTeacher(@RequestBody Teacher teacher){
        teacherService.updateTeacher(teacher);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/getTeacherBySchoolClass/{id}")
    public List<Teacher> getTeacherBySchoolClass(@PathVariable String id){
        return teacherService.getTeacherBySchoolClass(id);
    }
    @GetMapping("/getTeacherBySubject/{id}")
    public List<Teacher> getTeacherBySubject(@PathVariable String id){
        return teacherService.getTeacherBySubject(id);
    }
    @GetMapping("/Search/{input}")
    public List<Teacher> searchTeacher(@PathVariable String input){
        return teacherService.searchTeacher(input);
    }


}

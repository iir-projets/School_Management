package Project.School.Management.controller;

import Project.School.Management.model.SchoolClass;
import Project.School.Management.service.SchoolClassService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schoolclass")
public class SchoolClassController {
    private final SchoolClassService schoolClassService;

    public SchoolClassController(SchoolClassService schoolClassService){
        this.schoolClassService = schoolClassService;
    }

    @GetMapping
    public List<SchoolClass> getAllSchoolClasses(){
        return schoolClassService.getAllSchoolClasses();
    }


    @PostMapping
    public ResponseEntity createSchoolClass(@RequestBody SchoolClass schoolClass){
        schoolClassService.createSchoolClass(schoolClass);
        return ResponseEntity.ok().build();

    }


    @GetMapping("/Students/{name}")
    public List<String> getSchoolClassStudentsByName(@PathVariable String name){
        return schoolClassService.getSchoolClassStudentsByName(name);
    }
}

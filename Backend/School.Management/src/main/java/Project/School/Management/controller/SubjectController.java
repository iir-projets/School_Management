package Project.School.Management.controller;

import Project.School.Management.model.Subject;
import Project.School.Management.service.SubjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subject")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }


    @PostMapping
    public ResponseEntity createSubject(@RequestBody Subject subject){
        subjectService.createSubject(subject);
        return ResponseEntity.ok().build();
    }
    //TODO: Implement the rest of the CRUD operations for the Subject entity
    //TODO: CREATE NEW SUBJECT SO YOU CAN START WORKING ON THE TEACHER ENTITY

}

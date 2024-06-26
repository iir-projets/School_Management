package Project.School.Management.controller;

import Project.School.Management.model.Major;
import Project.School.Management.service.MajorService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/major")
public class MajorController{
    private final MajorService majorService;


    public MajorController(MajorService majorService){
        this.majorService = majorService;
    }

    @PostMapping
    public ResponseEntity createMajor(@RequestBody Major major){
        majorService.createMajor(major);
        return ResponseEntity.ok().build();
}


}

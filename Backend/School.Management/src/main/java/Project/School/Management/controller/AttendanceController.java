package Project.School.Management.controller;

import Project.School.Management.dto.AtendanceDTO;
import Project.School.Management.model.Attendance;
import Project.School.Management.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {
    private final AttendanceService attendanceService;
    public AttendanceController(AttendanceService attendanceService){
        this.attendanceService = attendanceService;
    }


    @PostMapping("/mark")
    public ResponseEntity markAttendance(@RequestBody Attendance attendance){
        attendanceService.createAttendance(attendance);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/student/{id}")
    public AtendanceDTO getAttendanceByStudentId(@PathVariable String id){
        return attendanceService.getAttendanceByStudentId(id);
    }

    @GetMapping("/student/{id}/date/{startDate}/{endDate}")
    public AtendanceDTO getAttendanceByPeriod(@PathVariable LocalDate startDate, @PathVariable LocalDate endDate, @PathVariable String id){
        return attendanceService.getAttendanceByPeriod(startDate, endDate , id);
    }

    // Just for testing won't need to get all attendance in real life
    @GetMapping("/allAttendance")
    public ResponseEntity getAllAttendance(){
        return ResponseEntity.ok(attendanceService.getAllAttendance());
    }


}

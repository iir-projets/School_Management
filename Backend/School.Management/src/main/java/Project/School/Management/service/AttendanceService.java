package Project.School.Management.service;

import Project.School.Management.dto.AtendanceDTO;
import Project.School.Management.model.Attendance;
import Project.School.Management.model.Student;
import Project.School.Management.repository.AttendanceRepository;
import Project.School.Management.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.*;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, StudentRepository studentRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
    }


    public void createAttendance(Attendance attendance){
        attendanceRepository.insert(attendance);
    }

    public AtendanceDTO getAttendanceByStudentId(String studentId){
        Student student = studentRepository.findById(studentId).orElse(null);
        if(student == null){
            throw new RuntimeException("Student not found");
        }

         List<Attendance> preMapList = attendanceRepository.findByStudentId(studentId);
         String studentName = student.getFirstName() + " " + student.getLastName();
        LinkedHashMap<Date, Boolean> attendanceMap = new LinkedHashMap<>();
        for (Attendance attendance : preMapList) {
            attendanceMap.put(attendance.getDate(), attendance.isPresent());
        }
        AtendanceDTO atendanceDTO = new AtendanceDTO();
        atendanceDTO.setStudentName(studentName);
        atendanceDTO.setAttendance(attendanceMap);
        return atendanceDTO;
    }
    public AtendanceDTO getAttendanceByPeriod(LocalDate startDate, LocalDate endDate, String studentId){

        Date startDateTime = Date.from(startDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        Date endDateTime = Date.from(endDate.plusDays(1).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDateTime);
        calendar.add(Calendar.DATE, -1);
        startDateTime = calendar.getTime();
        List<Attendance> preMapList = attendanceRepository.findByDateBetweenAndStudentId(startDateTime, endDateTime, studentId);
        // just for testing the PremapList to see the if the Repo works correctly
        /*System.out.println("Premaplist");
        System.out.println(preMapList.size());*/

        Student student = studentRepository.findById(studentId).orElse(null);
        if(student == null){
            throw new RuntimeException("Student not found");
        }
        String studentName = student.getFirstName() + " " + student.getLastName();

        LinkedHashMap<Date, Boolean> attendanceMap = new LinkedHashMap<>();
        for (Attendance attendance : preMapList) {
            attendanceMap.put(attendance.getDate(), attendance.isPresent());
        }
        AtendanceDTO atendanceDTO = new AtendanceDTO();
        atendanceDTO.setStudentName(studentName);
        atendanceDTO.setAttendance(attendanceMap);
        return atendanceDTO;

    }




    public List<Attendance> getAllAttendance(){
        return attendanceRepository.findAll();
    }

}

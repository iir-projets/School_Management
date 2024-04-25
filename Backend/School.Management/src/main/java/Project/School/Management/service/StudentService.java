package Project.School.Management.service;

import Project.School.Management.model.SchoolClass;
import Project.School.Management.model.Student;
import Project.School.Management.repository.SchoolClassRepository;
import Project.School.Management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final SchoolClassRepository schoolClassRepository;


    public StudentService(StudentRepository studentRepository, SchoolClassRepository schoolClassRepository) {
        this.studentRepository = studentRepository;
        this.schoolClassRepository = schoolClassRepository;

    }


    public void createStudent(Student student){
        SchoolClass schoolClass = schoolClassRepository.findById(student.getSchoolClassId()).orElseThrow(()-> new RuntimeException("SchoolClass not found"));
        student.setSchoolClassName(schoolClass.getClassName());
        List<String> students = schoolClass.getStudents();
        students.add((student.getFirstName() + " " + student.getLastName()));
        schoolClass.setStudents(students);
        studentRepository.insert(student);
    }




}

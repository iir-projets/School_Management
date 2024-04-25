package Project.School.Management.service;

import Project.School.Management.model.SchoolClass;
import Project.School.Management.model.Student;
import Project.School.Management.repository.SchoolClassRepository;
import Project.School.Management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        if (students == null) {
            // If the students list is null, create a new one
            students = new ArrayList<>();
        }
        students.add((student.getFirstName() + " " + student.getLastName()));
        schoolClass.setStudents(students);
        schoolClassRepository.save(schoolClass);
        studentRepository.insert(student);
    }

    public void ChangeStudentClass(String id, String ClassId){
        Student student = studentRepository.findById(id).orElseThrow(()-> new RuntimeException("Student not found"));
        SchoolClass newSchoolClass = schoolClassRepository.findById(ClassId).orElseThrow(()-> new RuntimeException("SchoolClass not found"));
        String oldSchoolClassId = student.getSchoolClassId();
        SchoolClass oldSchoolClass = schoolClassRepository.findById(oldSchoolClassId).orElseThrow(()-> new RuntimeException("SchoolClass not found"));

        // Remove student from old class
        List<String> students = oldSchoolClass.getStudents();
        students.remove(student.getFirstName() + " " + student.getLastName());
        oldSchoolClass.setStudents(students);
        schoolClassRepository.save(oldSchoolClass);

        // add Student to new class
        students = newSchoolClass.getStudents();
        if (students == null) {
            // If the students list is null, create a new one
            students = new ArrayList<>();
        }
        students.add((student.getFirstName() + " " + student.getLastName()));
        newSchoolClass.setStudents(students);

        // updating student




}

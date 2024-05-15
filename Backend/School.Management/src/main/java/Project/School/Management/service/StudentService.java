package Project.School.Management.service;

import Project.School.Management.model.SchoolClass;
import Project.School.Management.model.Student;
import Project.School.Management.repository.SchoolClassRepository;
import Project.School.Management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
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

    public void ChangeStudentClass(String id, String ClassId) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        SchoolClass newSchoolClass = schoolClassRepository.findById(ClassId).orElseThrow(() -> new RuntimeException("SchoolClass not found"));
        String oldSchoolClassId = student.getSchoolClassId();
        SchoolClass oldSchoolClass = schoolClassRepository.findById(oldSchoolClassId).orElseThrow(() -> new RuntimeException("SchoolClass not found"));

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
        schoolClassRepository.save(newSchoolClass);

        // updating student
        student.setSchoolClassId(ClassId);
        studentRepository.save(student);

    }
    public void updateStudent(String id,Student student){
        Student oldStudent = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        oldStudent.setFirstName(student.getFirstName());
        oldStudent.setLastName(student.getLastName());
        oldStudent.setAddress(student.getSchoolClassId());
        oldStudent.setEmail(student.getEmail());
        oldStudent.setSchoolClassId(student.getSchoolClassId());
        studentRepository.save(oldStudent);
    }

    public void deleteStudent(String id) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        SchoolClass schoolClass = schoolClassRepository.findById(student.getSchoolClassId()).orElseThrow(() -> new RuntimeException("SchoolClass not found"));
        List<String> students = schoolClass.getStudents();
        students.remove(student.getFirstName() + " " + student.getLastName());
        schoolClass.setStudents(students);
        schoolClassRepository.save(schoolClass);
        studentRepository.deleteById(id);
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public Student getStudentById(String id){
        return studentRepository.findById(id).orElseThrow(()-> new RuntimeException("Student not found"));
    }

    public void sendMedicalCertificate(String id, MultipartFile file) throws IOException {
        Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        // Save file to directory but change the name to the student id + current date time
        String originalFilename = file.getOriginalFilename();
        int lastDotIndex = originalFilename.lastIndexOf(".");
        String fileExtension = (lastDotIndex != -1) ? originalFilename.substring(lastDotIndex + 1) : "";

        try {
file.transferTo(new File("/home/akashi/School_Management/Backend/MedicalCertifs/" + student.getId() + "_" + LocalDateTime.now().withSecond(0).withNano(0) + ".png"));
        } catch (IOException e) {
            e.printStackTrace();
            throw new IOException("Error saving file");
        }
        // Store the file path in the student object
        if(student.getCertificatesPaths() == null) {
            student.setCertificatesPaths(new ArrayList<>());
        }
        student.getCertificatesPaths().add("/home/akashi/School_Management/Backend/MedicalCertifs/" + student.getId() + "_" + LocalDateTime.now().withSecond(0).withNano(0) + ".png");
        studentRepository.save(student);

    }

    public List<Student> getStudentByInput (String input){
        return studentRepository.findByFirstNameOrLastName(input);
    }
}

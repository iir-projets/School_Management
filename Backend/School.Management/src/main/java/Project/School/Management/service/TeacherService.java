package Project.School.Management.service;

import Project.School.Management.model.SchoolClass;
import Project.School.Management.model.Subject;
import Project.School.Management.model.Teacher;
import Project.School.Management.repository.SchoolClassRepository;
import Project.School.Management.repository.SubjectRepository;
import Project.School.Management.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final SchoolClassService schoolClassService;
    private final SchoolClassRepository schoolClassRepository;

    public TeacherService(TeacherRepository teacherRepository, SubjectRepository subjectRepository, SchoolClassService schoolClassService, SchoolClassRepository schoolClassRepository) {

        this.teacherRepository = teacherRepository;
         this.subjectRepository = subjectRepository;
         this.schoolClassService = schoolClassService;
        this.schoolClassRepository = schoolClassRepository;
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }


    public Teacher getTeacherById(String id) {
        return teacherRepository.findById(id).orElseThrow(() -> new RuntimeException("Teacher not found with id: " + id));
    }

    public void createTeacher(Teacher teacher) {

        List<String> subjectsIDList = teacher.getSubjectIds();
        List<String> schoolClassIds = teacher.getSchoolClassesIds();
        List<String> subjectsNameList = new ArrayList<>();
        List<String> schoolClassNameList = new ArrayList<>();
        for(String subjectID : subjectsIDList) {
            Subject subject = subjectRepository.findById(subjectID).orElseThrow(() -> new RuntimeException("Subject not found with id: " + subjectID));
              subjectsNameList.add(subject.getName());
        }
        for(String schoolClassID : schoolClassIds) {
            SchoolClass schoolClass = schoolClassRepository.findById(schoolClassID).orElse(null);
            schoolClassNameList.add(schoolClass.getClassName());
        }

        teacher.setSchoolNames(schoolClassNameList);
        teacher.setSubjectNames(subjectsNameList);


        teacherRepository.insert(teacher);
    }

    public void deleteTeacher(String id) {
        teacherRepository.deleteById(id);
    }

    public void updateTeacher(Teacher teacher) {
        teacherRepository.save(teacher);
    }

    public List<Teacher> getTeacherBySchoolClass(String id) {
        return teacherRepository.findBySchoolClassesIds(id);
    }

    public List<Teacher> getTeacherBySubject(String id) {
        return teacherRepository.findBySubjectIds(id);
    }

    public List<Teacher> searchTeacher(String input) {
        return teacherRepository.findByFirstNameOrLastName(input);
    }

}

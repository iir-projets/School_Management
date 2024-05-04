package Project.School.Management.service;

import Project.School.Management.model.Teacher;
import Project.School.Management.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }


    public Teacher getTeacherById(String id) {
        return teacherRepository.findById(id).orElseThrow(() -> new RuntimeException("Teacher not found with id: " + id));
    }

    public void createTeacher(Teacher teacher) {
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

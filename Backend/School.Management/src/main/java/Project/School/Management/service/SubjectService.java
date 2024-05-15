package Project.School.Management.service;

import Project.School.Management.model.Subject;
import Project.School.Management.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public void createSubject(Subject subject) {
        subjectRepository.insert(subject);
    }
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

}

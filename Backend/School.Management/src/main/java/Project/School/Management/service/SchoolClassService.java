package Project.School.Management.service;

import Project.School.Management.model.Major;
import Project.School.Management.model.SchoolClass;
import Project.School.Management.repository.SchoolClassRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchoolClassService {

    private final SchoolClassRepository schoolClassRepository;
    private final MajorService majorService;

    public SchoolClassService(SchoolClassRepository schoolClassRepository , MajorService majorService){
        this.schoolClassRepository = schoolClassRepository;
        this.majorService = majorService;
    }


    public void createSchoolClass(SchoolClass schoolClass){
        schoolClass.setClassName(Integer.toString( schoolClass.getYear() )+ schoolClass.getMajorId().toUpperCase() + schoolClass.getNrClass());
        Major major = majorService.GetMajorbyId(schoolClass.getMajorId());
        schoolClass.setClassName(Integer.toString( schoolClass.getYear() )+ major.getName().toUpperCase()+"G"+ schoolClass.getNrClass());
        schoolClassRepository.insert(schoolClass);
    }

    public List<SchoolClass> getAllSchoolClasses(){
        return schoolClassRepository.findAll();
    }

    public List<String> getSchoolClassStudentsByName(String name){
//        return schoolClassRepository.findByClassName(name);
        SchoolClass schoolClass = schoolClassRepository.findByClassName(name);
        if (schoolClass == null){
            return null;
        }

        return schoolClass.getStudents();


    }
}

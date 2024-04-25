package Project.School.Management.service;

import Project.School.Management.model.Major;
import Project.School.Management.repository.MajorRepository;
import org.springframework.stereotype.Service;

@Service
public class MajorService {
    private final MajorRepository majorRepository;

    public MajorService(MajorRepository majorRepository){
        this.majorRepository = majorRepository;
    }

    public Major GetMajorbyId(String id){
       return majorRepository.findById(id).orElseThrow(() -> new RuntimeException(
                String.format("Cannot find major by id %s", id)
        ));

    }

    public void createMajor(Major major){
        majorRepository.insert(major);
    }

}

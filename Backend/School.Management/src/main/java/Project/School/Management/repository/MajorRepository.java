package Project.School.Management.repository;

import Project.School.Management.model.Major;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorRepository extends MongoRepository<Major, String> {
}

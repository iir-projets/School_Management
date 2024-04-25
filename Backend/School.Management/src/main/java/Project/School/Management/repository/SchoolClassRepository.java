package Project.School.Management.repository;

import Project.School.Management.model.SchoolClass;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolClassRepository extends MongoRepository<SchoolClass, String> {
    SchoolClass findByClassName(String className);
}

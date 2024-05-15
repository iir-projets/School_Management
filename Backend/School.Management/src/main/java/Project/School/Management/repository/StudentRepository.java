package Project.School.Management.repository;

import Project.School.Management.model.Student;
import Project.School.Management.model.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    @Query("{$or: [{'firstName': {$regex: ?0, $options: 'i'}}, {'lastName': {$regex: ?0, $options: 'i'}}]}")
    List<Student> findByFirstNameOrLastName(String input);

}

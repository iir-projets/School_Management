package Project.School.Management.repository;

import Project.School.Management.model.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends MongoRepository<Teacher, String> {
    List<Teacher> findBySchoolClassesIds(String schoolClassesId);
    List<Teacher> findBySubjectIds(String subjectId);

    @Query("{$or: [{'firstName': {$regex: ?0, $options: 'i'}}, {'lastName': {$regex: ?0, $options: 'i'}}]}")
    List<Teacher> findByFirstNameOrLastName(String name);



}

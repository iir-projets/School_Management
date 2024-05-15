package Project.School.Management.repository;

import Project.School.Management.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public User findByUsername(String username);

}

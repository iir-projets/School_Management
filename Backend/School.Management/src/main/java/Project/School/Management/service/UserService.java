package Project.School.Management.service;

import Project.School.Management.model.User;
import Project.School.Management.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}

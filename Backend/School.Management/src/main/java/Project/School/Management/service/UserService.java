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


    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) == null) {
            userRepository.save(user);
            return user;
        }
        else {
            return null;
        }
    }

    public User loginUser(User user) {
        User user1 = userRepository.findByUsername(user.getUsername());
        if (user1 != null && user1.getPassword().equals(user.getPassword())) {
            return user1;
        }
        else {
            return null;
        }

    }
}

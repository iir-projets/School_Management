package Project.School.Management.controller;

import Project.School.Management.model.User;
import Project.School.Management.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
         if (userService.registerUser(user) != null) {
            return userService.registerUser(user);
        }
        else {
            return null;
        }

    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        if (userService.loginUser(user) != null) {
            return userService.loginUser(user);
        }
        else {
            return null;
        }
    }
}

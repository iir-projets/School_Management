package Project.School.Management.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(collection = "User")
public class User {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
}
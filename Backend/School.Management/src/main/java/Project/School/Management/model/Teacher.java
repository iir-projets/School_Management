package Project.School.Management.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "Teacher")
public class Teacher {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private List<String> subjectIds;
    private List<String> subjectNames;
    private List<String> schoolClassesIds;
    private List<String> schoolNames;

}

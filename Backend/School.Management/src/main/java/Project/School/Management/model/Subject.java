package Project.School.Management.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "subject")
@Data
public class Subject {
    @Id
    private String id;
    private String name;
    private String description;
}

package Project.School.Management.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@Document(collection = "major")
public class Major {
    @Id
    private String id;
    private String name;
    private String description;
    @DBRef
    private List<Subject> subjects;
}

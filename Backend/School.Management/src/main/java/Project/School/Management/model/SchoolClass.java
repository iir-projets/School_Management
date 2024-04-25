package Project.School.Management.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "schoolClass")
public class SchoolClass {
    @Id
    private String id;
    private int year;
    private int nrClass;
    private String className;
    private String majorId;
    private List<String> students;


}
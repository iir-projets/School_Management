package Project.School.Management.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "schoolClass")
public class SchoolClass {
    @Id
    private String id;
    private Double year;
    private int nrClass;
    private String className;
    private Major major;

    public SchoolClass(Double year, int nrClass, Major major) {
        this.year = year;
        this.nrClass = nrClass;
        this.major = major;
        this.className = year.toString() + major.getName() + nrClass;
    }
}
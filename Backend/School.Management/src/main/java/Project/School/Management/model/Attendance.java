package Project.School.Management.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
@Data
@Document(collection = "attendance")
public class Attendance {
    private String id;
    @DBRef
    private Student student;
    private LocalDate date;
    private boolean present;
}

package Project.School.Management.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;

@Data
@Document(collection = "attendance")
public class Attendance {
    @Id
    private String id;
    private String studentId;
    private Date date;
    private boolean present;
}

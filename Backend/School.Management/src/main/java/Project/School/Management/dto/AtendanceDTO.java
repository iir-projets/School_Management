package Project.School.Management.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;

@Data
public class AtendanceDTO {
    private String StudentName;
    private LinkedHashMap<Date,Boolean> attendance;
}

package Project.School.Management.repository;

import Project.School.Management.model.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface AttendanceRepository extends MongoRepository<Attendance, String> {
    List<Attendance> findByStudentId(String studentId);
    List<Attendance> findByDateBetweenAndStudentId(Date startDate, Date endDate , String studentId);

}

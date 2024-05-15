import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Autosuggest from 'react-autosuggest';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 16,
        marginBottom: 10,
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
    tableHeader: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    tableData: {
        fontSize: 10,
    },
});

const AttendancePDF = ({ studentName, startDate, endDate, attendance }) => (
    <Document>
        <Page size="A4" style={styles.container}>
            <View>
                <Text style={styles.header}>Attendance Report</Text>
                <Text style={styles.header}>Student Name: {studentName}</Text>
                <Text style={styles.header}>Period: {startDate} - {endDate}</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text>Date</Text>
                        </View>
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text>Status</Text>
                        </View>
                    </View>
                    {Object.keys(attendance).map((date) => (
                        <View style={styles.tableRow} key={date}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableData}>{new Date(date).toLocaleDateString()}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableData}>{attendance[date] ? 'Present' : 'Absent'}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

const AttendanceReport = () => {
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (searchInput) {
            fetchStudents();
        }
    }, [searchInput]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`http://localhost:8099/student/search/${searchInput}`);
            setStudents(response.data || []);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleInputChange = (_, { newValue }) => {
        setSearchInput(newValue);
    };

    const handleSuggestionSelected = (_, { suggestion }) => {
        setSelectedStudentId(suggestion.id);
        setSearchInput(`${suggestion.firstName} ${suggestion.lastName}`);
    };

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0
            ? []
            : (Array.isArray(students) ? students : []).filter(
                (student) =>
                    student.firstName.toLowerCase().includes(inputValue) ||
                    student.lastName.toLowerCase().includes(inputValue)
            );
    };

    const renderSuggestion = (suggestion) => (
        <div>
            {suggestion.firstName} {suggestion.lastName}
        </div>
    );

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `http://localhost:8099/attendance/student/${selectedStudentId}/date/${formattedStartDate}/${formattedEndDate}`
            );
            setAttendance(response.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    const renderAttendanceTable = () => {
        if (!attendance.studentName) {
            return <p>No attendance data available.</p>;
        }

        const { studentName, attendance: attendanceData } = attendance;
        const attendanceDates = Object.keys(attendanceData);

        return (
            <div>
                <h3>Attendance Report for {studentName}</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {attendanceDates.map((date) => (
                        <tr key={date}>
                            <td>{new Date(date).toLocaleDateString()}</td>
                            <td>{attendanceData[date] ? 'Present' : 'Absent'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const downloadPDF = () => {
        const formattedStartDate = startDate.toLocaleDateString();
        const formattedEndDate = endDate.toLocaleDateString();
        const { studentName, attendance: attendanceData } = attendance;

        const blob = new Blob([<AttendancePDF studentName={studentName} startDate={formattedStartDate} endDate={formattedEndDate} attendance={attendanceData} />], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${studentName}_attendance_report.pdf`;
        link.click();
    };

    const inputProps = {
        placeholder: 'Search Student',
        value: searchInput,
        onChange: handleInputChange,
    };

    return (
        <div className="container mt-4">
            <h2>Attendance Report</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                        Start Date :
                    </label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                    <label htmlFor="endDate" className="form-label">
                        End Date :
                    </label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)} showTimeSelect dateFormat="Pp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="student" className="form-label">
                        Search Student
                    </label>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={({ value }) =>
                            setSuggestions(getSuggestions(value))
                        }
                        onSuggestionsClearRequested={() => setSuggestions([])}
                        getSuggestionValue={(suggestion) =>
                            `${suggestion.firstName} ${suggestion.lastName}`
                        }
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        onSuggestionSelected={handleSuggestionSelected}
                    />
                </div>
                <button type="submit" className="btn btn-primary me-2">
                    Get Report
                </button>
                <button type="button" className="btn btn-secondary" onClick={downloadPDF} disabled={!attendance.studentName}>
                    Download PDF
                </button>
            </form>
            {renderAttendanceTable()}
        </div>
    );
};
export default AttendanceReport;
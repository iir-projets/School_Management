import 'dart:convert';
import 'package:http/http.dart' as http;
import 'student.dart';
import 'package:flutter/material.dart';
Future<Student> _fetchStudent(String studentId) async {
  try {
    final response = await http.get(Uri.parse('http://localhost:8080/student/$studentId'));
    if (response.statusCode == 200) {
      return Student.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load student: ${response.statusCode}');
    }
  } catch (e) {
    print('Error fetching student: $e');
    throw Exception('Failed to load student');
  }
}
class StudentPortalPage extends StatelessWidget {
  final String studentId;

  StudentPortalPage(this.studentId);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Student>(
      future: _fetchStudent(studentId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return CircularProgressIndicator(); // Afficher un indicateur de chargement en attendant la réponse de l'API
        } else if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}');
        } else {
          Student student = snapshot.data!;
          return Scaffold(
            backgroundColor: Colors.blueGrey,
            appBar: AppBar(
              title: Text('Student Portal'),
              backgroundColor: Colors.black45,
            ),
            body: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                
                children: [
                  CircleAvatar(
                    child: Text(student.firstName[0] + student.lastName[0]),
                    radius: 70.0,
                  ),
                  SizedBox(height: 30.0),
                  Text(
                    '${student.firstName} ${student.lastName}',
                    style: TextStyle(fontSize: 24.0, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 20.0),
                  Text(
                    'Email: ${student.email}',
                    style: TextStyle(fontSize: 18.0),
                  ),
                  Text(
                    'Phone: ${student.phone}',
                    style: TextStyle(fontSize: 18.0),
                  ),
                  Text(
                    'Address: ${student.address}',
                    style: TextStyle(fontSize: 18.0),
                  ),
                  Text(
                    'Class: ${student.schoolClassName}',
                    style: TextStyle(fontSize: 18.0),
                  ),
                ],
              ),
            ),
          );
        }
      },
    );
  }
}

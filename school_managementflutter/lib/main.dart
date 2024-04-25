import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'student.dart';

class StudentListPage extends StatefulWidget {
  @override
  _StudentListPageState createState() => _StudentListPageState();
}

class _StudentListPageState extends State<StudentListPage> {
Future<List<dynamic>> _fetchStudents() async {
  try {
    final response = await http.get(Uri.parse('http://localhost:8080/student'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load students: ${response.statusCode}');
    }
  } catch (e) {
    print('Error fetching students: $e');
    throw Exception('Failed to load students');
  }
}

Future<void> addmajor() async {
  final response = await http.post(
    Uri.parse('http://localhost:8080/major'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode({
      
    "id" : "13",
    "name" : "finance",
    "description" : "waaw"
       
      
    }),
  );

  if (response.statusCode == 200) {
    print('Student added successfully');
  } else {
    print('Failed to add student');
    print(response.statusCode);
  }
}

Future<void> addschoolclass() async {
  final response = await http.post(
    Uri.parse('http://localhost:8080/schoolclass'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode({
      
    "id" : "111",
    "year" : 3,
    "nrClass" :5 ,
    "className" : null,
    "majorId": "13",
    
      
    }),
  );

  if (response.statusCode == 200) {
    print('Student added successfully');
  } else {
    print('Failed to add student');
    print(response.statusCode);
  }
}
Future<void> addStudent() async {
  final response = await http.post(
    Uri.parse('http://localhost:8080/student'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode({
      'id' : '1121',
      'firstName': 'lmatii',
      'lastName': 'abdelbarie',
      'email': 'abdelbarie.lmati@example.com',
      'phone': '1232456789',
      'address': '12332 Street, City',
      'schoolClassId' : '11111',
      
      
    }),
  );

  if (response.statusCode == 200) {
    print('Student added successfully');
  } else {
    print('Failed to add student');
    print(response.statusCode);
  }
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Liste des étudiants'),
      ),
      body: FutureBuilder<List<dynamic>>(
        future: _fetchStudents(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Erreur: ${snapshot.error}'));
          } else {
            List<dynamic> students = snapshot.data!;
            return ListView.builder(
              itemCount: students.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text('${students[index]['firstName']} ${students[index]['lastName']}'),
                  subtitle: Text(students[index]['email']),
                );
              },
            );
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
      //     addmajor();
      //  addschoolclass();
          addStudent();
        },
        child: Icon(Icons.add),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title: 'School Management',
    home: StudentListPage(),
  ));
}

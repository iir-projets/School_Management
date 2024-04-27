import 'package:flutter/material.dart';
import 'student.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'documentDetails.dart';

String studentId = '1';
class DocumentRequestPage extends StatefulWidget {
  @override
  _DocumentRequestPageState createState() => _DocumentRequestPageState();
}

class _DocumentRequestPageState extends State<DocumentRequestPage> {
  late String documentName;

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
void _submitDocumentRequest() async {
  
  final student = await _fetchStudent(studentId); // Récupérer les données de l'étudiant depuis l'API
  Navigator.push(
    context,
    MaterialPageRoute(
      builder: (context) => DetailsDocumentRequest(
        student.firstName,
        student.lastName,
        documentName,
      ),
    ),
  );
}
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Document Request'),
        backgroundColor: Colors.black38,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Document Name:',
              style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
            ),
            TextField(
              onChanged: (value) {
                setState(() {
                  documentName = value;
                });
              },
              decoration: InputDecoration(
                hintText: 'Enter document name',
              ),
            ),
            SizedBox(height: 20.0),
        ElevatedButton(
  onPressed: () async {
    final student = await _fetchStudent(studentId); // Assuming you have a method to fetch the student details
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DetailsDocumentRequest(
          student.firstName,
          student.lastName,
          documentName,
        ),
      ),
    );
  },
  child: Text('Submit'),
),

          ],
        ),
      ),
    );
  }
}

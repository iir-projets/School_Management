import 'package:flutter/material.dart';
import 'student.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'documentDetails.dart';

final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

String studentId = '1';

class DocumentRequestPage extends StatefulWidget {
  @override
  _DocumentRequestPageState createState() => _DocumentRequestPageState();
}

class _DocumentRequestPageState extends State<DocumentRequestPage> {
  List<String> documentNames = [];
  late String documentName='';

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
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
            Center(
              child: ElevatedButton(
                onPressed: () async {
                  if (documentName.isEmpty) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        behavior: SnackBarBehavior.floating,
                        content: SizedBox(
                          height: 80.0,
                          child: Center(
                            child: Text('Please enter a document name'),
                          ),
                        ),
                        duration: Duration(seconds: 2),
                      ),
                    );
                  } else {
                    setState(() {
                      documentNames.add(documentName);
                      documentName = '';
                    });
                  }
                },
                child: Text('Submit'),
              ),
            ),
            SizedBox(height: 20.0),
            Text(
              'Documents Requested:',
              style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
            ),
            for (String docName in documentNames)
              Text(
                '- $docName',
                style: TextStyle(fontSize: 18.0),
              ),
            SizedBox(height: 20.0),
           Center(
  child: ElevatedButton(
    onPressed: () async {
      // Fetch student details
      try {
        Student student = await _fetchStudent(studentId);
        String firstName = student.firstName;
        String lastName = student.lastName;

        // Navigate to DetailsDocumentRequest
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => DetailsDocumentRequest(
              firstName: firstName,
              lastName: lastName,
              documentNames: documentNames,
            ),
          ),
        );
      } catch (e) {
        // Handle error
        print('Error fetching student details: $e');
      }
    },
    child: Text('Confirm'),
  ),
),

          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'dart:io'; // Pour File
import 'package:image_picker/image_picker.dart'; // Pour XFile et ImageSource

class MedicalCertificatesPage extends StatefulWidget {
  final String studentId;

  MedicalCertificatesPage(this.studentId);

  @override
  _MedicalCertificatesPageState createState() => _MedicalCertificatesPageState();
}

class _MedicalCertificatesPageState extends State<MedicalCertificatesPage> {
  String message = '';
  File? certificate;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Medical Certificates'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Message (Describe your absence)',
              ),
              onChanged: (value) {
                setState(() {
                  message = value;
                });
              },
            ),
            SizedBox(height: 16.0),
            certificate != null
                ? Image.file(certificate!)
                : ElevatedButton(
                    onPressed: () async {
                      final XFile? pickedFile =
                          await ImagePicker().pickImage(source: ImageSource.camera);
                      if (pickedFile != null) {
                        setState(() {
                          certificate = File(pickedFile.path);
                        });
                      }
                    },
                    child: Text('Add Certificate (PDF Format)'),
                  ),
            SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      certificate = null;
                    });
                  },
                  child: Text('Cancel'),
                ),
                ElevatedButton(
                  onPressed: () {
                    // Save the message and certificate to the database
                    // You can use the studentId from the widget property
                    // and the message and certificate File from the state
                    // to save the data to your database
                  },
                  child: Text('Confirm'),
                ),
              ],
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                // Send the message and certificate to the database
                // You can use the studentId from the widget property
                // and the message and certificate File from the state
                // to send the data to your database
              },
              child: Text('Send'),
            ),
          ],
        ),
      ),
    );
  }
}


import 'package:flutter/material.dart';

class DetailsDocumentRequest extends StatelessWidget {
  final String firstName;
  final String lastName;
  final List<String> documentNames;

  DetailsDocumentRequest({
    required this.firstName,
    required this.lastName,
    required this.documentNames,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Document Request Details'),
        backgroundColor: Colors.black26,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Bonjour Mr/Mme $lastName $firstName,',
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 20.0),
            Text(
              'Nous avons bien reçu votre demande de document :',
              style: TextStyle(fontSize: 18.0),
            ),
            for (String documentName in documentNames)
              Text(
                '- $documentName',
                style: TextStyle(fontSize: 18.0),
              ),
              
            SizedBox(height: 20.0),
            Text(
              'Votre demande est en cours de traitement.',
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 20.0),
            Text(
              'Cordialement,',
              style: TextStyle(fontSize: 18.0),
            ),
            Text(
              'Votre école',
              style: TextStyle(fontSize: 18.0),
            ),
          ],
        ),
      ),
    );
  }
}

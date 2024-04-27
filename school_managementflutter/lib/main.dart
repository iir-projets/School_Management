import 'package:flutter/material.dart';
import 'portail.dart';
import 'student.dart';
void main() {
  runApp(MyApp());
}
String studentId = '1';


class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'School Management',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
        
      ),
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('School Managementtt'),
        backgroundColor: Colors.black38,
        actions: [
          IconButton(
            icon: Icon(Icons.account_circle),
            onPressed: () {
              // Add navigation to account settings
            },
          ),
        ],
      ),
 body: Container(
  color: Colors.black.withOpacity(0.50), 
  child: ListView(
    padding: EdgeInsets.all(16.0),
    children: [
      _buildCard('Scan QR Code to Access School', Icons.qr_code, () {
        // Add functionality to scan QR code and access school
      }),
      _buildCard('School Bus', Icons.directions_bus, () {
        // Add navigation to school bus page
      }),
      _buildCard('School Restaurant', Icons.restaurant, () {
        // Add navigation to school restaurant page
      }),
      
  _buildCard('Student Portal', Icons.school, () {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => StudentPortalPage(studentId)),
  );
}),
      _buildCard('Medical Certificates', Icons.local_hospital, () {
        // Add navigation to medical certificates page
      }),
      _buildCard('BDE Events', Icons.event, () {
        // Add navigation to BDE events page
      }),
      _buildCard('Vacations', Icons.calendar_today, () {
        // Add navigation to vacations page
      }),
      _buildCard('Document Requests', Icons.description, () {
        // Add navigation to document requests page
      }),
      _buildCard('Profil Account', Icons.account_circle, () {
        // Add navigation to profil account page
      }),
    ],
  ),
 ),);

  }

  Widget _buildCard(String title, IconData icon, VoidCallback onTap) {
    return Card(
      elevation: 4.0,
      margin: EdgeInsets.symmetric(vertical: 8.0),
     color: Colors.cyanAccent,
      child: ListTile(
        contentPadding: EdgeInsets.all(16.0),
        title: Text(
          title,
          style: TextStyle(color: Colors.black, fontSize: 18.0, fontWeight: FontWeight.bold),
        ),
        leading: Icon(icon),
        onTap: onTap,
      ),
    );
  }
}

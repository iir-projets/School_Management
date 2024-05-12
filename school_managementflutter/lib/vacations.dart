import 'package:flutter/material.dart';

class VacationsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Vacations'),
      ),
      body: ListView.builder(
        itemCount: vacations.length,
        itemBuilder: (context, index) {
          return _buildVacationCard(vacations[index]);
        },
      ),
    );
  }

  Widget _buildVacationCard(Vacation vacation) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
      elevation: 4.0,
      child: ListTile(
        title: Text(vacation.title),
        subtitle: Text(vacation.date),
        leading: Icon(Icons.calendar_today),
        trailing: Icon(Icons.arrow_forward),
        onTap: () {
          // Add navigation to vacation details page
        },
      ),
    );
  }
}

class Vacation {
  final String title;
  final String date;

  Vacation(this.title, this.date);
}

// Liste de vacances de démonstration
List<Vacation> vacations = [
  Vacation('Summmer Vacation', 'July 12 - September 31'),
  Vacation('Wiinter Break', 'December 20 - January 5'),
  Vacation('spppring Break', 'april 24 - May 10'),
  Vacation('Spring Break', 'April 10 - April 18'),
];

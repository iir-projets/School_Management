import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

class BdeEvent {
  final String name;
  final String organizer;
  final DateTime  date;
  final String description;
  final int stars;

  BdeEvent({
    required this.name,
    required this.organizer,
    required this.date,
    required this.description,
    required this.stars,
  });
}

class BdeEventsPage extends StatelessWidget {
  final List<BdeEvent> events = [
    BdeEvent(
      name: 'BDE Event 1',
      organizer: 'Organizer 1',
      date: DateTime(2024, 5, 15),
      description: 'Description 1',
      stars: 4,
    ),
    BdeEvent(
      name: 'BDE Event 2',
      organizer: 'Organizer 2',
      date: DateTime(2024, 5, 20),
      description: 'Description 2',
      stars: 5,
    ),
    // Add more events as needed
  ];

  List<DateTime> get eventDates =>
      events.map((event) => event.date).toList();

  List<BdeEvent> _getEventsForDay(DateTime day) {
    return events.where((event) => event.date == day).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('BDE Events'),
        backgroundColor: Colors.black38,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              'Calendrier',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
          ),
          TableCalendar(
            focusedDay: DateTime.now(),
            firstDay: DateTime.utc(2020, 1, 1),
            lastDay: DateTime.utc(2030, 12, 31),
            calendarStyle: CalendarStyle(
              defaultTextStyle: TextStyle(color: Colors.black),
              selectedDecoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.red,
              ),
              todayDecoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.red.withOpacity(0.5),
              ),
              markersMaxCount: 0,
            ),
            daysOfWeekStyle: DaysOfWeekStyle(
              weekdayStyle: TextStyle(color: Colors.black),
              weekendStyle: TextStyle(color: Colors.black),
            ),
            eventLoader: _getEventsForDay,
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              'Événements',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: events.length,
              itemBuilder: (context, index) {
                final event = events[index];
                return Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Card(
                    elevation: 4.0,
                    color: Colors.cyanAccent,
                    child: ListTile(
                      title: Text(event.name),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Organizer: ${event.organizer}'),
                          Text('Date: ${event.date.toString()}'),
                          Text('Description: ${event.description}'),
                          Row(
                            children: [
                              Text('Stars: '),
                              for (int i = 0; i < event.stars; i++)
                                Icon(Icons.star, color: Colors.yellow),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class Student {
  late String id;
  late String firstName;
  late String lastName;
  late String email;
  late String phone;
  late String address;
  late String? schoolClassId;
  late String? schoolClassName;

  Student({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.phone,
    required this.address,
    required this.schoolClassId,
    required this.schoolClassName,
  });

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      id: json['id'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      email: json['email'],
      phone: json['phone'],
      address: json['address'],
      schoolClassId: json['schoolClassId'],
      schoolClassName: json['schoolClassName'],
    );
  }
}
  


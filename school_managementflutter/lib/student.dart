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

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'phone': phone,
      'address': address,
      'schoolClassId': schoolClassId,
      'schoolClassName': schoolClassName,
    };
  }
}
  


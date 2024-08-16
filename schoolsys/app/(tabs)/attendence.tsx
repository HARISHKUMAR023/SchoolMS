import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";

interface Student {
  _id: string;
  name: string;
  class: {
    _id: string;
    name: string;
    teacherInCharge: string;
  };
  section: {
    _id: string;
    name: string;
  };
  rollNumber: number;
}

interface AttendanceStatus {
  [key: string]: string;
}

const Attendance: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceStatus>({});
  const [date, setDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [teacherId, setTeacherId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacherId = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userid = decodedToken.id;
          const response = await axios.get(`http://192.168.127.92:5000/api/employees/user/${userid}`);
          setTeacherId(response.data.teacherId);
        }
      } catch (error) {
        console.error('Error fetching teacher ID:', error);
      }
    };

    fetchTeacherId();

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    if (teacherId) {
      axios.get(`http://192.168.127.92:5000/api/students/teacher/${teacherId}`)
        .then(response => {
          setStudents(response.data);
        })
        .catch(error => console.error('Error fetching students:', error));
    }
  }, [teacherId]);

  const markAttendance = () => {
    setLoading(true);
    const attendancePromises = Object.keys(attendance).map(studentId => {
      return axios.post('http://192.168.127.92:5000/api/attendance', {
        student: studentId,
        date,
        status: attendance[studentId],
      })
        .then(response => response.data)
        .catch(error => {
          console.error(`Error marking attendance for student ${studentId}:`, error);
          throw error;
        });
    });

    const minLoadingTime = new Promise<void>(resolve => setTimeout(resolve, 10000));

    Promise.all([...attendancePromises, minLoadingTime])
      .then(() => {
        setLoading(false);
        console.log('Attendance marked successfully!');
      })
      .catch(error => {
        setLoading(false);
        if (error.response && error.response.status === 409) {
          console.log('Attendance already taken for this student on this date.');
        } else {
          console.log('Failed to mark attendance. Please try again later.');
        }
      });
  };

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const markAllAttendance = (status: string) => {
    const updatedAttendance: AttendanceStatus = {};
    students.forEach(student => {
      updatedAttendance[student._id] = status;
    });
    setAttendance(updatedAttendance);
  };

  const renderItem = ({ item }: { item: Student }) => (
    <View style={styles.studentContainer}>
      <View style={styles.studentInfo}>
        <Text>{item.name}</Text>
        <Text>{item.class.name} - {item.section.name}</Text>
      </View>
      <View style={styles.attendanceButtons}>
        <TouchableOpacity
          onPress={() => handleAttendanceChange(item._id, 'present')}
          style={[
            styles.attendanceButton,
            attendance[item._id] === 'present' ? styles.presentButton : styles.defaultButton,
          ]}
        >
          <Text style={styles.buttonText}>P</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAttendanceChange(item._id, 'absent')}
          style={[
            styles.attendanceButton,
            attendance[item._id] === 'absent' ? styles.absentButton : styles.defaultButton,
          ]}
        >
          <Text style={styles.buttonText}>A</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{date}</Text>
        <TouchableOpacity
          onPress={() => markAllAttendance('present')}
          style={[styles.markAllButton, { backgroundColor: 'green' }]}
        >
          <Text style={styles.markAllButtonText}>Mark All Present</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => markAllAttendance('absent')}
          style={[styles.markAllButton, { backgroundColor: 'red' }]}
        >
          <Text style={styles.markAllButtonText}>Mark All Absent</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      <TouchableOpacity
        onPress={markAttendance}
        style={[styles.submitButton, loading ? styles.disabledButton : null]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Mark Attendance</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  markAllButton: {
    marginLeft: 8,
    padding: 12,
    borderRadius: 5,
  },
  markAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  studentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 1,
  },
  studentInfo: {
    flex: 1,
  },
  attendanceButtons: {
    flexDirection: 'row',
  },
  attendanceButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginLeft: 8,
  },
  presentButton: {
    backgroundColor: 'green',
  },
  absentButton: {
    backgroundColor: 'red',
  },
  defaultButton: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  submitButton: {
    padding: 16,
    borderRadius: 5,
    backgroundColor: '#007bff',
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default Attendance;

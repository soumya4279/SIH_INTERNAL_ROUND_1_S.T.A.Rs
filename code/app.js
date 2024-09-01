import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';

const App = () => {
  const [alarms, setAlarms] = useState([]);
  const [alarmTime, setAlarmTime] = useState('');

  useEffect(() => {
    // Configure local notifications
    PushNotification.configure({
      onNotification: function (notification) {
        Alert.alert('Alarm Notification', 'Alarm ringing!');
        console.log('NOTIFICATION:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
    });
  }, []);

  // Add a new alarm
  const addAlarm = () => {
    if (!alarmTime) {
      Alert.alert('Error', 'Please enter a valid alarm time');
      return;
    }
    const newAlarm = { id: Date.now().toString(), time: alarmTime };
    setAlarms([...alarms, newAlarm]);
    setAlarmTime('');
    // Send the alarm to AWS IoT
    syncAlarmWithCloud(newAlarm, 'set');
    scheduleLocalNotification(alarmTime);
    Alert.alert('Success', `Alarm set for ${alarmTime}`);
  };

  // Delete an existing alarm
  const deleteAlarm = (id) => {
    const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
    setAlarms(updatedAlarms);
    Alert.alert('Alarm Deleted');
  };

  // Sync alarm data with AWS IoT
  const syncAlarmWithCloud = async (alarm, action) => {
    try {
      const response = await axios.post('YOUR_AWS_IOT_API_ENDPOINT', {
        alarmTime: alarm.time,
        action,
      });
      console.log('AWS IoT Response:', response.data);
    } catch (error) {
      console.error('Error syncing with AWS IoT:', error);
    }
  };

  // Schedule a local notification
  const scheduleLocalNotification = (time) => {
    const [hours, minutes] = time.split(':').map((num) => parseInt(num, 10));
    const date = new Date();
    date.setHours(hours, minutes, 0);

    PushNotification.localNotificationSchedule({
      message: 'Your alarm is ringing!',
      date,
      allowWhileIdle: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Alarm Clock</Text>
      <TextInput
        style={styles.input}
        placeholder="Set Alarm (HH:MM)"
        value={alarmTime}
        onChangeText={setAlarmTime}
      />
      <Button title="Add Alarm" onPress={addAlarm} />
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alarmItem}>
            <Text style={styles.alarmText}>{item.time}</Text>
            <Button title="Delete" onPress={() => deleteAlarm(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  alarmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
  },
  alarmText: {
    fontSize: 18,
  },
});

export default App;

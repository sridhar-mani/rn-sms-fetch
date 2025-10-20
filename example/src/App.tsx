import {
  Text,
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useEffect, useState } from 'react';
import { readSms, type Sms } from '../../src/index';

export default function App() {
  const [sms, setSms] = useState<Sms[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            {
              title: 'Read SMS permission',
              message:
                'This app needs access to your SMS messages for demo purposes.',
              buttonPositive: 'OK',
            }
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.warn('READ_SMS permission denied');
            setSms([]);
            return;
          }
        }

        const messages = await readSms();
        setSms(messages ?? []);
      } catch (err) {
        console.error('readSms error', err);
        setSms([]);
      }
    };

    init();
  }, []);

  return (
    <View style={styles.container}>
      {sms.map((message) => (
        <View key={message._id} style={styles.message}>
          <Text>
            From: {message.address} - {message.body}
          </Text>
          <Text style={styles.date}>
            {message.date
              ? new Date(Number(message.date)).toLocaleString()
              : ''}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginBottom: 12,
    alignItems: 'center',
  },
  date: {
    marginTop: 4,
    color: '#666',
    fontSize: 12,
  },
});

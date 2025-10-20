import { Text, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { readSms, type Sms } from '../../src/index';

export default function App() {
  const [sms, setSms] = useState<Sms[]>([]);

  useEffect(() => {
    readSms().then(setSms);
  }, []);

  return (
    <View style={styles.container}>
      {sms.map((message) => (
        <Text key={message._id}>
          From: {message.address} - {message.body}
        </Text>
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
});

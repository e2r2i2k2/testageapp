import { Stack } from "expo-router";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020ff',
    alignItems: 'center',
  },
  contentContainer: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    maxWidth: 500,
    backgroundColor: '#202020ff',
  },
  inputField: {
    alignContent: 'center',
    padding: 10,
    width: '80%',
    backgroundColor: '#e9e9e9ff',
  },
  heading: {
    color: '#7085e0ff',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 25,
    textAlign: 'center',
  },
  text: {
    color: '#e0e0e0ff',
    textAlign: 'center',
  },
  button: {
    color: '#e0e0e0ff',
    textAlign: 'center',
    backgroundColor: '#000000ff',
    padding : 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
});

export default function RootLayout() {
  return <Stack screenOptions={{ headerTitle: "TestAgeApp" }}/>;
}

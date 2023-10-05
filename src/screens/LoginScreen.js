import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../layout/AuthLayout';
import {globalStyles} from '../theme/globalStyles';
import Loader from '../components/Loader';
import useAuth from '../store/useAuth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const setUser = useAuth(state => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const userCredentials = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        const userData = await firestore()
          .collection('users')
          .doc(userCredentials.user.uid)
          .get();
        if (userData.exists) {
          AsyncStorage.setItem(
            'user',
            JSON.stringify({
              id: userData.id,
              ...userData.data(),
            }),
          );
          setUser({
            id: userData.id,
            ...userData.data(),
          });
          navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          });
        }
        console.warn('working');
      } catch (error) {
        Alert.alert(error.message);
      }
      setLoading(false);
    } else {
      Alert.alert('Please fill all the fields');
    }
  };
  return (
    <AuthLayout>
      <TextInput
        placeholder="Email"
        style={globalStyles.input}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={globalStyles.input}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={globalStyles.primaryButton} onPress={login}>
        <Text style={globalStyles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.primaryButton}
        onPress={() => navigation.navigate('Register')}>
        <Text style={globalStyles.btnText}>Register</Text>
      </TouchableOpacity>
      <Loader visible={loading} />
    </AuthLayout>
  );
};

export default LoginScreen;

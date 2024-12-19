import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = () => {
    if (!email) {
      Alert.alert('Validation Error', 'Email cannot be empty.');
      return;
    } else if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    } else if (!password) {
      Alert.alert('Validation Error', 'Password cannot be empty.');
      return;
    } else if (!validatePassword(password)) {
      Alert.alert(
        'Validation Error',
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    } else {
      navigation.navigate('OTPVerification');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Login</Text>
        <Text style={styles.logoSubText}>Please sign in to your existing account</Text>
      </View>

      <View style={styles.subContainer}>
        <View style={styles.passwordContainer}>
        <Text style={styles.headlineText} >EMAIL</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
        </View>
        
      <View style={styles.passwordContainer}>
        <Text style={styles.headlineText}>PASSWORD</Text>
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={!isPasswordVisible} // If password is visible, show text
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <Icon name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert('Forgot Password')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert('SignUp')}>
        <Text style={styles.link}>Sign Up</Text>
      </TouchableOpacity>
      </View>
  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121223',
  },
  logoContainer: {
    justifyContent:'center',
    alignItems:'center',
    marginVertical:50
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical:10
  },
  logoSubText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    backgroundColor: '#f0f5fb',
    padding: 15,
    marginBottom: 16,
    borderRadius: 10,
    width: '100%',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    marginLeft: 10,
  },
  iconText: {
    fontSize: 24,
  },
  button: {
    backgroundColor: '#ff7621',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  link: {
    color: '#ff7621',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  subContainer:{backgroundColor:'white',
  height:'100%',
  borderRadius:20,
  padding:16,
  alignItems:'center',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }], // To center the icon vertically
  },
  headlineText:{
     fontSize: 14,
     marginHorizontal:5,
     marginVertical:10,
    fontWeight: 'bold',}
});

export default Login;

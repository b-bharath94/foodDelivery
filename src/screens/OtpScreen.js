import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const OTPVerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']); // Store OTP digits
  const [currentField, setCurrentField] = useState(0); // Track the active field index
  const [countdown, setCountdown] = useState(0); // Countdown timer
  const [resendClicked, setResendClicked] = useState(false); // Track if Resend OTP was clicked
  
  // Create refs for each input field
  const inputRefs = useRef([]);

  const handleOTPChange = (text, index) => {
    const newOtp = [...otp];

    if (text.length === 1 && /^\d$/.test(text)) {
      // Allow only numeric input
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 3) {
        setCurrentField(index + 1); // Move to the next field if valid input
      }
    } else if (text.length === 0) {
      // Handle backspace
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        setCurrentField(index - 1); // Move focus to the previous field
      }
    }
  };

  const handleOTPSubmit = () => {
    const enteredOtp = otp.join(''); // Combine digits into a string

    if (enteredOtp.length < 4) {
      Alert.alert('Validation Error', 'Please enter the complete 4-digit OTP.');
      return;
    }

    if (enteredOtp === '1234') {
      Alert.alert('Success', 'OTP Verified!');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Incorrect OTP. Please try again.');
    }
  };

  const handleResendOTP = () => {
    setOtp(['', '', '', '']); // Clear existing OTP inputs
    setCurrentField(0); // Reset focus to the first field
    setCountdown(30); // Start the 30-second countdown
    setResendClicked(true); // Mark that the resend button has been clicked
    Alert.alert('OTP Sent', 'A new OTP has been sent to your registered number.');
  };

  // Effect to handle countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Focus the current input field whenever currentField changes
  useEffect(() => {
    if (inputRefs.current[currentField]) {
      inputRefs.current[currentField].focus();
    }
  }, [currentField]);

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backContainer}>
            <Text style={{textAlign:'center',fontSize:25}}>{'<'}</Text>
        </TouchableOpacity>
     <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Verification</Text>
        <Text style={styles.logoSubText}>We have sent a code to your email</Text>
      </View>
      <View style={styles.subContainer}>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => handleOTPChange(text, index)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1} // Limit input to a single character
            ref={(ref) => (inputRefs.current[index] = ref)} // Assign ref to each input
            onFocus={() => setCurrentField(index)} // Set the current field when focused
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOTPSubmit}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <View style={styles.resendContainer}>
        <TouchableOpacity onPress={handleResendOTP} disabled={countdown > 0}>
          <Text style={[styles.resendText, countdown > 0 && styles.disabledText]}>
            {resendClicked && countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
          </Text>
        </TouchableOpacity>
      </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121223'
  },
  backContainer:{margin:15,height:50,width:50,borderRadius:25,backgroundColor:'#f0f5fb',alignItems:'center',justifyContent:'center'},
  subContainer:{backgroundColor:'white',
  height:'100%',
  borderRadius:20,
  padding:16,
  alignItems:'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    width: 50,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  resendContainer: {
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
    color: '#ff7621',
  },
  disabledText: {
    color: '#999',
  },
  logoContainer: {
    justifyContent:'center',
    alignItems:'center',
    marginVertical:40
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
});

export default OTPVerificationScreen;

import { useState } from 'react';
import { Button, StyleSheet, Text, View , Pressable , Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes, isSuccessResponse, isErrorWithCode } from '@react-native-google-signin/google-signin';
import google from '../assets/google.png';
import { userStore } from '../hooks/useData';

GoogleSignin.configure({
  webClientId: '674597621459-bblur95mrcvgmqr9kq5nksevrrm75aa1.apps.googleusercontent.com', 
  offlineAccess: false, 
  iosClientId: '674597621459-68fb14vp94fendp2nbcminp463uie7lk.apps.googleusercontent.com', 
});

export default function LoginScreen() {
  const status = userStore( (state) => state.status );
  const data = userStore( (state) => state.data );
  const setUser = userStore( (state) => state.setUser );
  console.log("LoginScreen la data = ",data);

  const [nombre,setNombre] = useState('');
  const [paterno,setPaterno] = useState('');
  const [materno,setMaterno] = useState('');

  const [state,setState] = useState<any>();
  const signIn = async () => {
    console.log('signIn called');
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log("response.data: ",response.data );
        setUser( response.data );
        console.log("user vale ahora => ",setUser );
      } else {
        console.log("error....");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        console.log("catch error:",error?.code);
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log("Sign in already in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("Play Services not available");
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            console.log("User cancelled");
            break;
          default:
            console.log("DEVELOPER_ERROR (10) - Check SHA-1 and webClientId");
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
    console.log("despues del try catch: ",setUser.getState() );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Pressable style={styles.btnlogin} onPress={signIn}>
        <Image
          source={ google }
          style={styles.iconologin}
        />
        <Text style={styles.text}>Sign In with Google</Text>
      </Pressable>
    </View>
  );

}

  const styles = StyleSheet.create({
    btnlogin: {
      width: 250,
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: '#fff', 
      padding: 12,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth:1,
      borderColor:'#000'
    },
    text: {
      color: 'black',
      marginLeft: 10, 
      fontWeight: 'bold',
    },
    iconologin: {
      width: 30,
      height: 30,
    },
  })
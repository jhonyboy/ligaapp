import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from './screens/LoginScreen';
import { userStore } from './hooks/useData';
import 'react-native-gesture-handler';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  
  const status = userStore( (state) => state.status );
  console.log("App.tsx status = ",status );
  return (
        <GestureHandlerRootView style={{ flex: 1 }}>
  <BottomSheetModalProvider>
    <SafeAreaProvider>
      {status ? (
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      ) : (
        <LoginScreen />
      )}

      <StatusBar style="auto" />
    </SafeAreaProvider>
  </BottomSheetModalProvider>
</GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { View, Text , Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Leagues(){
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center",marginTop:30 }} >
                <Text>Mis ligas</Text>
            </View>
        </SafeAreaView>
    )
}
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, Pressable,Modal, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";

import { userStore } from "../hooks/useData";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import DropDownPicker from 'react-native-dropdown-picker';


export default function HomeScreen() {
  console.log("en el homescreen");
  const [estados,setEstados] = useState([]);
  const [ciudades,setCiudades] = useState([]);
  
  const dataEstados = async () => {
    console.log("dataEstados");
    const dataEstados = await fetch("http://10.0.2.2:3000/api/estado",{
      method:'get',
      headers:{
        "Content-Type": "application/json",
      },
    });
    const respEstados = await dataEstados.json();
    console.log("respuesta estados ==> ",respEstados );
  }
  useEffect(() => {
    console.log("en el useefect...");
    dataEstados();
  }, [] )

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("BottomSheet index:", index);
  }, []);

  const data = userStore((state) => state.data);

  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");

  const [foto, setFoto] = useState<any>(null);
  const [acta, setActa] = useState<any>(null);
  const [curp, setCurp] = useState<any>(null);

  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(0); 
  };

  const saveData = () => {
    console.log({ nombre, paterno, materno, foto, acta, curp });
    openSheet(); // ejemplo: abrir bottom sheet al guardar
  };

  const pickFile = async (setter: any) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
    });

    if (!result.canceled && result.assets) {
      setter(result.assets[0]);
    }
  };

  const sendData = async () => {
    const resp = await fetch("http://localhost:3000/api/perfil")
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={{ uri: data.user.photo }}
          style={{ width: 75, height: 75, borderRadius: 40 }}
        />

        <Text style={{ marginTop: 10 }}>{data.user.email}</Text>

        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />

        <TextInput
          placeholder="Paterno"
          value={paterno}
          onChangeText={setPaterno}
          style={styles.input}
        />

        <TextInput
          placeholder="Materno"
          value={materno}
          onChangeText={setMaterno}
          style={styles.input}
        />

        <View style={{ padding: 20, width:290 }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select a fruit"
            searchable={true} 
            listMode="SCROLLVIEW" 
          />
        </View>

        <Pressable
          onPress={() => pickFile(setFoto)}
          style={styles.button}
        >
          <Text style={styles.btnText}>Foto</Text>
        </Pressable>
        {foto && <Text>📎 {foto.name}</Text>}

        <Pressable
          onPress={() => pickFile(setActa)}
          style={styles.button}
        >
          <Text style={styles.btnText}>Acta</Text>
        </Pressable>
        {acta && <Text>📎 {acta.name}</Text>}

        <Pressable
          onPress={() => pickFile(setCurp)}
          style={styles.button}
        >
          <Text style={styles.btnText}>CURP</Text>
        </Pressable>
        {curp && <Text>📎 {curp.name}</Text>}

        <Pressable onPress={saveData} style={styles.saveBtn}>
          <Text style={{ color: "white", fontWeight: "bold", display:'none' }}>
            Guardar
          </Text>
        </Pressable>

        <Pressable onPress={openSheet} style={styles.openSheetBtn}>
          <Text style={{ color: "white" }}>Abrir Bottom Sheet</Text>
        </Pressable>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1} 
          snapPoints={snapPoints}
          enablePanDownToClose
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.sheetContent}>
            <Text style={{ fontSize: 18 }}>🚀 Bottom Sheet Activo</Text>
          </BottomSheetView>
        </BottomSheet>

        <View  >
      

      <TouchableOpacity style={{ backgroundColor:'green' , width:250 , borderRadius:10 , height:50 , marginTop:20 }} onPress={() => setModalVisible(true)} >
        <Text style={{ color:'white' , fontSize:16 , fontWeight:600 , textAlign:'center' , marginTop:'auto' , marginBottom:'auto' }} >Guardar</Text>  
      </TouchableOpacity>

      <Modal
        animationType="slide" 
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Guardar</Text>
            <Text style={styles.modalText}>
              Guardar datos de perfil
            </Text>
            
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => setModalVisible(true) }
            >
              <Text style={{ color:'white' , fontSize:16 , fontWeight:600 }} >Aceptar</Text>  
            </TouchableOpacity>
            <TouchableOpacity
              style={ styles.closeButton }
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color:'white' , fontSize:16 , fontWeight:600 }} >Cancelar</Text>  
            </TouchableOpacity>
          </View>
          
        </View>
      </Modal>
    </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    marginTop: 15,
    borderRadius: 8,
    width: 250,
    marginBottom:20,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "600",
  },
  saveBtn: {
    backgroundColor: "green",
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
    width: 250,
    alignItems: "center",
    display:'none'
  },
  openSheetBtn: {
    backgroundColor: "black",
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
    display:"none"
  },
  sheetContent: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
   modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  acceptButton: {
    fontWeight:600,
    fontSize:16,
    backgroundColor: 'green',
    color:'brown',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom:10
  },
  closeButton: {
    fontWeight:600,
    fontSize:16,
    backgroundColor: 'red',
    color:'red',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom:10
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Camera} from 'expo-camera';
export default function App() {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState('')
  let camera: Camera;
  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }
  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true)
    }
    else {
      Alert.alert("Access Denied")
    }

  }


  return (
    
    <View style={styles.container}>
    {startCamera?
     <Camera style={styles.cam} ref={(r) => {camera = r}}>
      <View style={styles.innerCam} >
        <View style={styles.closeBtn}> 
          <View style={styles.innerClose}>
          <TouchableOpacity style={styles.closeTouch} onPress={__takePicture}/>
          </View>
        </View>
      </View>
     </Camera>
     :
      <View syle={styles.view1}>
      <TouchableOpacity onPress={__startCamera} style={styles.touchable}> 
      {/* a button */}
      <Text style={styles.touchText}>Take A Picture</Text>
      </TouchableOpacity>
      </View>
    
    }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view1: {
    flex: 1,
     backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchable: {
    width: 130,
    borderRadius: 4,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  touchText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cam: {
    flex: 1,
    width: '100%',
  },
  innerCam: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  closeBtn: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  innerClose: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  closeTouch: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff'
  },
});

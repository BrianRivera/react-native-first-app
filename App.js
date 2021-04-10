import React, { useState } from 'react'
import { 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  Button, 
  TouchableOpacity, 
  Alert, 
  Platform  }  from 'react-native'
import Diamond from './assets/diamond.png'
import * as ImagePicker from 'expo-image-picker'
import * as Scharing from 'expo-sharing'
import uploadToAnonymousFilesAsync from 'anonymous-files'

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null)
  const openImagePickerAsync = async() => {
    const permissonResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(!permissonResult.granted) return alert('Permission to acces camera is required')
    
    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    if(pickerResult.cancelled) return
    
    if (Platform.OS === 'web') {
      const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri)
      setSelectedImage({localUri:pickerResult.uri, remoteUri})

    }else{
      setSelectedImage({localUri:pickerResult.uri})
    }
  }
  
  const openShareDialog = async() => {
    console.log(await Scharing.isAvailableAsync());
    if(Platform.OS === 'web') 
    return alert(`The image is available form sharing at: ${selectedImage.remoteUri}`)
    
    await Scharing.shareAsync(selectedImage.localUri)
  }
  

  return (
  <View style={styles.container}>
  <Text style={styles.title}>Pick image</Text>
  <TouchableOpacity
  onPress={openImagePickerAsync}
  >
  <Image
  source={{uri: !selectedImage 
    ? 'https://picsum.photos/200/300' 
    : selectedImage.localUri}}
  style={styles.image}
  />
  </TouchableOpacity>
  {/* <Image 
  source={Diamond}
  style={styles.image}
  /> */}
  {/* <Button 
  color="red"
  title="Press me"
  onPress={()=>Alert.alert('Hellow')}
  /> */}
    {/* <TouchableOpacity
    onPress={()=>Alert.alert('Hellow')}
    style={styles.button}
    >
      <Text style={styles.buttonText}>Press me</Text>
    </TouchableOpacity> */}
{
  selectedImage && 
  <TouchableOpacity
    onPress={openShareDialog}
    style={styles.button}
  >
    <Text style={styles.buttonText}>Share this image</Text>
  </TouchableOpacity>
}
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#292929"
  },
  title: {
    fontSize: 30,
    color: "#fff"},
  image: {
    height: 200,
    width:200,
    borderRadius: 100,
  },
  button: {
    backgroundColor: 'deepskyblue',
    padding: 7,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 17
  }
})

export default App

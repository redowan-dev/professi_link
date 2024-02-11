import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, View } from 'react-native';
import {WebView} from 'react-native-webview'


export default function App() {




const appUrl = 'https://professilink1.web.app'
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
       style={{width:'100%',height:'100%'}}
       >
        <WebView
                source={{ uri: appUrl }}
                onLoad={console.log('loaded')}
        />

        
      </View>
      {/* <View style={styles.btn}>
      <BackButtonComponent />
      
    </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30
  },

});

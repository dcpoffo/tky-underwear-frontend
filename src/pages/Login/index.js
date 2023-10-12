import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>Login</Text>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '40%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  }
})

export default Login
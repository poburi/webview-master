import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import WebView from 'react-native-webview';
import { BackHandler } from 'react-native';
import RNExitApp from 'react-native-exit-app';

const Root = () => {
  const webviewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const onAndroidBackPress = () => {
    if (webviewRef.current && canGoBack) {
      webviewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }

    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
  }, []);

  return (
    <WebView
      ref={webviewRef}
      source={{ uri: 'http://poburi.github.io/' }}
      onNavigationStateChange={(state) => {
        setCanGoBack(state.canGoBack);
      }}
    />
  );
};

export default Root;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
};

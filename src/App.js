import * as React from "react";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import moment from "moment";
// import messaging from "@react-native-firebase/messaging";

import { persistor, store } from "./stores/configureStore";
import AppNavigator from "./navigation/index";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import LoadingProvider from "./providers/loadingProvider";

import "moment/locale/ja";
moment.locale("ja");

const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

const App = () => {
  const [state, setState] = React.useState({
    appIsReady: false,
  });
  const [fontLoader, setFontLoader] = React.useState(true);

  React.useEffect(() => {
    async () => {
      try {
        prepareResources();
        await SplashScreen.preventAutoHideAsync();

        // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        //   console.log("FCM Message Data:", remoteMessage.data);
          // Update a users messages list using AsyncStorage
          // const currentMessages = await AsyncStorage.getItem('messages');
          // const messageArray = JSON.parse(currentMessages);
          // messageArray.push(remoteMessage.data);
          // await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
        // });

        return unsubscribe;
      } catch (e) {
        console.warn(e);
      }
    };
  }, []);

  const useMount = (func) => React.useEffect(() => func(), []);

  const useInitialURL = () => {
    const [url, setUrl] = React.useState(null);
    const [processing, setProcessing] = React.useState(true);

    useMount(() => {
      const getUrlAsync = async () => {
        // Get the deep link used to open the app
        const initialUrl = await Linking.parseInitialURLAsync();

        // The setTimeout is just for testing purpose
        setTimeout(() => {
          setUrl(initialUrl);
          setProcessing(false);
        }, 1000);
      };

      getUrlAsync();
    });

    return { url, processing };
  };

  const { url: initialUrl, processing } = useInitialURL();

  const prepareResources = async () => {
    // await performAPICalls();
    // await downloadAssets();

    setState({ appIsReady: true }, async () => {
      await SplashScreen.hideAsync();
    });
  };

  if (fontLoader && !state.appIsReady) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoader(false)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LoadingProvider>
          <AppNavigator />
        </LoadingProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

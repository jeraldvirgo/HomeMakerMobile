import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./app/auth/LoginScreen";
import { OtpScreen } from "./app/auth/OtpScreen";
import { ProfileScreen } from "./app/auth/ProfileScreen";
import { OrderScreen } from "./app/buyer/OrderScreen";
import { ProductDetailsScreen } from "./app/buyer/ProductDetailsScreen";
import { ProductListScreen } from "./app/buyer/ProductListScreen";
import { OrderHistoryScreen } from "./app/buyer/OrderHistoryScreen";
import { SplashScreen } from "./app/SplashScreen";
import { CustomProfileImage } from "./components/CustomAppImage";
import * as React from "react";
import {
  DeviceEventEmitter,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getApplicationInfo,
  storeApplicationInfo,
  deleteApplicationInfo,
} from "./constants/StoreInfo";
import { SellerOrdersScreen } from "./app/seller/SellerOrdersScreen";
import { SellerMenuScreen } from "./app/seller/SellerMenuScreen";
import { SellerInsightsScreen } from "./app/seller/SellerInsightsScreen";
import { CreateProductScreen } from "./app/seller/CreateProductScreen";
import { CameraViewScreen } from "./app/seller/CameraViewScreen";
import { IMAGES } from "./constants/Images";
import { COLORS } from "./constants/Colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getUserToken = async (setIsLoading) => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  try {
    await sleep(1000);
  } finally {
    console.log("Closing Splash Screen");
    setIsLoading(false);
  }
};

function onInfoClick() {
  navigation.navigate("OrderHistoryScreen");
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    const isLoggedIn = async (setLogin) => {
      try {
        // await deleteApplicationInfo("isLogin");
        let isLogin = await getApplicationInfo("isLogin");
        console.debug("First Launch Flow : ", isLogin);
        isLogin == null ? setLogin(false) : setLogin(true);
      } catch (error) {
        console.error("Error from AsyncStorage", error);
      }
    };
    isLoggedIn(setLogin);
    getUserToken(setIsLoading);

    DeviceEventEmitter.addListener("event.login", (eventData) => {
      console.debug("Event event.login", eventData);
      setLogin(true);
      let updateFirstLogin = async () => {
        await storeApplicationInfo("isLogin", eventData);
      };
      updateFirstLogin();
    });
  }, []);

  const TabNavigator = () => {
    return (
      <Tab.Navigator initialRouteName={SellerOrdersScreen}>
        <Tab.Screen
          name="SellersOrderScreen"
          component={SellerOrdersScreen}
          options={{
            title: "Current Orders",
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/orders.png")}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: focused ? COLORS.BUTTON : COLORS.TEXTBOX_BORDER,
                }}
              />
            ),
            tabBarActiveTintColor: COLORS.BUTTON,
            tabBarInactiveTintColor: COLORS.TEXTBOX_BORDER,
          }}
        />
        <Tab.Screen
          name="SellerMenuScreen"
          component={SellerMenuScreen}
          options={{
            title: "Menu",
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/menu.png")}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: focused ? COLORS.BUTTON : COLORS.TEXTBOX_BORDER,
                }}
              />
            ),
            tabBarActiveTintColor: COLORS.BUTTON,
            tabBarInactiveTintColor: COLORS.TEXTBOX_BORDER,
          }}
        />
        <Tab.Screen
          name="InsightsScreen"
          component={SellerInsightsScreen}
          options={{
            title: "Insights",
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/insights.png")}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: focused ? COLORS.BUTTON : COLORS.TEXTBOX_BORDER,
                }}
              />
            ),
            tabBarActiveTintColor: COLORS.BUTTON,
            tabBarInactiveTintColor: COLORS.TEXTBOX_BORDER,
          }}
        />
      </Tab.Navigator>
    );
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {login ? (
          <>
            <Stack.Screen
              name="Resturants"
              component={ProductListScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity
                    // onPress={() => navigation.navigate("Profile Info")}
                    onPress={() => navigation.navigate("SellersOrderScreen")}
                  >
                    <CustomProfileImage></CustomProfileImage>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="Food" component={ProductDetailsScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen
              name="ProductDetailsScreen"
              component={ProductDetailsScreen}
            />
            {/* <Stack.Screen
              name="ProductListScreen"
              component={ProductListScreen}
            /> */}
            <Stack.Screen name="Profile Info" component={OrderHistoryScreen} />
            <Stack.Screen
              name="CameraViewScreen"
              component={CameraViewScreen}
            />
            <Stack.Screen
              name="SellersOrderScreen"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTP" component={OtpScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

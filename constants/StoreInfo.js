import AsyncStorage from "@react-native-async-storage/async-storage";
export async function storeApplicationInfo(key, value) {
  if (value != null || value != undefined) {
    await AsyncStorage.setItem(key, value);
    console.debug(`Store Application Info >> ${key}:${value} `);
  }
}

export async function getApplicationInfo(key) {
  let value = await AsyncStorage.getItem(key);
  console.debug(`Returning Application Info >> ${key}:${value} `);
  return value;
}

export async function deleteApplicationInfo(key) {
  let value = await AsyncStorage.removeItem(key);
  console.debug(`Removing item >> ${key}:${value} `);
  return value;
}

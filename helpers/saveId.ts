import AsyncStorage from "@react-native-community/async-storage";

export const saveId = async (id) => {
  try {
    await AsyncStorage.clear(async (err) => {
      try {
        await AsyncStorage.setItem('@id', id);
      }
      catch (e) {
        console.log(e);
      }
    })
  } catch (e) {
    console.log(e);
  }
}
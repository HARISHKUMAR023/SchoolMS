import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
const AuthLayout = () => {


  return (
    <>
      <Stack>
        <Stack.Screen
          name="signin"
          options={{
            headerShown: false,
          }}
        />
        </Stack>
        

    </>
  );
};

export default AuthLayout;
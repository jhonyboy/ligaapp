import React from "react";
import { Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { supabase } from "../supabase";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUri,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.log("Error login:", error.message);
      return;
    }

    // abrir navegador
    if (data?.url) {
      await WebBrowser.openAuthSessionAsync(data.url, redirectUri);
    }
  };

  return <Button title="Login con Google" onPress={loginWithGoogle} />;
}
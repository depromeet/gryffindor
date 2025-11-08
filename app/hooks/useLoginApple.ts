import type { BridgeMessage, BridgeQuery } from "@bridge";
import * as AppleAuthentication from "expo-apple-authentication";

export const useLoginApple = (
  onResponse: <T extends BridgeQuery>(result: BridgeMessage<T>) => void,
) => {
  const loginApple = async () => {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (!credential.identityToken) {
      throw new Error("Apple identityToken을 받지 못했습니다");
    }

    //note: 카카오는 code를 전달하지만, Apple은 identityToken (JWT)을 전달
    onResponse({
      loginApple: {
        token: credential.identityToken,
        success: true,
      },
    });
  };

  return {
    loginApple,
  };
};

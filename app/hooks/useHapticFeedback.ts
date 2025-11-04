import * as Haptics from "expo-haptics";
import type { BridgeMessage, BridgeQuery } from "@bridge";

export const useHapticFeedback = (
  onResponse: <T extends BridgeQuery>(result: BridgeMessage<T>) => void
) => {
  const triggerHapticFeedback = async () => {
    try {
      // iOS와 Android 모두 지원하는 경량 햅틱 피드백
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      onResponse({
        triggerHapticFeedback: {
          success: true,
        },
      });
    } catch (error) {
      console.error("Haptic feedback error:", error);
      onResponse({
        triggerHapticFeedback: {
          success: false,
        },
      });
    }
  };

  return {
    triggerHapticFeedback,
  };
};

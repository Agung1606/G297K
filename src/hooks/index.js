import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

export const scrollableView = () => {
  const translateY = useSharedValue(0);
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (
        lastContentOffset.value > event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 0;
      } else if (
        lastContentOffset.value < event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = -100;
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
      isScrolling.value = true;
    },
    onEndDrag: (e) => {
      isScrolling.value = false;
    },
  });

  const actionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 750,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  return { scrollHandler, actionStyle };
};

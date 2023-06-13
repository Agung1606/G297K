import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Keyboard } from "react-native";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";

export const loggedInUser = () => {
  const data = useSelector((state) => state.global.user);

  return { data };
};

export const scrollToTopConfig = ({ kind }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const reference = useRef(null);
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 0);
  };
  const scrollToTop = () => {
    if (kind === "FlatList") {
      reference.current.scrollToOffset({ offset: 0, animated: true });
    } else {
      reference.current.scrollToLocation({ sectionIndex: 0, itemIndex: 0 });
    }
  };

  return { isScrolled, reference, handleScroll, scrollToTop };
};

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

export const modalPopupConfig = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isModalOpen, openModal, closeModal };
};

export const bottomModalConfig = (points) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => points, []);
  const openModal = () => bottomSheetModalRef.current.present();
  const closeModal = () => bottomSheetModalRef.current.dismiss();

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return {
    bottomSheetModalRef,
    snapPoints,
    openModal,
    closeModal,
    renderBackdrop,
  };
};

// import {
//   useSharedValue,
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   withTiming,
//   Easing,
// } from "react-native-reanimated";

// export const scrollableView = () => {
//   const translateY = useSharedValue(0);
//   const lastContentOffset = useSharedValue(0);
//   const isScrolling = useSharedValue(false);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       if (
//         lastContentOffset.value > event.contentOffset.y &&
//         isScrolling.value
//       ) {
//         translateY.value = 0;
//       } else if (
//         lastContentOffset.value < event.contentOffset.y &&
//         isScrolling.value
//       ) {
//         translateY.value = -100;
//       }
//       lastContentOffset.value = event.contentOffset.y;
//     },
//     onBeginDrag: (e) => {
//       isScrolling.value = true;
//     },
//     onEndDrag: (e) => {
//       isScrolling.value = false;
//     },
//   });

//   const actionStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateY: withTiming(translateY.value, {
//             duration: 750,
//             easing: Easing.inOut(Easing.ease),
//           }),
//         },
//       ],
//     };
//   });

//   return { scrollHandler, actionStyle };
// };

import { useState, useRef, useMemo, useCallback } from "react";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import useKeyboardVisible from "./useKeyboardVisible";
import useScrollToTop from "./useScrollToTop";
import useModalPopup from "./useModalPopup";

export {
  useKeyboardVisible,
  useScrollToTop,
  useModalPopup
}

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

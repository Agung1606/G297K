import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";

const useBottomModal = ({ points }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => points, []);

  const openBottomModal = () => bottomSheetModalRef.current.present();
  const closeBottomModal = () => bottomSheetModalRef.current.dismiss();

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

  return [
    bottomSheetModalRef,
    snapPoints,
    openBottomModal,
    closeBottomModal,
    renderBackdrop,
  ];
};

export default useBottomModal;

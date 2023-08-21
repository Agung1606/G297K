import { useState, useRef } from "react";

const useScrollToTop = (kind) => {
  const [isScroll, setIsScroll] = useState(false);
  const referenceScroll = useRef(null);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScroll(offsetY > 0);
  };
  const scrollToTop = () => {
    if (kind === "FlatList") {
      referenceScroll.current.scrollToOffset({ offset: 0, animated: true });
    } else {
      referenceScroll.current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
      });
    }
  };

  return [isScroll, referenceScroll, handleScroll, scrollToTop];
};


export default useScrollToTop;
import { useState, useEffect, useRef } from "react";

const LazyImage = (props: any) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (!shouldLoad && placeholderRef.current) {
      const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
        if (intersectionRatio > 0) {
          setShouldLoad(true);
        }
      });
      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }
  }, [shouldLoad, placeholderRef]);

  return shouldLoad ? (
    <img {...props} />
  ) : (
    <div
      className="content-['Placeholder!'] w-[400px] h-[300px] border bg-gray-500"
      ref={placeholderRef}
    />
  );
};
export default LazyImage;

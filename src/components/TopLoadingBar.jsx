import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TopLoadingBar = () => {
  const globalLoading = useSelector((state) => state.ui?.globalLoading);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(false), 250);
    return () => clearTimeout(t);
  }, [globalLoading]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[999999] h-[3px]">
      <div
        className={`h-full w-full origin-left ${
          globalLoading ? "animate-loadingbar" : ""
        } bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500`}
      />
    </div>
  );
};

export default TopLoadingBar;


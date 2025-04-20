import React, { ReactNode, useEffect, useState } from "react";

type ResumePreviewPropsProps = {
  children: ReactNode;
};

const ResumeLayout: React.FC<ResumePreviewPropsProps> = ({ children }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function handleResize() {
      const screenWidth = Math.min(window.innerWidth - 40, 500);
      const maxWidth = 794;
      const newScale = Math.min(1, screenWidth / maxWidth);
      setScale(newScale);
    }

    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-start overflow-hidden p-0 m-0 max-h-[500px] sm:max-h-[750px]">
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top",
          width: `${794}px`,
          height: `${1123}px`,
        }}
      >
        <div className="bg-white shadow p-10 w-[794px] h-[1123px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResumeLayout;

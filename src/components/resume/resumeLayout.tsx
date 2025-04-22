import  { forwardRef, ReactNode, useEffect, useState } from "react";

type ResumePreviewPropsProps = {
  children: ReactNode;
  maxWidth?: number;
};

const ResumeLayout = forwardRef<HTMLDivElement, ResumePreviewPropsProps>(
  ({ maxWidth, children }, ref) => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
      const maxPageWidth = 794;
      function calculateScale(mw?: number) {
        const screenWidth =Math.min(window.innerWidth - 40, mw || 600);
        const newScale = Math.min(1, screenWidth / maxPageWidth);
        setScale(newScale);
      }

      const handleResize = () => calculateScale(maxWidth);

      handleResize(); // set on mount
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, [maxWidth]);

    return (
      <div
        ref={ref}
        className="w-full h-full flex justify-center items-start overflow-hidden p-0 m-0 max-h-[500px] sm:max-h-[750px]"
      >
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
  }
);

export default ResumeLayout;

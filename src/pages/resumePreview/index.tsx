import ResumePreview from "@/components/resume/resumePreview";
import { Button } from "@/components/ui/button";
import { resumeStore } from "@/store/resume";
import { User } from "@/types";
import jsPDF from "jspdf";
import { DownloadIcon, PencilIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DomToImage from "dom-to-image";

type EditSection = {
  path: string;
  label: string;
};
const editSections: EditSection[] = [
  { label: "Personal Information", path: "personal" },
  { label: "Education", path: "education" },
  { label: "Work Experience", path: "work" },
  { label: "Skills", path: "skills" },
  { label: "Other Section", path: "other" },
];
const ResumePreviewPage = () => {
  const { id } = useParams();
  const resumes = resumeStore((state) => state.resumes);

  const [data, setData] = useState<User | null>(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    const numericId = parseInt(id);
    const result = resumes.find((r) => r.id === numericId);
    if (result) {
      setData(result.data);
    }
  }, [id, resumes]);

  const componentRef = useRef<HTMLDivElement>(null);
  const handleExport = async () => {
    const element = componentRef.current;
    if (!element) return;

    try {
      const dataUrl = await DomToImage.toPng(element);
      const pdf = new jsPDF("portrait", "px", [794, 1123]);
      pdf.addImage(dataUrl, "JPEG", 0, 0, 794, 1123);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("PDF export failed", error);
    }
  };

  return (
    <>
      {data && (
        <div className="flex flex-col sm:flex-row gap-y-8 gap-x-4">
          <ResumePreview user={data} maxWidth={600} /> {/* Visible */}
          <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
            <ResumePreview user={data} maxWidth={794} ref={componentRef} />{" "}
            {/* Hidden full-scale version */}
          </div>
          <div className="bg-white px-8 py-8 w-full sm:max-w-[400px] flex flex-col gap-y-8 max-h-[500px] shadow-lg rounded-2xl">
            <div className="flex justify-between">
              <p className="text-center text-xl sm:text-xl font-bold text-gray-700">
                Edit info
              </p>
              <div className="flex gap-x-2 items-center">
                <p className="text-sm text-gray-700">Download</p>
                <Button
                  variant={"outline"}
                  className="px-0 py-0"
                  onClick={handleExport}
                >
                  <DownloadIcon className="w-6 h-6" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-y-6">
              {editSections.map((section, index) => (
                <div
                  key={index}
                  className="flex justify-between px-4  sm:px-6 py-1 items-center border border-gray-400 rounded-2xl"
                >
                  <p className="text-sm text-gray-700 text-center justify-center">
                    {section.label}
                  </p>
                  <Link
                    to={`/builder?id=${id}&isEdit=true&editForm=${section.path}`}
                    className="px-2 py-2 border-none shadow-none"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumePreviewPage;

import ResumePreview from "@/components/resume/resumePreview";
import { Button } from "@/components/ui/button";
import { resumeStore } from "@/store/resume";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const resumes = resumeStore((state) => state.resumes);
  const addResume = resumeStore((state) => state.addResume);
  const deleteResume = resumeStore((state) => state.deleteResume);
  const navigate = useNavigate();

  const handleCreateNewResume = () => {
    const resumeId = Date.now();
    const resumeData = {
      fullName: "",
      education: [
        {
          id: Date.now(),
          collage: "",
          course: "",
          fromDate: "",
          toDate: "",
          qualification: "",
        },
      ],
      email: "",
      about: "",
      address: "",
      skills: [],
      workExperience: [],
      otherSections: [],
    };

    addResume({
      id: resumeId,
      data: resumeData,
    });

    navigate(`/builder?id=${resumeId}`);
  };

  const handleEditResume = (id: number) => {
    navigate(`/preview/${id}`);
  };

  const handleDeleteResume = (id: number) => {
    deleteResume(id);
  };

  return (
    <div className="flex flex-col w-full sm:min-h-[800px] h-auto  items-center">
      <div className="flex flex-col gap-y-8 justify-center items-center">
        {resumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            {resumes.map((r) => (
              <div
                key={r.id}
                className="w-[300px] max-h-[500px] flex flex-col px-2 py-2 gap-y-4 bg-gray-100 shadow-lg"
              >
                <ResumePreview user={r.data} maxWidth={300} 
                
                />
                <div className="flex justify-between">
                  <Button
                    variant={"outline"}
                    onClick={() => handleEditResume(r.id)}
                  >
                    <PencilIcon className="w-6 h-6" />
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => handleDeleteResume(r.id)}
                  >
                    <TrashIcon className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="w-[300px] max-h-[500px] flex flex-col justify-center items-center bg-white px-4 py-4 shadow-lg">
              <button
                className="border-none shadow-none w-[40px] h-[40px] cursor-pointer"
                onClick={() => handleCreateNewResume()}
              >
                <PlusCircleIcon
                  className="w-12 h-12 font-light"
                  strokeWidth={0.5}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center gap-y-4">
            <p className="text-xl sm:text-4xl font-bold text-gray-600">
              You haven't Created Resume yet
            </p>
            <div className="w-[300px] h-[500px] flex flex-col justify-center items-center bg-white px-4 py-4 shadow-lg">
              <button
                className="border-none shadow-none w-[40px] h-[40px] cursor-pointer "
                onClick={() => handleCreateNewResume()}
              >
                <PlusCircleIcon
                  className="w-12 h-12 font-light"
                  strokeWidth={0.5}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;

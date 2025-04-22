import BuilderForm from "@/components/builder/form";
import { resumeStore } from "@/store/resume";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const editFormList: string[] = [
  "personal",
  "education",
  "work",
  "skills",
  "other",
];

function useQueryParams() {
  const { search } = useLocation(); // Use location.search to get query string

  return new URLSearchParams(search);
}
const BuilderPage = () => {
  const queryParams = useQueryParams();

  const isEditForm = queryParams.get("isEdit") === "true";
  const editForm = queryParams.get("editForm");
  const id = queryParams.get("id");

  const [stage, setStage] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const addResume = resumeStore((state) => state.addResume);
  const resumes = resumeStore((state) => state.resumes);
  const [data, setData] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    if (!isEditForm) {
      setStage(0);
      setLoading(false);
      const numericId = parseInt(id);
      const result = resumes.find((r) => r.id === numericId);
      if (!result) {
        navigate("/");
        return;
      }
      setData(result.data);
      return;
    }
    setIsEdit(true);
    const numericId = parseInt(id);
    const result = resumes.find((r) => r.id === numericId);
    if (!result) {
      navigate("/");
      return;
    }
    setData(result.data);

    const index = editFormList.indexOf(editForm || "profile");
    if (!index) {
      setStage(0);
    }
    setStage(index);
    setLoading(false);
  }, [editForm, isEditForm, addResume, id, navigate, resumes]);

  const numericId = parseInt(id || "0");
  return (
    <div className="w-full h-auto px-4 py-4 sm:px-8 sm:py-8 sm:shadow-lg sm:max-w-[700px] mx-auto border border-gray-200 rounded-md bg-white">
      {/* Form */}
      {!loading && data && id &&  (
        <BuilderForm
          currentStage={stage}
          isEdit={isEdit}
          data={data}
          resumeId={numericId}
        />
      )}
    </div>
  );
};

export default BuilderPage;

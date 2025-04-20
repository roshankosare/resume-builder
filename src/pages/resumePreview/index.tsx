import ResumePreview from "@/components/resume/resumePreview";
import { userStore } from "@/store/user";

const ResumePreviewPage = () => {
  const user = userStore((state) => state.user);
  console.log(user);
  return (
    <div className="grid gird-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">
      <ResumePreview user={user} />
      <div className="bg-white px-4 py-4">
        <p className="text-center text-xl sm:text-2xl font-bold">Edit info</p>
      </div>
    </div>
  );
};

export default ResumePreviewPage;

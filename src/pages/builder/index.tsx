import BuilderForm from "@/components/builder/form";

const BuilderPage = () => {
  return (
    <div className="w-full h-auto px-4 py-4 sm:px-8 sm:py-8 sm:shadow-lg sm:max-w-[700px] mx-auto border border-gray-200 rounded-md bg-white">
      {/* Form */}
      <BuilderForm />
    </div>
  );
};

export default BuilderPage;

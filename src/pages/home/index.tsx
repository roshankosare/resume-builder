import { Button } from "@/components/ui/button";
import r2 from "@/assets/resumeclipart2.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col py-20">
      <div className="w-full grid  grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col w-full px-8">
          <img
            className="w-full shadow-lg rounded-lg translate-x-2"
            src={r2}
            alt="Resume 1"
          />
        </div>
        <div className="flex flex-col gap-y-6 w-full">
          <p className="text-3xl sm:text-6xl font-bold text-sky-600">
            Build Your Resume in Minutes
          </p>
          <p className="text-md sm:text-lg text-gray-700">
            Create a polished, professional resume effortlessly with our
            easy-to-use resume builder. Choose from modern templates, customize
            every section, and download your resume instantly—no design skills
            needed.
          </p>
          <Link to={"/dashboard"}>
            <Button
              size={"lg"}
              className="px-6 py-4 font-semibold bg-sky-600 hover:bg-sky-500 max-w-[200px] text-md transition-all duration-300 ease-in-out mx-auto"
            >
              Create For Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

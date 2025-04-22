import GitHubIcon from "@/icons/github";
import LinkedInIcon from "@/icons/linkedin";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

type SocialLinks = {
  id: number;
  path: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
};
const mySocialLinks: SocialLinks[] = [
  {
    id: 1,
    path: "",
    icon: GitHubIcon,
    label: "GitHub",
  },
  {
    id: 2,
    path: "",
    icon: LinkedInIcon,
    label: "Linkedin",
  },
  //   {
  //     id: 2,
  //     path: "",
  //     icon: LinkIcon,
  //     label: "Linkedin",
  //   },
];

const Header = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setMobile(true);
        return;
      }
      setMobile(false);
    };
    if (window.innerWidth < 400) {
      setMobile(true);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  const onMenuClick = () => {
    setShowMobileNav((pre) => !pre);
  };
  return (
    <div className="w-full px-2 py-2 sm:px-5 lg:px-12  sm:py-5 backdrop-blur-lg sticky z-50 top-0  flex flex-col gap-y-2 ">
      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-x-20">
          <h1 className="sm:text-4xl text-2xl font-bold text-sky-600">
            Resume Builder
          </h1>
          {!mobile && (
            <div className="flex w-full sm:w-auto h-auto row gap-x-20 self-end items-end mx-auto">
              <Link className="text-gray-700 font-bold" to={"/"}>Home</Link>
              <Link className="text-gray-700 font-bold" to={"/dashboard"}>My Resumes</Link>
            </div>
          )}
        </div>

        <div className="flex flex-row items-end self-end  gap-x-4 sm:gap-x-6">
          {!mobile &&
            mySocialLinks.map((link) => (
              <a className="" href={link.path} key={link.id}>
                {
                  <link.icon
                    className=" w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
                    strokeWidth={1}
                    stroke={"currentColor"}
                  ></link.icon>
                }
              </a>
            ))}

          {mobile && (
            <Button
              variant={"outline"}
              className="bg-transparent border-none shadow-none"
              onClick={() => onMenuClick()}
            >
              <MenuIcon />
            </Button>
          )}
        </div>
      </div>
      {showMobileNav && (
        <div className="w-full h-auto bg-white px-4 py-4 shadow-md rounded-lg">
          <div className="flex w-full  flex-col gap-y-4">
            <Link to={"/"}>Home</Link>
            <Link to={"/dashboard"}>My Resumes</Link>
            <div className=" flex flex-row gap-x-4 ">
              {mySocialLinks.map((link) => (
                <a className="" href={link.path} key={link.id}>
                  {
                    <link.icon
                      className=" w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
                      strokeWidth={1}
                      stroke={"currentColor"}
                    ></link.icon>
                  }
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

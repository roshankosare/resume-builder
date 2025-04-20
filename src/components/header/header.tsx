import GitHubIcon from "@/icons/github";
import LinkedInIcon from "@/icons/linkedin";

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
  return (
    <div className="w-full px-2 py-2 sm:px-5 lg:px-12  sm:py-5 backdrop-blur-lg sticky z-50 top-0  flex flex-row justify-between items-center">
      <h1 className="sm:text-4xl text-2xl font-bold text-sky-600">
        Resume Builder
      </h1>

      <div className="flex flex-row justify-center  gap-x-4 sm:gap-x-6">
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
  );
};

export default Header;

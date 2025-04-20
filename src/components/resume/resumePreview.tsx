import { User } from "@/types";
import React from "react";
import ResumeLayout from "./resumeLayout";

type ResumePreviewProps = {
  user: User;
};

const Separator = () => <div className="w-full h-[6px] bg-blue-800"></div>;

const ResumePreview: React.FC<ResumePreviewProps> = ({ user }) => {
  return (
    <ResumeLayout>
      <div className="flex flex-col w-full h-full gap-y-6">
        <div className="flex flex-col gap-y-4">
          <div className="h-[60px] font-bold justify-center items-center text-4xl text-black text-center">
            {user.fullName}
          </div>
          <div className="flex flex-row justify-end gap-x-4">
            <p className="text-sm">{user.address}</p>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
        <Separator />
        {user.about && (
          <>
            <div className="flex flex-col gap-y-4">
              <div className="text-sm text-justify">{user.about}</div>
            </div>
            <Separator />
          </>
        )}

        <div className="flex flex-col gap-y-4">
          <p className="font-bold text-xl">Education</p>
          {
            <ul className="list-disc list-inside ml-8 space-y-4">
              {user.education.map((edu) => (
                <li key={edu.id}>
                  <span className="font-bold text-sm">{edu.qualification}</span>
                  {" | "}
                  <span className=" text-sm">{edu.collage}</span>
                  {" | "}
                  <span className="font-bold text-sm">{`${edu.fromDate.slice(
                    0,
                    4
                  )} - ${edu.toDate.slice(0, 4)}`}</span>
                </li>
              ))}
            </ul>
          }
        </div>
        <Separator />
        {user.skills.length > 0 && (
          <>
            <div className="flex flex-col gap-y-4">
              <p className="font-bold text-xl">Skills</p>
              {
                <ul className=" list-disc grid grid-cols-3 gap-y-2">
                  {user.skills.map((skill) => (
                    <li key={skill.id} className="text-sm">
                      {skill.value}
                    </li>
                  ))}
                </ul>
              }
            </div>
            <Separator />
          </>
        )}

        {user.workExperience.length > 0 && (
          <>
            <div className="flex flex-col gap-y-4">
              <p className="font-bold text-xl">Work Experience</p>
              {
                <ul className="list-disc list-inside ml-8 space-y-4">
                  {user.workExperience.map((wrk) => (
                    <div className="flex text-sm flex-col">
                      <li key={wrk.id}>
                        <span className="font-bold text-sm">{wrk.company}</span>
                        {" | "}
                        <span>{wrk.role}</span>
                        {" | "}
                        <span className="font-bold text-sm">{`${wrk.fromDate.slice(
                          0,
                          4
                        )} - ${wrk.toDate.slice(0, 4)}`}</span>
                      </li>
                      <div className="flex text-sm ml-6 text-justify">
                        {wrk.description}
                      </div>
                    </div>
                  ))}
                </ul>
              }
            </div>
            <Separator />
          </>
        )}

        {user.otherSections.length > 0 &&
          user.otherSections.map((section) => (
            <>
              <div className="flex flex-col gap-y-4" key={section.id}>
                <p className="font-bold text-xl">{section.sectionTitle}</p>
                <ul className="list-disc list-inside ml-8 space-y-4">
                  {section.fields.map((field) => (
                    <div className="flex text-sm flex-col">
                      <li key={field.id}>
                        <span className="font-bold text-sm">{field.fieldTitle}</span>
    
                      </li>
                      <div className="flex text-sm ml-6 text-justify">
                        {field.description}
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
              <Separator />
            </>
          ))}
      </div>
    </ResumeLayout>
  );
};

export default ResumePreview;

'use client';

import React from 'react';
import { useGetOppByIdQuery } from '../services/Service';
import { CiCircleCheck } from "react-icons/ci";
import { FaRegCalendarCheck, FaRegCalendarPlus } from "react-icons/fa";
import { FaCirclePlus, FaFireFlameCurved, FaLocationDot } from "react-icons/fa6";
import { ClipLoader } from 'react-spinners';
import Error from '../(components)/error';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

const categoryStyles: Record<string, string> = {
  "Orphanages and Child Welfare": "bg-red-200 text-red-600",
  "Category2": "bg-green-200 text-green-600",
  "Category1": "bg-orange-200 text-orange-600",
  "Data Science": "bg-purple-200 text-purple-600",
  "Youth Empowerment and Development": "bg-pink-200 text-pink-600",
  "Customer Service": "bg-blue-200 text-blue-600",
  "Education Access and Quality Improvement": "bg-amber-200 text-amber-600",
};

const GetOppsById: React.FC<DetailPageProps> = ({ params }) => {
  const { id } = React.use(params); // unwrap the Promise
  const { data, isError, isLoading } = useGetOppByIdQuery(id);

  console.log(data)

  if (isLoading) return (<div className='flex justify-center items-center'>
        <div className="loader border-4 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin mt-[20%]">{isLoading && <ClipLoader color="#36D7B7" size={50} />}</div>
    </div>);

  if (isError) return (<div><Error/></div>);

  const responsibilities = data?.data.responsibilities?.split(".").filter((j) => j.trim() !== "") || [];
	const ideal_Candidate = data?.data.idealCandidate.split(".").filter((c) => c.trim() !== "") || [];

  return (
    <div className="text-black flex gap-[5%] p-4">
      <div className="w-[1229px] p-4 flex flex-col gap-8 pt-8 pb-8">
        <div>
          <h1 className='font-black text-xl pb-4'>Description</h1>
          <p>{data?.data.description}</p>
        </div>
        <div>
          <h1 className='font-black text-xl pb-4'>Responsibilities</h1>
          <ul className="flex flex-col gap-2">
            {responsibilities.map((r, id) => (
              <li key={id} className="flex items-start gap-2">
                <CiCircleCheck className="text-[#26A4FF] text-xl" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className='font-black text-xl pb-4'>Ideal Candidate We Want</h1>
          <ul className="list-disc pl-6">
            {ideal_Candidate.map((t, id) => (
              <li key={id}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className='font-black text-xl pb-4'>When & Where</h1>
            <p className='flex items-center gap-2'>
              <div className="border w-13 h-13 border-[#D6DDEB] rounded-full flex items-center justify-center">
                <FaLocationDot className="text-[#26A4FF] text-2xl" />
              </div>
              {data?.data.whenAndWhere}
            </p>
        </div>
      </div>

      <div className="w-[293.5px] p-4 flex flex-col gap-4">
        <div className='flex flex-col gap-[20px] border-b-2 border-b-[#D6DDEB] border-solid pb-[20px]'>
          <h1 className='font-black text-xl'>About</h1>
          <div className='flex gap-2'>
            <div className="border w-15 h-13 border-[#D6DDEB] rounded-full flex items-center justify-center">
              <FaCirclePlus className="text-[#26A4FF] text-2xl" />
            </div>
            <div className='flex flex-col'>
              <p className="font-normal text-base">
                Posted On:
              </p>
              <p className="font-semibold">{data?.data.datePosted}</p>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className="border w-15 h-13 border-[#D6DDEB] rounded-full flex items-center justify-center">
              <FaFireFlameCurved className=" text-[#26A4FF] text-2xl " />
            </div>
            <div className='flex flex-col'>
              <p className="font-normal text-base">
                Deadline:
              </p>
              <p className="font-semibold">{data?.data.deadline}</p>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className="border w-13 h-13 border-[#D6DDEB] rounded-full flex items-center justify-center">
              <FaLocationDot className="text-[#26A4FF] text-2xl" />
            </div>
            <div className='flex flex-col'>
              <p className="font-normal text-base">
                Location:
              </p>
              <p className="font-semibold">{data?.data.location}</p>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className="border w-15 h-13 border-[#D6DDEB] rounded-full flex items-center justify-center">
              <FaRegCalendarPlus className="text-[#26A4FF] text-2xl" />
            </div>
            <div className='flex flex-col'>
              <p className="font-normal text-base">
                Start Date:
              </p>
              <p className="font-semibold">{data?.data.startDate}</p>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className="border w-15 h-13 border-[#D6DDEB] rounded-full flex items-center justify-center">
              <FaRegCalendarCheck className="text-[#26A4FF] text-2xl" />
            </div>
            <div className='flex flex-col'>
              <p className="font-normal text-base">
                End Date:
              </p>
              <p className="font-semibold">{data?.data.endDate}</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 border-b-2 border-b-[#D6DDEB] border-solid pb-[20px]'>
          <h1 className='font-black text-xl'>Categories</h1>
          <ul className="flex flex-wrap gap-2">
            {data?.data.categories.map((cat, i) => (
              <li
                key={i}
                className={`${
                  categoryStyles[cat] || "bg-gray-200 text-gray-600"
                } font-semibold text-[12px] py-1.5 px-2.5 rounded-full min-w-14 text-center`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='font-black text-xl'>Required Skills</h1>
          <ul className='flex flex-wrap gap-[0.5rem]'>
            {data?.data.requiredSkills.map((skill, i) => (
              <li key={i} className="bg-[#F8F8FD] text-[#2D298E] font-normal text-[16px] px-3 py-1 w-fit">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GetOppsById;
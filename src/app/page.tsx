// app/page.tsx
"use client";
import { useGetAllOppsQuery } from './services/Service';
import Link from "next/link";
import JobCard from "./(components)/OpportunityCard";
import { ClipLoader } from 'react-spinners';
import Error from './(components)/error';

export default function Home() {
  const { data, isError, isLoading, isSuccess } = useGetAllOppsQuery();

  if (isError) return (<div><Error/></div>);

  if (isLoading) return (<div className='flex justify-center items-center'>
        <div className="loader border-4 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin mt-[20%]">{isLoading && <ClipLoader color="#36D7B7" size={50} />}</div>
    </div>);

  if (isSuccess) {
    return (
    <div className='flex flex-col gap-16 mt-16 mb-16'>
      <div className='flex justify-around mt-2'>
        <div className='flex flex-col'>
          <h1 className='text-black font-black text-4xl'>Opportunities</h1>
          <h3 className='text-[#7C8493]'>Showing {data?.data.length} results</h3>
        </div>
        <div className='flex gap-1'>
          <h2 className='text-black'>Sorted by: </h2>
          <p className="text-black text-[16px] font-medium">Most Relevant</p>
        </div>
      </div>
      <div className='flex flex-col gap-[1rem]'>
        {data?.data.map((job) => (
            <Link href={`/${job.id}`} key={job.id}>
              <JobCard 
                key={job.id}
                title={job.title}
                location={job.location}
                description={job.description}
                icon={job.logoUrl}
                company={job.orgName}
                isBookmarked={job.isBookmarked}
                id={job.id}
              />
            </Link>
        ))}
      </div>
    </div>
    );
  }
}
//app/(components)/OpportunityCard.tsx
import React from 'react';
import JobCardButton from './JobCardButton';
import BookmarkButton from './BookmarkButton';


interface JobType {
    id: string,
    icon?: string,
    title: string,
    location: string[],
    description: string,
    company: string,
    isBookmarked: boolean,
}

const JobCard = ({id, icon, title, location, description, company, isBookmarked}:JobType) => {
  return (
    <div className="flex w-[919px] bg-white border-2 border-[#7C8493] rounded-2xl p-[24px] gap-4 justify-self-center">
        <div className="w-[7rem]">
            <img
                src={icon ?? 'placeholder-logo.png'}
                alt={`logo-${id}`}
            />
        </div>
        <div className="w-[755px] flex flex-col gap-2">
            <div className="h-24 flex flex-col justify-start gap-1 box-border">
                <div className='flex justify-between'>
                    <h1 className="m-0 text-[#25324B] font-bold text-lg">{title}</h1>
                    <BookmarkButton isBookmarked={isBookmarked} id={id}/>
                </div>
                <div className="flex gap-4 text-[#7C8493] p-0 m-0">
                    <p>{company}</p>
                    <p>*</p>
                    <p>{location[0]}</p>
                </div>
            </div>
            <div className="text-[#25324B] mt-2">
                <p>{description}</p>
            </div>
            <div className="flex gap-2 mt-4">
                <JobCardButton style='inPerson' content='In person'/>
                <JobCardButton style='education' content='Education'/>
                <JobCardButton style='it' content='IT'/>
            </div>
        </div>
    </div>
  )
}

export default JobCard
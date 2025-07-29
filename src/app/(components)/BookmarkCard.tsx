// app/(components)/BookmarkCard.tsx

import React from 'react';
import JobCardButton from './JobCardButton';

interface BookmarkData {
  eventID: string;
  title: string;
  opType: string;
  orgName: string;
  datePosted: string;
  dateBookmarked: string;
  logoUrl?: string;
  location: string;
}

const getValidStyle = (type: string): "inPerson" | "education" | "it" => {
  if (type === "inPerson" || type === "education" || type === "it") {
    return type;
  }
  return "inPerson"; // default fallback
};

const BookmarkCard = ({
  eventID,
  title,
  opType,
  orgName,
  datePosted,
  dateBookmarked,
  logoUrl,
  location,
}: BookmarkData) => {
  return (
    <div className="flex w-[919px] bg-white border-2 border-[#7C8493] rounded-2xl p-[24px] gap-4 justify-self-center">
      <div className="w-[7rem]">
        <img
          src={logoUrl || '/placeholder-logo.png'}
          alt={`logo-${eventID}`}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="w-[755px] flex flex-col gap-2">
        <div className="h-24 flex flex-col justify-start gap-1 box-border">
          <div className="flex justify-between">
            <h1 className="m-0 text-[#25324B] font-bold text-lg">{title}</h1>
          </div>
          <div className="flex gap-4 text-[#7C8493] p-0 m-0">
            <p>{orgName}</p>
            <p>*</p>
            <p>{location}</p>
          </div>
        </div>
        <div className="text-[#25324B] mt-2">
          <p>Bookmarked on: {new Date(dateBookmarked).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <JobCardButton style={getValidStyle(opType)} content={opType === 'inPerson' ? 'In person' : opType} />
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;

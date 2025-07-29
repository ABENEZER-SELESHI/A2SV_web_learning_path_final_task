// app/bookmarks/page.tsx
"use client";
import { useGetBookmarkQuery } from './../services/Service';
import Link from "next/link";
import BookmarkCard from "./../(components)/BookmarkCard";
import { ClipLoader } from 'react-spinners';
import Error from './../(components)/error';

export default function BookmarksPage() {
  const { data, isError, isLoading, isSuccess } = useGetBookmarkQuery();

  if (isError) return (<div><Error/></div>);

  if (isLoading) return (
    <div className='flex justify-center items-center'>
      <div className="loader border-4 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin mt-[20%]">
        {isLoading && <ClipLoader color="#36D7B7" size={50} />}
      </div>
    </div>
  );

  if (isSuccess) {
    return (
      <div className='flex flex-col gap-16 mt-16 mb-16'>
        <div className='flex justify-around mt-2'>
          <div className='flex flex-col'>
            <h1 className='text-black font-black text-4xl'>Bookmarks</h1>
          </div>
          <div className='flex gap-1'>
            <h2 className='text-black'>Sorted by:</h2>
            <p className="text-black text-[16px] font-medium">Most Relevant</p>
          </div>
        </div>

        <div className='flex flex-col gap-[1rem] items-center'>
          {data?.data.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                eventID={bookmark.id}
                title={bookmark.title}
                opType={bookmark.opType}
                orgName={bookmark.orgName}
                datePosted={bookmark.datePosted}
                dateBookmarked={bookmark.updatedAt ?? bookmark.datePosted}
                logoUrl={bookmark.logoUrl}
                location={bookmark.location[0] || "Unknown"}
              />
          ))}
        </div>
      </div>
    );
  }
}

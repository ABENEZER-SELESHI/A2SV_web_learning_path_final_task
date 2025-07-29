//app/Bookmarked.tsx
"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  useCreateBookmarkMutation,
  useRemoveBookmarkMutation,
} from "../services/Service";

interface Props {
  isBookmarked: boolean;
  id: string;
}

const BookmarkButton = ({ isBookmarked, id }: Props) => {
  const { data: session } = useSession();
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const [createBookmark] = useCreateBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  const handleToggle = async () => {
    if (!session) {
      alert("You need to be logged in to use bookmarking.");
      return;
    }
    
    // console.log("Session:", session); // For debugging
    // const token = session.user?.accessToken; 

    try {
      if (bookmarked) {
        await removeBookmark(id).unwrap();
        setBookmarked(false);
      } else {
        await createBookmark(id).unwrap();
        setBookmarked(true);
      }

      window.location.reload();
    } catch (error: any) {
      console.error("Bookmark error", error);

      if (error?.status) {
        console.error("Error status:", error.status);
        console.error("Error data:", error.data);
      }

      alert("Failed to update bookmark.");
    }
  };

  return (
    <button
      data-cy={`bookmark-btn-${id}`}
      onClick={handleToggle}
      className={`px-4 py-2 font-bold rounded ${
        bookmarked ? "bg-green-500 text-white" : "bg-gray-300 text-black"
      }`}
    >
      {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
    </button>
  );
};

export default BookmarkButton;

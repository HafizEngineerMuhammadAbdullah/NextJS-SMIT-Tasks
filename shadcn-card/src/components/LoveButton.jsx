"use client"
import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
const LoveIcon = () => {

  // const loveIcon = useRef();
  // const iconRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef(null);
  const [liked, setLiked] = useState(false);


  const toggleReaction = () => {
    // Restart animation each click
    if (iconRef.current) {
      iconRef.current.style.animation = "none";
      // force reflow so animation restarts
      void iconRef.current.offsetWidth;
      iconRef.current.style.animation = "pulse 0.45s ease-out";
    }
    setLiked((prev) => !prev);
  };

  // const reaction = () => {
  //   loveIcon.current.style.animation = "pulse 0.5s ease-out 1";
  //   // loveIcon.current.style.background = "linear-gradient(to bottom,rgb(245, 98, 13),rgb(245, 76, 10),rgb(247, 63, 63))";
  //   loveIcon.current.style.color = "red";
  // }

  return (
    // <Button variant="outline" size="icon-lg" onClick={reaction}>
    //   <FaRegHeart ref={loveIcon} />
    // </Button>
    <Button
      // variant="ghost"
      variant="outline"
      size="icon-lg"
      onClick={toggleReaction}
      aria-label={liked ? "Unlike post" : "Like post"}
      aria-pressed={liked}
      className="rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
    >
      <span ref={iconRef} className="inline-flex">
        {liked ? (
          <FaHeart size={50} className="text-red-500 text-lg transition-transform" />
        ) : (
          <FaRegHeart className="text-lg" />
        )}
      </span>
    </Button>
  )
}

export default LoveIcon

"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { FaHeart, FaRegComment, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { CiLocationArrow1 } from "react-icons/ci";
import { posts } from '@/data/postData';

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    const animateLike = () => {
        setAnimationKey((current) => current + 1);
    }

    const toggleLike = () => {
        setLiked((current) => !current);
        animateLike();
    }

    const likeFromImage = () => {
        setLiked(true);
        animateLike();
    }

    const actions = [
        {
            id: 'like',
            label: liked ? 'Unlike' : 'Like',
            Icon: liked ? FaHeart : GoHeart,
            onClick: toggleLike,
            className: liked ? 'text-rose-500' : 'text-gray-900',
        },
        {
            id: 'comment',
            label: 'Comment',
            Icon: FaRegComment,
            onClick: () => { },
            className: 'text-gray-900',
        },
        {
            id: 'share',
            label: 'Share',
            Icon: CiLocationArrow1,
            onClick: () => { },
            className: 'text-gray-900',
        },
        {
            id: 'bookmark',
            label: bookmarked ? 'Remove bookmark' : 'Save post',
            Icon: bookmarked ? FaBookmark : FaRegBookmark,
            onClick: () => setBookmarked((current) => !current),
            className: bookmarked ? 'text-gray-900' : 'text-gray-900',
        },
    ];

    return (
        <article className="w-full max-w-117.5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center p-3">
                {/* Recent Posted Profile Image */}
                <div className="mr-3 h-10 w-10 rounded-full bg-linear-to-r from-[#fcb045] via-[#f31414] to-[#eb0ea9] p-0.5">
                    <Image src={post.image} alt="" width={40} height={40} className="h-full w-full rounded-full border-2 border-white object-cover" />
                </div>
                {/* Post Username */}
                <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">{post.username}</p>
                    <p className="truncate text-sm text-gray-500">{post.caption}</p>
                </div>
                {/* Three Dots */}
                <button type="button" aria-label="More post options" className="ml-auto rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">
                    <PiDotsThreeOutlineFill size={20} />
                </button>
            </div>
            {/* Main Post Image */}
            <div
                className="relative aspect-4/5 w-full cursor-pointer overflow-hidden bg-gray-100"
                onDoubleClick={likeFromImage}
                aria-label="Double-click to like this post"
            >
                <Image src={post.image} alt={`Post by ${post.username}`} fill sizes="(max-width: 470px) 100vw, 470px" className="object-contain" />
            </div>
            
            {/* Like,Unlike,Save,Share Buttons */}
            <div className="flex items-center px-2 py-1">
                {actions.map(({ id, label, Icon, onClick, className }) => (
                    <button
                        key={id}
                        type="button"
                        aria-label={label}
                        aria-pressed={id === 'like' ? liked : id === 'bookmark' ? bookmarked : undefined}
                        onClick={onClick}
                        className={`rounded-full p-2.5 transition duration-150 hover:scale-110 hover:bg-gray-100 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gray-700 ${id === 'bookmark' ? 'ml-auto' : ''} ${className}`}
                    >
                        <span key={id === 'like' ? animationKey : id} className={id === 'like' ? 'heart-pop inline-flex' : 'inline-flex'}>
                            <Icon size={id === 'share' ? 23 : 22} aria-hidden="true" />
                        </span>
                    </button>
                ))}
            </div>
            <p className="px-3 pb-3 text-sm font-semibold text-gray-900">{liked ? '1 like' : '0 likes'}</p>
        </article>
    );
};

const Post = () => {
    return (
        <div className="flex w-full flex-col items-center gap-4">
            {posts.map((post) => (
                <PostCard key={post.image} post={post} />
            ))}
        </div>
    )
}

export default Post
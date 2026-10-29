import { notifications } from '@/data/core';
import React from 'react';;
import { LuTriangleAlert, LuUserPlus } from 'react-icons/lu';
import { TbPlug } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
// Recent activity — live feed of events (model connected, experiment completed, rate limit warning, team invite) with colored icon badges and timestamps.
const NotificationPanel = () => {

    // Helper function to render the exact icon based on notification type
    const getIcon = (type) => {
        switch (type) {
            case "integration":
                return (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 text-blue-400">
                        <TbPlug className="h-5 w-5" />
                    </div>
                );
            case "success":
                return (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 text-emerald-500">
                        <FaCheck className="h-6 w-6" />
                    </div>
                );
            case "warning":
                return (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-800 text-amber-500">
                        <LuTriangleAlert className="h-5 w-5" />
                    </div>
                );
            case "invite":
                return (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-950/60 text-indigo-400">
                        <LuUserPlus className="h-5 w-5" />
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className='w-full max-w-sm p-9 rounded-2xl  bg-[#121212] text-gray-200 shadow-md border border-neutral-900 hover:shadow-gray-700 hover:-translate-y-1.5 transition-all cursor-pointer'>
            <div className='py-2 flex justify-between'>
                <p className='font-bold '>Recent Activity</p>
                <button type="button" className='px-2 py-1.5 border border-gray-200 rounded-lg'>See All</button>
            </div>

            {/* The main map container */}
            <div className="flex flex-col">
                {notifications.map((item, index) => (
                    <div key={item.id} className="w-full">
                        {/* Notification Row */}
                        <div className="flex items-start justify-between py-4.5 gap-3">
                            {/* Left Side: Icon and Text Content */}
                            <div className="flex items-start space-x-3.5 flex-1">
                                <div className="flex-shrink-0 mt-0.5">
                                    {getIcon(item.type)}
                                </div>
                                {/* Textual Content */}
                                <div className="flex flex-col">
                                    <h4 className="text-[14px] font-bold tracking-tight text-white leading-tight">
                                        {item.title}
                                    </h4>
                                    <p className="text-[13px] font-medium text-neutral-400 mt-0.5 leading-normal">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Timestamp */}
                            <span className="text-[11px] font-medium text-neutral-500 whitespace-nowrap mt-0.5">
                                {item.timestamp}
                            </span>
                        </div>

                        {/* Render thin line separator between items, but hide it under the last row */}
                        {index < notifications.length - 1 && (
                            <hr className="border-neutral-800/60" />
                        )}
                    </div>
                ))}
            </div>
        </div>
        // </div>

    )
}

export default NotificationPanel;

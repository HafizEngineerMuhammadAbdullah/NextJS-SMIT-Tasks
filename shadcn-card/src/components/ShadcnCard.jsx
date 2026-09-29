import React from 'react'
import { Button } from "@/components/ui/button"
import LoveButton from "@/components/LoveButton"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { RxLightningBolt } from "react-icons/rx";


const TAGS = ["SMM", "Growth Strategy", "Startup", "Brand"];

const ShadcnCard = () => {

  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 border-border/60">

      {/* Card Header */}
      <CardHeader className="flex flex-row items-center gap-3 pb-3">

        {/* Profile Logo */}
        <div className='relative w-13 h-13 shrink-0'>
          <Image src="/assets/logo6.jpg"
            alt="Muhammad Abdullah's profile picture"
            fill
            sizes="56px"
            className="rounded-full object-cover ring-2 ring-border" />
        </div>

        {/* Card Title & Description */}
        <div className="flex flex-col min-w-0 flex-1">
          <CardTitle className="text-base font-semibold truncate">
            Muhammad Abdullah
          </CardTitle>
          <CardDescription className="text-xs">
            Posted 2h ago
          </CardDescription>
        </div>

        <CardAction className="ml-auto">
          <LoveButton />
        </CardAction>
      </CardHeader>

      {/* Card Main Content */}
      <CardContent>
        <div className="flex flex-col gap-3">
          <h3 className='font-semibold text-lg font-sans leading-snug tracking-tight'>Looking for SM manager to create posts across various platforms</h3>
          <p className='font-medium text-sm text-muted-foreground leading-relaxed line-clamp-2'>We&apos;re seeking a skilled Social Media Manager to handle content
            creation, scheduling, and engagement across multiple platforms...</p>

          {/* Tags — wraps gracefully */}
          <div className="flex  flex-wrap gap-2 pt-1 items-center justify-evenly">
            {/* <Button className="bg-cyan-600">SMM</Button>
              <Button className="bg-cyan-600">Growth Strategy</Button>
              <Button className="bg-cyan-600">Startup</Button>
              <Button className="bg-cyan-600">Brand</Button> */}
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex flex-col items-start pt-4 gap-3 border-t-2 border-dashed">
        {/* <h1 className='font-bold font-mono text-3xl'>$150 - $200/h</h1>
        <p className='text-gray-600 text-md font-medium font-serif'>Hourly Rate {" "} 100% Remote</p> */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tight">$150</span>
          <span className="text-muted-foreground">–</span>
          <span className="text-2xl font-bold tracking-tight">$200</span>
          <span className="text-sm text-muted-foreground ml-1">/hr</span>
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
          Hourly Rate <span className='text-2xl'>·</span> 100% Remote
        </p>
        {/* <Button variant="outline" className="text-white font-bold text-lg w-full py-5 bg-blue-500">
          <RxLightningBolt />
          Apply
        </Button> */}
        <Button
          className="w-full py-5 text-base font-semibold gap-2 group"
          size="lg"
        >
          <RxLightningBolt size={30} className="transition-transform group-hover:scale-110 group-hover:rotate-6" />
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ShadcnCard

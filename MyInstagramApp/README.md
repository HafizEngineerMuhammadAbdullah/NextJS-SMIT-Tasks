import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/assets/posts/images.jpg"
      alt="Description of the image"
      width={800} 
      height={600}
      priority // 👈 Add this property to fix the warning
    />
  )
}

In Next.js, using priority is the recommended approach. It automatically sets loading="eager" under the hood and configures high-priority preloading tags (<link rel="preload">) in the HTML document header, making the image load even faster.

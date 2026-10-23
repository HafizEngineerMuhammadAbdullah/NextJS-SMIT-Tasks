import Image from 'next/image'
import React from 'react'

const AiLabLogo = ({ src, myClass }) => {
  return (
    <Image src={src} className={`${myClass}`} alt="AI Lab Logo" width={50} height={50} />
  )
}

export default AiLabLogo

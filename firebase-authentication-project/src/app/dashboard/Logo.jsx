import Image from 'next/image'
import React from 'react'

const Logo = ({ src, myClass, alt, width = 50, height = 50 }) => {
  return (
    <Image src={src} className={myClass} alt={alt} height={height} width={width} />
  )
}

export default Logo

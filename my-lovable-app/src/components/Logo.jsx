import React from 'react'
import Image from 'next/image'

function Logo() {
  return (
    <div>
      <Image src="/logoblack.svg" width={140} height={50} alt='Lovable' />
    </div>
  )
}

export default Logo
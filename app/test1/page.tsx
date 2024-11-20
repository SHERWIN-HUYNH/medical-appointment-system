import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const test1 = () => {
  return (
    <div>
      <Link
        href={{
          pathname: '/test1/edit',
          query: {
            data: 123323,
          },
        }}
      >
        <Button>Click me</Button>
      </Link>
    </div>
  )
}

export default test1

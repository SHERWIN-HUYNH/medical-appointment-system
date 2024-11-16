import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Test = () => {
  console.log('STRIPE',process.env.NEXT_PUBLIC_STRIPE_API_KEY as string)
  return (
    <Button>
      <Link
        href={{
          pathname: '/choose-schedule',
          query: {
            value: 'hello',
          },
        }}
      >
        SHARE DATA
      </Link>
    </Button>
  );
};

export default Test;

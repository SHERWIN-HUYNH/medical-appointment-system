import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Test = () => {
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

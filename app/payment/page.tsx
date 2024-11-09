'use client';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import React from 'react';

type Props = {};

const Payment = (props: Props) => {
  const { data: session } = useSession();
  const onclick = async () => {
    const response = await fetch(`/api/appointment/${session?.user?.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    window.location.assign(response.url);
    console.log(response);
  };
  return <Button onClick={onclick}>Payment</Button>;
};

export default Payment;

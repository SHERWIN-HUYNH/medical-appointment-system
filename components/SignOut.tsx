import React from 'react';
import { Button } from './ui/button';
import { redirect } from 'next/dist/server/api-utils';
import { signOut } from 'next-auth/react';

const SignOut = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `{window.location.origin}/login`,
        })
      }
    >
      Sign out
    </Button>
  );
};

export default SignOut;

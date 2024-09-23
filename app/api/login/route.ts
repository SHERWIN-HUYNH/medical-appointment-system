import { comparePassword } from "@/helpers/hash";
import { signJwtAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { useSession } from "next-auth/react";

interface RequestBody {
  username: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  console.log('DATABASE LOG IN')
  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });
  if (!user) {
    throw new Response(
      JSON.stringify({
        message: "NOT FOUND USER",
      }),
      {
        status: 401,
      }
    );
  }
  const isPasswordCorrect = await comparePassword(
    body.password,
    user.password,
  );

  if (!isPasswordCorrect) {
    return new Response(
      JSON.stringify({
        message: "WRONG PASSWORD",
      }),
      {
        status: 401,
      }
    );
  }
  if (user ) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);

    const result = {
      ...userWithoutPass,
      accessToken,
    };
    return new Response(JSON.stringify(result));
  } else
    return new Response(
      JSON.stringify({
        message: "Unathenticated",
      }),
      {
        status: 401,
      }
    );
}
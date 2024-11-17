import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import { UserRepository } from '@/repositories/user';
import { NextResponse } from 'next/server';
import { notFoundResponse } from '@/helpers/response';

export async function POST(req: Request, context: any) {
  const { userId } = context.params;
  const user = await UserRepository.getUserByUserId(userId);
  if (!user) {
    return notFoundResponse('NOT FOUND USER');
  }
  const body = await req.json();

}

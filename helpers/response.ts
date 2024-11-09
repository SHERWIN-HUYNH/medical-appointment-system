import { NextResponse } from 'next/server';

export const badRequestResponse = (message: string) => {
  return NextResponse.json({ error: message }, { status: 400 });
};

export const unauthorizedResponse = (message: string) => {
  return NextResponse.json({ error: message }, { status: 401 });
};

export const forbiddenResponse = (message: string) => {
  return NextResponse.json({ error: message }, { status: 403 });
};

export const notFoundResponse = (message: string) => {
  return NextResponse.json({ error: message }, { status: 404 });
};

export const internalServerErrorResponse = (message: string) => {
  return NextResponse.json({ error: message }, { status: 500 });
};

export const conflictResponse = (message: string) => {
  return NextResponse.json({ error: message }, { status: 409 });
};

export const successResponse = (data: unknown) => {
  return NextResponse.json(data, { status: 200 });
};

export const createdResponse = (data: unknown) => {
  return NextResponse.json(data, { status: 201 });
};

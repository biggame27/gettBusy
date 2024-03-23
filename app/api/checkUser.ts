"use server"
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function checkUser() {
  const { userId } = auth();
  console.log(userId)
  if (!userId) redirect('/sign-in')
  return userId;
}
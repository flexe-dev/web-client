import LoginForm from "@/components/auth/LoginForm";
import { getCsrfToken } from "next-auth/react";
import React from "react";

export default async function Login() {
 
  return <LoginForm />;
}


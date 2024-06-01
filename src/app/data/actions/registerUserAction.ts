"use server";
import { z } from "zod";
import axiosInstance from "../../../lib/axiosInstance";

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error?.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fileds, failed to Registe",
    };
  }

  try {
    const response = await axiosInstance.post("/auth/signup", {
      username: validatedFields.data.username,
      password: validatedFields.data.password,
      email: validatedFields.data.email,
    });

    return {
      ...prevState,
      data: response.data,
      message: "Registration successful!",
    };
  } catch (error) {
    return {
      ...prevState,
      error: error,
      message: "Registration failed!",
    };
  }
}

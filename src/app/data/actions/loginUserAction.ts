import axiosInstance from "../../../lib/axiosInstance";
import { z } from "zod";

const schemaLogin = z.object({
  identifier: z.string(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error?.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields, failed to Login",
    };
  }

  try {
    const response = await axiosInstance.post("/auth/login", {
      identifier: validatedFields.data.identifier,
      password: validatedFields.data.password,
    });

    localStorage.setItem("token", response.data.accessToken);

    return {
      ...prevState,
      data: response.data,
      message: "Login successful!",
    };
  } catch (error) {
    return {
      ...prevState,
      error: error,
      message: "Login failed!",
    };
  }
}

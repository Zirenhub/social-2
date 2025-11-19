"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailZ } from "~/types/auth/email";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordZ } from "~/types/auth/password";
import { ProfileZ } from "~/types/auth/profile";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { signIn } from "next-auth/react";
import { ROUTES } from "~/constants/routes";
import { useRouter } from "next/navigation";
import { handleFormError } from "~/lib/handle-form-error";

const Step1Schema = z.object({
  email: EmailZ.shape.email,
});

const Step2Schema = z.object({
  password: PasswordZ.shape.password,
  confirmPassword: PasswordZ.shape.confirmPassword,
});

const Step3Schema = z.object({
  firstName: ProfileZ.shape.firstName,
  lastName: ProfileZ.shape.lastName,
  username: ProfileZ.shape.username,
  location: ProfileZ.shape.location,
  bio: ProfileZ.shape.bio,
  birthDate: ProfileZ.shape.birthDate,
});

const FullSignUpSchema = Step1Schema.merge(Step2Schema)
  .merge(Step3Schema)
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type SignUpFormData = z.infer<typeof FullSignUpSchema>;

export default function useSignUp() {
  const router = useRouter();
  // Use React Hook Form with mode: "onChange" for real-time validation
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(FullSignUpSchema),
    mode: "onChange", // Validate on every change
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      username: "",
      location: "",
      bio: "",
      birthDate: undefined,
    },
  });
  const [lastCheckedEmail, setLastCheckedEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const { handleSubmit, setError, watch, trigger } = form;

  const password = watch("password");
  const email = watch("email");

  useEffect(() => {
    // Trigger confirmPassword validation when password changes
    trigger("confirmPassword").catch((err) => {
      console.error("Error triggering confirmPassword validation:", err);
    });
  }, [password, trigger]);

  const signup = api.auth.signup.useMutation({
    onMutate: () => {
      // Clear root error on new mutation
      setError("root", {});
    },
    onSuccess: async (_data, variables) => {
      // Auto sign-in after signup
      const result = await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push(ROUTES.HOME);
      }
    },
    onError: (error) => handleFormError(form, error),
  });

  const onSubmit = handleSubmit(async (data) => {
    signup.mutate(data);
  });

  useEffect(() => {
    if (email !== lastCheckedEmail) {
      setIsEmailValid(false);
    }
  }, [email, lastCheckedEmail]);

  const checkEmailExists = api.auth.emailExists.useMutation({
    onSuccess: (data) => {
      if (!data.exists) {
        setIsEmailValid(true);
        setLastCheckedEmail(email);
      } else {
        setError("email", { message: "Email already exists" });
      }
    },
  });

  const triggerEmailCheck = async () => {
    if (email && !isEmailValid && email !== lastCheckedEmail) {
      await checkEmailExists.mutateAsync({ email });
    }
  };

  return {
    ...form,
    isSubmitting:
      signup.isPending ||
      form.formState.isSubmitting ||
      checkEmailExists.isPending,
    triggerEmailCheck,
    onSubmit,
  };
}

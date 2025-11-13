"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailZ } from "~/types/auth/email";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordZ } from "~/types/auth/password";
import { api } from "~/trpc/react";
import { signIn } from "next-auth/react";
import { ROUTES } from "~/constants/routes";
import { useRouter } from "next/navigation";
import { handleFormError } from "~/lib/handle-form-error";

const LoginSchema = z.object({
  email: EmailZ.shape.email,
  password: PasswordZ.shape.password,
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function useLogin() {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, setError } = form;

  const login = api.auth.login.useMutation({
    onMutate: () => {
      setError("root", {});
    },
    onSuccess: async (_data, variables) => {
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
    login.mutate(data);
  });

  return {
    ...form,
    isSubmitting:
      login.isPending ||
      form.formState.isSubmitting ||
      form.formState.isValidating ||
      form.formState.isSubmitSuccessful,
    onSubmit,
  };
}

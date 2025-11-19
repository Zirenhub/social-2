"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { handleFormError } from "~/lib/handle-form-error";
import { api } from "~/trpc/react";
import { PostZ, type PostData } from "~/types/post/post";

type Props = {
  onSuccessProp?: (data: Post) => void;
};

function useCreatePost({ onSuccessProp }: Props) {
  const utils = api.useUtils();
  const form = useForm<PostData>({
    resolver: zodResolver(PostZ),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      content: "",
    },
  });
  const { handleSubmit } = form;

  const post = api.post.mutations.create.useMutation({
    onSuccess: async (data, _variables) => {
      if (onSuccessProp) {
        onSuccessProp(data);
      }
      await utils.post.queries.getInfinitePosts.invalidate();
      form.reset();
      return null;
    },
    onError: (err) => handleFormError(form, err),
  });

  const onSubmit = handleSubmit(async (data) => {
    post.mutate(data);
  });

  return {
    ...form,
    isSubmitting:
      post.isPending ||
      form.formState.isSubmitting ||
      form.formState.isValidating,
    onSubmit,
  };
}

export default useCreatePost;

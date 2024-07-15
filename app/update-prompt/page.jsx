"use client";

import { useEffect, useState } from "react";

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePrompt = () => {

  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  const promptId = useSearchParams().get('id');
  const router = useRouter();

  const fethcPost = async () => {
    if(!promptId) return;
    try {
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json();
        setPost({prompt:data.prompt,tag:data.tag});
    } catch (error) {
        console.error(error);
    }
}

  useEffect( () => {
    fethcPost()
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Update'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;

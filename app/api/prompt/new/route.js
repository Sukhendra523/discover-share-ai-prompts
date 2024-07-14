import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { creater, prompt, tag } = await request.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creater,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new prompt", {
      status: 500,
    });
  }
};

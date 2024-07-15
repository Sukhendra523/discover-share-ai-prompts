import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database";

export const GET = async (_req,{params : { id }})=> {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(id);
        return new Response(JSON.stringify(prompt),{
            status:200
        });
    } catch (error) {
        console.error(error)
        return new Response("Failed to fetch data",{
            status:500
        });
    }
}


export const PATCH = async (req, {params : { id }})=> {
    const {prompt,tag} = await req.json()
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(id)
        if(existingPrompt) {
            existingPrompt.prompt = prompt;
            existingPrompt.tag = tag;
            await existingPrompt.save();

            return new Response(JSON.stringify(existingPrompt),{
                status:200
            })
        }

        return new Response('Prompt Not found',{
            status:404
        });
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch data",{
            status:500
        });
    }
}

export const DELETE = async (_req,{params : { id }})=> {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(id);
        return new Response("Prompt deleted successfully!",{
            status:200
        });
    } catch (error) {
        console.error(error);
        return new Response("Failed to delete prompt",{
            status:500
        });
    }
}
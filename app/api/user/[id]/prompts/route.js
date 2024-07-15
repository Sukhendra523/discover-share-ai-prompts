import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database";

export const GET = async (_req,{ params : { id }})=> {
    try {
        await connectToDB();
        const prompts = await Prompt.find({creator:id}).populate('creator');
        return new Response(JSON.stringify(prompts),{
            status:200
        });
    } catch (error) {
        return new Response("Failed to fetch data",{
            status:200
        });
    }
}
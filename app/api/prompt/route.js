import Prompt from "@models/prompt"
import { searchRegExp } from "@utils";
import { connectToDB } from "@utils/database";


const searchPromts = async (searchText)=>{
    // Mongoose query to filter prompts based on search text using Model.find() and populate()

    // const searchRgx = searchRegExp(searchText);

    const searchResult = await Prompt.find({
        $or: [
            { prompt: { $regex:'.*'+searchText+ '.*' , $options: "i" } },
            { tag: { $regex: '.*'+searchText+ '.*', $options: "i" } }
        ]
        })
        .populate({
        path: 'creator',
        match: {
            $or: [
            { email: { $regex: '.*'+searchText+ '.*', $options: "i" } },
            { username: { $regex: '.*'+searchText+ '.*', $options: "i" } }
            ]
        }
        })
        return searchResult.filter(prompt => prompt.creator !== null);

}
export const GET = async (req)=> {

    try {
        await connectToDB();

        // Extract the searchText query parameter from the URL
        const { searchParams } = new URL(req.url);
        const searchText = searchParams.get('q');
        const prompts = searchText ? await searchPromts(searchText)  : await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts),{
            status:200
        });
    } catch (error) {
        return new Response("Failed to fetch data",{
            status:500
        });
    }
}
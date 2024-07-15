"use client";

import { useEffect, useState } from "react";
import UserProfile from "@components/UserProfile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {

  const [myPosts, setMyPosts] = useState([]);

  const { data : session } = useSession();
  const router = useRouter();

  const fetchMyPrompts = async ()=>{
    try {
        const response = await fetch(`/api/user/${session.user.id}/prompts`);
        const myPrompts = await response.json();

        if(myPrompts.length) setMyPosts(myPrompts);

    } catch (error) {
        console.error(error);
    }
  }
  useEffect(() => {
    session?.user.id && fetchMyPrompts();
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt/?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure want to delete this prompt");
    if(!hasConfirmed) return;
    try {
      const response = await fetch(`/api/prompt/${post._id.toString()}`,{
        method:'DELETE'
      })
  
      const filteredPrompts = myPosts.filter((p)=> p._id !== post._id);
      setMyPosts(filteredPrompts);
    
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <UserProfile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;

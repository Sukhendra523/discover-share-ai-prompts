"use client";

import { useEffect, useState } from "react";
import UserProfile from "@components/UserProfile";
import { useSession } from "next-auth/react";

const Profile = () => {

  const [myPosts, setMyPosts] = useState([]);

  const { data : session } = useSession();

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
    session.user.id && fetchMyPrompts();
  }, []);

  const handleEdit = (post) => {

  };

  const handleDelete = async (post) => {

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

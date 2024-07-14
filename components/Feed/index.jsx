"use client";

import { useState, useEffect } from "react";

import PromptCardList from "@components/PromptCardList";



const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");

    const fetchAllPrompts = async ()=>{
        try {
            const response = await fetch('/api/prompt')
            const prompts = await response.json();

            if(prompts){
                setAllPosts(prompts);
            }
        } catch (error) {
            console.log(error);
        }
    }


  useEffect(() => {
    fetchAllPrompts()
  }, []);

  const filterPrompts = (searchtext) => {

  };

  const handleSearchChange = (e) => {

  };

  const handleTagClick = (tagName) => {

  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;

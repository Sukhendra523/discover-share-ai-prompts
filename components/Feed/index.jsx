"use client";

import { useState, useEffect } from "react";

import PromptCardList from "@components/PromptCardList";

import useDebounce from "@Hook/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";



const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const searchParams = useSearchParams();
  const debouncedText = useDebounce(searchText,500)
  const pathname = usePathname();
  const { replace } = useRouter();

  const query = searchParams.get('q')



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



  const filterPrompts = async (searchText) => {
    try {
      // const response = await fetch(`/api/prompt?q=${debouncedText}`)
      // const prompts = await response.json();

      // if(prompts){
      //     setAllPosts(prompts);
      // }


      const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
      const filteredPost = allPosts.filter(
        (item) =>
          regex.test(item.creator.username) ||
          regex.test(item.tag) ||
          regex.test(item.prompt)
      );
      setAllPosts(filteredPost);
  } catch (error) {
      console.log(error);
  }
  };


  const updateUrlSearchParams  = (term)=>{
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  useEffect(()=>{
    if(!debouncedText) fetchAllPrompts();
   if(debouncedText) filterPrompts(debouncedText);
  },[debouncedText]);

  useEffect(()=>{
    if(query!==searchText){
      setSearchText(query||'');
    }
  }, [searchParams])

  useEffect(()=>{
    if(query!==searchText) updateUrlSearchParams(searchText);
  },[searchText])





  const handleSearchChange = (e) => {
     setSearchText(e.target.value)
  };

  const handleTagClick = (tagName) => {
       setSearchText(tagName);
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
      {debouncedText ? (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;

import React from "react";
import { useState } from "react";
import { Sparkles, Edit, Hash } from "lucide-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const BlogTitle = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Travel",
    "Food",
    "Lifestyle",
    "Education",
    "Entertainment",
    "Finance",
  ];
  const [selectCategory, setSelectCategory] = useState("General");
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const {getToken} = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)

      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectCategory}`

      const { data } = await axios.post('/api/ai/generate-blog-title', {prompt}, {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

      if(data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  };
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The effect of AI will be...."
          required
        />
        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategories.map((item) => (
            <span
              onClick={() => setSelectCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectCategory === item
                  ? "bg-[rgb(188,77,236)] border-[#4f8dd8] text-[#ffffff]"
                  : "bg-white border-gray-300 text-gray-500"
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <br />
        <button disabled={loading} className="mt-6 bg-[#b746f8] hover:bg-[#8e21c1] text-white px-4 py-2 rounded-md text-sm cursor-pointer w-full">
          {loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> : <Hash className="w-5 h-5 inline-block mr-2 text-white" />}
          
          Generate title
        </button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Hash className="w-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">Generated titles</h1>
        </div>
        {
          !content ? (
            <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-500">
              <Hash className="w-9 h-9" />
              <p>
                Select category and enter a topic and click "Generate title" to
                get started
              </p>
            </div>
          </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
               <div className='reset-tw'>
                  <Markdown>
                     {content}
                   </Markdown>
                </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default BlogTitle;

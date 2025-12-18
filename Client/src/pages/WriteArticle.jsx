import { Edit, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const WriteArticle = () => {
  const articleLength = [
    { label: 800, text: "Short (300-800 words)" },
    { label: 1200, text: "Medium (800-1200 words)" },
    { label: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const {getToken} = useAuth();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text} words`
      
      const {data} = await axios.post('/api/ai/generate-article', {prompt, length:selectedLength.label}, {
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
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Artilce Topic</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The effect of AI will be...."
          required
        />

        <p className="mt-4 text-sm font-medium">Article Length</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map((item, index) => (
            <span
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedLength.label === item.label
                  ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#1E40AF]"
                  : "bg-white border-gray-300 text-gray-600"
              } ${
                selectedLength.text === item.text
                  ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#1E40AF]"
                  : "bg-white border-gray-300 text-gray-300"
              }`}
              key={index}
            >
              {item.text}
            </span>
          ))}
        </div>
        <br />
        <button disabled={loading} className="mt-6 bg-[#4673f8] hover:bg-[#2421c1] text-white px-4 py-2 rounded-md text-sm cursor-pointer w-full">
          {
            loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            : <Edit className="w-5 inline-block mr-2"/>
          }
          {/* <Edit className="w-5 h-5 inline-block mr-2 text-white" /> */}
          Generate Article
        </button>
      </form>

      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Generated Article</h1>
        </div>


          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-500">
                <Edit className="w-9 h-9" />
                <p>Enter a topic and click "Generate Article" to get started</p>
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
          )}
      </div>
    </div>
  );
};

export default WriteArticle;

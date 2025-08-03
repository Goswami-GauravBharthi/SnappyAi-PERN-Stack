import { Edit, Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useMutation } from "@tanstack/react-query";
import { writeBlogTitle } from "../API/api";

function BlogTitle() {
  const blogCategory = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: writeBlogTitle,
    onSuccess: (data) => {
      setIsLoading(false);
      setContent(data.content);
      toast.success("data is done");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;

      mutate({ prompt });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-400">
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4  rounded-lg  border border-gray-700 bg-black/10  backdrop-blur-xs"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Keyword</p>

        <input
          type="text"
          required
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Enter Keyword to ..."
          className="w-full p-2 px-3 mt-3 outline-0 text-sm rounded-md border border-gray-300"
        />

        <p className="mt-6 text-sm font-medium">Category</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategory.map((item, index) => (
            <span
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedCategory === item
                  ? `bg-purple-50 text-purple-700`
                  : `text-gray-500 border-gray-300`
              }`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>

        <br />

        <button
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {isLoading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Hash className="w-5 " />
          )}
          Generate title
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4  rounded-lg flex flex-col   min-h-96  border border-gray-700 bg-black/10  backdrop-blur-xs ">
        <div className="flex items-center gap-3 ">
          <Hash className="w-5 h-5 text-[#8E37EB] " />
          <h1 className="text-xl font-semibold">Generated title</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Hash className="w-9 h-9 " />
              <p>Enter a topic and click “Generated title” to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogTitle;

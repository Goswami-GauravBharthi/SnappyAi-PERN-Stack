import { FileText, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { reviewResume } from "../API/api";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Remark } from "react-remark";

function ReviewResume() {
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: reviewResume,
    onSuccess: (data) => {
      setIsLoading(false);
      setContent(data.content);
      toast.success("data is done");
    },
    onError: (error) => {
      toast.error(error.message);
       setIsLoading(false);
    },
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const fromData = new FormData();
      fromData.append("resume", input);
      mutate(fromData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-400">
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4  rounded-lg border border-gray-700 bg-black/10  backdrop-blur-xs"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#ff00ea]" />
          <h1 className="text-xl font-semibold">Resume Review</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Resume</p>

        <input
          type="file"
          accept="application/pdf"
          required
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full p-2 px-3 mt-3 outline-0 text-sm rounded-md border border-gray-300 text-gray-600"
        />

        <p className="text-xs text-gray-500 font-light mt-1">
          Supports PDF resume only.
        </p>

        <button
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#d348e8c0] to-[#9e00b7] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {isLoading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <FileText className="w-5 " />
          )}
          Review resume
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4  rounded-lg flex flex-col  min-h-96 max-h-[600px] border border-gray-700 bg-black/10  backdrop-blur-xs">
        <div className="flex items-center gap-3 ">
          <FileText className="w-5 h-5 text-[#9e00b7] " />
          <h1 className="text-xl font-semibold">Analysis Results</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <FileText className="w-9 h-9 " />
              <p>Upload a resume and click "Review Resume" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
              <Remark>{content}</Remark>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewResume;

import React, { useState } from "react";
import { Eraser, Scissors, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { removeObject } from "../API/api";
import toast from "react-hot-toast";

function RemoveObject() {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: removeObject,
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

      if (object.split(" ").length > 1) {
        setIsLoading(false)
        return toast("Please enter only one object name");
      }

      const fromData = new FormData();
      fromData.append("image", input);
      fromData.append("object", object);

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
          <Sparkles className="w-6 text-[#00d5ff]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload image</p>

        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full p-2 px-3 mt-3 outline-0 text-sm rounded-md border border-gray-300 text-gray-600"
        />

        <p className="mt-6 text-sm font-medium">
          Describe object name to remove
        </p>

        <textarea
          rows={4}
          required
          onChange={(e) => setObject(e.target.value)}
          value={object}
          placeholder="e.g watch or spoon , only single object name"
          className="w-full p-2 px-3 mt-3 outline-0 text-sm rounded-md border border-gray-300"
        />

        <button
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#41f6f3] to-[#00bcbc] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {isLoading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Scissors className="w-5 " />
          )}
          Remove object
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4  rounded-lg flex flex-col  min-h-96 relative border border-gray-700 bg-black/10  backdrop-blur-xs">
        <div className="flex items-center gap-3 ">
          <Scissors className="w-5 h-5 text-[#00a3a3] " />
          <h1 className="text-xl  font-semibold">Proceeded image</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className="w-9 h-9 " />
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <img src={content} alt="image" className="mt-3 w-full h-full" />
        )}

        {content && (
          <button
            className="cursor-pointer bg-gradient-to-r from-[#00AD25] to-[#04FF50] px-4 py-2 text-white rounded-3xl mt-2 text-left absolute right-3 bottom-4   "
            onClick={() => handleDownload(content)}
          >
            {" "}
            Download
          </button>
        )}
      </div>
    </div>
  );
}

export default RemoveObject;

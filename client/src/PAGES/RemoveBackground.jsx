import React, { useState } from "react";
import { Eraser, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeImageBackground } from "../API/api";

function RemoveBackground() {
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: removeImageBackground,
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
      const fromData = new FormData();
      fromData.append("image", input);

      mutate(fromData);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDownload = async (content) => {
    const response = await fetch(content, {
      mode: "cors",
    });

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `Snappy_ai_img_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-400">
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 rounded-lg border border-gray-700 bg-black/10  backdrop-blur-xs"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload image</p>

        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full p-2 px-3 mt-3 outline-0 text-sm rounded-md border border-gray-300 text-gray-600"
        />

        <p className="text-xs text-gray-500 font-light mt-1">
          Support JPG, PNG, and other image formats
        </p>

        <button
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#f6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {isLoading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Eraser className="w-5 " />
          )}
          Remove background
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4 rounded-lg flex flex-col  min-h-96 relative border border-gray-700 bg-black/10  backdrop-blur-xs">
        <div className="flex items-center gap-3 ">
          <Eraser className="w-5 h-5 text-[#FF4938] " />
          <h1 className="text-xl font-semibold">Proceeded image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Eraser className="w-9 h-9 " />
              <p>
                Upload an image and click "Remove Background" to get started
              </p>
            </div>
          </div>
        ) : (
          <img src={content} alt="images" className="w-full h-full mt-3" />
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

export default RemoveBackground;

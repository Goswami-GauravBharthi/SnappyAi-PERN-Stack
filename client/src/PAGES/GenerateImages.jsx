import { Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { GenerateImage } from "../API/api";

function GenerateImages() {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: GenerateImage,
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
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

      mutate({ prompt, publish });
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
        className="w-full max-w-lg p-4  rounded-lg border border-gray-700 bg-black/10  backdrop-blur-xs"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Describe Your Image</p>

        <textarea
          rows={4}
          required
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Describe what you want to see in the image..."
          className="w-full p-2 px-3 mt-3 outline-0 text-sm rounded-md border border-gray-300"
        />

        <p className="mt-6 text-sm font-medium">Style</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {imageStyle.map((item, index) => (
            <span
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === item
                  ? `bg-green-50 text-green-700`
                  : `text-gray-500 border-gray-300`
              }`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="my-6 flex   items-center gap-2">
          <label className="relative  cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer "
            />

            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>

            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make this image Public</p>
        </div>

        <button
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {isLoading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Image className="w-5 " />
          )}
          Generate image
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4  rounded-lg flex flex-col  min-h-96 border border-gray-700 bg-black/10  backdrop-blur-xs ">
        <div className="flex items-center gap-3 ">
          <Image className="w-5 h-5 text-[#00AD25] " />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Image className="w-9 h-9 " />
              <p>Enter a topic and click “Generate image ” to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full relative ">
            <img src={content} alt="images" className="w-full h-full" />
            <button
              className="cursor-pointer bg-gradient-to-r from-[#00AD25] to-[#04FF50] px-4 py-2 text-white rounded-3xl mt-2 text-left absolute right-3 bottom-4   "
              onClick={() => handleDownload(content)}
            >
              {" "}
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerateImages;

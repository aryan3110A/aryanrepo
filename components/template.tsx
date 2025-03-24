import { Settings } from "lucide-react";
import Image from "next/image";

// Sample data for the templates
const templates = [
  {
    id: 1,

    image: "/templates/t1.png",
    model: "FLUX.1 Schnell",
    tokenUse: "45 Credits",
    time: "18 seconds",
    prompt:
      "A fierce cyberpunk warrior woman with glowing blue eyes and silver hair, holding neon-etched swords. Wears sleek futuristic armor, standing in a vibrant neon-lit city street at night. Highly detailed, dynamic pose, sci-fi atmosphere with a dark, edgy aesthetic.",
  },
  {
    id: 2,
    image: "/templates/t2.png",
    model: "Flux - dev",
    tokenUse: "30 credits",
    time: "20 seconds",
    prompt:
      "A vibrant 3D animated scene of joyful kids and cute animal characters in colorful, glowing outfits. Features a tiger, rabbit, bird, and monkey with big expressive eyes and playful poses. Bright blue sky, fluffy clouds, dynamic, fun atmosphere, highly detailed and stylized.",
  },
  {
    id: 3,
    image: "/templates/t3.png",
    model: "Stable Diffusion large",
    tokenUse: "30 credits",
    time: "17 seconds",
    prompt:
      "A luxurious glass dropper bottle filled with golden serum, surrounded by fresh orange slices and green leaves. The scene is vibrant and natural, highlighting the citrus ingredients and purity of the product. Bright, high-quality, minimal composition with a focus on skincare and wellness.",
  },
];

export default function TextGenerationTemplate() {
  return (
    <div className=" pb-10 w-full min-h-screen bg-gradient-to-b from-black via-black to-black text-white relative overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[5%] w-[80vw] h-[80vw] rounded-full bg-black-600/20 blur-[10vw]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-black-600/20 blur-[10vw]"></div>
      </div>

      {/* Main content container */}
      <div className="w-full max-w-[100%] mx-auto pt-[10vh] px-[5vw]">
        {/* Header section with background image and input */}
        <div className="w-full relative mb-[5vh] rounded-[2vw] overflow-hidden">
          {/* Background image */}
          <div className="w-full h-[30vh] relative rounded-[2vw] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
            <Image
              src="/templates/maintemp.png"
              alt="AI Robot"
              fill
              className="w-[100%] h-auto"
            />

            {/* Center txt logo */}
            <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-[8vh] font-bold text-white/80 pointer-events-none z-20">
              txt
            </div>
          </div>

          {/* Input and buttons - positioned at the bottom of the image */}
        </div>

        <div className="absolute font-poppins -mt-[9vh] left-[50%] transform -translate-x-[50%] w-[60%] max-w-[800px] flex items-center gap-[1vw] z-30">
          {/* Input Wrapper */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Select a prompt..."
              className="w-full bg-[#262626] text-white rounded-full h-[8vh] py-[1.5vh] px-[2vw] outline-none border-none backdrop-blur-md placeholder-gray-500"
            />

            {/* Generate Button (Inside Input) */}
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] transition-all rounded-full py-[1.5vh] px-[3vw] flex items-center gap-[0.5vw]">
              <span className="text-xl">Generate</span>
            </button>
          </div>

          {/* Settings Button */}
          <button className="bg-[#262626] hover:bg-black/70 transition-colors backdrop-blur-md rounded-full p-[2vh] flex items-center justify-center">
            <Settings className="w-[4vh] h-[4vh]" />
          </button>
        </div>

        {/* Heading */}
        <div className="mb-[5vh] mt-[10vh] font-poppins">
          <h1 className="text-[4vh] font-bold mb-[1vh]">
            Explore. Copy. Generate.
          </h1>
          <p className="text-[2vh] text-gray-300">
            Professional-quality results, no guesswork—just pick, prompt, and
            create
          </p>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3vh] w-full">
          {/* First row - 2 templates */}
          <TemplateCard template={templates[0]} />
          <TemplateCard template={templates[1]} />

          {/* Second row - 1 template centered */}
          <div className="md:col-span-2 flex justify-center">
            <div className="w-full md:w-[50%]">
              <TemplateCard template={templates[2]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Template card component
interface TemplateCardProps {
  template: {
    id: number;
    image: string;
    model: string;
    tokenUse: string;
    time: string;
    prompt: string;
  };
}

function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="bg-black/30 backdrop-blur-md rounded-[0.5vw] overflow-hidden border border-[#969696] relative ">
      {/* Diamond badge */}
      <div className="absolute top-0 right-0 bg-blue-500 p-[2vh] rounded-bl-[30vw] z-30">
        <div className="w-[2vh] h-[2vh]">💎</div>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="w-[55%]  aspect-square relative overflow-hidden p-[3%]">
          <div className="w-full h-full relative">
            <Image
              src={template.image || "/placeholder.svg"}
              alt={`Template ${template.id}`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content section */}
        <div className="w-full md:w-[60%]  p-[2vh] pt-[3vh] font-poppins ">
          {/* Model info */}
          <div className="mb-[1vh]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[2vh]">Model: {template.model}</h3>
            </div>
            <div className=" items-center justify-between text-[1.6vh] text-gray-300 mt-[0.5vh]">
              <div>Token use: {template.tokenUse} ✨</div>
              <div>Time - {template.time}</div>
            </div>
          </div>

          {/* Prompt */}
          <div className="font-poppins">
            <h4 className="font-bold text-[1.8vh] mb-[1vh]">Prompt</h4>
            <p className="text-[1.8vh] text-gray-300 leading-[1.4] pr-[4vw]">
              {template.prompt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

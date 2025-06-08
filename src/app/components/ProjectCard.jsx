import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  return (
    <div className="bg-[#181818] rounded-xl overflow-hidden">
      <div className="h-52 md:h-72 relative group overflow-hidden">
        <img 
          src={imgUrl} 
          alt={title}
          className="w-full h-full object-contain bg-[#181818]"
        />
        
        {/* Overlay */}
        <div className="overlay absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          
          {/* Botão GitHub */}
          <Link
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 w-14 mr-4 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link bg-[#181818] flex items-center justify-center"
          >
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] group-hover/link:text-white" />
          </Link>

          {/* Botão Preview */}
          <Link
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link bg-[#181818] flex items-center justify-center"
          >
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] group-hover/link:text-white" />
          </Link>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="text-white p-6">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
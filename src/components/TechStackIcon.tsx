import React from 'react';
import { SiProxmox, SiDocker, SiCloudflare } from "react-icons/si";
import { DiLinux, DiNginx, DiPython, DiReact } from "react-icons/di";

const iconMap: Record<string, React.ReactNode> = {
  SiProxmox: <SiProxmox className="text-[#E57000]" />,
  SiDocker: <SiDocker className="text-blue-500" />,
  SiCloudflare: <SiCloudflare className="text-orange-500" />,
  DiLinux: <DiLinux className="text-yellow-200" />,
  DiNginx: <DiNginx className="text-green-400" />,
  DiPython: <DiPython className="text-yellow-300" />,
  DiReact: <DiReact className="text-blue-500" />,
};

export default function TechStackIcon({ iconName, className = "" }: { iconName: string, className?: string }) {
  return (
    <div className={`flex items-center justify-center [&>svg]:w-full [&>svg]:h-full ${className}`}>
      {iconMap[iconName] || null}
    </div>
  );
}

import React from 'react';
import { SiProxmox, SiDocker, SiCloudflare, SiKubernetes, SiTerraform, SiGo, SiPrometheus, SiNginx, SiPython, SiReact } from "react-icons/si";
import { DiLinux } from "react-icons/di";
import { FaAws } from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  SiKubernetes: <SiKubernetes className="text-[#326CE5]" />,
  SiTerraform: <SiTerraform className="text-[#844FBA]" />,
  FaAws: <FaAws className="text-[#FF9900]" />,
  SiDocker: <SiDocker className="text-[#2496ED]" />,
  SiGo: <SiGo className="text-[#00ADD8]" />,
  SiPrometheus: <SiPrometheus className="text-[#E6522C]" />,
  DiLinux: <DiLinux className="text-yellow-200" />,
  SiCloudflare: <SiCloudflare className="text-orange-500" />,
  // Legacy backups
  SiProxmox: <SiProxmox className="text-[#E57000]" />,
  SiNginx: <SiNginx className="text-green-400" />,
  SiPython: <SiPython className="text-yellow-300" />,
  SiReact: <SiReact className="text-[#61DAFB]" />,
};

export default function TechStackIcon({ iconName, className = "" }: { iconName: string, className?: string }) {
  return (
    <div className={`flex items-center justify-center [&>svg]:w-full [&>svg]:h-full ${className}`}>
      {iconMap[iconName] || null}
    </div>
  );
}

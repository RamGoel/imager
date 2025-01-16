import { Expand, ImageOff } from "lucide-react";

export interface Tool {
  name: string;
  description: string;
  slug: string;
  icon: React.ElementType;
}

export const tools: Tool[] = [
  {
    name: "Image Resizer",
    description: "Resize your image to any size",
    slug: "resize",
    icon: Expand,
  },
  {
    name: "Remove Background",
    description: "Remove the background of your image",
    slug: "remove-bg",
    icon: ImageOff,
  },
];

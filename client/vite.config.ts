import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
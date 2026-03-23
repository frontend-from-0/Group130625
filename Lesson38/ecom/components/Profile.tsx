"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from 'next/image';

const FALLBACK_AVATAR = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%234f46e5'/%3E%3Cpath d='M50 45c7.5 0 13.64-6.14 13.64-13.64S57.5 17.72 50 17.72s-13.64 6.14-13.64 13.64S42.5 45 50 45zm0 6.82c-9.09 0-27.28 4.56-27.28 13.64v3.41c0 1.88 1.53 3.41 3.41 3.41h47.74c1.88 0 3.41-1.53 3.41-3.41v-3.41c0-9.08-18.19-13.64-27.28-13.64z' fill='%23fff'/%3E%3C/svg%3E`;

export default function Profile() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 w-full bg-white/[0.03] rounded-2xl p-4 border border-white/[0.06]">
        <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-white/10 rounded-full animate-pulse w-2/3" />
          <div className="h-3 bg-white/10 rounded-full animate-pulse w-1/2" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 w-full bg-white/[0.03] rounded-2xl p-4 border border-white/[0.06]">
      <div className="relative shrink-0">
        <div className="p-[2px] rounded-full bg-gradient-to-br from-blue-400 to-violet-500">
          <Image
            src={user.picture || FALLBACK_AVATAR}
            alt={user.name || "User"}
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-full object-cover bg-slate-900 block"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_AVATAR;
            }}
          />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#060812]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{user.name}</p>
        <p className="text-slate-400 text-xs truncate mt-0.5">{user.email}</p>
      </div>
      <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/20 font-medium">
        Active
      </span>
    </div>
  );
}
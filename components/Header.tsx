import React from "react";
import Image from "next/image";
import {
  BeakerIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

import {
  BellIcon,
  PlusIcon,
  SparklesIcon,
  VideoCameraIcon,
  GlobeAltIcon,
  VideoCameraSlashIcon,
  ChatBubbleBottomCenterIcon,
  PlusCircleIcon,
  Bars3Icon,
  SpeakerXMarkIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/20/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();
  return (
    //Link prefetches page, and as a esult it loads faster
    <div className="sticky top-0 z-50 flex bg-blue-500 px-4 py-2 items-center shadow-sm">
      <div className="relative h-20 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image
            objectFit="contain"
            src="https://joker-uploads.s3.ap-southeast-2.amazonaws.com/pinguvin.png"
            layout="fill"
            alt="post"
          />
        </Link>
      </div>
      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5 text-black" />
        <p className="ml-2 hidden flex-1 lg:inline text-black">Home</p>
        <ChevronDownIcon className="h-5 w-5 text-black" />
      </div>
      <form className="flex flex-1 h-10 w-20 items-center space-x-2 rounded bg-white border border-gray-200 px-3 py-1">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none text-black"
        />
        <button type="submit" />
      </form>

      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeAltIcon className="icon" />
        <VideoCameraSlashIcon className="icon" />
        <hr className="h-10 border text-gray-500" />
        <ChatBubbleBottomCenterIcon className="icon" />
        <PlusCircleIcon className="icon" />
        <SpeakerXMarkIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <Bars3Icon className="icon" />
      </div>

      {/* Sign in/ Sign out button*/}
      {session ? (
        <div
          onClick={() => signOut()}
          className=" cursor-pointer items-center space-x-2 border border-black p-2 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <UsersIcon className="text-black h-6 w-5 lg:w-9 lg:h-8 cursor-pointer rounded-sm lg:p-1 lg:hover:text-3xl" />
          </div>
          <div className="p-2 flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>{" "}
            {/*optional chaining -- if user undefined or session undefined it will not throw an error it will just handle it */}
            <p className="text-black">1 Karma</p>
          </div>

          <ChevronDownIcon className="h-5 flex-shrink-0 text-black" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className=" cursor-pointer items-center space-x-2 border border-black p-2 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <UsersIcon className="text-black h-6 w-5 lg:w-9 lg:h-8 cursor-pointer rounded-sm lg:p-1 " />
          </div>
          <p className="text-black">Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;

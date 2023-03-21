import { Fragment, type SyntheticEvent, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  HiOutlineBell as BellIcon,
  HiOutlineMenu as MenuIcon,
  HiOutlineX as XIcon,
  HiOutlineSearch as SearchIcon,
} from "react-icons/hi";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "@/jotai/user";
import { navLinksAtom, showUserAchievementsAtom } from "@/jotai/navlinks";
import { signOut } from "next-auth/react";
import RightSection from "./RightSection";
import LeftSection from "./LeftSection";
import { useRouter } from "next/router";
import AddAchievementModal from "../AddAchievementModal/AddAchievementModal";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashWrapper() {
  const [user, setUser] = useAtom(userAtom);
  const [navLinks, setNavLinks] = useAtom(navLinksAtom);
  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [showUserAchievements, setShowUserAchievement] = useAtom(
    showUserAchievementsAtom
  );
  const router = useRouter();

  function changeNavLinksToTrue(e: SyntheticEvent, link: string) {
    e.preventDefault();
    // setNavLinks((prev) => {
    //   return {
    //     ...prev,
    //     [link]: true,
    //   };
    // });
    const newlinks = navLinks.map((item) => {
      if (item.link === link) {
        return {
          ...item,
          active: true,
        };
      } else {
        return {
          ...item,
          active: false,
        };
      }
    });
    setNavLinks(newlinks);
  }

  return (
    <>
      {showAddAchievement && (
        <AddAchievementModal
          open={showAddAchievement}
          setOpen={setShowAddAchievement}
        />
      )}
      <div className="min-h-screen bg-gray-100">
        <Popover
          as="header"
          className="bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-24"
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex items-center justify-center py-5 lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 flex-shrink-0 lg:static">
                    <a>
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                        alt="Workflow"
                      />
                    </a>
                  </div>

                  {/* Right section on desktop */}
                  <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                    <button
                      type="button"
                      className="flex-shrink-0 rounded-full p-1 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                              <span className="sr-only">Open user menu</span>
                              {user && user.image ? (
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={user.image}
                                  alt="User Profile"
                                />
                              ) : (
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src=""
                                  alt="User Profile"
                                />
                              )}
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="absolute -right-2 z-40 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Settings
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block cursor-pointer px-4 py-2 text-sm text-gray-700"
                                    )}
                                    onClick={() => signOut()}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>

                  {/* Search */}
                  <div className="min-w-0 flex-1 px-12 lg:hidden">
                    <div className="mx-auto w-full max-w-xs">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-white focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <SearchIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-white focus:border-transparent focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                          placeholder="Search"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Menu button */}
                  <div className="absolute right-0 flex-shrink-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                  <div className="grid grid-cols-3 items-center gap-8">
                    <div className="col-span-2">
                      <nav className="flex cursor-pointer space-x-4">
                        {navLinks.map((link) => (
                          <a
                            key={link.title}
                            className={classNames(
                              link.active ? "text-white" : "text-indigo-100",
                              "rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                            )}
                            onClick={async (e) => {
                              if (link.title === "Your Achievements") {
                                changeNavLinksToTrue(e, link.title);
                                setShowUserAchievement(true);
                              } else if (link.title === "Add Achievement") {
                                changeNavLinksToTrue(e, link.title);
                                setShowUserAchievement(false);
                                setShowAddAchievement(true);
                              } else {
                                changeNavLinksToTrue(e, link.title);
                                setShowUserAchievement(false);
                                await router.push(link.link);
                              }
                            }}
                            aria-current={link.active ? "page" : "false"}
                          >
                            {link.title}
                          </a>
                        ))}
                      </nav>
                    </div>
                    <div>
                      <div className="mx-auto w-full max-w-md">
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-white focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="search"
                            className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-white focus:border-transparent focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="Search"
                            type="search"
                            name="search"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Transition.Root show={open} as={Fragment}>
                <div className="lg:hidden">
                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay
                      static
                      className="fixed inset-0 z-20 bg-black bg-opacity-25"
                    />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      static
                      className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                    >
                      <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="pt-3 pb-2">
                          <div className="flex items-center justify-between px-4">
                            <div>
                              <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                              />
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Close menu</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </Popover.Button>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1 px-2">
                            {navLinks.map((link) => (
                              <a
                                key={link.title}
                                className={classNames(
                                  link.active
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-gray-900",
                                  "block rounded-md py-2 px-3 text-base font-medium"
                                )}
                                onClick={async (e) => {
                                  if (link.title === "Your Achievements") {
                                    changeNavLinksToTrue(e, link.title);
                                    setShowUserAchievement(true);
                                  } else if (link.title === "Add Achievement") {
                                    changeNavLinksToTrue(e, link.title);
                                    setShowUserAchievement(false);
                                    setShowAddAchievement(true);
                                  } else {
                                    changeNavLinksToTrue(e, link.title);
                                    setShowUserAchievement(false);
                                    await router.push(link.link);
                                  }
                                }}
                                aria-current={link.active ? "page" : "false"}
                              >
                                {link.title}
                              </a>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 pb-2">
                          <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                              {user && user.image ? (
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={user.image}
                                  alt="User Profile"
                                />
                              ) : (
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                  alt="User Profile"
                                />
                              )}
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                              <div className="truncate text-base font-medium text-gray-800">
                                {user && user.name ? user.name : "User Name"}
                              </div>
                              <div className="truncate text-sm font-medium text-gray-500">
                                {user && user.email ? user.email : "User Email"}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1 px-2">
                            <a className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                              Your Profile
                            </a>
                            <a className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                              Settings
                            </a>
                            <a
                              onClick={() => signOut()}
                              className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                            >
                              Sign out
                            </a>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Achievements Section</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="max-h-96 min-h-[80vh] overflow-auto rounded-lg bg-white shadow">
                    <div>
                      <LeftSection />
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Profile Section
                  </h2>
                  <div className="min-h-[20vh] overflow-hidden rounded-lg bg-white shadow">
                    <div className="py-6 px-6">
                      <RightSection />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">
                &copy; 2023 HallOfFame IGDTUW.
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

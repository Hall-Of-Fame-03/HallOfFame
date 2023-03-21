import { type ChangeEvent, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-hot-toast";
import { shrinkAndResizeImage } from "@/utils/resizeImage";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export default function SignUpWrapper() {
  const createUserMutation = api.user.createUser.useMutation();
  const router = useRouter();
  const [userdata, setUserdata] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState<
    string | ArrayBuffer | null
  >();
  function handleProfileImageChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
    }
  }

  const handleSignup = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userdata.name || !userdata.email || !userdata.password) {
      return toast.error("Please fill all the fields");
    }
    const resizedImage = await shrinkAndResizeImage(
      profileImage as string,
      200,
      200
    );
    toast.loading("Creating your account...");
    const res = await createUserMutation.mutateAsync({
      avatar: resizedImage,
      email: userdata.email,
      name: userdata.name,
      password: userdata.password,
    });
    toast.dismiss();
    if (res.success) {
      toast.success("Account created successfully");
      await router.push("/auth/login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-50">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={userdata.name}
                  onChange={(e) =>
                    setUserdata({ ...userdata, name: e.target.value })
                  }
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userdata.email}
                  onChange={(e) =>
                    setUserdata({ ...userdata, email: e.target.value })
                  }
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={userdata.password}
                  onChange={(e) =>
                    setUserdata({ ...userdata, password: e.target.value })
                  }
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="profileImage"
                className="mb-2 block font-bold text-gray-700"
              >
                Profile Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="profileImage"
                  className="absolute inset-0 h-full w-full opacity-0"
                  onChange={handleProfileImageChange}
                  accept="image/*"
                  required
                />
                {profileImage ? (
                  <img
                    src={profileImage as string}
                    alt="Profile"
                    className="mx-auto h-32 w-32 rounded-full"
                  />
                ) : (
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full">
                    <CgProfile className="h-32 w-32 text-4xl text-gray-300" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

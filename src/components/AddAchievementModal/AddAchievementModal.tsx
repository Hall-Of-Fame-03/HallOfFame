import {
  type ChangeEvent,
  Fragment,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CgImage } from "react-icons/cg";
import Select from "react-select";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { shrinkAndResizeImage } from "@/utils/resizeImage";

const tagsdata = {
  tags: [
    { label: "🔬 Research" },
    { label: "👑 Leadership" },
    { label: "🙏 Volunteering" },
    { label: "💼 Internship" },
    { label: "💻 Hackathon" },
    { label: "🎓 Placement" },
    { label: "🎓 Certification" },
    { label: "📝 Project" },
    { label: "🔨 Workshop" },
    { label: "📝 Quiz" },
    { label: "🏆 Competition" },
    { label: "📚 Scholarship" },
    { label: "💭 Other" },
  ],
};

type AddAchievementModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function AddAchievementModal({
  open,
  setOpen,
}: AddAchievementModalProps) {
  const cancelButtonRef = useRef(null);
  const addAchievementMutation = api.post.createPost.useMutation();
  const [data, setData] = useState({
    title: "",
    achievementDescription: "",
    category: "",
    issuerOrganization: "",
    issueDate: "",
  });
  const [tags, setTags] = useState<string[]>();
  const [postImage, setPostImage] = useState<string | ArrayBuffer | null>();
  function handleProfileImageChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPostImage(reader.result);
      };
    }
  }

  async function handleAddAchievement(event: SyntheticEvent): Promise<void> {
    event.preventDefault();
    if (!tags) {
      toast.error("Please select at least one tag");
      return;
    } else if (!postImage) {
      toast.error("Please select an image");
      return;
    } else if (
      !data.title ||
      !data.achievementDescription ||
      !data.category ||
      !data.issuerOrganization ||
      !data.issueDate
    ) {
      toast.error("Please fill all the fields");
      return;
    } else {
      const shrinkedImage = await shrinkAndResizeImage(
        postImage as string,
        300,
        600
      );
      toast.loading("Adding achievement...");
      const response = await addAchievementMutation.mutateAsync({
        title: data.title,
        achievementDescription: data.achievementDescription,
        category: data.category,
        issuerOrganization: data.issuerOrganization,
        issueDate: data.issueDate,
        tag: tags[0] as string,
        image: shrinkedImage,
      });
      if (!response.success) {
        toast.dismiss();
        toast.error(response.message);
      } else {
        toast.dismiss();
        toast.success("Achievement added successfully");
        setOpen(false);
      }
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                      <form className="space-y-6">
                        <div>
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Title
                          </label>
                          <div className="mt-1">
                            <input
                              id="title"
                              name="title"
                              type="text"
                              autoComplete="title"
                              required
                              value={data.title}
                              onChange={(e) =>
                                setData({ ...data, title: e.target.value })
                              }
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="achievementDescription"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Achievement Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="achievementDescription"
                              title="achievementDescription"
                              autoComplete="achievementDescription"
                              required
                              value={data.achievementDescription}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  achievementDescription: e.target.value,
                                })
                              }
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Category
                          </label>
                          <div className="mt-1">
                            <input
                              id="category"
                              title="category"
                              type="text"
                              autoComplete="category"
                              required
                              value={data.category}
                              onChange={(e) =>
                                setData({ ...data, category: e.target.value })
                              }
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="issuerorganization"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Issuer Organization
                          </label>
                          <div className="mt-1">
                            <input
                              id="issuerorganization"
                              title="issuerorganization"
                              type="text"
                              autoComplete="issuer"
                              required
                              value={data.issuerOrganization}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  issuerOrganization: e.target.value,
                                })
                              }
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="issuedate"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Issue Date
                          </label>
                          <div className="mt-1">
                            <input
                              id="issuedate"
                              title="issuedate"
                              type="date"
                              autoComplete="issuedate"
                              required
                              value={data.issueDate}
                              onChange={(e) =>
                                setData({ ...data, issueDate: e.target.value })
                              }
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="tags"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tags
                          </label>
                          <div className="mt-1">
                            <Select
                              isMulti={true}
                              options={tagsdata.tags}
                              onChange={(e) => {
                                const newtags = e.map((tag) => tag.label);
                                setTags(newtags);
                              }}
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
                            {postImage ? (
                              <img
                                src={postImage as string}
                                alt="Profile"
                                className="mx-auto h-32 w-auto rounded-md"
                              />
                            ) : (
                              <div className="mx-auto flex h-32 w-auto items-center justify-center rounded-md">
                                <CgImage className="h-32 w-32 text-4xl text-gray-300" />
                              </div>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    onClick={handleAddAchievement}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  >
                    Create Achievement
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

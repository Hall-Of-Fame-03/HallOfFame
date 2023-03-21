import { Fragment, type SyntheticEvent, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";

type CommentsModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  postid: string;
};

export default function CommentsModal({
  open,
  setOpen,
  postid,
}: CommentsModalProps): JSX.Element {
  const fetchAllCommentOfPost = api.post.getAllCommentOfPost.useQuery({
    postid,
  });
  const cancelButtonRef = useRef(null);
  const [comment, setComment] = useState("");
  const createCommentMutation = api.user.createCommentToPost.useMutation();

  async function addCommentHandler(event: SyntheticEvent): Promise<void> {
    event.preventDefault();
    if (comment === "") {
      toast.error("Comment cannot be empty");
      return;
    } else {
      toast.loading("Adding Comment...");
      const res = await createCommentMutation.mutateAsync({
        comment,
        postId: postid,
      });
      if (res.success) {
        toast.dismiss();
        toast.success("Comment Added");
        setOpen(false);
      } else {
        toast.dismiss();
        toast.error("Error Occured");
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
                              onChange={(e) => setComment(e.target.value)}
                              value={comment}
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/** show comments with the user name, email and comments */}
                {fetchAllCommentOfPost?.data &&
                  fetchAllCommentOfPost?.data.comments.map((comment) => (
                    <div key={comment.id}>
                      <div className="my-4 ml-8 flex max-h-96 items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              comment.User && comment.User.image
                                ? comment.User.image
                                : ""
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {comment.User && comment.User.name
                              ? comment.User.name
                              : ""}
                            <span className="ml-4">
                              {comment.User && comment.User.email
                                ? comment.User.email
                                : ""}
                            </span>
                          </div>
                          <div className="text-md font-bold text-gray-500">
                            {comment.comment}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={addCommentHandler}
                  >
                    Add Comment
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

import { showUserAchievementsAtom } from "@/jotai/navlinks";
import { api } from "@/utils/api";
import { useAtom, useAtomValue } from "jotai";
import { type SyntheticEvent, useState } from "react";
import { VscEmptyWindow } from "react-icons/vsc";
import { HiOutlineChatAlt } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { userAtom } from "@/jotai/user";
import CommentsModal from "../AddCommentsModal/AddCommentsModal";

export default function LeftSection() {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [user, setUser] = useAtom(userAtom);
  const showUserAchievements = useAtomValue(showUserAchievementsAtom);
  const posts = api.post.getPosts.useQuery({
    limit,
    page,
    useremail: showUserAchievements,
  });
  const [showAddCommentModal, setShowAddCommentModal] = useState({
    show: false,
    postid: "",
  });
  const listOfFollowers = api.user.listOfFollowers.useQuery({});
  const addLikeMutation = api.post.addliketopost.useMutation();
  const followUserMutation = api.user.followUser.useMutation();
  const unfollowUserMutation = api.user.unfollowUser.useMutation();
  const removeLikeMutation = api.post.removelikefrompost.useMutation();

  async function addliketopost(e: SyntheticEvent, postid: string) {
    e.preventDefault();
    toast.loading("Liking...");
    const res = await addLikeMutation.mutateAsync({
      postid,
    });
    if (res.success) {
      toast.dismiss();
      toast.success("Liked");
    } else {
      toast.dismiss();
      toast.error("Error Occured");
    }
  }

  async function removelikefrompost(e: SyntheticEvent, likeid: string) {
    e.preventDefault();
    toast.loading("Unliking...");
    const res = await removeLikeMutation.mutateAsync({
      likeid,
    });
    if (res.success) {
      toast.dismiss();
      toast.success("Unliked");
    } else {
      toast.dismiss();
      toast.error("Error Occured");
    }
  }

  async function followUser(e: SyntheticEvent, useremail: string) {
    e.preventDefault();
    toast.loading("Following...");
    const res = await followUserMutation.mutateAsync({
      userEmail: useremail,
    });
    if (res.success) {
      toast.dismiss();
      toast.success("Followed");
    } else {
      toast.dismiss();
      toast.error("Error Occured");
    }
  }

  async function unfollowUser(e: SyntheticEvent, useremail: string) {
    e.preventDefault();
    toast.loading("Unfollowing...");
    const res = await unfollowUserMutation.mutateAsync({
      userEmail: useremail,
    });
    if (res.success) {
      toast.dismiss();
      toast.success("Unfollowed");
    } else {
      toast.dismiss();
      toast.error("Error Occured");
    }
  }

  if (user === null) {
    return null;
  }

  return (
    <>
      {showAddCommentModal.show && (
        <CommentsModal
          open={showAddCommentModal.show}
          setOpen={(e) => {
            setShowAddCommentModal({
              ...showAddCommentModal,
              show: e,
            });
          }}
          postid={showAddCommentModal.postid}
        />
      )}
      <div className="relative bg-white px-4 pt-4 pb-20 sm:px-6 lg:px-8 lg:pt-8 lg:pb-14">
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-1">
            {posts.data?.posts.length ? (
              posts.data.posts.map((post) => {
                const haveYouLikedThis = post.Like.find(
                  (like) =>
                    like.User.email === user.email && like.postId === post.id
                );
                const haveYouFollowedThis =
                  listOfFollowers.data?.following.find(
                    (follower) => follower.email === post.User!.email
                  );
                console.log(haveYouFollowedThis, "haveYouFollowedThis");
                return (
                  <>
                    <div
                      key={post.title}
                      className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="h-48 w-full object-cover"
                          src={post.imageurl || "https://picsum.photos/200"}
                          alt={post.title}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between bg-white p-6">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-indigo-600">
                            <a className="hover:underline">{post.category}</a>
                          </p>
                          <a className="mt-2 block">
                            <p className="text-xl font-semibold text-gray-900">
                              {post.title}
                            </p>
                            <p className="mt-3 text-base text-gray-500">
                              {post.achievementDescription}
                            </p>
                          </a>
                        </div>
                        <div className="mt-6 flex items-center">
                          <div className="flex-shrink-0">
                            <a>
                              <span className="sr-only">
                                {post.User && post.User.name}
                              </span>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={
                                  post.User && post.User.image
                                    ? post.User.image
                                    : "https://picsum.photos/200"
                                }
                                alt={
                                  post.User && post.User.name
                                    ? post.User.name
                                    : "https://picsum.photos/200"
                                }
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              <a className="hover:underline">
                                {post.User && post.User.name}
                              </a>
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              <a className="hover:underline">
                                {post.User && post.User.email}
                              </a>
                            </p>
                            <p className="mt-3 text-sm font-medium text-gray-900">
                              {haveYouFollowedThis ? (
                                <button
                                  onClick={async (e) => {
                                    await unfollowUser(e, post.User!.email!);
                                  }}
                                  className="rounded-full bg-blue-100 px-2 font-bold text-indigo-600 hover:bg-blue-100"
                                >
                                  Following
                                </button>
                              ) : (
                                <button
                                  onClick={async (e) => {
                                    await followUser(e, post.User!.email!);
                                  }}
                                  className="rounded-full bg-purple-100 px-2 font-bold text-purple-700 hover:bg-purple-100"
                                >
                                  Follow
                                </button>
                              )}
                            </p>
                          </div>
                          <div className="flex-grow" />
                          <div className="flex-shrink-0">
                            <div
                              className="mt-4"
                              onClick={async (e) => {
                                if (haveYouLikedThis) {
                                  await removelikefrompost(
                                    e,
                                    haveYouLikedThis.id
                                  );
                                } else {
                                  await addliketopost(e, post.id);
                                }
                              }}
                            >
                              <p className="text-md flex items-center justify-center font-medium text-gray-500">
                                {haveYouLikedThis ? (
                                  <>
                                    <AiFillHeart
                                      size={20}
                                      className="text-red-500"
                                    />
                                    <span className="ml-2 text-red-500">
                                      {post.Like.length}
                                    </span>
                                  </>
                                ) : (
                                  <AiOutlineHeart size={20} />
                                )}
                              </p>
                            </div>
                            <div
                              onClick={() =>
                                setShowAddCommentModal({
                                  show: true,
                                  postid: post.id,
                                })
                              }
                              className="mt-4"
                            >
                              <p className="text-md flex items-center justify-center font-medium text-gray-500">
                                <HiOutlineChatAlt />: {post.Comment.length}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center bg-white">
                <VscEmptyWindow size={100} />
                <p className="text-xl font-semibold text-gray-900">
                  No posts to show
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-x-4">
          {posts.data && posts.data.hasNext && (
            <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next Page
            </button>
          )}
          {posts.data && posts.data.hasPrevious && (
            <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
            >
              Previous Page
            </button>
          )}
        </div>
      </div>
    </>
  );
}

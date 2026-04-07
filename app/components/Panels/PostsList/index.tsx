import { GET_POSTS } from "@/data/fragments";
import client from "@/lib/client";
import { Category, PostConnection, RootQueryToCategoryConnection } from "@/types/graphql";

import { removeNodes } from "@fridayagency/utils";
import PostsList from "../../PostsList";

const PostList = async () => {
  const { posts, categories } = await client.query<{
    posts: PostConnection;
    categories: RootQueryToCategoryConnection;
  }>(GET_POSTS);

  const items = posts ? removeNodes(posts) : [];

  const rawCategories = categories ? removeNodes<Category>(categories) : [];

  return <PostsList items={items} />;
};

export default PostList;

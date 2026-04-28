import { GET_AUTHOR_PAGE_DATA } from "@/data";
import client from "@/lib/client";
import {
  CareerPost,
  CareerPostConnection,
  NewsArticle,
  NewsArticleConnection,
  Post,
  PostConnection,
  User,
} from "@/types/graphql";
import { processPageUri, removeNodes } from "@fridayagency/utils";
import { NextPage } from "next";
import AuthorHero from "@/app/components/AuthorHero";
import PostsList from "@/app/components/PostsList";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [];
}

const AuthorPage: NextPage<PageParams> = async ({ params }) => {
  const { slug } = await params;
  const authorName = processPageUri(slug);
  const authorSlug = authorName?.replaceAll("/", "") ?? slug;

  try {
    const { user, posts, newsArticles, careerPosts } = await client.query<{
      user: User | null;
      posts: PostConnection;
      newsArticles: NewsArticleConnection;
      careerPosts: CareerPostConnection;
    }>(GET_AUTHOR_PAGE_DATA, {
      variables: { first: 50, authorName, userId: authorSlug },
    });

    const blogPosts = posts ? removeNodes<Post>(posts) : [];
    const newsPosts = newsArticles ? removeNodes<NewsArticle>(newsArticles) : [];
    const careerBlogPosts = careerPosts ? removeNodes<CareerPost>(careerPosts) : [];

    const allItems = [...blogPosts, ...newsPosts, ...careerBlogPosts].sort(
      (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
    );

    const firstName = (user?.name ?? slug).split(" ")[0];

    return (
      <>
        <AuthorHero author={user as User} />
        <PostsList items={allItems} title={`${firstName}'s Blogs & Articles`} />
      </>
    );
  } catch (error) {
    console.error("Error fetching author page data:", error);
    return <div>Error loading author page.</div>;
  }
};

export default AuthorPage;

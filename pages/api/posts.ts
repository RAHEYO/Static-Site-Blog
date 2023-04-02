import { NextApiHandler } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { GrayMatterFile } from "gray-matter";

import { generateGrayMatter, readFolder } from "@/lib/utils";

// Structure of PostInfo
export type PostInfoType = {
    title: string;
    description: string;
    slug: string;
}

// Desired Post Info Data for Blog Cards
export type InferredPostInfosType = PostInfoType[];

// Desired Post Data for Rendering Blog Post
export type InferredPostType = {
    postInfo: PostInfoType,
    post: MDXRemoteSerializeResult
};

const handler: NextApiHandler = (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
        const posts = readPostsAsync();
            res.json({ 
                "posts": posts
            });
            break;
    
        default:
            res.status(404).send("Not Found");
            break;
    }

}
export default handler;

export const readPostsAsync = () => {
    const { files, dirPath } = readFolder("/DemoPosts")

    return generateGrayMatter({files, dirPath});
}

export const fetchPosts = async () => {
    const { posts }: { posts: GrayMatterFile<string>[] } = await fetch("http://localhost:3000/api/posts").then(data => data.json());
    return posts;
}

export const fetchPostInfos = async () => {
    const posts = await fetchPosts();
    return posts.map(post => post.data) as InferredPostInfosType;
}
import { NextPage, GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import path from 'path';
import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import { readPostsAsync, InferredPostType, PostInfoType } from '../api/posts';

// Telling the server beforehand that we're generating dynamic routes - this single file is millions of routes
export const getStaticPaths: GetStaticPaths = () => {
    // Return all the available routes
    return {
        paths: readPostsAsync().map(grayFile => { return { params: { BlogSlug: grayFile.data.slug } } }),
        fallback: false // false will result in 404, true will give you some flexibility in how to handle it!~ @_@
    };
    
}

// Getting props from the static-paths
export const getStaticProps: GetStaticProps<InferredPostType> = async (context) => {
    const { params } = context;
    const { BlogSlug } = params as { BlogSlug: string };
    const currentBlog = readPostsAsync().find(grayFile => grayFile.data.slug == BlogSlug)!;

    const serializedContent = await serialize(currentBlog.content);

    return {
        props: {
            postInfo: currentBlog.data as PostInfoType,
            post: serializedContent
        }
    }
}

type BlogPostProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogSlug: NextPage<BlogPostProps> = ({ postInfo, post }) => {

    return (
        <div className="max-w-3xl mx-auto py-11">
            <h1 className="text-4xl font-bold text-neutral-700 mb-11">
                { postInfo.title }
            </h1>
            <article className="prose pb-20">
                <MDXRemote {...post} />
            </article>
        </div>
    );
}

export default BlogSlug;

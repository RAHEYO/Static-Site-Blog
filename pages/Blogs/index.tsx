import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

import { InferredPostInfosType, readPostsAsync } from '../api/posts';
import BlogCard from '@/components/BlogCard';


export const getStaticProps: GetStaticProps<{ postInfos: InferredPostInfosType }> = async () => {
    
    return {
        props: { postInfos: readPostsAsync().map(grayFile => grayFile.data) as InferredPostInfosType }
    };
}

type BlogsProps = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<BlogsProps> = ({ postInfos }) => {
    return (
    <div className="w-screen h-screen bg-black p-10 space-y-7">
        { 
        postInfos.map(postInfo =>
            <BlogCard 
            key={postInfo.slug}
            title={postInfo.title}
            description={postInfo.description}
            slug={postInfo.slug}
            />
        )
        }
    </div>
    );
}

export default Blogs;
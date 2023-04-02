import { FC } from 'react';
import Link from 'next/link';

type BlogCardProps = {
    title: string,
    description: string,
    slug: string
}

const BlogCard: FC<BlogCardProps> = ({ title, description, slug }): JSX.Element => {
    return (
    <div className="w-full items-center">
        <Link href={"/Blogs/" + slug}>
            <h1 className="text-white text-3xl font-bold">
                { title }
            </h1>
        </Link>

        <p className="text-gray-300">
            { description }
        </p>
    </div>
    );
};

export default BlogCard;
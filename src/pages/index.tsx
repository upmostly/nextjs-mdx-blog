import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
    BlogPostFrontmatter,
    findAllPostSlugs,
    getPath,
    loadMdxFromSlug,
} from '../utils';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
type HomeProps = {
    posts: { slug: string; data: BlogPostFrontmatter }[];
};

function PostListItem({ slug, data }: HomeProps['posts'][number]) {
    const { title, description } = data;
    return (
        <li className="card p-5 ">
            <Link href={`/posts/${slug}`}>
                <div className="text-2xl font-bold">{title}</div>
                <div>{description}</div>
            </Link>
        </li>
    );
}
export default function Home({ posts }: HomeProps) {
    console.log(posts);
    posts.sort((a, b) => {
        return (
            new Date(b.data.publishedAt).getDate() -
            new Date(a.data.publishedAt).getDate()
        );
    });
    return (
        <div className="flex min-h-screen w-full items-center justify-center dark:bg-stone-900 dark:text-white">
            <Head>
                <title>My Mdx Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="">
                <ul className="flex flex-col gap-4">
                    {posts.map((p) => (
                        <PostListItem key={p.data.title} {...p} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    // MDX text - can be from a local file, database, anywhere
    const allSlugs = await findAllPostSlugs();
    const allSources = await Promise.all(
        allSlugs.map(async (slug) => {
            const source = await loadMdxFromSlug(slug);
            return { slug, source };
        })
    );

    //We only want the slug and the frontmatter
    const posts = allSources.map(({ slug, source }) => {
        return { slug, data: source.data };
    });

    return {
        props: {
            posts,
        },
    };
};

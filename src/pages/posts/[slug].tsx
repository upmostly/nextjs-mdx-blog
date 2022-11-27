import {
    MDXRemote,
    MDXRemoteProps,
    MDXRemoteSerializeResult,
} from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { GetStaticPaths, GetStaticProps } from 'next';
import matter from 'gray-matter';
import { findAllPostSlugs, getPath } from '../../utils';
import * as fs from 'fs';

type BlogPostFrontmatter = {
    title: string;
    datePosted: Date;
};
type BlogPostProps = {
    source: MDXRemoteSerializeResult;
    frontMatter: BlogPostFrontmatter;
};
export default function BlogPost({ source, frontMatter }: BlogPostProps) {
    console.log(source);
    return (
        <div className="flex min-h-screen w-full items-center justify-center dark:bg-stone-900">
            <div className="prose prose-invert h-full w-full rounded border border-stone-700 p-10 shadow dark:bg-stone-800">
                <MDXRemote {...source} />
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // MDX text - can be from a local file, database, anywhere
    //TODO: Make a const for this
    const filePath = getPath(params?.slug as string);
    const source = fs.readFileSync(filePath);
    const { content, data } = matter(source);
    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    });
    return {
        props: {
            source: mdxSource,
            frontMatter: data,
        },
    };
    /*
    const filePath = getSketchDescriptionPath(params?.sketch as string);
    const source = fs.readFileSync(filePath);

    const { content, data } = matter(source);
    console.log('Data:', data);
    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    });
    console.log('Source:', mdxSource);

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
        },
    };*/
};

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await findAllPostSlugs();
    console.log(slugs);
    return {
        paths: slugs.map((slug) => {
            return { params: { slug } };
        }),
        fallback: true, // false or 'blocking'
    };
};

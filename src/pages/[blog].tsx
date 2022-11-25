import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { GetStaticPaths, GetStaticProps } from 'next';
import matter from 'gray-matter';
import { findAllSketchFolderNames } from '../utils';

export default function BlogPost({ source, frontMatter }: MDXRemoteProps) {}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // MDX text - can be from a local file, database, anywhere
    //TODO: Make a const for this
    console.log(params);
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
    return { props: { blog: '' } };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const names = await findAllSketchFolderNames();
    console.log(names);
    return {
        paths: names.map((name) => {
            return { params: { blog: name } };
        }),
        fallback: true, // false or 'blocking'
    };
};

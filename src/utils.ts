import path from 'path';

import glob from 'tiny-glob';
import matter from 'gray-matter';
import fs from 'fs/promises';

export type BlogPostFrontmatter = {
    title: string;
    description: string;
    publishedAt: string;
};

export function pascalToKebabCase(pascalString: string): string {
    return pascalString
        .split(/[A-Z][a-z]+/g)
        .map((s) => s.toLocaleLowerCase())
        .join('-');
}

export function kebabToPascalCase(kebabString: string): string {
    return kebabString
        .split('-')
        .map((s) => s[0].toLocaleUpperCase() + s.substring(1))
        .join('');
}

export const BLOG_PATH = path.join(process.cwd(), '/posts/');

export type BlogPostDescription = {
    slug: string;
    title: string;
};

export function findAllPostSlugs() {
    return glob(path.join(BLOG_PATH, '*.mdx')).then((paths) =>
        paths.map(getSlug)
    );
}

function getSlug(slugPath: string) {
    const [slug] = /.+(?=.mdx)/i.exec(path.basename(slugPath)) as string[];
    return slug;
}

export function getPath(slug: string) {
    return path.join(BLOG_PATH, slug + '.mdx');
}

export async function loadMdxFromSlug(slug: string) {
    const path = getPath(slug);
    const source = await fs.readFile(path);
    return matter(source);
}
/*export function findAllSketchDescriptionFullPaths() {
    return fs
        .readdirSync(SKETCH_PATH)
        .filter((p) => {
            const mdxPath = path.join(SKETCH_PATH, p, 'description.mdx');
            return !p.endsWith('.mdx') && fs.existsSync(mdxPath);
        })
        .map((folder) => path.join(SKETCH_PATH, folder, 'description.mdx'));
    // Only include md(x) files
}*/

/*
export function getSketchDescriptionPath(kebabCaseSketchName: string) {
    return path.join(SKETCH_PATH, kebabCaseSketchName, 'description.mdx');
}*/

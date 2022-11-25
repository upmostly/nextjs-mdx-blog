import path from 'path';
import * as fs from 'fs';
import glob from 'tiny-glob';

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

export const BLOGS_PATH = path.join(process.cwd(), '/posts/');

export type BlogPostDescription = {
    slug: string;
    title: string;
};

export function findAllSketchFolderNames() {
    return glob(path.join(BLOGS_PATH, '*.mdx'));

    // Only include md(x) files
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

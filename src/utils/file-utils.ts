export async function readLines(path: URL): Promise<string[]> {
    const fileContent = await Deno.readTextFile(path);
    return fileContent.split('\n');
}

export function removeRedundantHtmlTags(str) {
    return str.replace(/<\/?[^>]+>/gi, '');
}

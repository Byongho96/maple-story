export const getStaticPath = (path) => {
    const url = window.location.href; // 현재 페이지의 URL 가져오기
    if (url.includes('maple-story'))
        return '/maple-story' + path;
    else
        return path;
};
//# sourceMappingURL=static.module.js.map
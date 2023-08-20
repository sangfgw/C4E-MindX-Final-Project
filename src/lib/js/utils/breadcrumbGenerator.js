const breadcrumb = 
`
    <div class="breadcrumb mt-2">
        <div class="test"></div>
        <ul class="breadcrumb-list flex items-center">
            <li class="breadcrumb-list__item"><a href="../../index.html">Home</a></li>
            <li class="breadcrumb-list__item breadcrumb-list__item--active">Interview</li>
        </ul>
    </div>
`;

import { findTopicById, findArticleById } from '/src/lib/js/database/db.js';

export const breadcrumbGenerator = async() => {
    if (window.location.href.indexOf("topic") != -1) {
        const topicQuery = window.location.href.slice(window.location.href.indexOf("topic"));
        const topicId = topicQuery.slice(topicQuery.indexOf('=') + 1);
        const topic = await findTopicById(topicId);
        // console.log(topic);
        return `
            <ul class="breadcrumb-list flex items-center">
                <li class="breadcrumb-list__item"><a href="/src/pages/index.html">Home</a></li>
                <li class="breadcrumb-list__item breadcrumb-list__item--active">${topic.name}</li>
            </ul>
        `;
    } else if (window.location.href.indexOf("article") != -1) {
        const articleQuery = window.location.href.slice(window.location.href.indexOf("article"));
        const articleId = articleQuery.slice(articleQuery.indexOf('=') + 1);
        const article = await findArticleById(articleId);
        const topic = await findTopicById(article.topicId);
        return `
            <ul class="breadcrumb-list flex items-center">
                <li class="breadcrumb-list__item"><a href="/src/pages/index.html">Home</a></li>
                <li class="breadcrumb-list__item"><a href="/src/pages/posts/index.html?topic=${topic.topicId && topic.topicId}">${topic.name}</a></li>
                <li class="breadcrumb-list__item breadcrumb-list__item--active">${article.title}</li>
            </ul>
        `;
    } else if (window.location.href.indexOf("bookmark") != -1) {
        return `
                <ul class="breadcrumb-list flex items-center">
                    <li class="breadcrumb-list__item"><a href="/src/pages/index.html">Home</a></li>
                    <li class="breadcrumb-list__item breadcrumb-list__item--active">Bookmarks</li>
                </ul>
        `;
    }
}
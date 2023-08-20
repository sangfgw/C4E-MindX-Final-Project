import { findAllTopics, findTopicById, findArticlesByTopicId } from '/src/lib/js/database/db.js';
import { dropDown, hoverNavItem, hoverNavItemLevel2, activeNavItem, activeNavItemLevel2 } from '/src/lib/js/general/navbar.js';
import { dateTimeFormatter, dateReturn } from '/src/lib/js/utils/dateTimeFormat.js';
import { scrollToTop } from '/src/lib/js/utils/scrollToTop.js';
import { breadcrumbGenerator } from '/src/lib/js/utils/breadcrumbGenerator.js';
import { startSessionTimer, domOnLoad } from '/src/lib/js/user/sessionLogin.js';
import { logout } from '/src/lib/js/user/logout.js';
import { skeletionHeaderPosts, skeletonNavLevel2, skeletionSpecificArticleBanner, breadcrumbPostsSkeleton, skeletonSpecificArticles, skeletonRelativeArticles, skeletonArticlesLazyLoad } from '/src/lib/js/general/skeletonLoading.js';

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                          Initialize Variables                                         - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
// Get Articles Based On Query Param
const urlParams = new URLSearchParams(window.location.search);
const topicParam = urlParams.get("topic");
const topics = [];
let breadcrumbContent = "";
const articles = [];
const domListParent = document.querySelector('[data-dropdown="dropdown-level-1"]');

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                            Skeleton Loading                                           - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
skeletonNavLevel2();
skeletionHeaderPosts();
skeletionSpecificArticleBanner();
breadcrumbPostsSkeleton();
skeletonSpecificArticles();
skeletonRelativeArticles();

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                            Scroll To Top                                              - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
scrollToTop();

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                          Start Login Session                                          - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
domOnLoad();
startSessionTimer();

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                         Login User Display                                            - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const domAuthUserContainer = document.getElementById("auth_user_container");
const domNavList = document.getElementById("nav-list");
if (sessionStorage.getItem("loggedIn") && sessionStorage.getItem("loggedIn") === "true" && sessionStorage.getItem("userInfo")) {
    const { fname } = JSON.parse(sessionStorage.getItem("userInfo"));
    domNavList.innerHTML += `
        <li class="dropdown-item-level-1 relative whitespace-nowrap px-3 py-2 rounded-md lg:ml-auto"
        data-dropdown-item="dropdown-level-1-item-news" data-navbar-page="uesr-profile" id="auth_user_container">
            <a href="#" class="before:absolute before:inset-x-0 before:inset-y-0 pointer-events-none ">${fname}</a>
            <ul class="lg:absolute lg:z-50 lg:-left-1 lg:top-full lg:mt-2 lg:shadow-lg text-white lg:text-neutral-700 p-4 hidden lg:bg-white"
            data-dropdown="dropdown-level-2" data-dropdown-level="2" data-dropdown-parent="uesr-profile">
                <li class="relative pr-3 py-2 border-b-2 border-y-transparent" data-navbar-page="bookmark">
                    <a href="/src/pages/user/bookmark.html" class="before:absolute before:inset-x-0 before:inset-y-0">Bookmark</a>
                </li>
            </ul>
        </li>

        <li class="whitespace-nowrap px-3 py-2 rounded-md relative" data-navbar-page="logout" id="logout">
            <a href="javascript:void(0)" class="before:absolute before:inset-x-0 before:inset-y-0">Logout</a>
        </li>
    `;
} else {
    domNavList.innerHTML += `
        <li class="dropdown-item-level-1 relative whitespace-nowrap px-3 py-2 rounded-md lg:ml-auto"
        data-dropdown-item="dropdown-level-1-item-news" data-navbar-page="uesr-login" data-navbar-hover="false" id="auth_user_container">
            <a href="/src/pages/auth/login.html" class="login-link before:absolute before:inset-x-0 before:inset-y-0">Login</a>
        </li>
    `;
}

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                      Logout Event Listener                                            - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
logout();

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                            Dropdown Navbar                                            - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
dropDown(domListParent, "hover");

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                   Dropdown Navbar Level 1 Active                                      - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
activeNavItem(domListParent, "bg-neutral-800");

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                    Dropdown Navbar Level 1 Hover                                      - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
hoverNavItem(domListParent, "bg-slate-100/10");

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                             Async Data                                                - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
// Topic
const topicsPromise = findAllTopics();


// topics.push(...await topicsPromise);

// Breadcrumb
const breadcrumbPromise = breadcrumbGenerator();

// Get Articles Based On Topic Query Param
const articlesPromise = findArticlesByTopicId(topicParam);

if (urlParams.has("topic")) {
    await Promise.all([topicsPromise, breadcrumbPromise, articlesPromise]).then((results) => {
        if (results && Array.isArray(results) && results.length > 0) {
            // Topics
            topics.push(...results[0]);

            // Breadcrumb
            breadcrumbContent = results[1];

            // Articles
            // articles.push(...results[2]);
            articles.push(...results[2].sort((objA, objB) => Number(dateReturn(objA.createdAt)) - Number(dateReturn(objB.createdAt))).reverse());
        }
    });
} else {
    if (document.referrer !== '') {
        window.location.href = document.referrer;
    } else {
        window.location.href = "/src/pages/index.html";
    }
}

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                    Display All Topic Data Into Nav                                    - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */

// console.log(topics);

// Navbar
// Get Dropdown List Level 2
const domDropdownNewsLevel2 = document.querySelector("[data-dropdown-parent=\"news\"]");

// Clear Drop Down List
domDropdownNewsLevel2.innerHTML = "";

// Assign Items Into Dropdown List Level 2
topics.forEach(topic => {
    // console.log(topic);
    if (urlParams.has("topic") && topic.topicId === topicParam)
    {
        domDropdownNewsLevel2.innerHTML +=     
        `
            <li class="relative pr-3 py-2 border-b-2 border-y-transparent" data-navbar-page="${topic.name && String(topic.name).toLowerCase().replace(' ', '_')}" data-navbar-state="active">
                <a href="/src/pages/posts/index.html?topic=${topic.topicId && topic.topicId}"
                    class="before:absolute before:inset-x-0 before:inset-y-0">${topic.name && topic.name}</a>
            </li>
        `;
    } else {
        domDropdownNewsLevel2.innerHTML +=     
        `
            <li class="relative pr-3 py-2 border-b-2 border-y-transparent" data-navbar-page="${topic.name && String(topic.name).toLowerCase().replace(' ', '_')}">
                <a href="/src/pages/posts/index.html?topic=${topic.topicId && topic.topicId}"
                    class="before:absolute before:inset-x-0 before:inset-y-0">${topic.name && topic.name}</a>
            </li>
        `;
    }
});

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                   Dropdown Navbar Level 2 Active                                      - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
activeNavItemLevel2();

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                    Dropdown Navbar Level 2 Hover                                      - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
hoverNavItemLevel2();

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                          Breadcrumb Generator                                         - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const domBreadcrumb = document.getElementById("breadcrumb");
domBreadcrumb.innerHTML = breadcrumbContent;

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                              Set Topic Name                                           - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const domMainTopicContainer = document.getElementById("main_topic_container");
topics.forEach(topic => {
    // console.log(topic);
    if (urlParams.has("topic") && topic.topicId === topicParam)
    {
        domMainTopicContainer.innerHTML = 
        `
            <h1 class="border-b-4 border-indigo-500 pr-4 text-2xl font-bold inline-flex" id="topic_main_heading">${topic.name}</h1>
        `;
        return false;
    }

    return true;
});

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                                Load Data                                              - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
// Function: Load Topic Banner
const loadTopicBanner = () => {
    let postCards = ``;

    if (articles && articles.length > 0) {
        articles.every((article, index) => {
            if (index === 0) {
                if (articles.length === 1) {
                    postCards += 
                    `
                        <div
                            class="post-card relative row-span-2 col-span-4 flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
                            <a href="#" class="post-card__title text-2xl font-bold">${article.title}</a>
                            <a href="#" class="post-card__time">${dateTimeFormatter(article.createdAt)}</a>
                            <a href="/src/pages/posts/details.html?article=${article.articleId}" class="post-card__link"></a>
                            <div
                                class="post-card-bg" style="background-image: url('${article.img}')">
                            </div>
                            <div class="black-filter"></div>
                        </div>
                    `;
                } else {
                    postCards += 
                    `
                        <div
                            class="post-card relative row-span-2 col-span-2 flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
                            <a href="#" class="post-card__title text-2xl font-bold">${article.title}</a>
                            <a href="#" class="post-card__time">${dateTimeFormatter(article.createdAt)}</a>
                            <a href="/src/pages/posts/details.html?article=${article.articleId}" class="post-card__link"></a>
                            <div
                                class="post-card-bg" style="background-image: url('${article.img}')">
                            </div>
                            <div class="black-filter"></div>
                        </div>
                    `;
                }
            } else if (index === 3) {
                if (articles.length === 2) {
                    postCards += 
                    `
                        <div
                            class="post-card relative row-span-2 col-span-2 flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
                            <a href="#" class="post-card__title text-2xl font-bold">${article.title}</a>
                            <a href="#" class="post-card__time">${dateTimeFormatter(article.createdAt)}</a>
                            <a href="/src/pages/posts/details.html?article=${article.articleId}" class="post-card__link"></a>
                            <div
                                class="post-card-bg" style="background-image: url('${article.img}')">
                            </div>
                            <div class="black-filter"></div>
                        </div>
                    `;
                } else {
                    postCards += 
                    `
                        <div
                            class="post-card relative flex flex-col justify-end px-4 py-4 text-white overflow-hidden col-span-2">
                            <a href="#" class="post-card__title text-2xl font-bold">${article.title}</a>
                            <a href="#" class="post-card__time">${dateTimeFormatter(article.createdAt)}</a>
                            <a href="/src/pages/posts/details.html?article=${article.articleId}" class="post-card__link"></a>
                            <div
                                class="post-card-bg" style="background-image: url('${article.img}')">
                            </div>
                            <div class="black-filter"></div>
                        </div>
                    `;
                }
            } else {
                if (articles.length === 3) {
                    postCards += 
                    `
                        <div class="post-card relative col-span-2 flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
                            <a href="#" class="post-card__title text-2xl font-bold">${article.title}</a>
                            <a href="#" class="post-card__time">${dateTimeFormatter(article.createdAt)}</a>
                            <a href="/src/pages/posts/details.html?article=${article.articleId}" class="post-card__link"></a>
                            <div
                                class="post-card-bg" style="background-image: url('${article.img}')">
                            </div>
                            <div class="black-filter"></div>
                        </div>
                    `;
                } else {
                    postCards += 
                    `
                        <div class="post-card relative flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
                            <a href="#" class="post-card__title font-bold">${article.title}</a>
                            <a href="#" class="post-card__time">${dateTimeFormatter(article.createdAt)}</a>
                            <a href="/src/pages/posts/details.html?article=${article.articleId}" class="post-card__link"></a>
                            <div
                                class="post-card-bg" style="background-image: url('${article.img}')">
                            </div>
                            <div class="black-filter"></div>
                        </div>
                    `;
                }
            }

            // Break Loop When Its Reach To 3
            if (index >= 3) {
                return false;
            } else {
                return true;
            }
        });
    }

    const domArticleBannerContainer = document.getElementById("article_banner_container");

    if (articles.length < 4) {
        domArticleBannerContainer.classList.remove("md:grid-cols-3");
        domArticleBannerContainer.classList.add("md:grid-cols-2");
    }

    domArticleBannerContainer.innerHTML = postCards;
}

// Load Topic Banner
loadTopicBanner();


// Function: Load Topic Card
const LIMIT_LOAD_ARTICLES = 7;
var lazyLoadTotal = 0;

const loadTopicCard = () => {
    let cards = ``;
    let index = 4; // item 5
    let countArticle = 0;

    if (articles && articles.length > 4) {

        while (index < articles.length) {
            if (articles[index] && countArticle < LIMIT_LOAD_ARTICLES) {
                cards += 
                `
                    <div class="topic-card">
                        <div
                            class="topic-card__img" style="background-image: url('${articles[index].img}')">
                            <a href="/src/pages/posts/details.html?article=${articles[index].articleId}" title="${articles[index].title}"
                                class="topic-card__img__link"></a>
                        </div>
                        <div class="topic-card__info">
                            <div class="topic-card__info__title"><a href="/src/pages/posts/details.html?article=${articles[index].articleId}"
                                    title="${articles[index].title}">${articles[index].title}</a></div>
                            <div class="topic-card__info__date">${dateTimeFormatter(articles[index].createdAt)}</div>
                            <div class="topic-card__info__content">
                                ${articles[index].brief}
                            </div>
                        </div>
                    </div>
                `;

                // Increase Count Article
                countArticle++;
            }

            index++;
        }
    }

    const domTopicContainer = document.getElementById("topic_container");
    domTopicContainer.innerHTML = 
    `
        <div class="topic-container flex flex-col gap-12" data-topic-container="${topicParam}">
            ${cards}
            <div id="js-load-more"></div>
        </div>
    `;

    // Lazy Load
    let options = {
        rootMargin: '0px',
        threshold: 0.9
    };
    let target = document.querySelector('#js-load-more');

    let observer = new IntersectionObserver(entries => {
        var entry = entries[0];

        if (entry.isIntersecting) {
            console.log('You reached the bottom of the list!');
            //   appendMorePosts();
            // skeletonSpecificArticles();
            // const post = document.createElement('div');
            // post.classList.add('post');
            // post.innerHTML = 'blabla';
            // document.querySelector(".topic-container").insertBefore(post, document.querySelector('#js-load-more'));

            // Get Total Items Loaded
            let totalItemsLoaded = document.querySelectorAll(".topic-card").length + document.querySelectorAll(".post-card").length;

            // Display Skeleton Loading Animation
            // skeletonArticlesLazyLoad();

            // Increase Lazy Load Total
            lazyLoadTotal++;

            // Get Total Lazy Load Items
            let totalLazyItemsLoad = 0;
            let lazyLoadTotalCount = 0;
            if (totalItemsLoaded < articles.length) {
                while (lazyLoadTotalCount < lazyLoadTotal) {
                    totalLazyItemsLoad += LIMIT_LOAD_ARTICLES * 2;
    
                    lazyLoadTotalCount++;
                }
            }

            // Display Real Articles Data
            let isLoad = true;
            if (totalItemsLoaded < articles.length) {
                while (isLoad) {
                    // console.log(totalItemsLoaded, totalLazyItemsLoad);
                    if (totalItemsLoaded < articles.length && totalItemsLoaded < totalLazyItemsLoad) {
                        // Get Articles Container DOM
                        const domTopicContainer = document.querySelector(".topic-container");

                        // Assign Articles Into Articles Container
                        const topicCard = document.createElement("div");
                        topicCard.classList.add("topic-card");
                        topicCard.innerHTML = `
                            <div
                                class="topic-card__img" style="background-image: url('${articles[totalItemsLoaded].img}')">
                                <a href="/src/pages/posts/details.html?article=${articles[totalItemsLoaded].articleId}" title="${articles[totalItemsLoaded].title}"
                                    class="topic-card__img__link"></a>
                            </div>
                            <div class="topic-card__info">
                                <div class="topic-card__info__title"><a href="/src/pages/posts/details.html?article=${articles[totalItemsLoaded].articleId}"
                                        title="${articles[totalItemsLoaded].title}">${articles[totalItemsLoaded].title}</a></div>
                                <div class="topic-card__info__date">${dateTimeFormatter(articles[totalItemsLoaded].createdAt)}</div>
                                <div class="topic-card__info__content">
                                    ${articles[totalItemsLoaded].brief}
                                </div>
                            </div>
                        `;

                        domTopicContainer.insertBefore(topicCard, target);

                        totalItemsLoaded++;
                        continue;
                    }
                    isLoad = false;
                }
            }
        }
      }, options);
      observer.observe(target);
}

// Load Topic Card
loadTopicCard();


// Function: Load Relative Articles
const loadRelativeArticles = () => {
    const asideContainer = document.getElementById("aside_topic");
    const domRelativeArticlesContainer = document.getElementById("relative_articles");
    let items = ``;
    let index = 7; // Start From Item 8
    if (articles && articles.length > 7) {
        while(index < articles.length && index < 13) {

            if (articles[index]) {
                items += 
                `
                    <li class="relative-topic__list__item"><a href="/src/pages/posts/details.html?article=${articles[index].articleId}" class="relative-topic__list__item__link">${articles[index].title}</a></li>
                `;
            }

            index++;
        }

        domRelativeArticlesContainer.innerHTML = 
        `
            <ul class="relative-topic__list">
                ${items}
            </ul>
        `;
        asideContainer.classList.remove("hidden");
    } else {
        asideContainer.classList.add("hidden");
    }

    return;
}

// Load Relative Articles
loadRelativeArticles();
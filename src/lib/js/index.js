// Define DOM
// const $$ = document.querySelectorAll(document);
import { findAllTopics, findArticlesByTopicId } from '/src/lib/js/database/db.js';
import { dateTimeFormatter, dateReturn } from '/src/lib/js/utils/dateTimeFormat.js';
import { scrollToTop } from '/src/lib/js/utils/scrollToTop.js';
import { dropDown, hoverNavItem, hoverNavItemLevel2, activeNavItem } from '/src/lib/js/general/navbar.js';
import { startSessionTimer, domOnLoad } from '/src/lib/js/user/sessionLogin.js';
import { logout } from '/src/lib/js/user/logout.js';
import { skeletonNavLevel2, skeletionArticleBanner, skeletonTopic, skeletonLoadingArticles } from '/src/lib/js/general/skeletonLoading.js';

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                          Initialize Variables                                         - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const urlParams = new URLSearchParams(window.location.search);
const domListParent = document.querySelector('[data-dropdown="dropdown-level-1"]');

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                            Skeleton Loading                                           - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
skeletonNavLevel2();
skeletionArticleBanner();
skeletonTopic();
skeletonLoadingArticles();

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
/* -                                    Display All Topic Data Into Nav                                    - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const concurrencyTopics = findAllTopics();

const topics = [];
topics.push(...await concurrencyTopics);

// console.log(topics);

// Navbar
const domDropdownNewsLevel2 = document.querySelector("[data-dropdown-parent=\"news\"]");

// Clear Inner HTML
domDropdownNewsLevel2.innerHTML = "";

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

// Load Topic
const domTopicList = document.getElementById("category_list");

// Clear Topic List
domTopicList.innerHTML = "";

// Assign Topic Items Into List
topics.forEach((topic, index) => {
    // console.log(topic);
    domTopicList.innerHTML += `
        <li class="category-list__item text-xl">
            <button class="category-list__item__btn ${index === 0 && "category-list__item__btn--active"}" type="button"
                data-topic="${topic.name && String(topic.name).toLowerCase().replace(' ', '_')}">${topic.name && topic.name}</button>
        </li>
    `;
});

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
/* -                                         Get All Articles Promise                                      - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
// Get Articles Container DOM
const domArticlesContainer = document.getElementById("articles_container");

// Fetch Data
const articlesPromise = [];
const baseArticles = [];
topics.forEach((topic) => {
    if (topic && topic.topicId) {
        articlesPromise.push(findArticlesByTopicId(topic.topicId));
        // console.log(articles);
    }
});

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                             Load All Articles                                         - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const loadArticles = async() => {
    await Promise.all(articlesPromise).then((topicsContainer) => {
        // Clear Articles Container
        domArticlesContainer.innerHTML = "";

        // Assign Articles Into Articles Container
        topicsContainer.forEach((articles, index) => {
            if (articles && Array.isArray(articles) && articles.length > 0) {
                baseArticles.push(...articles.sort((objA, objB) => Number(dateReturn(objA.createdAt)) - Number(dateReturn(objB.createdAt))).reverse());
    
                let articlesContent = ``;
    
                const LIMIT_ARTICLES = 7;
    
                articles.every((article, index) => {
                    articlesContent += 
                    `
                        <div class="topic-card">
                            <div
                                class="topic-card__img" style="background-image: url('${article.img}')">
                                <a href="/src/pages/posts/details.html?article=${article.articleId}" title="${article.title}"
                                    class="topic-card__img__link"></a>
                            </div>
                            <div class="topic-card__info">
                                <div class="topic-card__info__title"><a href="/src/pages/posts/details.html?article=${article.articleId}"
                                        title="${article.title}">${article.title}</a></div>
                                <div class="topic-card__info__date">${dateTimeFormatter(article.createdAt)}</div>
                                <div class="topic-card__info__content">
                                    ${article.brief}
                                </div>
                            </div>
                        </div>
                    `;
    
                    // If Article Index Reach To Limit Then Break Loop
                    if (index + 1 === LIMIT_ARTICLES) {
                        return false;
                    } 
    
                    return true;
                });
    
                // Assign Articles Content Into Articles Container
                domArticlesContainer.innerHTML += 
                `
                    <div class="topic-container hidden lg:ml-5 flex-col gap-12" data-topic-content="${topics[index].name && String(topics[index].name).toLowerCase().replace(' ', '_')}">
                        ${articlesContent}
                        <div class="view-more flex lg:justify-end justify-center">
                            <a href="/src/pages/posts/index.html?topic=${topics[index].topicId && topics[index].topicId}" class="view-more__link">View More...</a>
                        </div>
                    </div>
                `;
            }
        });
    });
}

await loadArticles();

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                          Load Articles Banner                                         - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const bannerArticles = [];
topics.forEach((topic) => {
    baseArticles.every(article => {
        if (article.topicId === topic.topicId) {
            bannerArticles.push(article);
            return false;
        }
        return true;
    });
});

// Clear Article Banner
const domArticleBannerContainer = document.getElementById("article_banner_container");
domArticleBannerContainer.innerHTML = "";

// Function: Load Article Banner
const loadArticlesBanner = () => {
    let articlesCard = ``;
    if (bannerArticles && bannerArticles.length > 0) {
        bannerArticles.every((article, index) => {
            if (index === 0) {
                if (bannerArticles.length === 1) {
                    articlesCard += 
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
                    articlesCard += 
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
            } else if (index === 4) {
                articlesCard += 
                `
                    <div
                        class="post-card relative flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
                        <a href="#" class="post-card__title font-bold">${article.title}</a>
                        <a href="#" class="post-card__time">${dateTimeFormatter(article.createdAt)}</a>
                        <a href="/src/pages/posts/details.html?article=${article.articleId}" class="post-card__link"></a>
                        <div
                            class="post-card-bg" style="background-image: url('${article.img}')">
                        </div>
                        <div class="black-filter"></div>
                    </div>
                `;
            } else {
                if (bannerArticles.length === 2) {
                    articlesCard += 
                    `
                        <div class="post-card relative row-span-2 col-span-2 flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
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
                else if (bannerArticles.length === 3) {
                    articlesCard += 
                    `
                        <div class="post-card relative row-span-1 col-span-2 flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
                            <a href="#" class="post-card__title text-2xl font-bold">${article.title}</a>
                            <a href="#" class="post-card__time">${dateTimeFormatter(article.createdAt)}</a>
                            <a href="/src/pages/posts/details.html?article=${article.articleId}" class="post-card__link"></a>
                            <div
                                class="post-card-bg" style="background-image: url('${article.img}')">
                            </div>
                            <div class="black-filter"></div>
                        </div>
                    `;
                } else if (bannerArticles.length === 4 && index === 3) {
                    articlesCard += 
                    `
                        <div class="post-card relative row-span-1 col-span-2 flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
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
                    articlesCard += 
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

            // Break Loop When Index Reach To 4 (5 Items)
            if (index >= 4) {
                return false;
            } else {
                return true;
            }
        });
    }

    if (bannerArticles.length < 5) {
        domArticleBannerContainer.classList.remove("md:grid-cols-3");
        domArticleBannerContainer.classList.add("md:grid-cols-2");
    }

    domArticleBannerContainer.innerHTML = articlesCard;
}

// Load Articles Banner
loadArticlesBanner();

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                           Category Topic Click                                        - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const domTopicBtns = document.querySelectorAll("[data-topic]");

const domTopicContents = document.querySelectorAll("[data-topic-content]");

// Function: Handle Topic Click Event
const itemSelectEvent = (btns = [document]) => {
    if (btns && btns.length > 0) {
        // Add Event For Each Topic Button
        btns.forEach(btn => {
            if (btn.nodeName === "BUTTON") {
                btn.addEventListener("click", (ev) => {
                    // Clear Previous Topic State Button = Active
                    btns.forEach(btnStack => {
                        if (btnStack.dataset.topicState) {
                            btnStack.removeAttribute('data-topic-state');
                        }
                    })

                    // Add Topic State Button = Active For Clicked Button
                    ev.target.setAttribute('data-topic-state', 'active');
                    // console.log(ev.target.dataset.topicState);

                    // Add Styling For Active Topic
                    btns.forEach(btnStack => {
                        if (btnStack.dataset.topicState && btnStack.dataset.topicState === "active") {
                            btnStack.classList.add("category-list__item__btn--active");
                        } else if (!btnStack.dataset.topicState && btnStack.classList.contains("category-list__item__btn--active")) {
                            btnStack.classList.remove("category-list__item__btn--active");
                        }
                    })

                    // Clear Content If Needed
                    clearPreviousContent(ev.target.dataset.topic, domTopicContents);

                    // Display Content Based On Topic Selected
                    displaySelectedContent(ev.target.dataset.topic, domTopicContents);
                });
            }
        });
    }
}

// Use Function
itemSelectEvent(domTopicBtns);


// Function: Clear Previous Content Display
const clearPreviousContent = (topicSelected = String, domContents = [document]) => {
    if (domContents && domContents.length > 0) {
        domContents.forEach(domContent => {
            if (domContent.dataset && domContent.dataset.topicContent !== topicSelected) {
                domContent.classList.remove("flex");
                domContent.classList.add("hidden");
            }
        });
    }
}

// Function: Display Topic Content
const displaySelectedContent = (topicSelected = String, domContents = [document]) => {
    if (domContents && domContents.length > 0) {
        domContents.forEach(domContent => {
            if (domContent.dataset && domContent.dataset.topicContent === topicSelected) {
                domContent.classList.remove("hidden");
                domContent.classList.add("flex");
            }
        });
    }
}

// Clear Content If Needed (Start Once)
domTopicBtns && domTopicBtns[0] && clearPreviousContent(domTopicBtns[0].dataset.topic, domTopicContents);

// Display Content Based On Topic Selected (Start Once)
domTopicBtns && domTopicBtns[0] && displaySelectedContent(domTopicBtns[0].dataset.topic, domTopicContents);

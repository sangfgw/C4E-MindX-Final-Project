import { findAllTopics, findArticlesByTopicId } from '/src/lib/js/database/db.js';
import { breadcrumbGenerator } from '/src/lib/js/utils/breadcrumbGenerator.js';
import { dateTimeFormatter, dateReturn } from '/src/lib/js/utils/dateTimeFormat.js';
import { dropDown, hoverNavItem, hoverNavItemLevel2, activeNavItem, activeNavItemLevel2 } from '/src/lib/js/general/navbar.js';
import { startSessionTimer, domOnLoad, checkLoginSession, findUserInfo } from '/src/lib/js/user/sessionLogin.js';
import { logout } from '/src/lib/js/user/logout.js';
import { scrollToTop } from '/src/lib/js/utils/scrollToTop.js';
import { getAllArticlesIdBookMark } from '/src/lib/js/user/bookmarkStorage.js';
import { skeletonNavLevel2, skeletonBreadcrumbBookMark, skeletonBookmarkArticles, skeletonBookMarkFilter } from '/src/lib/js/general/skeletonLoading.js';

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                          Initialize Variables                                         - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const urlParams = new URLSearchParams(window.location.search);
const domListParent = document.querySelector('[data-dropdown="dropdown-level-1"]');
const topics = [];
let breadcrumbContent = ``;

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                            Skeleton Loading                                           - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
skeletonNavLevel2();
skeletonBreadcrumbBookMark();
skeletonBookmarkArticles();
skeletonBookMarkFilter();

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
        data-dropdown-item="dropdown-level-1-item-news" data-navbar-page="uesr-profile" data-navbar-state="active" id="auth_user_container">
            <a href="#" class="before:absolute before:inset-x-0 before:inset-y-0 pointer-events-none ">${fname}</a>
            <ul class="lg:absolute lg:z-50 lg:-left-1 lg:top-full lg:mt-2 lg:shadow-lg text-white lg:text-neutral-700 p-4 hidden lg:bg-white"
            data-dropdown="dropdown-level-2" data-dropdown-level="2" data-dropdown-parent="uesr-profile">
                <li class="relative pr-3 py-2 border-b-2 border-y-transparent" data-navbar-page="bookmark" data-navbar-state="active">
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
/* -                                              Async Data                                               - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
// Topic
const topicsPromise = findAllTopics();

// Breadcrumb
const breadcrumbPromise = breadcrumbGenerator();


await Promise.all([topicsPromise, breadcrumbPromise]).then((results) => {
    if (results && Array.isArray(results) && results.length > 0) {
        topics.push(...results[0]);
        breadcrumbContent = results[1];
    }
});

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                              Breadcrumb                                               - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const domBreadcrumb = document.getElementById("breadcrumb");
domBreadcrumb.innerHTML = breadcrumbContent;


/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                    Display All Topic Data Into Nav                                    - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */

// Navbar
// Get Dropdown List Level 2 DOM
const domDropdownNewsLevel2 = document.querySelector("[data-dropdown-parent=\"news\"]");

// Clear DropDown List Level 2
domDropdownNewsLevel2.innerHTML = "";

// Assign Item Into DropDown List Level 2
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
/* -                                         Get All Articles Promise                                      - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const domArticlesContainer = document.getElementById("articles_container");
const articlesPromise = [];
const baseArticles = [];
topics.forEach((topic) => {
    if (topic && topic.topicId) {
        articlesPromise.push(findArticlesByTopicId(topic.topicId));
    }
});

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                        Load All Bookmark Articles                                     - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
// Get All Articles Bookmark Object From Local Storage
const articlesBookmarkList = getAllArticlesIdBookMark();

// If User Logged In
if (checkLoginSession() && findUserInfo() && Object.keys(findUserInfo()).length > 0) {
    // User Info
    const userInfo = findUserInfo();

    const loadArticles = Promise.all(articlesPromise).then((topicsContainer) => {
        topicsContainer.forEach((articles, index) => {
            if (articles && Array.isArray(articles) && articles.length > 0) {
                baseArticles.push(...articles);

                let articleContent = ``;
                
                articles.forEach(article => {
                    if (articlesBookmarkList && Array.isArray(articlesBookmarkList) && articlesBookmarkList.length > 0) {
                        articlesBookmarkList.forEach(articleObj => {
                            if (articleObj.articleId === article.articleId && articleObj.userId === userInfo.id) {
                                articleContent += 
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
                            }
                        });
                    }
                });
                domArticlesContainer.innerHTML += 
                `
                    <div class="topic-container flex flex-col gap-12" data-topic-content="${topics[index].name && String(topics[index].name).toLowerCase().replace(' ', '_')}">
                        ${articleContent}
                    </div>
                `;
            }
        });
    });
    await loadArticles;
} else {
    window.location.href = "/src/pages/auth/login.html";
}

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                             Filter Bookmark                                           - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const domFiterBookmarkList = document.getElementById("filter_bookmark_list");
if (topics && Array.isArray(topics) && topics.length > 0) {
    // Display Filter Section
    const domAsideBookmark = document.getElementById("aside_bookmark");
    domAsideBookmark.classList.remove("hidden");

    // Add Bookmark Item
    let bookmarkItems = 
    `
        <div class="input-group">
            <input type="radio" id="all_filter" class="bookmarks-filter-input" name="bookmarks-filter" value="0" checked="checked" >
            <label for="all_filter">All</label>
        </div>
    `;
    topics.forEach(topic => {
        bookmarkItems += 
        `
            <div class="input-group">
                <input type="radio" id="${String(topic.name).trim().replace(' ', '_').toLowerCase()}_filter" class="bookmarks-filter-input" name="bookmarks-filter" value="${topic.topicId}" >
                <label for="${String(topic.name).trim().replace(' ', '_').toLowerCase()}_filter">${topic.name}</label>
            </div>
        `;
    });

    // Set Bookmark Items Into List
    domFiterBookmarkList.innerHTML = bookmarkItems;
} else {
    // Add Bookmark Item
    let bookmarkItems = 
    `
        <div>
            <p class="text-2xl">No Topic Found.</p>
        </div>
    `;

    // Set Bookmark Items Into List
    domFiterBookmarkList.innerHTML = `${bookmarkItems}`;
}

// Get All Radio Filter Button
const domFilterBookmarkRadios = document.querySelectorAll("[name=\"bookmarks-filter\"]");

// Listen Radio Value Change Event
domFilterBookmarkRadios && domFilterBookmarkRadios.forEach(domFilterBookmarkRadio => {
    domFilterBookmarkRadio.addEventListener("click", async(ev) => {
        // Disable All Radio Filter Button
        disableAllRadioFilter();

        // Get Topic Filter Id
        const topicFilterId = ev.target.value;

        // Display Articles
        await displayArticlesFilter(topicFilterId);

        // Enable All Radio Filter Button
        enableAllRadioFilter();
    });
});

// Function: Display Articles Filter
const displayArticlesFilter = async(topicId = String) => {
    // Initialize articles array
    const articles = [];

    // User Info
    const userInfo = findUserInfo();

    // Sort Articles
    baseArticles.sort((objA, objB) => Number(dateReturn(objA.createdAt)) - Number(dateReturn(objB.createdAt))).reverse();

    // If Topic Filter Exist
    if (topicId !== '' && topicId !== '0') {
        // Find Articles By Topic Name
        // articles.push(...await findArticlesByTopicId(topicId));
        articles.push(...baseArticles.filter(article => article.topicId === topicId));
        
        // Display Articles Into Bookmark List

    } else if (topicId !== '' && topicId === '0') {
        articles.push(...baseArticles);
    }

    if (articles && Array.isArray(articles) && articles.length > 0) {
        let articlesContent = ``;
        
        articles.forEach(article => {
            if (articlesBookmarkList && Array.isArray(articlesBookmarkList) && articlesBookmarkList.length > 0) {
                articlesBookmarkList.forEach(articleObj => {
                    if (articleObj.articleId === article.articleId && articleObj.userId === userInfo.id) {
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
                    }
                });
            }
        });

        // Get Topic Name
        let topicName = "";

        topics.every(topic => {
            if (topic.topicId === topicId)  {
                topicName = topic.name;
                return false;
            }

            return true;
        });

        // Set Articles Content Into Topic Container Div
        if (articlesContent !== '') {
            domArticlesContainer.innerHTML = 
            `
                <div class="topic-container flex flex-col gap-12" data-topic-content="${topicName && String(topicName).toLowerCase().replace(' ', '_')}">
                    ${articlesContent}
                </div>
            `;
        } else {
            domArticlesContainer.innerHTML = 
            `
                <div class="text-lg">No Bookmark Found.</div>
            `;
        }
    }
}

// Function: Disable All Radio Filter Button
const disableAllRadioFilter = () => {
    const domRadioFilterBtns = document.querySelectorAll("[name=\"bookmarks-filter\"]");
    domRadioFilterBtns && domRadioFilterBtns.forEach(domRadioFilterBtn => {
        domRadioFilterBtn.disabled = true;
    });
}

// Function: Enable All Radio Filter Button
const enableAllRadioFilter = () => {
    const domRadioFilterBtns = document.querySelectorAll("[name=\"bookmarks-filter\"]");
    domRadioFilterBtns && domRadioFilterBtns.forEach(domRadioFilterBtn => {
        domRadioFilterBtn.disabled = false;
    });
}


// Use Function Once
displayArticlesFilter('0');

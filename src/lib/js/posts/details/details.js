import { findAllTopics, findArticleById } from '/src/lib/js/database/db.js';
import { dateTimeFormatter } from '/src/lib/js/utils/dateTimeFormat.js';
import { breadcrumbGenerator } from '/src/lib/js/utils/breadcrumbGenerator.js';
import { scrollToTop } from '/src/lib/js/utils/scrollToTop.js';
import { dropDown, hoverNavItem, hoverNavItemLevel2, activeNavItem, activeNavItemLevel2 } from '/src/lib/js/general/navbar.js';
import { startSessionTimer, domOnLoad, checkLoginSession } from '/src/lib/js/user/sessionLogin.js';
import { logout } from '/src/lib/js/user/logout.js';
import { addArticleBookmark, removeArticleBookmark, findArticleBookMark } from '/src/lib/js/user/bookmarkStorage.js';
import { skeletonNavLevel2, skeletonBreadcrumbPostDetails, skeletonArticleContent, skeletonPostDetailsAgenda } from '/src/lib/js/general/skeletonLoading.js';

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                          Initialize Variables                                         - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const urlParams = new URLSearchParams(window.location.search);
const articleParam = urlParams.get("article");
const article = {};
const topics = [];
let breadcrumbContent = "";

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                            Skeleton Loading                                           - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
skeletonNavLevel2();
skeletonBreadcrumbPostDetails();
skeletonArticleContent();
skeletonPostDetailsAgenda();

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
const domListParent = document.querySelector('[data-dropdown="dropdown-level-1"]');
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
if (urlParams.has("article")) {
    // Articles
    const articlesPromise = findArticleById(articleParam);

    // Topics
    const topicsPromise = findAllTopics();

    // BreadCrumb
    const breadcrumbPromise = breadcrumbGenerator();

    // Promise All
    await Promise.all([articlesPromise, topicsPromise, breadcrumbPromise]).then((results) => {
        // console.log(results);
        Object.assign(article, {...results[0]});
        topics.push(...results[1]);
        breadcrumbContent = results[2];
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
/* -                                               Get Article                                             - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                    Display All Topic Data Into Nav                                    - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */

// console.log(topics);

// Navbar
// Get Dropdown List Level 2 Container
const domDropdownNewsLevel2 = document.querySelector("[data-dropdown-parent=\"news\"]");

// Clear Dropdown List Level 2 Container
domDropdownNewsLevel2.innerHTML = "";

// Assign Items Into Dropdown List Level 2 Container
topics.forEach(topic => {
    // console.log(topic);
    if (urlParams.has("article") && topic.topicId === article.topicId)
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
/* -                                           Load Article Content                                        - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
// Function: Load Article Content
const loadArticleContent = () => {
    const domArticleContentContainer = document.getElementById("article_section");
    if (article && Object.keys(article).length !== 0 && article.constructor === Object) {
        domArticleContentContainer.innerHTML = 
        `
            ${article.content}
        `;
    }
}

// Load Article Content
loadArticleContent();

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                Display Save Article Button When Logged In                             - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
if (checkLoginSession()) {
    const domSaveArticleBtnContainer = document.getElementById("save_article");
    if (domSaveArticleBtnContainer) {
        domSaveArticleBtnContainer.classList.remove("hidden");
        domSaveArticleBtnContainer.innerHTML = `
            <button type=\"button\" title=\"Save Article\" class=\"save-article-btn hover:scale-125\" id=\"save_article_btn\">
                <i class=\"fa-regular fa-bookmark fa-xl\" id=\"save_article_icon\"></i>
            </button>
        `;
    }
}

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                           Load Article Agenda                                         - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */

const loadArticleAgenda = () => {
    const sectionsId = document.querySelectorAll("[id^=\"section_\"");
    const domArticleSection = document.getElementById("article_section");
    let items = ``;

    sectionsId.forEach(sectionId => {
        items += 
        `
            <li class="agenda-content-list__item"><a href="#${sectionId.id}" class="agenda-content-list__item__link">${sectionId.innerText}</a></li>
        `;
    });

    if (sectionsId && sectionsId.length > 0 && article && Object.keys(article).length !== 0 && article.constructor === Object) {
        domArticleSection.innerHTML += 
        `
            <aside class="aside-agenda mt-6 min-w-fit">
                <div class="aside-agenda-container lg:sticky lg:top-10 p-4 rounded-lg border border-black relative lg:w-[300px]">
                    <div class="aside-agenda__title font-bold">
                        NỘI DUNG
                    </div>
                    <div class="aside-agenda__content mt-3" data-agenda-collapse-state="false">
                        <ol type="1" start="1" class="agenda-content-list ml-5">
                            ${items}
                        </ol>
                    </div>

                    <div class="aside-agenda__collapse absolute top-0 right-0">
                        <button type="button" class="aside-agenda__collapse__btn p-4" id="aside_agenda_collapse_btn" title="Collapse Agenda"><i class="fa-solid fa-angle-down" id="aside_agenda_collapse_btn_icon"></i></button>
                    </div>
                </div>
            </aside>
        `;
    } else {
        domArticleSection.innerHTML += 
        `
            <aside class="aside-agenda mt-6 min-w-fit">
                <div class="aside-agenda-container lg:sticky lg:top-10 p-4 rounded-lg border border-black relative lg:w-[300px]">
                    <div class="aside-agenda__title font-bold">
                        NỘI DUNG
                    </div>
                    <div class="aside-agenda__content mt-3" data-agenda-collapse-state="false">
                        <ol type="1" start="1" class="agenda-content-list ml-5">
                            Không có mục lục...
                        </ol>
                    </div>

                    <div class="aside-agenda__collapse absolute top-0 right-0">
                        <button type="button" class="aside-agenda__collapse__btn p-4" id="aside_agenda_collapse_btn" title="Collapse Agenda"><i class="fa-solid fa-angle-down" id="aside_agenda_collapse_btn_icon"></i></button>
                    </div>
                </div>
            </aside>
        `;
    }
    // console.log(sectionsId);
}

// Load Article Agenda
loadArticleAgenda();

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                      Agenda Collapse Button Click                                     - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const domAgendaCollapseBtn = document.getElementById("aside_agenda_collapse_btn");
domAgendaCollapseBtn.addEventListener("click", (ev) => {
    const domAgendaCollapse = document.querySelector("[data-agenda-collapse-state]");
    domAgendaCollapse && domAgendaCollapse.dataset.agendaCollapseState && domAgendaCollapse.dataset.agendaCollapseState === "false" ? domAgendaCollapse.dataset.agendaCollapseState = "true" : domAgendaCollapse.dataset.agendaCollapseState = "false";
    // console.log(domAgendaCollapse.dataset.agendaCollapseState);
    domAgendaCollapse && domAgendaCollapse.dataset.agendaCollapseState && domAgendaCollapse.dataset.agendaCollapseState === "false" ? domAgendaCollapse.classList.remove("hidden") : domAgendaCollapse.classList.add("hidden");
    
    // Rotate Button Icon
    const domAgendaCollapseIcon = document.getElementById("aside_agenda_collapse_btn_icon");
    domAgendaCollapse && domAgendaCollapse.dataset.agendaCollapseState && domAgendaCollapseIcon && domAgendaCollapse.dataset.agendaCollapseState === "false" 
    ? domAgendaCollapseIcon.classList.remove("fa-rotate-180") : domAgendaCollapseIcon.classList.add("fa-rotate-180");
});

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                      Quote Expand Button Click                                        - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const domQuoteExpandBtn = document.getElementById("quote_view_more_btn");
domQuoteExpandBtn && domQuoteExpandBtn.addEventListener("click", (ev) => {
    const domQuote = document.querySelector("[data-quote-expand-state]");
    const domViewMoreContainer = document.querySelector("#quote_view_more_container");
    domQuote && domQuote.dataset.quoteExpandState && domQuote.dataset.quoteExpandState === "false" ? domQuote.dataset.quoteExpandState = "true" : domQuote.dataset.quoteExpandState = "false";
    domQuote && domQuote.dataset.quoteExpandState && domViewMoreContainer && domQuote.dataset.quoteExpandState === "false" ? domQuote.classList.add("line-clamp-3") && domViewMoreContainer.classList.add("hidden")  : domQuote.classList.remove("line-clamp-3") && domViewMoreContainer.classList.remove("hidden");
    domViewMoreContainer.classList.add("hidden");
    console.log(domViewMoreContainer);
});

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                      Save Article Button Click                                        - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const domSaveArticleBtn = document.getElementById("save_article_btn");
domSaveArticleBtn && domSaveArticleBtn.addEventListener("click", (ev) => {
    const domSaveArticleIcon = document.getElementById("save_article_icon");
    if (domSaveArticleIcon && domSaveArticleIcon.classList.contains("fa-regular")) {
        addArticleBookmark(articleParam);
        domSaveArticleIcon && domSaveArticleIcon.classList.replace("fa-regular", "fa-solid");
    } else if (domSaveArticleIcon && domSaveArticleIcon.classList.contains("fa-solid")) {
        removeArticleBookmark(articleParam);
        domSaveArticleIcon && domSaveArticleIcon.classList.replace("fa-solid", "fa-regular");
    }
});

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                           Find Article BookMark To Modify Save Button State                           - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
// console.log(findArticleBookMark(articleParam));
if (domSaveArticleBtn && findArticleBookMark(articleParam)) {
    const domSaveArticleIcon = document.getElementById("save_article_icon");
    domSaveArticleIcon && domSaveArticleIcon.classList.replace("fa-regular", "fa-solid");
}

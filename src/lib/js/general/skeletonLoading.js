// Skeleton Loading Animation For Navbar Dropdown List Level 2
export const skeletonNavLevel2 = () => {
    // Get The Dropdown Level 2 List
    const domDropdownListsLevel2 = document.querySelectorAll("[data-dropdown-parent]");

    domDropdownListsLevel2.forEach(domDropdownListLevel2 => {


        let cloneTotal = 5; // Clone Total 5 items
        while (cloneTotal > 0) {
            if (cloneTotal === 5) {
                domDropdownListLevel2.innerHTML += 
                `
                    <li class="skeleton relative pr-3 py-2 -mt-0 w-full h-8 bg-slate-500">
                    </li>
                `;
                cloneTotal--;
                continue;
            }

            if (cloneTotal === 1) {
                domDropdownListLevel2.innerHTML += 
                `
                    <li class="skeleton relative pr-3 py-2 w-full h-8 bg-slate-500">
                    </li>
                `;
                cloneTotal--;
                continue;
            } 

            domDropdownListLevel2.innerHTML += 
            `
                <li class="skeleton relative pr-3 py-2 my-4 w-full h-8 bg-slate-500">
                </li>
            `;
            cloneTotal--;
        }
    });
}

// Skeleton Loading For Banner
export const skeletionArticleBanner = () => {
    // Get Article Banner Container DOM
    const domArticleBannerContainer = document.getElementById("article_banner_container");

    // Define Articles Card
    let articlesCard = `
        <div
            class="skeleton post-card relative row-span-2 col-span-2 flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-2 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-4 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__time w-[40%] h-6"></a>
            <a href="javascript:void(0)" class="post-card__link"></a>
            <div
                class="post-card-bg">
            </div>
        </div>

        <div class="skeleton post-card relative flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-2 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-4 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__time w-[40%] h-6"></a>
            <a href="javascript:void(0)" class="post-card__link"></a>
            <div
                class="post-card-bg">
            </div>
        </div>

        <div class="skeleton post-card relative flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-2 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-4 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__time w-[40%] h-6"></a>
            <a href="javascript:void(0)" class="post-card__link"></a>
            <div
                class="post-card-bg">
            </div>
        </div>

        <div class="skeleton post-card relative flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-2 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-4 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__time w-[40%] h-6"></a>
            <a href="javascript:void(0)" class="post-card__link"></a>
            <div
                class="post-card-bg">
            </div>
        </div>

        <div class="skeleton post-card relative flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-2 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-4 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__time w-[40%] h-6"></a>
            <a href="javascript:void(0)" class="post-card__link"></a>
            <div
                class="post-card-bg">
            </div>
        </div>
    `;

    // Assign Articles Card Into Article Banner Container
    domArticleBannerContainer.innerHTML = articlesCard;
}

// Skeleton Loading For Topic
export const skeletonTopic = () => {
    // Get Topic List DOM
    const domTopicList = document.getElementById("category_list");

    // Define Topic Items
    let topicItems = ``;

    // Define Total Items
    let totalItems = 5;

    // Assign Items Into Topic Items
    while (totalItems > 0) {
        topicItems += `
            <li class="category-list__item text-xl">
                <button class="skeleton category-list__item__btn type="button"></button>
            </li>
        `;

        totalItems--;
    }

    // Assign Topic Items Into Topic List
    domTopicList.innerHTML += topicItems;
}

// Skeleton Loading For Topic
export const skeletonLoadingArticles = () => {
    // Get Articles Container DOM
    const domArticlesContainer = document.getElementById("articles_container");

    // Define Articles
    let articlesContent = ``;

    let totalArticles = 7;

    while (totalArticles > 0) {
        articlesContent += `
            <div class="topic-card">
                <div class="skeleton topic-card__img"></div>
                <div class="topic-card__info">
                    <div class="skeleton-title topic-card__info__title h-10 mb-2"></div>
                    <div class="skeleton-title topic-card__info__date w-[40%] h-4 mb-4"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                </div>
            </div>
        `;

        totalArticles--;
    }


    // Assign Articles into Articles Container
    domArticlesContainer.innerHTML += 
    `
        <div class="topic-container flex lg:ml-5 flex-col gap-12">
            ${articlesContent}
            <div class="view-more flex lg:justify-end justify-center">
                <a href="javascript:void(0)" class="skeleton w-40 h-11"></a>
            </div>
        </div>
    `;
}

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                               Post Index                                              - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
// Header
export const skeletionHeaderPosts = () => {
    // Get Header Container DOM
    const domHeaderContainer = document.getElementById("main_topic_container");

    // Assign Header Into Header Container DOM
    domHeaderContainer.innerHTML = `
        <h1 class="skeleton-title w-48 h-9" id="topic_main_heading"></h1>
    `;
}

// Skeleton Loading For Banner
export const skeletionSpecificArticleBanner = () => {
    // Get Article Banner Container DOM
    const domArticleBannerContainer = document.getElementById("article_banner_container");

    // Define Articles Card
    let articlesCard = `
        <div
            class="skeleton post-card relative row-span-2 col-span-2 flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-2 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-4 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__time w-[40%] h-6"></a>
            <a href="javascript:void(0)" class="post-card__link"></a>
            <div
                class="post-card-bg">
            </div>
        </div>

        <div class="skeleton post-card relative flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-2 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-4 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__time w-[40%] h-6"></a>
            <a href="javascript:void(0)" class="post-card__link"></a>
            <div
                class="post-card-bg">
            </div>
        </div>

        <div class="skeleton post-card relative flex flex-col justify-end px-4 py-4 text-white overflow-hidden">
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-2 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-4 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__time w-[40%] h-6"></a>
            <a href="javascript:void(0)" class="post-card__link"></a>
            <div
                class="post-card-bg">
            </div>
        </div>

        <div class="skeleton post-card relative flex flex-col col-span-2 justify-end px-4 py-4 text-white overflow-hidden">
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-2 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__title text-2xl font-bold mb-4 w-full h-8"></a>
            <a href="javascript:void(0)" class="skeleton-title post-card__time w-[40%] h-6"></a>
            <a href="javascript:void(0)" class="post-card__link"></a>
            <div
                class="post-card-bg">
            </div>
        </div>
    `;

    // Assign Articles Card Into Article Banner Container
    domArticleBannerContainer.innerHTML = articlesCard;
}


// Breadcrumb Post
export const breadcrumbPostsSkeleton = () => {
    // Get BreadCrumb Container
    const domBreadCrumb = document.getElementById("breadcrumb");

    // Assign BreadCrumb Items
    domBreadCrumb.innerHTML = `
        <ul class="breadcrumb-list flex items-center">
            <li class="skeleton-title breadcrumb-list__item w-20 h-6"></li>
            <i class="fa-solid fa-angle-right mx-1 text-xs" style="color: rgb(136, 136, 143);"></i>
            <li class="skeleton-title breadcrumb-list__item w-24 h-6"></li>
        </ul>
    `;
}

// Skeleton Loading For Articles
export const skeletonSpecificArticles = () => {
    // Get Articles Container DOM
    const domTopicContainer = document.getElementById("topic_container");

    // Define Articles
    let cards = ``;

    let totalArticles = 7;

    while (totalArticles > 0) {
        cards += `
            <div class="topic-card">
                <div class="skeleton topic-card__img"></div>
                <div class="topic-card__info">
                    <div class="skeleton-title topic-card__info__title h-10 mb-2"></div>
                    <div class="skeleton-title topic-card__info__date w-[40%] h-4 mb-4"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                </div>
            </div>
        `;

        totalArticles--;
    }


    // Assign Articles into Articles Container
    domTopicContainer.innerHTML += 
    `
        <div class="topic-container flex flex-col gap-12">
            ${cards}
        </div>
    `;
}

// Skeleton Loading For Articles
export const skeletonArticlesLazyLoad = () => {
    // Get Articles Container DOM
    const domTopicContainer = document.querySelector(".topic-container");

    // Get Target Trigger Lazy Loading
    let target = document.querySelector('#js-load-more');

    // Define Articles
    let cards = ``;

    let totalArticles = 7;

    while (totalArticles > 0) {
        cards += `
            <div class="topic-card">
                <div class="skeleton topic-card__img"></div>
                <div class="topic-card__info">
                    <div class="skeleton-title topic-card__info__title h-10 mb-2"></div>
                    <div class="skeleton-title topic-card__info__date w-[40%] h-4 mb-4"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                </div>
            </div>
        `;

        const topicCard = document.createElement("div");
        topicCard.classList.add("topic-card");
        topicCard.innerHTML = `
            <div class="skeleton topic-card__img"></div>
            <div class="topic-card__info">
                <div class="skeleton-title topic-card__info__title h-10 mb-2"></div>
                <div class="skeleton-title topic-card__info__date w-[40%] h-4 mb-4"></div>
                <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
            </div>
        `;

        // Assign Article into Articles Container
        domTopicContainer.insertBefore(topicCard, target);

        totalArticles--;
    }
}

// Skeleton Loading For Aside Relative Articles
export const skeletonRelativeArticles = () => {
    // Get Aside Container DOM
    const asideContainer = document.getElementById("aside_topic");

    // Get Relative Articles Container DOM
    const domRelativeArticlesContainer = document.getElementById("relative_articles");

    // Display Aside Container
    asideContainer.classList.remove("hidden");

    // Define Items
    let items = ``;

    let totalItems = 7;
    
    while (totalItems > 0) {
        if (totalItems === 1) {
            items += `
                <li class="relative-topic__list__item"><a href="javascript:void(0)" class="skeleton-title relative-topic__list__item__link w-full h-6"></a></li>
            `;

            totalItems--;
            continue;
        }
        
        items += `
            <li class="relative-topic__list__item"><a href="javascript:void(0)" class="skeleton-title relative-topic__list__item__link w-full h-6 mb-4"></a></li>
        `;

        totalItems--;
    }

    // Assign Items Into Relative Articles Container
    domRelativeArticlesContainer.innerHTML = 
    `
        <ul class="relative-topic__list">
            ${items}
        </ul>
    `;
}

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                             Post Details                                              - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */

// Breadcrumb Post Details
export const skeletonBreadcrumbPostDetails = () => {
    // Get BreadCrumb Container
    const domBreadCrumb = document.getElementById("breadcrumb");

    // Assign BreadCrumb Items
    domBreadCrumb.innerHTML = `
        <ul class="breadcrumb-list flex items-center">
            <li class="skeleton-title breadcrumb-list__item w-20 h-6"></li>
            <i class="fa-solid fa-angle-right mx-1 text-xs" style="color: rgb(136, 136, 143);"></i>
            <li class="skeleton-title breadcrumb-list__item w-24 h-6"></li>
            <i class="fa-solid fa-angle-right mx-1 text-xs" style="color: rgb(136, 136, 143);"></i>
            <li class="skeleton-title breadcrumb-list__item w-48 h-6"></li>
        </ul>
    `;
}

export const skeletonArticleContent = () => {
    // Get Article Content Container DOM
    const domArticleContentContainer = document.getElementById("article_section");

    // Define Article Content
    const content = `
        <div class="topic-container w-full">
            <div class="topic-title mt-6 mb-8">
                <h1 class="skeleton-title text-5xl leading-tight inline-flex w-full h-16"></h1>
                <h1 class="skeleton-title text-5xl leading-tight inline-flex w-1/3 h-16"></h1>
            </div>

            <div class=\"save-article flex justify-end px-4 mb-8 \" id=\"save_article\">
                <button type=\"button\" title=\"Save Article\" class="skeleton-title save-article-btn hover:scale-125 w-[18px] h-[24px]" id=\"save_article_btn\">
                </button>
            </div>

            <div class="topic-content">
                <p class="topic-content-paragraph">
                    <span class="skeleton-content w-full h-6 block mb-2"></span>
                    <span class="skeleton-content w-3/4 h-6 block"></span>
                </p>

                <p class="topic-content-paragraph">
                    <span class="skeleton-content w-full h-6 block mb-2"></span>
                    <span class="skeleton-content w-1/2 h-6 block"></span>
                </p>

                <p class="topic-content-paragraph">
                    <span class="skeleton-content w-full h-6 block"></span>
                </p>

                <div class="topic-content-image-container">
                    <div class="skeleton topic-content-image w-full h-96"></div>
                    <p class="skeleton-content topic-content-image-desc text-xs italic mt-1 mb-4 w-3/4 h-4"></p>
                </div>

                <div class="topic-content-section">
                    <h1 class="skeleton-title topic-section-title text-3xl mt-8 mb-5 w-4/5 h-9"></h1>
                    <div class="topic-section-content">
                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <div class="topic-content-quote border-l-2 border-indigo-500 px-12 relative line-clamp-3 h-36" data-quote-expand-state="false">
                            <p class="topic-content-paragraph text-4xl italic topic-content-quote__main pt-6">
                                <span class="skeleton-content w-full h-16 block mb-2"></span>
                                <span class="skeleton-content w-full h-16 block"></span>
                            </p>
                            <div class="topic-content-quote__view-more absolute bottom-0 right-0 left-0 pb-2 text-lg flex items-end justify-center"><button type="button" class="skeleton-title topic-content-quote__view-more__btn hover:underline w-24 h-7" title="View More Quote"></button></div>
                        </div>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-1/3 h-6 block"></span>
                        </p>

                        <div class="topic-content-image-container">
                            <div class="skeleton topic-content-image w-full h-96"></div>
                        </div>
                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <div class="topic-content-single-quote border-l-4 border-x-neutral-500 px-4 py-2 relative line-clamp-3">
                            <a href="#" class="skeleton-title topic-content-link w-3/4 h-5 block"></a>
                        </div>

                        <div class="topic-content-single-quote border-l-4 border-x-neutral-500 px-4 py-2 relative line-clamp-3">
                            <a href="#" class="skeleton-title topic-content-link w-2/3 h-5 block"></a>
                        </div>
                    </div>
                </div>

                <div class="topic-content-section">
                    <h1 class="skeleton-title topic-section-title text-3xl mt-8 mb-5 w-4/5 h-9"></h1>

                    <div class="topic-section-content">
                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>    

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <div class="topic-content-image-container">
                            <div class="skeleton topic-content-image w-[500px] h-[500px] mx-auto"></div>
                        </div>

                        <div class="topic-content-image-container">
                            <div class="skeleton topic-content-image w-full h-96"></div>
                        </div>
                    </div>
                </div>

                <div class="topic-content-section">
                    <h1 class="skeleton-title topic-section-title text-3xl mt-8 mb-5 w-4/5 h-9"></h1>

                    <div class="topic-section-content">
                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <div class="topic-content-image-container">
                            <div class="skeleton topic-content-image w-full h-96"></div>
                        </div>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>
                    </div>
                </div>

                <div class="topic-content-section">
                    <h1 class="skeleton-title topic-section-title text-3xl mt-8 mb-5 w-4/5 h-9"></h1>

                    <div class="topic-section-content">
                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <ul class="topic-content-unordered-list">
                            <li class="topic-content-unordered-list__item mb-4">
                                <span class="skeleton-content w-full h-6 block mb-2"></span>
                                <span class="skeleton-content w-2/5 h-6 block"></span>
                            </li>

                            <li class="topic-content-unordered-list__item mb-4">
                                <span class="skeleton-content w-4/5 h-6 block mb-2"></span>
                            </li>

                            <li class="topic-content-unordered-list__item">
                                <span class="skeleton-content w-full h-6 block mb-2"></span>
                                <span class="skeleton-content w-2/5 h-6 block"></span>
                            </li>
                        </ul>

                        <div class="topic-content-image-container">
                            <div class="skeleton topic-content-image w-[500px] h-[500px] mx-auto"></div>
                        </div>
                        
                        <p class="topic-content-paragraph flex justify-center">
                            <span class="skeleton-content w-4/5 h-6 block"></span>
                        </p>
                        
                        <ul class="topic-content-unordered-list">
                            <li class="topic-content-unordered-list__item mb-4">
                                <span class="skeleton-content w-full h-6 block mb-2"></span>
                                <span class="skeleton-content w-2/5 h-6 block"></span>
                            </li>

                            <li class="topic-content-unordered-list__item mb-4">
                                <span class="skeleton-content w-4/5 h-6 block mb-2"></span>
                                <span class="skeleton-content w-2/5 h-6 block"></span>
                            </li>

                            <li class="topic-content-unordered-list__item">
                                <span class="skeleton-content w-full h-6 block mb-2"></span>
                                <span class="skeleton-content w-2/5 h-6 block"></span>
                            </li>

                            <li class="topic-content-unordered-list__item">
                                <span class="skeleton-content w-full h-6 block mb-2"></span>
                                <span class="skeleton-content w-2/5 h-6 block"></span>
                            </li>
                        </ul>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>
                    </div>
                </div>

                <div class="topic-content-section">
                    <h1 class="skeleton-title topic-section-title text-3xl mt-8 mb-5 w-4/5 h-9"></h1>

                    <div class="topic-section-content">
                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <p class="topic-content-paragraph">
                            <span class="skeleton-content w-full h-6 block mb-2"></span>
                            <span class="skeleton-content w-2/5 h-6 block"></span>
                        </p>

                        <div class="topic-content-image-container">
                            <div class="skeleton topic-content-image w-[650px] h-[700px] mx-auto"></div>
                        </div>
                    </div>
                </div>

                <div class="topic-content-section">
                    <h1 class="skeleton-title topic-section-title text-3xl mt-8 mb-5 w-4/5 h-9"></h1>

                    <div class="topic-section-content">
                        <ul class="topic-content-unordered-list">
                            <li class="topic-content-unordered-list__item"><a href="javascript:void(0)" class="topic-content-link skeleton-content w-3/5 h-5 block"></a></li>
                            <li class="topic-content-unordered-list__item"><a href="javascript:void(0)" class="topic-content-link skeleton-content w-3/5 h-5 block"></a></li>
                        </ul>

                        <div class="author-note">
                            <p class="author-note__content author-note__content--bold">
                                <span class="skeleton-content w-full h-8 block mb-2"></span>
                                <span class="skeleton-content w-2/5 h-8 block"></span>
                            </p>
                            <div class="author-note__signature author-note__signature--bold flex justify-end">
                                <span class="skeleton-content w-2/5 h-8"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Assign Content Into Article Content Container
    domArticleContentContainer.innerHTML += content;
}

// Skeleton Post Details Agenda
export const skeletonPostDetailsAgenda = () => {
    // Get Article Content Container DOM
    const domArticleContentContainer = document.getElementById("article_section");

    // Define Items Agenda
    let items = ``;

    let totalItems = 6;

    while (totalItems > 0) {
        items += `
            <li class="agenda-content-list__item"><a href="javascript:void(0)" class="skeleton-title agenda-content-list__item__link w-full h-6 block"></a></li>
        `;

        totalItems--;
    }

    // Define Agenda
    const agenda = `
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
                    <button type="button" class="skeleton-title aside-agenda__collapse__btn mx-4 mt-5 mb-5 w-4 h-4" id="aside_agenda_collapse_btn" title="Collapse Agenda"></button>
                </div>
            </div>
        </aside>
    `;

    // Assign Agenda Into Article Section DOM
    domArticleContentContainer.innerHTML += agenda;
}

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                                Bookmark                                               - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
// Breadcrumb Bookmark
export const skeletonBreadcrumbBookMark = () => {
    // Get BreadCrumb Container
    const domBreadCrumb = document.getElementById("breadcrumb");

    // Assign BreadCrumb Items
    domBreadCrumb.innerHTML = `
        <ul class="breadcrumb-list flex items-center">
            <li class="skeleton-title breadcrumb-list__item w-20 h-6"></li>
            <i class="fa-solid fa-angle-right mx-1 text-xs" style="color: rgb(136, 136, 143);"></i>
            <li class="skeleton-title breadcrumb-list__item w-24 h-6"></li>
        </ul>
    `;
}

// Skeleton Loading For Bookmark Articles
export const skeletonBookmarkArticles = () => {
    // Get Articles Container DOM
    const domArticlesContainer = document.getElementById("articles_container");

    // Define Articles
    let cards = ``;

    let totalArticles = 7;

    while (totalArticles > 0) {
        cards += `
            <div class="topic-card">
                <div class="skeleton topic-card__img"></div>
                <div class="topic-card__info">
                    <div class="skeleton-title topic-card__info__title h-10 mb-2"></div>
                    <div class="skeleton-title topic-card__info__date w-[40%] h-4 mb-4"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                    <div class="skeleton-title topic-card__info__content w-[400px] h-6"></div>
                </div>
            </div>
        `;

        totalArticles--;
    }


    // Assign Articles into Articles Container
    domArticlesContainer.innerHTML = 
    `
        <div class="topic-container flex flex-col gap-12">
            ${cards}
        </div>
    `;
}

// Skeleton Loading For Bookmark Filter
export const skeletonBookMarkFilter = () => {
    // Get BookMark Filter Container
    const domAsideBookmark = document.getElementById("aside_bookmark");

    // Get BookMark List
    const domFiterBookmarkList = document.getElementById("filter_bookmark_list");

    // Display BookMark Filter Container
    domAsideBookmark.classList.remove("hidden");

    // Define BookMark List Items
    let bookmarkItems = ``;

    let totalItems = 6;

    while (totalItems > 0) {
        if (totalItems === 6) {
            bookmarkItems += `
                <div class="input-group">
                    <button type="button" class="skeleton-title w-4 h-4 rounded-full"></button>
                    <p class="skeleton-title w-full h-6"></p>
                </div>
            `;

            totalItems--;
            continue;
        }

        bookmarkItems += `
            <div class="input-group mt-8">
                <button type="button" class="skeleton-title w-4 h-4 rounded-full"></button>
                <p class="skeleton-title w-full h-6"></p>
            </div>
        `;
        totalItems--;
    }

    // Assign BookMark Items Into BookMark List
    domFiterBookmarkList.innerHTML = bookmarkItems;
}
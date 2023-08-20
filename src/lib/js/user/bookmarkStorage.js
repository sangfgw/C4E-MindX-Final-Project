import { checkLoginSession, findUserInfo } from '/src/lib/js/user/sessionLogin.js';

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                         Get Bookmark Articles                                         - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
export const getAllArticlesIdBookMark = () => {
    return JSON.parse(localStorage.getItem("articlesBookMark"));
}

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                          Add Bookmark Article                                         - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
export const addArticleBookmark = (articleId = String) => {
    // Get All Articles If Any
    const articleIdList = getAllArticlesIdBookMark();

    // Get User Login Info
    if (checkLoginSession() && findUserInfo() && Object.keys(findUserInfo()).length > 0) {
        // User Info
        const userInfo = findUserInfo();

        // Set Article Id Into Local Storage
        if (articleIdList && Array.isArray(articleIdList) && articleIdList.length > 0) {
            localStorage.setItem("articlesBookMark", JSON.stringify([...articleIdList, {articleId: articleId, userId: userInfo.id}]));
            return;
        }

        localStorage.setItem("articlesBookMark", JSON.stringify([{articleId: articleId, userId: userInfo.id}]));
    }

    return;
}

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                        Remove Bookmark Article                                        - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
export const removeArticleBookmark = (articleId = String) => {
    // Get All Articles If Any
    const articleIdList = getAllArticlesIdBookMark();

    // Get User Login Info
    if (checkLoginSession() && findUserInfo() && Object.keys(findUserInfo()).length > 0) {
        // User Info
        const userInfo = findUserInfo();

        // Remove Article Id From Local Storage
        if (articleIdList && Array.isArray(articleIdList) && articleIdList.length > 0) {
            // Get Filter Articles Id List
            const filterArticleIdList = articleIdList.filter(article => article.articleId !== articleId && article.userId !== userInfo.userId);

            // If Filter List > 0 Then We Keep the articlesBookMark Item. Otherwise, remove the item
            if (filterArticleIdList && Array.isArray(filterArticleIdList) && filterArticleIdList.length > 0) 
                localStorage.setItem("articlesBookMark", JSON.stringify([...filterArticleIdList]));
            else if (filterArticleIdList && Array.isArray(filterArticleIdList) && filterArticleIdList.length  === 0) {
                localStorage.removeItem("articlesBookMark");
            }
        }
    }

    return;
}

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                         Find Bookmark Article                                         - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
export const findArticleBookMark = (articleId = String) => {
    // Initialize isFound variable
    let isFound = false;

    // Get All Articles If Any
    const articleIdList = getAllArticlesIdBookMark();

    // Get User Login Info
    if (checkLoginSession() && findUserInfo() && Object.keys(findUserInfo()).length > 0) {
        // User Info
        const userInfo = findUserInfo();

        // Find Article Id Inside Articles Id List
        if (articleIdList && Array.isArray(articleIdList) && articleIdList.length > 0 && articleIdList.findIndex(article => article.articleId === articleId && article.userId === userInfo.id) != -1) {
            isFound = true;
        }
    }

    // Return isFound Boolean Value
    return isFound;
}
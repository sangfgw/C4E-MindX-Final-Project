import topics from "/src/lib/js/database/data/topics.json" assert {type: 'json'};
import articles from "/src/lib/js/database/data/articles.json" assert {type: 'json'};
import users from "/src/lib/js/database/data/users.json" assert {type: 'json'};

// Function: Delay (25ms For 40 articles -> 1000ms for articles, 25ms for 5 topics -> 125ms, 1 user -> 25ms ----> 1150ms total)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Find All Topics Data
const findAllTopics = () => {
    const result = [];

    let p  = Promise.resolve();

    // Get All Topics
    topics.forEach((topic, index) => {
        p = p.then(async() => {
            await delay((25));
        }).then(() => {
            result.push(topic);
        }).catch((err) => {
            console.log(err);
        })
    });
    
    return p.then(() => {
        return result;
    });
}

// Find Topic By Id
const findTopicById = async(topicId = String) => {
    let result = {}
    const topics = await findAllTopics();
    topics.every(topic => {
        if (topic.topicId === topicId) {
            // console.log("Found");
            result = Object.assign(topic, result);
            return false;
        }

        return true;
    });
    return result;
}

// Find All Articles Data
const findAllArticles = () => {
    const result = [];

    let p = Promise.resolve();
    // Get All Articles
    articles.forEach(async (article, index) => {
        p = p.then(async() => {
            await delay((25));
        }).then(() => {
            result.push(article);
        }).catch((err) => {
            console.log(err);
        });
    });

    return p.then(() => {
        return result;
    });
}

// Find Article By Article Id
const findArticleById = async(articleId = String) => {
    let result = {}
    const articles = await findAllArticles();

    articles.every(article => {
        if (article.articleId === articleId) {
            result = Object.assign(article, result);
            // console.log(result);
            return false;
        }

        return true;
    });

    return result;
}

// Find Articles By Topic Id (Added Limit Later)
const findArticlesByTopicId = async(topicId = String) => {
    const articles = [];
    const result = [];
    articles.push(...await findAllArticles());
    articles.forEach((article) => {
        if (article && article.topicId && article.topicId === topicId) {
            result.push(article);
        }
    });

    return result;
}

// Find All Users Data
const findAllUsers = async() => {
    const result = [];
    let p = Promise.resolve();
    users.forEach((user, index) => {
        p = p.then(async() => await delay((25)))
            .then(() => result.push(user))
            .catch((err) => console.log(err));
    });

    return p.then(() => {
        return result;
    });
}

export {findAllTopics, findTopicById, findAllArticles, findArticlesByTopicId, findArticleById, findAllUsers};

/* Use Function */
// findAllTopics();
// findAllArticles();


/*
    c8ea2174-6302-43d3-bc18-9c5e9e625d02 -- Programming

    261ebdcd-1258-4cab-8b5e-8ab58cef5ea7 --

    89f461ba-99bc-4ad3-aec5-8c911a8d1a67 --

    bef6c089-032b-4e87-82f0-7157fd91c196 --

    acedd446-fb51-40b5-ac81-f99c3ee67b6d --

    d4753e62-6673-4021-9b81-683f05f542a7 --

    57be7d6e-600e-492a-b7d7-7603100ca8cf --

    4fdbdbb4-4426-4290-b30f-4c4ff20be959 --

        074360af-0484-4dde-bcd5-011ba7606deb -- Interview

        0d20e0f1-7460-4a40-a5ea-6ad322b95091 --

        8e49c842-68bc-4de1-a322-b4eb6be79258 --

        8506cfec-84e8-4d7f-877c-bb566fdece1f --

        433e5fc0-81da-45bf-a688-907323bf77ff --

        ba2f34f3-7e45-4b2e-a2a3-bb2152a973a5 --

        7d34da65-2ebe-433c-9be6-77f96316a777 --

        18f0e82b-f1ba-4644-8ce3-e064c2eb8c9d --

            d0633372-79f2-4c3e-81ba-b3f0cfd7ad18 -- Expert Suggestion

            11fbed78-371c-4f7c-9093-98828ab346fc --

            c798ef04-c9c8-4737-a9c3-2f0374552ee2 --

            da8653ad-51a6-49c4-b432-b0f398bf098a --

            c3c5fc0b-1b89-4c37-874f-e6382e38010f --

            c5cd9214-de4e-4161-94b4-a6c34942d434 --

            0e15c288-5833-461a-8206-952945077ecf --

            f0ba9f5f-157b-418b-b09d-fad5e3e247c7 --

                d606976a-8afd-4839-9dc3-55bcf424911c -- Workshop

                c30cb90f-451f-48cd-ad7d-ada7522cf8f3 --

                315f494d-0f75-4cd8-b1fe-425272b7c153 --

                63b63ae2-0a63-4f73-b24c-a09199fdeaf9 --

                1943f13a-91f3-47d4-9db0-87ea5d05fbe4 --

                d30e583e-2bc8-4a4a-b5ae-b22fd8118c84 --

                8b7d8e09-48e7-410c-8ab1-8d9053c20d38 --

                ab43ce72-229e-40e3-9637-0323a9a9cfa9 --

                    031266ef-2961-4df4-923c-487d0315fc24 -- HR

                    d784e79e-4e46-4232-8566-3f4f1f15b815 --

                    a89e372f-54c6-4ab1-a168-806d55228179 --

                    a7bf00f2-ad58-4218-83a6-f87577b669e5 --

                    a70448c8-0f96-4f86-bbdc-bd5e39bf7ab2 --

                    03706dbe-39b3-4a26-baa2-e36b99024e7f --
 
                    5f93b7e0-ae82-4253-b998-3a3812e71799 --

                    828657a7-0d99-4ff4-b799-069201666311 --
*/
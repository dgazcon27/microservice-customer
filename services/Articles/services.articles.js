const ArticleRepository = require("../../models/Articles/articlesRepository")

module.exports = class ArticleServices {
    createArticle(body) {
        const { name } = body
        return new Promise(async (resolve, reject) => {
            try {
                const count = await ArticleRepository.countDocuments({ name });
                if(count > 0) reject({details: `Article with name ${name} already exists.`})
                const article = await new ArticleRepository(body).save();
                resolve(article);
            } catch (err) {
                reject(err)
            }
        }) 
    }

    getArticles() {
        return new Promise(async (resolve, reject) => {
            const articles = await ArticleRepository.find({})
            resolve(articles)
        })
    }

    getArticleByField(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const article = await ArticleRepository.find(filter);
                if (article.length === 0) reject({details: `Article does not exist.`})
                resolve(article[0]);
            } catch (err) {
                reject(err)
            }
        }) 
    }

    updateArticle(body, _id) {
        console.log("Updating article")
        return new Promise(async (resolve, reject) => {
            try {
                const responseArticle = await ArticleRepository.updateOne({_id}, body);
                console.log(responseArticle)
                if (responseArticle.modifiedCount <= 0) {
                    reject({details: `Update article failed`})
                }
                const article = await this.getArticleByField({_id})
                resolve(article);
            } catch (err) {
                reject(err)
            }
        }) 
    }

    findArticlesById(ids) {
        console.log("find multiple articles by IDs")
        return new Promise(async (resolve, reject) => {
            try {
                const articles = await ArticleRepository.find({_id: { $in: ids }})
                resolve(articles)
            } catch (err) {
                reject(err)
            }
        })
    }
}
const ArticleRepository = require("../../models/Articles/articlesRepository")

module.exports = class CustomerService {
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

    getArticleById(_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const article = await ArticleRepository.find({ _id });
                if (article.length === 0) reject({details: `Article with id ${_id} does not exist.`})
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
                const article = await this.getArticleById(_id)
                resolve(article);
            } catch (err) {
                reject(err)
            }
        }) 
    }
}
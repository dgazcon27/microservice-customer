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
}
const ArticleService = require('../../services/Articles/services.articles')
const PurchaseService = require('../../services/Purchase/services.purchase')
const ArticleModel = require('../../models/Articles/articles')
const { convertDate, getFolderPath } = require("../../utils/tools");
const PurchaseModel = require('../../models/Purchase/purchase');

const articleService = new ArticleService();
const FOLDER_MODULE = 'articles';
const folderPath = getFolderPath(FOLDER_MODULE);

const createArticle = async (req, res, next) =>{
    console.log("Begin create article")
    const { body } = req
    let article = null;
    try {
        let articleSearch = await articleService.getArticleByField({name: body.name})
        if (articleSearch.length === 0) {
            article = new ArticleModel(await articleService.createArticle(body))
            console.log("Article create successfully")
        } else {
            //update article availability
            let quantityAvailable = body.quantityAvailable + articleSearch[0].quantityAvailable
            article = (await articleService.updateArticle({quantityAvailable}, articleSearch[0]._id))[0]
        }
        const purchaseService = new PurchaseService()
        const bodyPurchase = {
            articles: [{ article: article._id, quantityAvailable: body.quantityAvailable}],
            type: 'INCOME',
            price: 0,
            client: body.createdBy
        }
        const createdPurchase = await purchaseService.createPurchase(bodyPurchase)
        console.log(createdPurchase)
        console.log(createdPurchase.hasOwnProperty('_id'))
        if(createdPurchase.hasOwnProperty('_id')) return res.status(500).json({message: "Internal server error"});
        return res.status(201).json({message: "Article created successfully"});
    } catch (error) {
        next(error)
    }
}

const getArticles = async (req, res, next) => {
    console.log("Begin get all article")
    try {
        const articles = (await articleService.getArticles()).map(article => new ArticleModel(article))
        console.log("Return articles", articles)
        return res.status(200).json(articles)
    } catch (error) {
        next(error)
    }
}

const getArticleByField = async (req, res, next) => {
    console.log("Begin get article by filter")
    const { body } = req
    if (body.name) {
        body.name = { $regex: '.*' + body.name + '.*', $options: 'i' }
    }
    try {
        const article = await articleService.getArticleByField(body)
        if (article.details)
            return res.status(404).json({message: article.details})
        
        return res.status(200).json(article.map(item => new ArticleModel(item)))
    } catch (error) {
        next(error)
    }
}

const updateArticle =  async (req, res, next) => {
    const articleBody = {...req.body, updatedAt: convertDate()}
    const { id } = req.params
    try {
        const article = await articleService.updateArticle(articleBody, id)
        return res.status(200).json(new ArticleModel(article))
    } catch (error) {
        next(error)
    }
}

const findArticlesById = async (req, res, next) => {
    const { ids } = req.body
    try {
        const responseArticle = await articleService.findArticlesById(ids)
        return res.status(200).json(responseArticle.map(article => new ArticleModel(article)))
    } catch (error) {
        next(error)
    }
    
} 

const restockArticle = async (req, res, next) => {
    console.log("\nRestocking an article.")
    const { id } = req.params
    const { quantityAvailable } = req.body
    try {
        // Update quantityAvailable
        const articleResponse = await articleService.getArticleByField({_id:id});
        if (articleResponse.length === 0) return res.status(404).json({ message: 'Article does not exist.'})
        const article = articleResponse[0];
        const quantity = article.quantityAvailable + quantityAvailable;
        const updateArticle = await articleService.updateArticle({quantityAvailable: quantity}, article._id)
        if (updateArticle.length === 0) return res.status(500).json({ message: 'Internal server error.'})

        // Creating log in purchase for restock
        const purchaseService = new PurchaseService()
        const bodyPurchase = {
            articles: [{ article: article._id, quantityAvailable: quantity}],
            type: 'INCOME',
            price: 0,
            client: article.createdBy
        }
        const createdPurchase = await purchaseService.createPurchase(bodyPurchase)
        if(createdPurchase.hasOwnProperty('_id')) return res.status(500).json({message: "Internal server error"});
        return res.status(201).json({message: "Article restock successfully"});
    } catch (error) {
        next(error)
    }
}

const createProductByText = async(req, res, next) => {
    console.log("requesting calculating profit from message");
    const { message } = req.body;
    const itemList = message.split(",").map(item => item.trim());
    if (itemList.length !== 5) {
        return res.status(400).json({message: 'Inconsistency in amount of fields'});
    }
    const article = getItemFromList(itemList);
    productPrice = parseFloat((article.totalCostProduct/article.unitPerPackage).toFixed(2));
    profitProduct = parseFloat(((productPrice*article.profit)/100).toFixed(2));
    productCost = parseFloat((productPrice + profitProduct).toFixed(2));
    resultTotalProfit = ((article.totalCostProduct*30)/100)+article.totalCostProduct
    totalProfit = parseFloat((resultTotalProfit-article.totalCostProduct).toFixed(2))
    totalProduct = parseFloat((totalProfit+article.totalCostProduct).toFixed(2))
    return res.status(200).json({productPrice, profitProduct, productCost, totalProfit, totalProduct});
}

const createProductoFromMessage = async(req, res, next) => {
    console.log("Requesting article creation from message");
    const { message } = req.body;
    const itemList = message.split(",").map(item => item.trim());
    if (itemList.length !== 5) {
        console.log("Request body", itemList);
        return res.status(400).json({message: 'Inconsistency in amount of fields'});
    }
    const article = getItemFromList(itemList);
    const articleCost = article.totalCostProduct/article.unitPerPackage;
    const articlePrice = articleCost + (articleCost*(article.profit/100))
    const body = {
        description: article.name,
        name: article.name,
        type: "",
        expiredAt : convertDate(),
        quantityAvailable: article.unitPerPackage,
        unitPrice: articlePrice
    }

    try {
        const article = new ArticleModel(await articleService.createArticle(body))
        console.log("Article create successfully")
        return res.status(200).json(article)
    } catch (error) {
        next(error)
    }
}

const deleteArticleById = (req, res, next) => {
    const { id } = req;
    try {
        const articleResponse = articleService.deleteArticleById(id);
        res.status(200)
    } catch (error) {
        next(error)
    } 
}

const uploadImageArticle = async (req, res, next) => {
    const { image } = req.files;

    if (!image) return res.sendStatus(400);

    if (/^image/.test(image.mimetype)) return res.sendStatus(400);
    
    image.mv(`${folderPath}/${image.name}`);
    // All good
    return res.sendStatus(200);
}

const getItemFromList = (itemList) => {
    return {
        name: itemList[0],
        unitPerPackage: parseInt(itemList[1]),
        unitSell: parseInt(itemList[2]),
        profit: parseFloat(itemList[3]),
        totalCostProduct: parseFloat(itemList[4])
    };
}

module.exports = {
    createArticle,
    getArticles,
    getArticleByField,
    updateArticle,
    findArticlesById,
    restockArticle,
    createProductByText,
    createProductoFromMessage,
    deleteArticleById,
    uploadImageArticle
}
  
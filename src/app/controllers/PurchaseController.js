const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body
    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)
    const purchase = await Purchase.create({ content, ad, user: user._id })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user: user,
      content: content
    }).save()

    return res.json({ purchase })
  }

  async index (req, res) {
    const purchase = await Purchase.find()
    return res.json(purchase)
  }
}

module.exports = new PurchaseController()

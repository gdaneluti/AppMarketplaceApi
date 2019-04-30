const Ad = require('../models/Ad')
const Purchase = require('../models/Purchase')

class ApproveController {
  async update (req, res) {
    const { id } = req.params
    const purchase = await Purchase.findById(id)
    const { ad } = purchase
    const newAd = await Ad.findByIdAndUpdate(
      ad._id,
      {
        purchaseBy: purchase._id
      },
      {
        new: true
      }
    )
    return res.json(newAd)
  }
}

module.exports = new ApproveController()

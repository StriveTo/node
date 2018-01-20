var express = require('express');
var router = express.Router();
var GoodsModel = require("../model/Goods");

router.get('/add', function(req, res, next) {
  res.send('respond with a resource');
});
//模糊查询和翻页
router.post('/list', function(req, res, next) {
	var keword = null;
//	if(req.body.keyword){
//		keword = {goodsname: {$regex: req.body.keyword}}
//	}else{
//		keword = {};
//	}
	keword = {"flag" : 1,"goodsname": {$regex: req.body.keyword}}
	// 注意代码的健壮性
	// 测试中，有异常系测试。 后端最头疼的是异常系测试。
	var page = req.body.page || 1;
	page = parseInt(page);
	var perPageCnt = req.body.perPageCnt || 5;
	perPageCnt = parseInt(perPageCnt);

	GoodsModel.count(keword, function(err, count){
		console.log("数量:" + count);
		var query = GoodsModel.find(keword).skip((page-1)*perPageCnt).limit(perPageCnt);
		query.exec(function(err, docs){
			console.log(err, docs);
			var result = {
				total: count,
				data: docs,
				page: page,
				perPageCnt: perPageCnt
			}
			res.json(result);
		});
	})
});
//删除商品
router.post("/api/remove",function(req,res){
	var goodN = req.body.goodN;
	var result = {
		code : 1,
		message : "商品删除成功"
	}
	GoodsModel.update({goodsname : goodN},{$set:{"flag":0}},function(err){
		if(err){
			result.code = -300;
			result.message = "商品删除失败";
		}
		res.json(result);
	})
})

//修改商品
router.post("/api/edit",function(req,res){
	var nameid = req.body.nameid;
	var itemChange =req.body.itemChange;
	var priceChange =req.body.priceChange;
	var sortChange =req.body.sortChange;
	var salesChange =req.body.salesChange;
	var stockChange =req.body.stockChange;
	var result = {
		code : 1,
		message : "商品修改成功"
	}
	GoodsModel.update({goodsname : nameid},{$set:{goodsitem : itemChange,goodsprice : priceChange,goodssort : sortChange,goodssales : salesChange,goodsstock : stockChange}},function(err){
		if(err){
			result.code = -300;
			result.message = "商品修改失败";
		}
		res.json(result);
	})
})

module.exports = router;

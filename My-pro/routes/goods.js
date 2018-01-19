var express = require('express');
var router = express.Router();
var GoodsModel = require("../model/Goods");

router.get('/add', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/list', function(req, res, next) {
	var keword = null;
	if(req.body.keyword){
		keword = {goodsname: {$regex: req.body.keyword}}
	}else{
		keword = {};
	}
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

module.exports = router;

var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var md5 = require("md5");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//主页面
router.get("/index1",function(req,res){
	res.render("index1",{title: '后台系统'});
})

//注册界面
router.get("/regist",function(req,res){
	res.render("regist",{title:"注册界面"});
})

//注册时获取数据
router.post("/api/registajax",function(req,res){
	var username = req.body.username;
	var psd = req.body.psd;
	var result = {
		code : 1,
		message : "注册成功"
	};
	UserModel.find({username:username},function(err,docs){
		if(docs.length > 0){
			result.code = -100;
			result.message = "你的用户名已被注册，请重新输入";
			res.json(result);
			return;
		}
		var um = new UserModel();
		um.username = username;
		um.psd = md5(psd);
		um.save(function(err){
			if(err){
				result.code = -99;
				result.message = "注册失败";
			}
			res.json(result);
		})
	})
})
//登录页面
router.get("/login",function(req,res){
	res.render("login",{title:"登录页面"});
})
//登录时获取数据
router.post("/api/loginajax",function(req,res){
	var username = req.body.username;
	var psd = req.body.psd;
	
	var result = {
		code : 1,
		message : "登录成功"
	};
	UserModel.find({username:username,psd : md5(psd)},function(err,docs){
		console.log(md5(psd));
		if(docs.length == 0){
			result.code = -101;
			result.message = "账号或密码错误，请重新输入";
		}else{
			req.session.username = username;
			console.log(req.session);
		}
		res.json(result);
	})
})
module.exports = router;

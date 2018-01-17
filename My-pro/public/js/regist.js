$(function(){
	var arr = [];
	for(var i = 1;i < 4;i ++){
		arr[i] = Math.floor(Math.random()*9);
		arr.push(arr[i]);
	}
	var str = arr.join("");
	$(".yzm").html(str);
	$(".regist").click(function(){
		$.ajax({
			type:"post",
			url:"/api/registajax",
			async:true,
			data:{
				username : $("#username").val(),
				psd : $("#psd").val()
			},
			success:function(res){
				console.log(res);
				if(res.code == 1){
					window.location = "http://localhost:3000/login";
				}else{
					alert(res.message);
				}
			}
		});
	})
	$(".login").click(function(){
		$.ajax({
			type:"post",
			url:"/api/loginajax",
			async:true,
			data:{
				username : $("#username").val(),
				psd : $("#psd").val()
			},
			success:function(res){
				console.log(res);
				if(res.code == 1){
					alert(res.message);
					window.location = "http://localhost:3000/index1";
				}else{
					alert(res.message);
				}
			}
		});
	})
})

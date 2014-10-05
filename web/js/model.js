function printList() {
	var db = openDatabase('db1', '1.0', 'db1', 5 * 1024 * 1024);
	if (db) {
		db.transaction(function(context) {
			context.executeSql("select * from t_order", [], function(tx, result) {
				var rows = result.rows;
				var len = rows.length;
				for (var i = 0; i < len; i++) {
					console.log(rows.item(i));
				}
			});
		});
	}
}

function prepareDatabase() {
	var db = openDatabase('db1', '1.0', 'db1', 5 * 1024 * 1024);
	if (db) {
		db.transaction(function(context) {
			context.executeSql("create table if not exists t_order(id, url, name, price, time)");
		});
	}
}

function getList(aCallback) {

	var ret = [];

	var db = openDatabase('db1', '1.0', 'db1', 5 * 1024 * 1024);
	if (db) {
		db.transaction(function(context) {

			context.executeSql("select * from t_order", [], function(tx, result) {
				var rows = result.rows;
				var len = rows.length;
				for (var i = 0; i < len; i++) {
					ret.push(rows.item(i));
				}

				if (aCallback) {
					aCallback(ret);
				}

			});

		});
	}

}

function deleteById(aId) {
	var db = openDatabase('db1', '1.0', 'db1', 5 * 1024 * 1024);
	if (db) {
		db.transaction(function(context) {
			context.executeSql("delete from t_order where id = " + aId);
		});
	}
}

function stringWrap(str) {
	return "'" + str + "'";
}

function insertRow(url, name, price) {
	var db = openDatabase('db1', '1.0', 'db1', 5 * 1024 * 1024);
	if (db) {
		db.transaction(function(context) {
			context.executeSql("create table if not exists t_order(id, url, name, price, time)");
			var sql = "insert into t_order(id, url, name, price, time) values (" + createTimestamp() + "," + stringWrap(url) + "," + stringWrap(name) + "," + price + "," + stringWrap(createDateAndTime()) + ")";
			console.debug(sql);
			context.executeSql(sql);
		});
	}

}

function createDateAndTime() {
	return new Date().Format("yyyy-MM-dd hh:mm:ss");
}

function createTimestamp() {
	return Math.round(new Date().getTime());
}

Date.prototype.Format = function(fmt) {//author: meizz
	var o = {
		"M+" : this.getMonth() + 1, //月份
		"d+" : this.getDate(), //日
		"h+" : this.getHours(), //小时
		"m+" : this.getMinutes(), //分
		"s+" : this.getSeconds(), //秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度
		"S" : this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt))
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function onDelectBtnClick(aId) {
	deleteById(aId);
}

function createRow(aRow) {
	var ret = null;
	
	var html = '<tr>\
					<td>1</td><td><img src="#img_url#" width="60px" height="80px"/></td><td>#name#</td><td>#price#</td><td>#time#</td><td>\
							<button style="background: gray;color:white;width:50px;height:50px;border: 0" onclick="onDelectBtnClick(this.id);" id="#id#">\
								X\
							</button></td>\
				</tr>';
				
	html = html.replace('#img_url#', aRow.url);
	html = html.replace('#name#', aRow.name);
	html = html.replace('#time#', aRow.time);
	html = html.replace('#id#', aRow.id);
	html = html.replace('#price#', aRow.price);
	console.log(html);
	ret = $(html);
	
	return ret;
}	

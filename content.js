
$(document).ready(function() {
	function codeforces() {
    		document.getElementById("codeforces").classList.toggle("show");
	}
	function codechef() {
    		document.getElementById("codechef").classList.toggle("show");
	}
	function hackerearth() {
    		document.getElementById("hackerearth").classList.toggle("show");
	}
	function hackerrank() {
    		document.getElementById("hackerrank").classList.toggle("show");
	}
	function spoj() {
    		document.getElementById("spoj").classList.toggle("show");
	}
	function gfg() {
    		document.getElementById("gfg").classList.toggle("show");
	}
	function others() {
    		document.getElementById("others").classList.toggle("show");
	}
	window.onclick = function(event) {
  		if (!event.target.matches('.dropbtn')) {
	    	var dropdowns = document.getElementsByClassName("dropdown-content");
	    	var i;
	    	for (i = 0; i < dropdowns.length; i++) {
	      		var openDropdown = dropdowns[i];
	      		if (openDropdown.classList.contains('show')) {
	        		openDropdown.classList.remove('show');
	      		}
	    	}
	  	}
	}
	

	$("#codeforcesbtn").click(codeforces);
	$("#codechefbtn").click(codechef);
	$("#hackerrankbtn").click(hackerrank);
	$("#hackerearthbtn").click(hackerearth);
	$("#gfgbtn").click(gfg);
	$("#spojbtn").click(spoj);
	$("#othersbtn").click(others);


	var db = openDatabase("probqueue.db", "1.0", "Testing Purpose", 200000);
	var CreateTb = "Create table if not exists tb(id INTEGER PRIMARY KEY AUTOINCREMENT, desc text, link text, web text)";
	db.transaction(function(tx){
    	tx.executeSql(CreateTb, []);
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	chrome.tabs.sendMessage(tabs[0].id, ['pinga', "hello"], function (response) {
	  			if (typeof response === "undefined") {
		    		chrome.tabs.executeScript(null, { file: "content2.js" });
	    		}
	    	});
	});

    var codeforces = [];
    var others=[]
    var codechef=[]
    var hackerrank=[]
    var hackerearth=[]
    var spoj=[]
    var gfg=[]



    function init(id) {
    	db.transaction(function(tx) {
	        tx.executeSql('SELECT * FROM tb order by id desc', [], function(tx,results){
		   		for (var i=0; i < results.rows.length; i++){
		       		desc = results.rows.item(i)['desc'];
		       		link = results.rows.item(i)['link'];
		       		web = results.rows.item(i)['web'];
		       		id = results.rows.item(i)['id'];
		       		console.log(desc+link+web);
		       		$("#"+web).append("<span id='"+id+"'>"+desc+"</span>");
		       		$("#"+id).click({a:link},ex);
		    	}
	  		});
		});
  	}
  	init();
	
	function ex(event){
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  			chrome.tabs.sendMessage(tabs[0].id, ['open', event.data.a], function (response) {
	  			if (typeof response === "undefined") {
		    		chrome.tabs.executeScript(null, { file: "background.js" });
	    		}
			});
		});
	}

	$("#hackerrankimg").click({a:"https://www.hackerrank.com"},ex);
	$("#codechefimg").click({a:"https://www.codechef.com"},ex);
	$("#hackerearthimg").click({a:"https://www.hackerearth.com"},ex);
	$("#spojimg").click({a:"http://www.spoj.com"},ex);
	$("#gfgimg").click({a:"http://www.geeksforgeeks.org"},ex);
	$("#codeforcesimg").click({a:"http://www.codeforces.com"},ex);
	
	function del(){
		var tablink = null;
 			chrome.tabs.getSelected(null,function(tab) {
    			tablink = tab.url;
			});
 		db.transaction(function(tx){
			query = "delete from tb where link ='"+tablink+"'";
			
    		tx.executeSql(query, []);
    		var notification = new Notification('Done Deleting!', {
   						"icon":"ic128.gif",
    				});
    				setTimeout(function(id) {
   						notification.close();
   					},2500);
		});
	}
	function getweb(tb){
		var patt = new RegExp("codeforces");
		if(patt.test(tb)){
			return 'codeforces';
		}

		patt = new RegExp("codechef");
		if(patt.test(tb)){
			return 'codechef';
		}

		patt = new RegExp("hackerrank");
		if(patt.test(tb)){
			return 'hackerrank';
		}

		patt = new RegExp("hackerearth");
		if(patt.test(tb)){
			return 'hackerearth';
		}

		patt = new RegExp("spoj");
		if(patt.test(tb)){
			return 'spoj';
		}

		patt = new RegExp("geeksforgeeks");
		if(patt.test(tb)){
			return 'gfg';
		}

		return "others";
	}
	function cutouthackerearth(desc){
		var ret = "";
		for(var i = desc.length-1; i >=0 ; i--){
			if(desc[i] == ' ' && ret == ""){
				continue;
			}
			if(desc[i-1] =='>'){
				return reverse(ret);
			}
			else{
				ret = ret+desc[i];
			}
		}
		return desc;
	}
	function cutouthackerrank(desc){ 
		
		var ret = ""
		var flag = 0
		for(var i = 0; i < desc.length; i++){
			if(desc[i] == '<'){
				flag = 1;
			}
			if(desc[i] == '>'){
				while(desc[i+1] != '<'){
					ret = ret + desc[i+1];
					i++;
				}
				return ret;
			}
			if(flag == 1){
				continue;
			}
		}
		return desc;
	}
	function reverse(s){
    	return s.split("").reverse().join("");
	}
	function insert(tablink, desc, w){
		db.transaction(function(tx){
			query = "insert into tb(link, desc, web) values (\'"+tablink+"\', \""+desc+"\", \'"+w+"\')";
			
			var notification = new Notification('Done Adding!', {
				"icon":"ic128.gif",
		    });
		  	setTimeout(function(id) {
		   	notification.close();
			},2500);
		 	var v = tx.executeSql(query, []);
	 	});
	}
	function cutoutcodechef(desc){
		ret = "";
		for(var i=0;i<desc.length;i++){
			if(desc[i] == '<'){
				return ret;
			}
			ret = ret+desc[i];
		}
	}
	function gets(str, tablink, w){
		var ret;
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  	
	  		chrome.tabs.sendMessage(tabs[0].id, ['ping', str], function (response) {
	  			if (typeof response === "undefined") {
		    		chrome.tabs.executeScript(null, { file: "content2.js" });
	    		}
	    		ret = response;
	    		if(w == 'hackerrank'){
	    			ret = cutouthackerrank(ret);
	    		}
	    		else if(w == 'hackerearth'){
	    			ret = cutouthackerearth(ret);
	    			
	    		}
	    		else if(w=='codechef'){
	    			ret = cutoutcodechef(ret);
	    		}
	    		setTimeout(function(){
	    			console.log(ret);insert(tablink, ret, w);},300);
			});
		});
		
		return ret;
	}



	function add(){
		var tablink = null;
		var tabc;
		chrome.tabs.getSelected(null,function(tab) {
			tabc = tab;
    		tablink = tab.url;
    	});
		
		db.transaction(function(tx){
			tx.executeSql('SELECT link FROM tb where link=?', [tablink], function (tx, results) {
				if(results.rows.length <= 0){
					var w = getweb(tablink);
					var desc = null;

					if(w == 'codeforces'){
						desc = gets('#pageContent > div.problemindexholder > div > div > div.header > div.title', tablink, w);
		   			}
		   			else if(w == 'hackerrank'){
		   				desc = gets("#content > div > div > div > div.challenge-view > div > div:nth-child(1) > div.mdT.mmB.span10 > div:nth-child(1) > h2", tablink, w);
		   			}
		   			else if(w=='hackerearth'){
		   				desc = gets("#problem-title", tablink, w);
		   			}
		   			else if(w == 'codechef'){
		   				desc = gets("#content-regions > header > div > div.large-12.columns > h1", tablink, w);
		   			}
		   			else if(w == 'gfg'){
		   				desc = gets("header > h1", tablink, w);
		   			}
		   			else if(w=='spoj'){
		   				desc = gets("#problem-name", tablink, w);
		   			}
		   			else if(w == 'others'){
		   				insert(tablink, tablink, w);
		   			}

   				}
   				else{
   					var notification = new Notification('Already in Queue', {
   						"icon":"ic128.gif"
    				});
    				setTimeout(function(id) {
   						notification.close();
   					},2500);
   				}
    		});
    	});
    }
	$("#button1").click(add);
 	$("#button1").focus(function(){
 		this.blur();}
 	);
 	$("#button2").click(del);
 	$("#button1").focus(function(){
 		this.blur();}
 	);
 	
});

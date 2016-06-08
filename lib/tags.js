
exports.parse = function(args, defaults, replacement){
	var options = {};
	if(typeof defaults === "object" && !(defaults instanceof Array)){
		options = defaults;
	}

	if(typeof replacement === "object" && !(replacement instanceof Array)){
		for(var i in args){
			var arg = args[i];
			if(arg.substr(0,1) === "-" && arg.substr(1,2) !== "-"){
				arg = arg.substr(1);
				if(arg.indexOf("=") !== -1){

					arg = arg.split("=");

					var keys = arg.shift();
					var value = arg.join("=");

					arg = keys.split("");
					var key = arg.pop();

					if(replacement.hasOwnProperty(key)){
						key = replacement[key];
					}

					args.push("--"+key+"="+value);
				}else{
					arg = arg.split("");
				}
				arg.forEach(function(key){
					if(replacement.hasOwnProperty(key)){
						var key = replacement[key];
					}
					args.push("--"+key);
				})
			}
		}
	}
	for(var i in args){
		var arg = args[i];
		if(arg.substr(0,2) === "--"){
			arg = arg.substr(2);

			if(arg.indexOf("=") !== -1){
				arg = arg.split("=");
				var key = arg.shift();
				var value = arg.join("=");

				if(/^[0-9]+$/.test(value)){
					value = parseInt(value, 10);
				}

				options[key] = value;
			}else{
				options[arg] = true;
			}
		}
	}
	return options;
}
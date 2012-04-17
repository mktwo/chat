function read(msg) {
	if (/\b(bot: ?)(\w*)\b/g.test(msg)) {
		answer();
		return true;
	} else {
		return false;
	}
}

function answer(){
	var rnd=Math.floor(Math.random()*3);
	switch(rnd){
		case 0:
			return "No.";
			break;
		case 1:
			return "Yes.";
			break;
		default:
			return "Maybe.";
	}
}

this.read = read;
this.answer = answer;
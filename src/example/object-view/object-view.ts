export default {
	"desc":"default desc"
	,teste(){
		//this.desc = "changed desc";
		this.refresh();
	}
	,connectedCallback(){
		this.desc = "changed by connected!";
		console.log("evt:connected!");
	}
}
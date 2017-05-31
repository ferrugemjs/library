export class ComposeExample{
	private toogleShow:boolean;
	private refresh:Function;
	toogle(){
		this.toogleShow = !this.toogleShow;
		this.refresh();
	}
}
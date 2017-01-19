class FormatDate{
	private dte:Date = new Date();
	set(dte:Date):FormatDate{
		this.dte = dte;
		return this;
	}
	add(extratime:number):FormatDate{
		this.dte.setTime(this.dte.getTime()+extratime);
		return this;
	}
	format(format:string):string{
		return this.dte.toISOString();
	}
}


export default new FormatDate();
class FormatDate {
  private dte: Date = new Date();
  private set(dte: Date): FormatDate {
    this.dte = dte;
    return this;
  }
  private add(extratime: number): FormatDate {
    this.dte.setTime(this.dte.getTime() + extratime);
    return this;
  }
  private format(format: string): string {
    return this.dte.toISOString();
  }
}

export default new FormatDate();
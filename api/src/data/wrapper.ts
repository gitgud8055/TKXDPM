export abstract class Wrapper {
  public exclude(document: any, fields: string[]) {
    const d = document.toObject();
    for (const field of fields) {
      delete d[field];
    }
    return d;
  }
  public abstract get(id: string): any;
  protected getFull(id: string, fields: string[]) {
    return this.get(id).populate(fields);
  }
}

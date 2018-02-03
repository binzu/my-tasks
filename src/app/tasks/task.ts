export class Task {
  id: number;
  title = '';
  description = '';
  date: Date = new Date();
  complete = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class Task {
  id: number;
  title = '';
  description = '';
  date: Date;
  complete = false;
  showDescription = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

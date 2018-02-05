export class Task {
  id: number;
  title = '';
  description = '';
  date: Date;
  complete = false;
  showDescription = false;
  status = 'all';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

import Immutable from 'immutable';

export const TASK_STATUS = {
  PENDING: 'pending',
  BLOCKED: 'blocked',
  DONE: 'done',
};

const TaskRecord = new Immutable.Record({
  id: '',
  name: '',
  description: '',
  status: '',
});

class Task extends TaskRecord {

  hasStatus(status) {
    return this.status === status;
  }

  getRelated() {
    return new Immutable.List();
  }

}

export default Task;
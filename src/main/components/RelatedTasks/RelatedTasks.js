import React, {Component, PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import SectionHeader from '../SectionHeader';
import ExpandableIconElement from '../ExpandableIconElement';
import TaskSelector from '../TaskSelector';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import Task from '../../core/models/task.model';
import ConditionalRenderer from '../../utils/ConditionalRenderer';

const ICONS_BY_STATUS = {
  done: 'done',
  pending: 'schedule',
  blocked: 'lock_outline',
};

class RelatedTasks extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    isEditable: PropTypes.bool,
    toTask: PropTypes.instanceOf(Task).isRequired,
    relatedTasksSelector: PropTypes.func.isRequired,
    unrelatedTasksSelector: PropTypes.func.isRequired,
    onTaskAdded: PropTypes.func.isRequired,
    onTaskRemoved: PropTypes.func.isRequired,

    /**
     * Set internally by connect.
     */
    relatedTasks: PropTypes.instanceOf(Immutable.Seq).isRequired,
    unrelatedTasks: PropTypes.instanceOf(Immutable.Seq).isRequired,
  };

  constructor() {
    super();
    this.state = {
      addingTask: false,
    };
  }

  toggleAddTask() {
    this.setState((prevState) => ({
      addingTask: !prevState.addingTask,
    }));
  }

  render() {
    const {isEditable, title, relatedTasks, unrelatedTasks} = this.props;

    const renderTaskListItems = () => relatedTasks.map(
      (relatedTask) => <div key={relatedTask.id}>
        <ListItem
          primaryText={relatedTask.name}
          rightIcon={
            <FontIcon
              className="material-icons"
            >{ICONS_BY_STATUS[relatedTask.status]}</FontIcon>
          }
          leftIcon={<img
            role="presentation"
            src="http://meetingking.com/wp-content/images/meetingking_tasks.png"
          />}
        />
      </div>
    );

    const renderTaskAddInput = () =>
      <ConditionalRenderer show={isEditable}>
        <ExpandableIconElement
          expanded={this.state.addingTask}
          icon={<FontIcon
            onClick={() => this.toggleAddTask()}
            className="material-icons"
          >{this.state.addingTask ? 'cancel' : 'add'}</FontIcon>}
        >
          <TaskSelector
            tasksToChooseFrom={unrelatedTasks}
            onTaskSelection={this.props.onTaskAdded}
          />
        </ExpandableIconElement>
      </ConditionalRenderer>;

    return (
      <div>
        <SectionHeader
          title={title}
          rightIcon={renderTaskAddInput()}
        />
        <List>
          {
            relatedTasks.size > 0 ? renderTaskListItems() : <ListItem>None</ListItem>
          }
        </List>
      </div>
    );
  }

}

export default connect(
  (state, props) => ({
    relatedTasks: props.relatedTasksSelector(props.toTask)(state),
    unrelatedTasks: props.unrelatedTasksSelector(props.toTask)(state),
  }),
  () => ({})
)(RelatedTasks);


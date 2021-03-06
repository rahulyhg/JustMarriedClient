import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import * as allModalActions from '../../core/actions/modal.actions';
import ModalModel from '../../core/models/modal.model';
import classNames from 'classnames/bind';
import styles from './Modal.pcss';

const cx = classNames.bind(styles);

class Modal extends PureComponent {

  static propTypes = {
    modal: PropTypes.instanceOf(ModalModel).isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  renderElement = (candidate) => React.isValidElement(candidate) // eslint-disable-line
    ? candidate : candidate(this.props.modal.context);

  render() {
    const { modal, modalActions } = this.props;
    const { open, header, footer, content } = modal;

    if (!modal.open) {
      return <div />;
    }

    return (
      <Dialog
        className={cx('modal')}
        titleClassName={cx('modal__header')}
        bodyClassName={cx('modal__body')}
        actionsContainerClassName={cx('modal__footer')}
        overlayClassName={cx('modal__overlay')}
        title={<div>{this.renderElement(header)}</div>}
        actions={this.renderElement(footer)}
        modal={false}
        autoScrollBodyContent
        open={open}
        onRequestClose={modalActions.closeModal}
      >
        {this.renderElement(content)}
      </Dialog>
    );
  }

}

export default connect((state) => ({
  modal: state.modal,
}), (dispatch) => ({
  modalActions: bindActionCreators(allModalActions, dispatch),
}))(Modal);

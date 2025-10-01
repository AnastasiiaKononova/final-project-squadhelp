import React from 'react';
import { connect } from 'react-redux';
import { getCatalogList, removeChatFromCatalog } from '../../../../actions/actionCreator';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

class CatalogListContainer extends React.Component {
  componentDidMount() {
    this.props.getCatalogList();
  }

    removeChatFromCatalog = (event, conversationId) => {
      const { _id } = this.props.catalogStore.currentCatalog;
      this.props.removeChatFromCatalog({ conversationId, catalogId: _id });
      event.stopPropagation();
    };

    getDialogsPreview = () => {
      const { messagesPreview, currentCatalog } = this.props.catalogStore;
      const { chats } = currentCatalog;
      const dialogsInCatalog = [];
      for (let i = 0; i < messagesPreview.length; i++) {
        for (let j = 0; j < chats.length; j++) {
          if (chats[j] === messagesPreview[i]._id) {
            dialogsInCatalog.push(messagesPreview[i]);
          }
        }
      }
      return dialogsInCatalog;
    };

    render() {
      const { catalogList, isShowChatsInCatalog } = this.props.catalogStore;
      const { id } = this.props.userStore.data;
      return (
        <>
          {isShowChatsInCatalog ? (
            <DialogList
              userId={id}
              preview={this.getDialogsPreview()}
              removeChat={this.removeChatFromCatalog}
            />
          )
            : <CatalogList catalogList={catalogList} />}
        </>
      );
    }
}

const mapStateToProps = (state) => {
  const { catalogStore, chatStore, userStore } = state;
  return {
    catalogStore: { ...catalogStore, messagesPreview: chatStore.messagesPreview }, 
    userStore 
  }
};

const mapDispatchToProps = (dispatch) => ({
  getCatalogList: (data) => dispatch(getCatalogList(data)),
  removeChatFromCatalog: (data) => dispatch(removeChatFromCatalog(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogListContainer);

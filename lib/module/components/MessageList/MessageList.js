var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageList = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _uuid = require("uuid");

var _DateSeparator = require("./DateSeparator");

var _MessageNotification = require("./MessageNotification");

var _MessageSystem = require("./MessageSystem");

var _TypingIndicator = require("./TypingIndicator");

var _TypingIndicatorContainer = require("./TypingIndicatorContainer");

var _useMessageList = require("./hooks/useMessageList");

var _getLastReceivedMessage = require("./utils/getLastReceivedMessage");

var _insertDates = require("./utils/insertDates");

var _Message = require("../Message/Message");

var _ChannelContext = require("../../contexts/channelContext/ChannelContext");

var _ChatContext = require("../../contexts/chatContext/ChatContext");

var _MessagesContext = require("../../contexts/messagesContext/MessagesContext");

var _ThreadContext = require("../../contexts/threadContext/ThreadContext");

var _TranslationContext = require("../../contexts/translationContext/TranslationContext");

var _styledComponents = require("../../styles/styledComponents");

var _jsxFileName = "/Users/federuiz/projects/stream-chat-react-native/src/components/MessageList/MessageList.tsx";

function _templateObject3() {
  var data = (0, _taggedTemplateLiteralLoose2["default"])(["\n  flex: 1;\n  padding-horizontal: 10px;\n  width: 100%;\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteralLoose2["default"])(["\n  background-color: #fae6e8;\n  color: red;\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteralLoose2["default"])(["\n  align-items: center;\n  background-color: #fae6e8;\n  color: red;\n  padding: 5px;\n  z-index: 10;\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ErrorNotification = _styledComponents.styled.View(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageList.errorNotification.css;
});

var ErrorNotificationText = _styledComponents.styled.Text(_templateObject2(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.messageList.errorNotificationText.css;
});

var ListContainer = (0, _styledComponents.styled)(_reactNative.FlatList)(_templateObject3(), function (_ref3) {
  var theme = _ref3.theme;
  return theme.messageList.listContainer.css;
});

var keyExtractor = function keyExtractor(item) {
  if (!(0, _insertDates.isDateSeparator)(item)) {
    return item.id || (item.created_at ? typeof item.created_at === 'string' ? item.created_at : item.created_at.toISOString() : (0, _uuid.v4)());
  }

  if (item.date && typeof item.date !== 'string') {
    return item.date.toISOString();
  }

  return (0, _uuid.v4)();
};

var MessageList = function MessageList(props) {
  var _getLastReceivedMessa;

  var actionSheetStyles = props.actionSheetStyles,
      additionalFlatListProps = props.additionalFlatListProps,
      AttachmentFileIcon = props.AttachmentFileIcon,
      _props$DateSeparator = props.DateSeparator,
      DateSeparator = _props$DateSeparator === void 0 ? _DateSeparator.DateSeparator : _props$DateSeparator,
      _props$disableWhileEd = props.disableWhileEditing,
      disableWhileEditing = _props$disableWhileEd === void 0 ? true : _props$disableWhileEd,
      _props$dismissKeyboar = props.dismissKeyboardOnMessageTouch,
      dismissKeyboardOnMessageTouch = _props$dismissKeyboar === void 0 ? true : _props$dismissKeyboar,
      HeaderComponent = props.HeaderComponent,
      MessageFromProps = props.Message,
      _props$MessageSystem = props.MessageSystem,
      MessageSystem = _props$MessageSystem === void 0 ? _MessageSystem.MessageSystem : _props$MessageSystem,
      messageActions = props.messageActions,
      noGroupByUser = props.noGroupByUser,
      onThreadSelect = props.onThreadSelect,
      setFlatListRef = props.setFlatListRef,
      threadList = props.threadList,
      _props$TypingIndicato = props.TypingIndicator,
      TypingIndicator = _props$TypingIndicato === void 0 ? _TypingIndicator.TypingIndicator : _props$TypingIndicato;

  var _useChannelContext = (0, _ChannelContext.useChannelContext)(),
      channel = _useChannelContext.channel,
      disabled = _useChannelContext.disabled,
      EmptyStateIndicator = _useChannelContext.EmptyStateIndicator,
      loading = _useChannelContext.loading,
      LoadingIndicator = _useChannelContext.LoadingIndicator,
      markRead = _useChannelContext.markRead;

  var _useChatContext = (0, _ChatContext.useChatContext)(),
      client = _useChatContext.client,
      isOnline = _useChatContext.isOnline;

  var _useMessagesContext = (0, _MessagesContext.useMessagesContext)(),
      clearEditingState = _useMessagesContext.clearEditingState,
      editing = _useMessagesContext.editing,
      mainLoadMore = _useMessagesContext.loadMore,
      MessageFromContext = _useMessagesContext.Message;

  var _useThreadContext = (0, _ThreadContext.useThreadContext)(),
      loadMoreThread = _useThreadContext.loadMoreThread;

  var _useTranslationContex = (0, _TranslationContext.useTranslationContext)(),
      t = _useTranslationContex.t;

  var messageList = (0, _useMessageList.useMessageList)({
    noGroupByUser: noGroupByUser,
    threadList: threadList
  });
  var flatListRef = (0, _react.useRef)(null);
  var yOffset = (0, _react.useRef)(0);

  var _useState = (0, _react.useState)((_getLastReceivedMessa = (0, _getLastReceivedMessage.getLastReceivedMessage)(messageList)) == null ? void 0 : _getLastReceivedMessa.id),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      lastReceivedId = _useState2[0],
      setLastReceivedId = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      newMessagesNotification = _useState4[0],
      setNewMessageNotification = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      messagesLoading = _useState6[0],
      setMessagesLoading = _useState6[1];

  (0, _react.useEffect)(function () {
    setMessagesLoading(!!loading);
  }, [loading]);
  (0, _react.useEffect)(function () {
    var currentLastMessage = (0, _getLastReceivedMessage.getLastReceivedMessage)(messageList);

    if (currentLastMessage) {
      var currentLastReceivedId = currentLastMessage.id;

      if (currentLastReceivedId) {
        var _currentLastMessage$u;

        var hasNewMessage = lastReceivedId !== currentLastReceivedId;
        var userScrolledUp = yOffset.current > 0;
        var isOwner = currentLastMessage && client && ((_currentLastMessage$u = currentLastMessage.user) == null ? void 0 : _currentLastMessage$u.id) === client.userID;
        var scrollToBottom = hasNewMessage && (isOwner || !userScrolledUp);

        if (!scrollToBottom && hasNewMessage && !newMessagesNotification) {
          setNewMessageNotification(true);
        }

        if (scrollToBottom && flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: 0
          });
          setNewMessageNotification(false);
        }

        if (hasNewMessage) setLastReceivedId(currentLastReceivedId);
      }
    }
  }, [messageList]);
  var loadMore = threadList ? loadMoreThread : mainLoadMore;
  var Message = MessageFromProps || MessageFromContext;

  var _renderItem = function renderItem(message) {
    if ((0, _insertDates.isDateSeparator)(message)) {
      return _react["default"].createElement(DateSeparator, {
        message: message,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 335,
          columnNumber: 14
        }
      });
    }

    if (message.type === 'system') {
      return _react["default"].createElement(MessageSystem, {
        message: message,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 338,
          columnNumber: 14
        }
      });
    }

    if (message.type !== 'message.read') {
      return _react["default"].createElement(_Message.Message, {
        actionSheetStyles: actionSheetStyles,
        AttachmentFileIcon: AttachmentFileIcon,
        dismissKeyboardOnMessageTouch: dismissKeyboardOnMessageTouch,
        groupStyles: message.groupStyles,
        lastReceivedId: lastReceivedId === message.id ? lastReceivedId : undefined,
        Message: Message,
        message: message,
        messageActions: messageActions,
        onThreadSelect: onThreadSelect,
        readBy: message.readBy || [],
        threadList: threadList,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 342,
          columnNumber: 9
        }
      });
    }

    return null;
  };

  var handleScroll = function handleScroll(event) {
    var y = event.nativeEvent.contentOffset.y;
    var removeNewMessageNotification = y <= 0;

    if (!threadList && removeNewMessageNotification && channel && channel.countUnread() > 0) {
      markRead();
    }

    yOffset.current = y;

    if (removeNewMessageNotification) {
      setNewMessageNotification(false);
    }
  };

  var goToNewMessages = function goToNewMessages() {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: 0
      });
      setNewMessageNotification(false);
      if (!threadList) markRead();
    }
  };

  if (messageList.length === 0 && !threadList) {
    return messagesLoading ? _react["default"].createElement(LoadingIndicator, {
      listType: "message",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 392,
        columnNumber: 7
      }
    }) : _react["default"].createElement(_reactNative.View, {
      style: {
        flex: 1
      },
      testID: "empty-state",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 394,
        columnNumber: 7
      }
    }, _react["default"].createElement(EmptyStateIndicator, {
      listType: "message",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 395,
        columnNumber: 9
      }
    }));
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_reactNative.View, {
    collapsable: false,
    style: {
      alignItems: 'center',
      flex: 1,
      width: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 402,
      columnNumber: 7
    }
  }, _react["default"].createElement(ListContainer, (0, _extends2["default"])({
    data: messageList,
    extraData: disabled,
    inverted: true,
    keyboardShouldPersistTaps: "always",
    keyExtractor: keyExtractor,
    ListFooterComponent: HeaderComponent,
    maintainVisibleContentPosition: {
      autoscrollToTopThreshold: 10,
      minIndexForVisible: 1
    },
    onEndReached: loadMore,
    onScroll: handleScroll,
    ref: function ref(fl) {
      flatListRef.current = fl;

      if (setFlatListRef) {
        setFlatListRef(fl);
      }
    },
    renderItem: function renderItem(_ref4) {
      var item = _ref4.item;
      return _renderItem(item);
    },
    testID: "message-flat-list"
  }, additionalFlatListProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 406,
      columnNumber: 9
    }
  })), TypingIndicator && _react["default"].createElement(_TypingIndicatorContainer.TypingIndicatorContainer, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 431,
      columnNumber: 11
    }
  }, _react["default"].createElement(TypingIndicator, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 432,
      columnNumber: 13
    }
  })), newMessagesNotification && _react["default"].createElement(_MessageNotification.MessageNotification, {
    onPress: goToNewMessages,
    showNotification: newMessagesNotification,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 436,
      columnNumber: 11
    }
  }), !isOnline && _react["default"].createElement(ErrorNotification, {
    testID: "error-notification",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 442,
      columnNumber: 11
    }
  }, _react["default"].createElement(ErrorNotificationText, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 443,
      columnNumber: 13
    }
  }, t('Connection failure, reconnecting now ...')))), editing && disableWhileEditing && _react["default"].createElement(_reactNative.TouchableOpacity, {
    onPress: clearEditingState,
    style: {
      backgroundColor: 'black',
      height: '100%',
      opacity: 0.4,
      position: 'absolute',
      width: '100%',
      zIndex: 100
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 452,
      columnNumber: 11
    }
  }));
};

exports.MessageList = MessageList;
//# sourceMappingURL=MessageList.js.map
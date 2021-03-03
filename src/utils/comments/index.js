import * as React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Modal,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  TextInput,
  TouchableHighlight
} from "react-native";
import moment from "moment";
import PropTypes from "prop-types";
import IconFa from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import Collapsible from "react-native-collapsible";
import Comment from "./comment";

const screen = Dimensions.get("screen");

export default Comments = (props) => {
  const [state, setState] = React.useState({
    replyCommentText: null,
    editCommentText: null,
    editingComment: null,
    newCommentText: null,
    loadingComments: !(props.data && props.data.length),
    likesModalVisible: false,
    likesModalData: null,
    editModalVisible: false,
    expanded: [],
    pagination: []
  })
  const [textInputs] = React.useState([])

  const setLikesModalVisible = (visible) => {
    setState({...state, likesModalVisible: visible });
  }

  const setEditModalVisible = (visible) => {
    setState({...state, editModalVisible: visible });
  }

  // React.useEffect(()=> {
  //   if (nextProps.data) {
  //     setState({
  //       loadingComments: false
  //     });
  //   }
  // },[nextProps])


  const renderIcon = (props) => {
    return <IconFa {...props} />;
  }

  const isExpanded = (id) => {
    return state.expanded.indexOf(id) !== -1;
  }

  const toggleExpand = (c, focus) => {
    const id = props.keyExtractor(c);
    let expanded = state.expanded;

    let index = expanded.indexOf(id);

    if (index === -1) {
      expanded.push(id);
    } else {
      expanded.splice(index, 1);
    }
    // forceUpdate();
    setState({...state, expanded: expanded });
    if (focus && index === -1) {
      focusOnReplyInput(id);
    }
  }

  const handleReport = (c) => {
    props.reportAction(c);
  }

  const focusOnReplyInput = (id) => {
    let input = textInputs["input" + id];

    input.measure((x, y, width, height, pageX, pageY) => {
      console.log(pageY);
      input.focus();
      props.replyAction(pageY);
    });
  }

  const handleReply = (c) => {
    if (!props.isChild) return;
    if (!props.isChild(c)) {
      toggleExpand(c, true);
    } else {
      focusOnReplyInput(props.parentIdExtractor(c));
    }
  }

  const handleLike = (c) => {
    props.likeAction(c);
  }

  const handleDelete = (c) => {
    props.deleteAction(c);
  }

  const handleEdit = (c) => {
    setState({
      ...state,
      editCommentText: props.bodyExtractor(c),
      editingComment: c
    });

    setEditModalVisible(!state.editModalVisible);
  }

  const handleUsernameTap = (username) => {
    if (props.usernameTapAction) {
      props.usernameTapAction(username);
    }
  }

  const handleLikesTap = (c) => {
    setState({...state, likesModalData: props.likesExtractor(c) });
    setLikesModalVisible(!state.likesModalVisible);
  }

  const handleEditAction = (c) => {
    props.editAction(state.editCommentText, c);
  }

  /**
   * Generates a single comment
   * */
  const generateComment = (c) => {
    return (
      <Comment
        data={c}
        id={props.keyExtractor(c)}
        usernameTapAction={handleUsernameTap}
        username={props.usernameExtractor(c)}
        body={props.bodyExtractor(c)}
        likesNr={
          props.likesExtractor(c) ? props.likesExtractor(c).length : 0
        }
        canEdit={canUserEdit(c)}
        updatedAt={props.editTimeExtractor(c)}
        replyAction={props.replyAction ? handleReply : null}
        image={props.imageExtractor(c)}
        child={true}
        isOwnComment={
          props.usernameExtractor(c) == props.viewingUserName
        }
        reportAction={props.reportAction ? handleReport : null}
        liked={props.likeExtractor ? props.likeExtractor(c) : null}
        reported={
          props.reportedExtractor ? props.reportedExtractor(c) : null
        }
        likeAction={props.likeAction ? handleLike : null}
        editAction={handleEditAction}
        deleteAction={handleDelete}
        editComment={handleEdit}
        likesTapAction={props.likeAction ? handleLikesTap : null}
      />
    );
  }

  /**
   * Renders comments children
   * */
  const renderChildren = (items) => {
    if (!items || !items.length) return;
    return items.map(function(c) {
      return (
        <View key={props.keyExtractor(c) + "" + Math.random()}>
          {generateComment(c)}
        </View>
      );
    });
  }

  /**
   * Returns last child id
   * */
  const getLastChildCommentId = (item) => {
    if (!item) return;
    const items = item[props.childPropName];
    return props.keyExtractor(items[items.length - 1]);
  }

  /**
   * Returns first child id
   * */
  const getFirstChildCommentId = (item) => {
    if (!item) return;
    const items = item[props.childPropName];

    return props.keyExtractor(items[0]);
  }

  /**
   * Does a pagination action
   * */
  const paginate = (fromCommentId, direction, parentCommentId) =>{
    setState({...state, loadingComments: true });
    props.paginateAction(fromCommentId, direction, parentCommentId);
  }

  /**
   * Can user edit a comment
   * */
  const canUserEdit = (item) => {
    if (
      props.viewingUserName == props.usernameExtractor(item) ||
      props.userIsAdmin
    ) {
      if (!props.editMinuteLimit) return true;
      let created =
        moment(props.createdTimeExtractor(item)).valueOf() / 1000;

      return (
        new Date().getTime() / 1000 - created < props.editMinuteLimit * 60
      );
    }
    return false;
  }

  const renderLike = (l) => {
    let like = l.item;
    return (
      <TouchableHighlight
        onPress={() => {
          setLikesModalVisible(false), like.tap(like.name);
        }}
        style={styles.likeButton}
        key={like.user_id + ""}
      >
        <View style={[styles.likeContainer]}>
          <Image style={[styles.likeImage]} source={{ uri: like.image }} />
          <Text style={[styles.likeName]}>{like.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  /**
   * Renders a comment with pagination
   * */
  const renderComment = (c) => {
    const item = c.item;
    return (
      <View>
        {generateComment(item)}
        <View style={{ marginLeft: 40 }}>
          {item.childrenCount && props.childPropName ? (
            <TouchableHighlight onPress={() => toggleExpand(item)}>
              <View style={styles.repliedSection}>
                <Image
                  style={styles.repliedImg}
                  source={{
                    uri: props.imageExtractor(
                      item[props.childPropName][0]
                    )
                  }}
                />
                <Text style={styles.repliedUsername}>
                  {" "}
                  {props.usernameExtractor(
                    item[props.childPropName][0]
                  )}{" "}
                </Text>
                <Text style={styles.repliedText}>replied</Text>
                <Text style={styles.repliedCount}>
                  {" "}
                  * {props.childrenCountExtractor(item)}
                  {props.childrenCountExtractor(item) > 1
                    ? " replies"
                    : " reply"}
                </Text>
              </View>
            </TouchableHighlight>
          ) : null}
          <Collapsible
            easing={"easeOutCubic"}
            duration={400}
            collapsed={!isExpanded(props.keyExtractor(item))}
          >
            {props.childrenCountExtractor(item) &&
            props.paginateAction ? (
              <View>
                {props.childPropName &&
                props.childrenCountExtractor(item) >
                  item[props.childPropName].length ? (
                  <TouchableHighlight
                    onPress={() =>
                      paginate(
                        getFirstChildCommentId(item),
                        "down",
                        props.keyExtractor(item)
                      )
                    }
                  >
                    <Text
                      style={[
                        { textAlign: "center", paddingTop: 15 },
                        // getStyle("previousText")
                      ]}
                    >
                      Show previous...
                    </Text>
                  </TouchableHighlight>
                ) : null}

                {renderChildren(
                  item[props.childPropName],
                  props.keyExtractor(item)
                )}

                {props.childrenCountExtractor(item) >
                  item[props.childPropName].length &&
                props.paginateAction ? (
                  <TouchableHighlight
                    onPress={() =>
                      paginate(
                        getLastChildCommentId(item),
                        "up",
                        props.keyExtractor(item)
                      )
                    }
                  >
                    <Text
                      style={[
                        { textAlign: "center", paddingTop: 15 },
                        getStyle("moreText")
                      ]}
                    >
                      Show more...
                    </Text>
                  </TouchableHighlight>
                ) : null}
              </View>
            ) : null}
            <View style={styles.inputSection}>
              <TextInput
                ref={input =>
                  (textInputs[
                    "input" + props.keyExtractor(item)
                  ] = input)
                }
                style={styles.input}
                multiline={true}
                value={state.replyCommentText}
                onChangeText={text => setState({...state, replyCommentText: text })}
                placeholder={"Write comment"}
                numberOfLines={3}
              />
              <TouchableHighlight
                onPress={() => {
                  props.saveAction(
                    state.replyCommentText,
                    props.keyExtractor(item)
                  );
                  setState({...state, replyCommentText: null });
                  Keyboard.dismiss();
                }}
              >
                {renderIcon({
                  style: styles.submit,
                  name: "caret-right",
                  size: 40,
                  color: "gray"
                })}
              </TouchableHighlight>
            </View>
          </Collapsible>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          ref={input => (textInputs["inputMain"] = input)}
          multiline={true}
          onChangeText={text => setState({...state, newCommentText: text })}
          placeholder={"Write comment"}
          numberOfLines={3}
        />
        <TouchableHighlight
          onPress={() => {
            props.saveAction(state.newCommentText, false);
            setState({...state, newCommentText: null });
            textInputs["inputMain"].clear();
            Keyboard.dismiss();
          }}
        >
          {renderIcon({
            style: styles.submit,
            name: "caret-right",
            size: 40,
            color: "gray"
          })}
        </TouchableHighlight>
      </View>
      {!state.loadingComments && !props.data ? (
        <Text style={{ textAlign: "center" }}>No comments yet</Text>
      ) : null}

      {!state.loadingComments &&
      props.data &&
      props.data.length &&
      props.paginateAction ? (
        <TouchableHighlight
          onPress={() => {
            paginate(
              props.keyExtractor(props.data[0]),
              "down"
            );
          }}
        >
          <View>
            <Text
              style={[
                { textAlign: "center", color: "gray" },
                // getStyle("previousText")
              ]}
            >
              Show previous
            </Text>
          </View>
        </TouchableHighlight>
      ) : null}
      {/* Comments */}
      {props.data ? (
        <FlatList
          keyboardShouldPersistTaps="always"
          style={{ backgroundColor: "white" }}
          data={props.data}
          extraData={props.lastCommentUpdate}
          initialNumToRender={props.initialDisplayCount || 20}
          keyExtractor={item => props.keyExtractor(item) + ""}
          renderItem={renderComment}
        />
      ) : null}

      {state.loadingComments ? (
        <View
          style={{
            position: "absolute",
            zIndex: 10,
            bottom: 0,
            height: 60,
            backgroundColor: "rgba(255,255,255, 0.9)"
          }}
        >
          <ActivityIndicator
            animating={true}
            style={{
              height: 50,
              width: screen.width,
              alignItems: "center",
              justifyContent: "center"
            }}
            size="small"
          />
        </View>
      ) : null}

      {!state.loadingComments &&
      props.data &&
      props.data.length &&
      props.paginateAction ? (
        <TouchableHighlight
          style={{ height: 70 }}
          onPress={() => {
            paginate(
              props.keyExtractor(
                props.data[props.data.length - 1]
              ),
              "up"
            );
          }}
        >
          <Text style={{ textAlign: "center", color: "gray" }}>
            Show more
          </Text>
        </TouchableHighlight>
      ) : (
        <Text style={{ textAlign: "center", color: "gray" }}>
          No comments yet
        </Text>
      )}

      <Modal
        animationType={"slide"}
        transparent={false}
        visible={state.likesModalVisible}
        onRequestClose={() => {
          setLikesModalVisible(false);
        }}
      >
        <TouchableHighlight
          onPress={() => setLikesModalVisible(false)}
          style={{
            position: "absolute",
            width: 100,
            zIndex: 9,
            alignSelf: "flex-end",
            top: 10
          }}
        >
          <View style={{ position: "relative", left: 50, top: 5 }}>
            {renderIcon({ name: "times", size: 40 })}
          </View>
        </TouchableHighlight>
        <Text style={styles.likeHeader}>Users that liked the comment</Text>
        {state.likesModalVisible ? (
          <FlatList
            initialNumToRender="10"
            keyExtractor={item => item.like_id + ""}
            data={state.likesModalData}
            renderItem={renderLike}
          />
        ) : null}
      </Modal>

      <Modal
        animationType={"slide"}
        onShow={() => {
          textInputs["editCommentInput"].focus();
        }}
        transparent={true}
        visible={state.editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(false);
          setState({...state, editModalData: null });
        }}
      >
        <View style={styles.editModalContainer}>
          <View style={styles.editModal}>
            <TextInput
              ref={input => (textInputs["editCommentInput"] = input)}
              style={styles.input}
              multiline={true}
              value={state.editCommentText}
              onChangeText={text => setState({...state, editCommentText: text })}
              placeholder={"Edit comment"}
              numberOfLines={3}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <TouchableHighlight
                onPress={() => setEditModalVisible(false)}
              >
                <View style={styles.editButtons}>
                  <Text>Cancel</Text>
                  {renderIcon({ name: "times", size: 20 })}
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  props.editAction(
                    state.editCommentText,
                    state.editingComment
                  );
                  setEditModalVisible(!state.editModalVisible);
                }}
              >
                <View style={styles.editButtons}>
                  <Text>Save</Text>
                  {renderIcon({ name: "caret-right", size: 20 })}
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

Comments.propTypes = {
  data: PropTypes.array.isRequired,
  viewingUserName: PropTypes.string,
  initialDisplayCount: PropTypes.number,
  editMinuteLimit: PropTypes.number,
  usernameTapAction: PropTypes.func,
  childPropName: PropTypes.string,
  isChild: PropTypes.func,
  keyExtractor: PropTypes.func.isRequired,
  parentIdExtractor: PropTypes.func,
  usernameExtractor: PropTypes.func.isRequired,
  editTimeExtractor: PropTypes.func.isRequired,
  createdTimeExtractor: PropTypes.func.isRequired,
  bodyExtractor: PropTypes.func.isRequired,
  imageExtractor: PropTypes.func.isRequired,
  likeExtractor: PropTypes.func,
  reportedExtractor: PropTypes.func,
  likesExtractor: PropTypes.func,
  childrenCountExtractor: PropTypes.func,
  replyAction: PropTypes.func,
  saveAction: PropTypes.func.isRequired,
  deleteAction: PropTypes.func,
  editAction: PropTypes.func.isRequired,
  reportAction: PropTypes.func,
  likeAction: PropTypes.func,
  paginateAction: PropTypes.func
};

import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from "react-native";

import PropTypes from "prop-types";
import TimeAgo from "react-native-timeago";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

export default Comment = (props) => {

  const [state, setState] = React.useState({
    menuVisible: false
  })

  const getStyle = name => {
    props.styles && props.styles[name] ? props.styles[name] : {};
  }

  const handleReport = () => {
    Alert.alert(
      "Confirm report",
      "Are you sure you want to report?",
      [
        {
          text: "Yes",
          onPress: () => props.reportAction(props.data)
        },
        { text: "No", onPress: () => null }
      ],
      true
    );
    setState({ menuVisible: false });
  }

  const handleReply = () => {
    props.replyAction(props.data);
  }

  const handleLike = () => {
    props.likeAction(props.data);
  }

  const handleEdit = () => {
    props.editComment(props.data);
    setState({ menuVisible: false });
  }

  const handleDelete = () => {
    Alert.alert(
      "Confirm delete",
      "Are you sure you want to delete?",
      [
        {
          text: "Yes",
          onPress: () => props.deleteAction(props.data)
        },
        { text: "No", onPress: () => null }
      ],
      true
    );
    setState({ menuVisible: false });
  }

  const handleUsernameTap = () => {
    if (props.usernameTapAction) {
      props.usernameTapAction(props.username);
    }
  }

  const handleLikesTap = () => {
    props.likesTapAction(props.data);
  }

  const setModalVisible = () => {
    setState({ menuVisible: !state.menuVisible });
  }

  return (
    <View
      style={[styles.commentContainer, getStyle("commentContainer")]}
    >
      <View style={styles.left}>
        <TouchableHighlight onPress={handleUsernameTap}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={[
                styles.image,
                { width: 30, height: 30, borderRadius: 15 },
                getStyle("avatar")
              ]}
              source={
                props.image === ""
                  ? require("./no-user.png")
                  : { uri: props.image }
              }
            />
            {props.likesNr && props.likeAction ? (
              <TouchableHighlight
                style={[styles.actionButton, { paddingTop: 5 }]}
                onPress={handleLikesTap}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon name="heart" color="#df1740" size={15} />
                  <Text style={styles.likeNr}> {props.likesNr}</Text>
                </View>
              </TouchableHighlight>
            ) : null}
          </View>
        </TouchableHighlight>
      </View>
      <TouchableOpacity
        onPress={() => setState({ menuVisible: false })}
        onLongPress={() => setModalVisible()}
        style={styles.right}
      >
        <View style={styles.rightContent}>
          <View style={styles.rightContentTop}>
            <TouchableHighlight onPress={handleUsernameTap}>
              <Text style={[styles.name, getStyle("username")]}>
                {props.username}
              </Text>
            </TouchableHighlight>
          </View>
          <Text style={[styles.body, getStyle("body")]}>
            {props.body}
          </Text>
        </View>
        <View style={styles.rightActionBar}>
          <TimeAgo
            style={[styles.time, getStyle("timeAgoText")]}
            time={props.updatedAt}
          />
          {props.likeAction ? (
            <TouchableHighlight
              style={styles.actionButton}
              onPress={handleLike}
            >
              <View style={{ flexDirection: "row" }}>
              <Icon name="heart" color="#df1740" size={15} />
                {/* <Text
                  style={[
                    styles.actionText,
                    { color: props.liked ? "#4DB2DF" : null },
                    getStyle("actionText"),
                    getStyle("likeText")
                  ]}
                >
                  Like{" "}
                </Text> */}
              </View>
            </TouchableHighlight>
          ) : null}
          {props.replyAction ? (
            <TouchableHighlight
              style={styles.actionButton}
              onPress={handleReply}
            >
              <Text
                style={[
                  styles.actionText,
                  getStyle("actionText"),
                  getStyle("replyText")
                ]}
              >
                返信
              </Text>
            </TouchableHighlight>
          ) : null}
        </View>
      </TouchableOpacity>
      {state.menuVisible ? (
        <View style={styles.menu}>
          <View style={{ flex: 1.5 }}>
            {props.canEdit ? (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleEdit}
              >
                <Text
                  style={[
                    styles.menuText,
                    getStyle("menuText"),
                    getStyle("editText")
                  ]}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            ) : null}
            {props.reportAction && !props.isOwnComment ? (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleReport}
              >
                {props.reported ? (
                  <Text
                    style={[
                      styles.menuText,
                      { fontStyle: "italic", fontSize: 11 },
                      getStyle("menuText"),
                      getStyle("reportedText")
                    ]}
                  >
                    Reported
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.menuText,
                      getStyle("menuText"),
                      getStyle("reportText")
                    ]}
                  >
                    Report
                  </Text>
                )}
              </TouchableOpacity>
            ) : null}
            {props.canEdit ? (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleDelete}
              >
                <Text
                  style={[
                    styles.menuText,
                    getStyle("menuText"),
                    getStyle("deleteText")
                  ]}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              flex: 0.5,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              style={styles.menuClose}
              onPress={() => setState({ menuVisible: false })}
            >
              <Text style={{ color: "silver" }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );

}

Comment.propTypes = {
  data: PropTypes.object,
  body: PropTypes.string,
  styles: PropTypes.object,
  canEdit: PropTypes.bool,
  canEdit: PropTypes.bool,
  child: PropTypes.bool,
  editComment: PropTypes.func,
  likeAction: PropTypes.func,
  liked: PropTypes.bool,
  likesNr: PropTypes.number,
  likesTapAction: PropTypes.func,
  replyAction: PropTypes.func,
  deleteAction: PropTypes.func,
  reportAction: PropTypes.func,
  reported: PropTypes.bool,
  updatedAt: PropTypes.string,
  username: PropTypes.string,
  usernameTapAction: PropTypes.func
};

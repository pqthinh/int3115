import * as React from "react";
import { ScrollView } from "react-native";

import styles from "./styles";
import Comments from './index';
import * as actions from "./actions";
import moment from "moment";

export default listComment = (props) =>  {
  const [scrollIndex] = React.useState(0)
  const [state, setState] = React.useState({
    comments: [],
    loadingComments: true,
    lastCommentUpdate: null,
    review: props.review ? props.review : null,
    login: null,
    id: props.id
  })

  const refs = React.useRef(null)

  React.useEffect(() => {
    const c = actions.getComments();

    setState({
      comments: c,
      loadingComments: false,
      lastCommentUpdate: new Date().getTime()
    });
  },[])

  const extractUsername = (c) => {
    try {
      return c.email !== "" ? c.email : null;
    } catch (e) {
      console.log(e);
    }
  }

  const extractBody = (c) => {
    try {
      return c.body && c.body !== "" ? c.body : null;
    } catch (e) {
      console.log(e);
    }
  }

  const extractImage = (c) => {
    try {
      return c.image_id && c.user.image_id !== "" ? c.user.image_id : "";
    } catch (e) {
      console.log(e);
    }
  }

  const extractChildrenCount = (c) => {
    try {
      return c.childrenCount || 0;
    } catch (e) {
      console.log(e);
    }
  }

  const extractEditTime = (item) => {
    try {
      return item.updated_at;
    } catch (e) {
      console.log(e);
    }
  }

  const extractCreatedTime = (item) => {
    try {
      return item.created_at;
    } catch (e) {
      console.log(e);
    }
  }

  const likeExtractor = (item) => {
    return item.liked;
  }

  const reportedExtractor = (item) => {
    return item.reported;
  }

  const likesExtractor = (item) => {
    return item.likes.map(like => {
      return {
        image: like.image,
        name: like.username,
        user_id: like.user_id,
        tap: username => {
          console.log("Taped: " + username);
        }
      };
    });
  }

  const isCommentChild = (item) => {
    return item.parentId !== null;
  }

  const review = state.review;
  const data = state.comments;

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="always"
      onScroll={event => {
        scrollIndex = event.nativeEvent.contentOffset.y;
      }}
      ref={refs}
    >
      {state.comments.length ? (
        <Comments
          data={data}
          //To compare is user the owner
          viewingUserName={"Pearline@veda.ca"}
          // is the current user an admin
          userIsAdmin={true}
          // Styles to pass. Search for getStyles to find out what can be overwritten
          styles={{}}
          //how many comments to display on init
          initialDisplayCount={5}
          //How many minutes to pass before locking for editing
          editMinuteLimit={0}
          //What happens when user taps on username or photo
          usernameTapAction={username => {
            console.log("Taped user: " + username);
          }}
          //Where can we find the children within item.
          //Children must be prepared before for pagination sake
          childPropName={"children"}
          isChild={item => isCommentChild(item)}
          //We use for key prop on flat list (i.e. its comment_id)
          keyExtractor={item => item.commentId}
          //Extract the key indicating comments parent
          parentIdExtractor={item => item.parentId}
          //what prop holds the comment owners username
          usernameExtractor={item => extractUsername(item)}
          //when was the comment last time edited
          editTimeExtractor={item => extractEditTime(item)}
          //When was the comment created
          createdTimeExtractor={item => extractCreatedTime(item)}
          //where is the body
          bodyExtractor={item => extractBody(item)}
          //where is the user image
          imageExtractor={item => extractImage(item)}
          //Where to look to see if user liked comment
          likeExtractor={item => likeExtractor(item)}
          //Where to look to see if user reported comment
          reportedExtractor={item => reportedExtractor(item)}
          //Where to find array with user likes
          likesExtractor={item => likesExtractor(item)}
          //Where to get nr of replies
          childrenCountExtractor={item => extractChildrenCount(item)}
          //what to do when user clicks reply. Usually its header height + position (b/c scroll list heights are relative)
          replyAction={offset => {
            refs.current.scrollTo({
              x: null,
              y: scrollIndex + offset - 300,
              animated: true
            });
          }}
          //what to do when user clicks submits edited comment
          saveAction={(text, parentCommentId) => {
            let date = moment().format("YYYY-MM-DD H:mm:ss");
            let comments = actions.save(
              state.comments,
              text,
              parentCommentId,
              date,
              "testUser"
            );
            setState({
              comments: comments
            });

            if (!parentCommentId) {
              refs.current.scrollToEnd();
            }
          }}
          //what to do when user clicks submits edited comment
          editAction={(text, comment) => {
            let comments = actions.edit(
              state.comments,
              comment,
              text
            );
            setState({
              comments: comments
            });
          }}
          //what to do when user clicks report submit
          reportAction={comment => {
            let comments = actions.report(state.comments, comment);
            setState({
              comments: comments
            });
          }}
          //what to do when user clicks like
          likeAction={comment => {
            let comments = actions.like(state.comments, comment);
            setState({
              comments: comments
            });
          }}
          //what to do when user clicks like
          deleteAction={comment => {
            let comments = actions.deleteComment(
              state.comments,
              comment
            );
            setState({
              comments: comments
            });
          }}
          //Must return promise
          paginateAction={(from_comment_id, direction, parent_comment_id) => {
            //Must return array of new comments after pagination

            let newComments = actions.paginateComments(
              state.comments,
              from_comment_id,
              direction,
              parent_comment_id
            );

            setState({
              comments: newComments
            });
            setTimeout(function() {
              if (direction == "up") {
                refs.current.scrollTo({
                  x: 0,
                  y: 500,
                  animated: true
                });
              } else {
                refs.current.scrollTo({ x: 0, y: 0, animated: true });
              }
            }, 3000);
          }}
        />
      ) : null}
    </ScrollView>
  );
}

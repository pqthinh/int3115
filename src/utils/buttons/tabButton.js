import * as React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TadaimaLogo from "../../assets/logos/tadaima.svg";
import Search from "../../assets/logos/search.svg";
import Activity from "../../assets/logos/activity.svg";
import Profile from "../../assets/logos/profile.svg";
import UserManual from "../../assets/logos/userManual.svg";
import Inquiry from "../../assets/logos/inquiry.svg";
import Dialog, {
  SlideAnimation,
  DialogButton,
  DialogFooter,
  DialogContent,
} from "react-native-popup-dialog";

import { changeRequestSOS } from "../../features/authentication/redux/actions";
import { tabButtonStyles } from "./styles";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const TabButton = (props) => {
  const {user, accessToken, changeRequestSOS} =  props;
  const {can_sos} = user;
  const styles = tabButtonStyles;
  const navigation = useNavigation();
  const [visibleDialog, setVisibleDialog] = React.useState(false);
  const [contentDialog, setContentDialog] = React.useState(false);

  const _handleCreateSOS = (el) => {
    switch (can_sos) {
      case "none_request":
        setContentDialog("外出に不安のある方を登録するには、事務局への申請が必要です。");
        return setVisibleDialog(true);
      case "request_sent":
        setContentDialog("登録中です。");
        return setVisibleDialog(true);
      default:
        navigation.navigate(el.screen);
    }
  };

  const _handleRequest = () => {
    switch (can_sos) {
      case "none_request":
        return changeRequestSOS(accessToken);
      case "request_sent":
        return setVisibleDialog(false);
      default:
        navigation.navigate("CREATE_SOS_STACK_SCREEN");
    }
  }

  const listButton = [
    {
      index: 0,
      screen: "CREATE_SOS_STACK_SCREEN",
      label: "探してもらう",
      tabColor: "#FC574A",
    },
    {
      index: 1,
      screen: "HISTORY_POINT_SCREEN",
      label: "私の貢献度",
      tabColor: "#80C62D",
    },
    {
      index: 2,
      screen: "PROFILE_STACK_SCREEN",
      label: "プロフィール",
      tabColor: "#559AEB",
    },
    {
      index: 3,
      screen: "",
      label: "アプリの使い方",
      tabColor: "#AD64A3",
    },
    {
      index: 4,
      screen: "PROJECT_STACK_SCREEN",
      label: "活動について",
      tabColor: "#F57717",
    },
    {
      index: 5,
      screen: "QUESTION_STACK_SCREEN",
      label: "よくある質問",
      tabColor: "#22B1AD",
    },
  ];

  const getLogo = (idx) => {
    switch (idx) {
      case 1:
        return <Activity style={styles.iconStyle} />;
      case 2:
        return <Profile style={styles.iconStyle} />;
      case 3:
        return <UserManual style={styles.iconStyle} />;
      case 4:
        return <TadaimaLogo style={styles.iconStyle} />;
      case 5:
        return <Inquiry style={styles.iconStyle} />;
      default:
        return <Search style={styles.iconStyle} />;
    }
  };

  const _handleScreen = (el, idx) => {
    switch (idx) {
      case 1:
        navigation.navigate(el.screen);
        break;
      case 2:
        navigation.navigate(el.screen);
        break;
      case 3:
        // navigation.navigate(el.screen);
        break;
      case 4:
        navigation.navigate(el.screen);
        break;
      case 5:
        navigation.navigate(el.screen);
        break;
      default:
        _handleCreateSOS(el);
        break;
    }
  };

  return (
    <>
      {listButton.map((el, idx) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => _handleScreen(el, idx)}
          key={idx}
        >
          <View style={[styles.btnContainer, { backgroundColor: el.tabColor }]}>
            {getLogo(idx)}
            <Text style={styles.titleLabel}>{el.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <Dialog
        width={300}
        overlayOpacity={0.7}
        overlayBackgroundColor="#e5eaec"
        visible={visibleDialog}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
            initialValue: 0,
            useNativeDriver: true,
          })
        }
        onTouchOutside={() => {
          setVisibleDialog(false);
        }}
        footer={
          <DialogFooter>
            <DialogButton
              text={can_sos === "none_request" ? "申請する" : "OK"}
              bordered
              onPress={() => {
                setVisibleDialog(false);
                //navigation.navigate('INFO_USER_SUBJECT_REGISTER');
                _handleRequest();
              }}
              key="button-2"
            />
            {
              can_sos === "none_request" ?
              <DialogButton
                text="しない"
                bordered
                onPress={() => {
                  setVisibleDialog(false);
                }}
                key="button-1"
              /> : 
              <View/>
            }
          </DialogFooter>
        }
      >
        <DialogContent
          style={{
            padding: 20,
          }}
        >
          <Text style={{ fontFamily: "roboto-bold" }}>
            {contentDialog}
          </Text>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default connect((state) => ({
  user: state.userReducer.user,
  accessToken: state.userReducer.accessToken,
}),{
  changeRequestSOS,
})(TabButton);

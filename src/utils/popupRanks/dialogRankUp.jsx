import Dialog, { DialogFooter, DialogButton, DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SGSs from '../../assets/SDGs_logos/SDGs_logo.svg';

const dialogRankUp = (props) => {
  const [visibleDialog, setVisibleDialog] = React.useState(props.visible);
  const styles = StyleSheet.create({
    iconPointNoti: {
      width: '100%',
      height: 50
    }
  });

  return (
    <View>
      <Dialog
        width={350}
        overlayOpacity={0.3}
        overlayBackgroundColor="#e5eaec"
        visible={visibleDialog}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
          initialValue: 0,
          useNativeDriver: true,
        })}
        onTouchOutside={() => {
          setVisibleDialog(false);
          props.parentCallback(false);
        }}
        footer={
          <View style={{ alignItems: "center", backgroundColor: "#fff5d6" }}>
            <DialogFooter style={{ backgroundColor: '#F56C17', width: 200, height: 50 , borderRadius: 10, marginBottom: 20}}>
              <DialogButton textStyle={{ color: 'white' }}
                text="OK"
                bordered
                onPress={() => {
                  setVisibleDialog(false);
                  props.parentCallback(false);
                }}
                key="button-1"
              />
            </DialogFooter>
          </View>
        }
      >
        <DialogContent
          style={{
            padding: 20,
            backgroundColor: '#fff5d6'
          }}>
          <View style={{ color: 'black', margin: 'auto' }}>
            <Image style={styles.iconPointNoti} source={require('../../assets/logos/imageExcellent.jpg')} />
            <Text style={{ color: 'black', textAlign: "center" }}>ただいまカフェ</Text>
            <Text style={{ color: 'black', textAlign: "center", fontWeight: "bold", fontSize: 20 }}>チェックイン</Text>
            <Text style={{ color: 'black', textAlign: "center", marginBottom: 20 }}>ご利用ありがとうございました！</Text>
            <SafeAreaView style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, alignItems: "center" }}>
              <Text style={{ color: 'black', textAlign: "center" }}>マイバック持参</Text>
              <Text style={{ color: 'black', textAlign: "center" }}>SDGｓポイント +300</Text>

              <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <Image style={{
                  width: 70,
                  height: 70,
                  marginRight: 5
                }} source={require('../../assets/SDGs_logos/SDGS_WEB_11.png')} />
                <Image style={{
                  width: 70,
                  height: 70,
                  marginRight: 5
                }} source={require('../../assets/SDGs_logos/SDGS_WEB_12.png')} />
                <Image style={{
                  width: 70,
                  height: 70,
                }} source={require('../../assets/SDGs_logos/SDGS_WEB_15.png')} />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}><SGSs style={{
                width: 30,
                height: 30
              }} />
                <Text style={{ fontWeight: "bold", fontSize: 40 }}>3,200</Text>
              </View>
            </SafeAreaView>
          </View>
          <View style={{ backgroundColor: 'white', borderRadius: 15, marginTop: 10, alignItems: "center" }}>
            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", padding: 10 }}><Text>次のランクアップは</Text><Text style={{ fontWeight: "bold" }}>シルバーメダル</Text></View>
            <Text>あと 300 ポイント</Text>
          </View>
        </DialogContent>
      </Dialog>
    </View>
  )
}

export default dialogRankUp;

import Dialog, { DialogFooter, DialogButton, DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SGSs from '../../assets/SDGs_logos/SDGs_logo.svg';
import Confetti from 'react-native-confetti';

const dialogRankUpWin = () => {
  const [visibleDialog, setVisibleDialog] = React.useState(true);
  
  const styles = StyleSheet.create({
    iconPointNoti: {
      width: '100%',
      height: 120
    }
  });

  return (
    <View>
      <Confetti
      duration='6000'
      confettiCount='100'
      colors = {["rgb(242.2, 102, 68.8)","rgb(255, 198.9, 91.8)","rgb(122.4, 198.9, 163.2)","rgb(76.5, 193.8, 216.7)","rgb(147.9, 99.4, 140.2)"]}
      />
      <Dialog
      dialogStyle={{borderColor: 'yellow', borderWidth: 4}}
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
        }}
        footer={
          <View style={{ alignItems: "center", backgroundColor: "#fff5d6" }}>
            <DialogFooter style={{ backgroundColor: '#F56C17', width: 200, height: 50 , borderRadius: 10, marginBottom: 20}}>
              <DialogButton textStyle={{ color: 'white' }}
                text="OK"
                bordered
                onPress={() => {
                  setVisibleDialog(false);
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
            <Image style={styles.iconPointNoti} source={require('../../assets/logos/imageCongratulation.jpg')} />
            <Text style={{ color: 'black', textAlign: "center" }}>
            ランクアップ
            </Text>
            <Text style={{ color: 'black', textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
            シルバーメダルになりました！
            </Text>
            <SafeAreaView style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, alignItems: "center" }}>
              <Text style={{ color: 'black', textAlign: "center" }}>
                SDGｓポイント +300
            </Text>

              <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}><SGSs style={{
                width: 30,
                height: 30
              }} />
                <Text style={{ fontWeight: "bold", fontSize: 40 }}>3,200</Text>
              </View>
            </SafeAreaView>
          </View>
          <View style={{ backgroundColor: 'white', borderRadius: 15, marginTop: 10, alignItems: "center" }}>
            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", padding: 10 }}><Text>次のランクアップは </Text><Text style={{ fontWeight: "bold" }}>シルバーメダル</Text></View>
            <Text>あと 300 ポイント</Text>
          </View>
        </DialogContent>
      </Dialog>
    </View>
  )
}

export default dialogRankUpWin;

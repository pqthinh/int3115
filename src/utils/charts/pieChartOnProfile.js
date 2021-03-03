import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { PieChart } from "react-native-svg-charts";

const pieChartOnProfile = ({ points, data }) => {
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if ((data, points.length)) {
      const dataFormart = [...data];
      dataFormart.map((item, index) => (item.value = points[index]));
      setChartData(dataFormart);

      if (points.length) {
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;
        setTotal(points.reduce(reducer));
      }
    }
  }, [points, data]);

  return (
    <View style={styles.container}>
      <PieChart
        style={styles.pieChart}
        valueAccessor={({ item }) => item.amount}
        data={chartData}
        spacing={0}
        outerRadius={"100%"}
        innerRadius={"45%"}
        sort={(a, b) => a.key - b.key}
      />
      <View style={styles.textCenterOnDonut}>
        <Text style={styles.textCenter}>SDGsポイント</Text>
        <Text style={styles.textCenter}>{total}pt</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  pieChart: {
    height: 300,
    width: 300,
  },
  textCenterOnDonut: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  textCenter: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default pieChartOnProfile;

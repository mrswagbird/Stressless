import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";
//import jsonData from '../../data/preprocessing/report_preprocessed_anh.json';

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      // strokeWidth: 2 // optional
    },
  ],
  legend: ["Rainy Days"], // optional
};

const chartConfig = {
  // backgroundGradientFrom: "#1E2923",
  // backgroundGradientFromOpacity: 0,
  // backgroundGradientTo: "#08130D",
  // backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default function Report() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    const readExcelFile = async () => {
      try {
        // Import the JSON data directly
        // const jsonData = require('../../data/preprocessing/report_preprocessed_anh.json');
        const labels = jsonData.map((row) =>
          moment(row.datetime).format("YYYY-MM-DD HH:mm:ss")
        );

        const stressData = jsonData.map((row) => parseFloat(row.stress_lvl));

        setChartData({
          labels,
          datasets: [
            {
              data: stressData,
            },
          ],
        });
      } catch (error) {
        console.error("Error reading JSON file for Stress Report:", error);
      }
    };

    readExcelFile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Stress Report Page</Text>
      <Text>
        This is the stress report page for the app. It will contain a brief
        description of the app and a button to start the app.
      </Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

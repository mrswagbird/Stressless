import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Picker } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
// import jsonData from './Report_data/report_unique_preprocessed_anh.json';

const screenWidth = Dimensions.get("window").width - 16;

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

  const [selectedDate, setSelectedDate] = useState('20240208');

  const fetchDataForDate = async (date) => {
    try {
      const path = './Report_data/report_preprocessed_anh_' + date +'.json';
      // const response = await fetch(path);
      // Log the parsed JSON data
      console.log('Response:', date);
      // const jsonData = await response.json();

      const jsonData = require(path);
      // const jsonData = require(`./Report_data/report_preprocessed_anh_20240125.json`);
      // const jsonData = require(`./Report_data/report_preprocessed_anh_${date}.json`);

      // Log the parsed JSON data
      console.log('JSON Data:', jsonData);
  
      const labels = jsonData.map((row) => moment(row.datetime).format('HH:mm'));
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
      console.error(`Error reading JSON file for Stress Report on ${date}:`, error);
    }
  };

  useEffect(() => {
    // Load data for the initial date or set a default date
    if (selectedDate) {
      fetchDataForDate(selectedDate);
    }
  }, [selectedDate]);

  const renderDropdownOptions = () => {
    // Replace these dates with the actual dates you have
    const availableDates = [
      '20240124', '20240125', '20240126', '20240127', '20240128', '20240129', '20240130', '20240131', '20240201', '20240202', '20240203', '20240204', '20240205', '20240206', '20240207', '20240208' 
    ];
      availableDates.reverse();
    return availableDates.map((date) => (
      <Picker.Item key={date} label={moment(date, 'YYYYMMDD').format('YYYY-MM-DD')} value={date} />
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Stress Report</Text>
      <Text>
        Please select a date to see your stress levels throughout the day.
      </Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedDate}
        onValueChange={(itemValue) => setSelectedDate(itemValue)}
      >
        {renderDropdownOptions()}
      </Picker>
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
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    picker: {
      marginTop: 16,
      marginBottom: 16,

    },
  });

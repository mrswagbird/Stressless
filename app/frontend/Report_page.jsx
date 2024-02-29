import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import reportData20240124 from './Report_data/report_preprocessed_anh_20240124.json';
import reportData20240125 from './Report_data/report_preprocessed_anh_20240125.json';
import reportData20240126 from './Report_data/report_preprocessed_anh_20240126.json';
import reportData20240127 from './Report_data/report_preprocessed_anh_20240127.json';
import reportData20240128 from './Report_data/report_preprocessed_anh_20240128.json';
import reportData20240129 from './Report_data/report_preprocessed_anh_20240129.json';
import reportData20240130 from './Report_data/report_preprocessed_anh_20240130.json';
import reportData20240131 from './Report_data/report_preprocessed_anh_20240131.json';
import reportData20240201 from './Report_data/report_preprocessed_anh_20240201.json';
import reportData20240202 from './Report_data/report_preprocessed_anh_20240202.json';
import reportData20240203 from './Report_data/report_preprocessed_anh_20240203.json';
import reportData20240204 from './Report_data/report_preprocessed_anh_20240204.json';
import reportData20240205 from './Report_data/report_preprocessed_anh_20240205.json';
import reportData20240206 from './Report_data/report_preprocessed_anh_20240206.json';
import reportData20240207 from './Report_data/report_preprocessed_anh_20240207.json';
import reportData20240208 from './Report_data/report_preprocessed_anh_20240208.json';

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
  const reportData = {
    '20240124': reportData20240124,
    '20240125': reportData20240125,
    '20240126': reportData20240126,
    '20240127': reportData20240127,
    '20240128': reportData20240128,
    '20240129': reportData20240129,
    '20240130': reportData20240130,
    '20240131': reportData20240131,
    '20240201': reportData20240201,
    '20240202': reportData20240202,
    '20240203': reportData20240203,
    '20240204': reportData20240204,
    '20240205': reportData20240205,
    '20240206': reportData20240206,
    '20240207': reportData20240207,
    '20240208': reportData20240208,
  };

  const fetchDataForDate = async (date) => {
    try {

      // Dynamic rendering is unfortunately not supported in Expo
      // const jsonData = require(`./Report_data/report_preprocessed_anh_${date}.json`);

      // Static rendering works     
      // const jsonData = require(`./Report_data/report_preprocessed_anh_20240125.json`);

      // A way to go around expo's limitation in dynamic rendering - using fetch api
      // Does not work in this case because the file is not hosted on a server
      // const response = await fetch('./Report_data/report_preprocessed_anh_${date}.json');
      // const jsonData = await response.json();

      const jsonData = reportData[date];
  
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

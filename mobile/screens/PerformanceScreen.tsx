import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LineChart } from "react-native-chart-kit";
import API from "../services/api";

const formatTime = (seconds: number) => {
  if (!seconds) return "--";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.round(
    (seconds - Math.floor(seconds)) * 100
  );

  return `${mins}:${secs
    .toString()
    .padStart(2, "0")}.${ms
    .toString()
    .padStart(2, "0")}`;
};
const screenWidth = Dimensions.get("window").width;
export default function PerformanceScreen() {
  const [stroke, setStroke] =
    useState("Freestyle");

  const [distance, setDistance] =
    useState(100);

  const [period, setPeriod] =
    useState("month");

  const [summary, setSummary] =
    useState<any>(null);

  const [trendData, setTrendData]=
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const distanceOptions: Record<
    string,
    number[]
  > = {
    Freestyle: [
      50, 100, 200, 400, 800, 1500,
    ],
    Backstroke: [50, 100, 200],
    Breaststroke: [50, 100, 200],
    Butterfly: [50, 100, 200],
    IM: [200, 400],
  };

  const fetchData = async () => {
    try {
      setLoading(true);
  
      const summaryRes =
        await API.get(
          "/performance/summary",
          {
            params: {
              stroke,
              distance,
              period,
            },
          }
        );
  
      const trendRes =
        await API.get(
          "/performance/my",
          {
            params: {
              stroke,
              distance,
              period,
            },
          }
        );
  
      setSummary(summaryRes.data);
  
      setTrendData(trendRes.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [stroke, distance, period]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Performance Analytics
      </Text>

      <View style={styles.filterCard}>
        <Text style={styles.filterTitle}>
          Stroke
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          style={{
            marginBottom: 20,
          }}
        >
          {[
            "Freestyle",
            "Backstroke",
            "Breaststroke",
            "Butterfly",
            "IM",
          ].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                stroke === item &&
                  styles.activeChip,
              ]}
              onPress={() => {
                setStroke(item);
                setDistance(
                  distanceOptions[item][0]
                );
              }}
            >
              <Text
                style={[
                  styles.chipText,
                  stroke === item &&
                    styles.activeChipText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.filterTitle}>
          Distance
        </Text>

        <Picker
          selectedValue={distance}
          onValueChange={setDistance}
        >
          {(distanceOptions[stroke] ||
            []
          ).map((d) => (
            <Picker.Item
              key={d}
              label={`${d}m`}
              value={d}
            />
          ))}
        </Picker>

        <Text style={styles.filterTitle}>
          Period
        </Text>

        <Picker
          selectedValue={period}
          onValueChange={setPeriod}
        >
          <Picker.Item
            label="Last Month"
            value="month"
          />

          <Picker.Item
            label="Last 3 Months"
            value="3months"
          />

          <Picker.Item
            label="Last 6 Months"
            value="6months"
          />

          <Picker.Item
            label="All Time"
            value="all"
          />
        </Picker>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>
            PB
          </Text>

          <Text style={styles.statValue}>
            {summary?.pb
              ? formatTime(summary.pb)
              : "--"}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>
            Latest
          </Text>

          <Text style={styles.statValue}>
            {summary?.latest
              ? formatTime(
                  summary.latest
                )
              : "--"}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>
            Average
          </Text>

          <Text style={styles.statValue}>
            {summary?.average
              ? formatTime(
                  summary.average
                )
              : "--"}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>
            Improvement
          </Text>

          <Text style={styles.statValue}>
            {summary?.improvement !==
              null &&
            summary?.improvement !==
              undefined
              ? `${summary.improvement.toFixed(
                  2
                )}s`
              : "--"}
          </Text>
        </View>
      </View>

      <View style={styles.trendCard}>
        <Text style={styles.trendTitle}>
          Performance Trend
        </Text>

        <Text
          style={styles.trendSubtitle}
        >
          {distance}m {stroke}
        </Text>

        {trendData.length > 0 ? (
  <LineChart
    data={{
      labels: trendData.map(
        (_: any, index: number) =>
          `${index + 1}`
      ),

      datasets: [
        {
          data: trendData.map(
            (item: any) =>
              item.totalSeconds
          ),
        },
      ],
    }}
    width={screenWidth - 80}
    height={220}
    yAxisSuffix="s"
    chartConfig={{
      backgroundColor: "#fff",
      backgroundGradientFrom:
        "#fff",
      backgroundGradientTo:
        "#fff",

      decimalPlaces: 2,

      color: (opacity = 1) =>
        `rgba(37,99,235,${opacity})`,

      labelColor: (
        opacity = 1
      ) =>
        `rgba(15,23,42,${opacity})`,
    }}
    bezier
    style={{
      marginTop: 20,
      borderRadius: 16,
    }}
  />
) : (
  <View
    style={
      styles.placeholderChart
    }
  >
    <Text
      style={
        styles.placeholderText
      }
    >
      No performance data
    </Text>
  </View>
)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 20,
  },

  filterCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#0F172A",
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    marginRight: 10,
  },

  activeChip: {
    backgroundColor: "#2563EB",
  },

  chipText: {
    color: "#334155",
    fontWeight: "600",
  },

  activeChipText: {
    color: "#FFF",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },

  statTitle: {
    color: "#64748B",
    fontSize: 15,
  },

  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2563EB",
    marginTop: 12,
  },

  trendCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
  },

  trendTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  trendSubtitle: {
    marginTop: 6,
    color: "#64748B",
  },

  placeholderChart: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    color: "#94A3B8",
    fontSize: 16,
  },
});
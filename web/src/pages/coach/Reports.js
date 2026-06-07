import { useEffect, useState } from "react";
import API from "../../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"

export default function Reports() {
  const [stats, setStats] = useState({
    swimmers: 0,
    assignments: 0,
    completed: 0,
    workouts: 0,
    logs: 0,
    pending: 0,
    completionRate: 0,
    topSwimmers: [],
    recentAssignments: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [swimmersRes, assignmentsRes] =
        await Promise.all([
          API.get("/users/swimmers"),
          API.get("/assign"),
        ]);

      const swimmers =
        swimmersRes.data;

      const assignments =
        assignmentsRes.data;

      const completed =
        assignments.filter(
          (a) =>
            a.status ===
            "completed"
        ).length;

      const pending =
        assignments.filter(
          (a) =>
            a.status !==
            "completed"
        ).length;

      const completionRate =
        assignments.length > 0
          ? (
              (completed /
                assignments.length) *
              100
            ).toFixed(1)
          : 0;

      const swimmerStats = {};

      assignments.forEach((a) => {
        const name =
          a.swimmerId?.name ||
          "Unknown";

        if (!swimmerStats[name]) {
          swimmerStats[name] = 0;
        }

        swimmerStats[name]++;
      });

      const topSwimmers =
        Object.entries(
          swimmerStats
        )
          .map(
            ([name, count]) => ({
              name,
              count,
            })
          )
          .sort(
            (a, b) =>
              b.count -
              a.count
          )
          .slice(0, 5);

      const recentAssignments =
        assignments
          .slice()
          .reverse()
          .slice(0, 10);

      setStats({
        swimmers:
          swimmers.length,
        assignments:
          assignments.length,
        completed,
        pending,
        completionRate,
        topSwimmers,
        recentAssignments,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const generatePDF = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(20);
    doc.text(
      "SwimMetrics Coach Report",
      14,
      20
    );
  
    doc.setFontSize(11);
  
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      14,
      30
    );
  
    autoTable(doc, {
      startY: 40,
      head: [["Metric", "Value"]],
      body: [
        ["Swimmers", stats.swimmers],
        ["Assignments", stats.assignments],
        ["Completed", stats.completed],
        ["Pending", stats.pending],
        [
          "Completion Rate",
          `${stats.completionRate}%`,
        ],
      ],
    });
  
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [
        [
          "Top Swimmer",
          "Assignments",
        ],
      ],
      body: stats.topSwimmers.map(
        (s) => [
          s.name,
          s.count,
        ]
      ),
    });
  
    doc.save(
      "SwimMetrics_Report.pdf"
    );
  };

  return (
    <div style={styles.container}>
      <h1>
        Coach Reports &
        Analytics
      </h1>
      
      <button
  style={styles.exportBtn}
  onClick={generatePDF}
>
  Export PDF Report
</button>
      <div style={styles.grid}>
        <Card
          title="Swimmers"
          value={stats.swimmers}
        />

        <Card
          title="Assignments"
          value={
            stats.assignments
          }
        />

        <Card
          title="Completed"
          value={stats.completed}
        />

        <Card
          title="Pending"
          value={stats.pending}
        />
      </div>

      <div style={styles.summary}>
        <h2>
          Training Summary
        </h2>

        <div
          style={
            styles.progressContainer
          }
        >
          <div
            style={{
              ...styles.progressBar,
              width: `${stats.completionRate}%`,
            }}
          />
        </div>

        <p>
          Completion Rate:
          <strong>
            {" "}
            {
              stats.completionRate
            }
            %
          </strong>
        </p>
      </div>

      <div style={styles.row}>
        <div style={styles.panel}>
          <h2>
            Top Active Swimmers
          </h2>

          {stats.topSwimmers
            .length === 0 ? (
            <p>
              No data
              available
            </p>
          ) : (
            stats.topSwimmers.map(
              (
                swimmer,
                index
              ) => (
                <div
                  key={index}
                  style={
                    styles.item
                  }
                >
                  <span>
                    {
                      swimmer.name
                    }
                  </span>

                  <strong>
                    {
                      swimmer.count
                    }{" "}
                    assignments
                  </strong>
                </div>
              )
            )
          )}
        </div>

        <div style={styles.panel}>
          <h2>
            Recent Activity
          </h2>

          {stats
            .recentAssignments
            .length ===
          0 ? (
            <p>
              No activity
            </p>
          ) : (
            stats.recentAssignments.map(
              (
                assignment
              ) => (
                <div
                  key={
                    assignment._id
                  }
                  style={
                    styles.item
                  }
                >
                  <span>
                    {
                      assignment
                        .swimmerId
                        ?.name
                    }
                  </span>

                  <span>
                    {
                      assignment.status
                    }
                  </span>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: 20,
    marginTop: 20,
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  summary: {
    marginTop: 30,
    background: "#fff",
    padding: 25,
    borderRadius: 12,
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  progressContainer: {
    width: "100%",
    height: 20,
    background: "#e5e7eb",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 15,
    marginBottom: 15,
  },

  progressBar: {
    height: "100%",
    background: "#10b981",
  },

  row: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: 20,
    marginTop: 20,
  },

  panel: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  item: {
    display: "flex",
    justifyContent:
      "space-between",
    padding: "10px 0",
    borderBottom:
      "1px solid #eee",
  },
  exportBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 15,
    marginBottom: 20,
  },
};
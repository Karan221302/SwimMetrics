import { useEffect, useState } from "react";
import API from "../../services/api";

export default function CoachAssignment() {
  const [swimmers, setSwimmers] = useState([]);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await API.get("/users");

      const users = usersRes.data;
      console.log("USER RESPONSE:", usersRes.data)
      setSwimmers(
        users.filter(
          (u) => u.role === "swimmer"
        )
      );

      setCoaches(
        users.filter(
          (u) => u.role === "coach"
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const assignCoach = async (
    swimmerId,
    coachId
  ) => {
    try {
      await API.put(
        "/users/assign-coach",
        {
          swimmerId,
          coachId,
        }
      );

      fetchData();

      alert(
        "Coach assigned successfully"
      );
    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.response?.data)
      alert("Assignment failed");
    }

  };

  return (
    <div style={{ padding: 20 }}>
      <h2>
        Coach ↔ Swimmer Assignment
      </h2>

      <table
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Swimmer</th>
            <th>Email</th>
            <th>Assigned Coach</th>
          </tr>
        </thead>

        <tbody>
          {swimmers.map(
            (swimmer) => (
              <tr key={swimmer._id}>
                <td>
                  {swimmer.name}
                </td>

                <td>
                  {swimmer.email}
                </td>

                <td>
                  <select
                    value={
                      swimmer.assignedCoach ||
                      ""
                    }
                    onChange={(e) =>
                      assignCoach(
                        swimmer._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select Coach
                    </option>

                    {coaches.map(
                      (coach) => (
                        <option
                          key={
                            coach._id
                          }
                          value={
                            coach._id
                          }
                        >
                          {
                            coach.name
                          }
                        </option>
                      )
                    )}
                  </select>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
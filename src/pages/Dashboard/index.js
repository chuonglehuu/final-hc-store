import { Card, CardContent, Grid, Typography } from "@mui/material";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { collection, onSnapshot } from "firebase/firestore";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Helmet } from "react-helmet";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: _.times(labels.length, () => _.random(0, 1000)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Dashboard = () => {
  const { role } = UserAuth();
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      const listUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filterUsers = listUsers.filter((item) => item.role === 2);
      const filterManagers = listUsers.filter((item) => item.role === 1);
      setUsers(filterUsers);
      setManagers(filterManagers);
    });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="" />
      </Helmet>
      <Grid container spacing={2}>
        {role === 0 && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Users
                  </Typography>
                  <Typography variant="h3" component="h1">
                    {users?.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Managers
                  </Typography>
                  <Typography variant="h3" component="h1">
                    {managers?.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Revenue
              </Typography>
              <Line options={options} data={data} />{" "}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

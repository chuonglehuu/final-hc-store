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
import _ from "lodash";
import React from "react";
import { Line } from "react-chartjs-2";
import { UserAuth } from "../../context/AuthContext";

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
      data: _.times(labels.length, () => _.random(-1000, 1000)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Dashboard = () => {
  const { role } = UserAuth();
  return (
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
                  1000
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
                  50
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
  );
};

export default Dashboard;

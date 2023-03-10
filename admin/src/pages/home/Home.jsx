import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import Login from "../login/Login";

export default function Home() {
  const user = useSelector((state) => state.user.currentUser);

  const [userStats, setUserStats] = useState([]);

  // Array incude months
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) => [
          setUserStats((prev) => [
            ...prev,
            // -1 since we take index from array
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ]),
        ]);
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      {user ? (
        <>
          <FeaturedInfo />
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

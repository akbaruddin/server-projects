import React from "react";
import Router from "next/router";
import useSWR, { mutate } from "swr";
import api from "../services/Api";
import useAuth, { ProtectRoute } from "../contexts/auth.js";

function Dashboard() {
  const { user, loading } = useAuth();
  const { data: { data: pages } = {}, isValidating } = useSWR(
    loading ? false : "/pages",
    api.get
  );

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1 test-id="dashboard-title">Dashboard</h1>
            <br />
            { JSON.stringify(user) }
          </div>
        </div>
      </div>
    </>
  );
}

export default ProtectRoute(Dashboard);

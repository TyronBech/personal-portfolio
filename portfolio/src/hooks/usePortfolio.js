import { useState, useEffect } from "react";
import { client } from "@/data/sanity";

export const usePortfolio = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, experiences, projects] = await Promise.all([
          client.fetch('*[_type == "profile"][0]'),       // Get the single profile
          client.fetch('*[_type == "experience"]'),       // Get all work history
          client.fetch('*[_type == "project"]'),          // Get all projects
        ]);

        setData({
          ...profile,
          experiences,
          projects,
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};
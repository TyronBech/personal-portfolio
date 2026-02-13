import { useState, useEffect } from "react";
import { client } from "@/data/sanity"; // Adjust path to where your sanity.js is

export const usePortfolio = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // We run 3 queries at the same time
        const [profile, experiences, projects] = await Promise.all([
          client.fetch('*[_type == "profile"][0]'),       // Get the single profile
          client.fetch('*[_type == "experience"]'),       // Get all work history
          client.fetch('*[_type == "project"]'),          // Get all projects
        ]);

        // We combine them into one easy-to-use object
        setData({
          ...profile,          // Spreads first_name, about, skills, etc.
          experiences,         // Adds the experience array
          projects,            // Adds the projects array
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
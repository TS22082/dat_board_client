import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Response = {
  message: string;
};

const Profile = () => {
  const [response, setResponse] = useState<Response | null>({ message: "" });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const response = await fetch("/api/delay/1", { signal });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setResponse(data);
      } catch {
        console.error("error");
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return <Typography variant="h6">Profile {response?.message}</Typography>;
};

export default Profile;

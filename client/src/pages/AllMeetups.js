import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "http://localhost:3005/meetup/",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      } //"https://react-getting-started-e0e0b-default-rtdb.europe-west1.firebasedatabase.app/meetups.json"
    )
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        const meetups = [];
        console.log(data.data);
        for (const key in data.data) {
          console.log(data.data[key]);
          const meetup = {
            id: key,
            ...data.data[key],
          };
          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;

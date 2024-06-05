import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";

import Header from "./Header";
import Content from "./Content";
import {
  createMockFormSubmission,
  onMessage,
  saveLikedFormSubmission,
  fetchLikedFormSubmissions,
} from "./service/mockServer";
import Toast from "./Toast";

function App() {
  const [newSubmission, setNewSubmission] = useState({});
  const [open, setOpen] = useState(false);
  const [fetchedFormSubmissions, setFetchedFormSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => setOpen(false);

  function handleMessage(formData) {
    setNewSubmission(formData);
  }

  const handleClick = () => {
    setOpen(true);
    onMessage(handleMessage);
    createMockFormSubmission();
  };


  function handleStorageChange(event) {
    if (event.key === "formSubmissions") {
      // Handle the change, for example, refetch data from localStorage
      fetchLikedFormSubmissions().then((data) =>
 
        setFetchedFormSubmissions(data).catch((error) => {
          console.log(error);
        })
      );
    }
  }

  window.addEventListener("storage", handleStorageChange);

  useEffect(() => {
    fetchLikedFormSubmissions()
      .then((data) => {
          setFetchedFormSubmissions(data);
      })
      .catch((error) => {
        if (error.status === 500) {
          fetchLikedFormSubmissions().then((data) => 
              setFetchedFormSubmissions(data)
          );
        }
      });
  }, [fetchedFormSubmissions]);

  return (
    <>
      <Header handleClick={handleClick} />
      <Container>
        <Content isLoading={isLoading} fetchedFormSubmissions={fetchedFormSubmissions} />
        <Toast
          saveLikedFormSubmission={saveLikedFormSubmission}
          newSubmission={newSubmission}
          handleClose={handleClose}
          open={open}
        />
      </Container>
    </>
  );
}

export default App;

// api.js
import { setPosts } from "state";
import jsPDF from "jspdf";

export const getPosts = async (dispatch, token) => {
  const response = await fetch(`http://localhost:3001/posts?isSharable=true`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  dispatch(setPosts({ posts: data }));
};

export const getUserPosts = async (dispatch, token, userId) => {
  const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  dispatch(setPosts({ posts: data }));
};
export const generatePDF = async (token, loggedInUserId) => {
  // Send a GET request to the "/posts/:userId/pdf" endpoint with the userId as a URL parameter
  const response = await fetch(
    `http://localhost:3001/posts/${loggedInUserId}/posts`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    console.error(
      `Could not generate PDF: ${response.status} ${response.statusText}`
    );
    throw new Error("Could not generate PDF");
  }
  const jsonData = await response.json();
  const pdf = new jsPDF();

  // Set the initial position for the text
  let x = 10;
  let y = 10;
  pdf.setFont("helvetica");
  pdf.setFontSize(20);

  pdf.text(
    "Your Posts data for " + "id:" + `${loggedInUserId}`,
    105,
    y,
    "center"
  );
  pdf.setFontSize(12);
  y += 10;
  Object.keys(jsonData).forEach((key, index) => {
    const value = JSON.stringify(jsonData[key]);
    const parameters = value.split(",");
    pdf.text(x, y, "Post " + `${key}:`);
    y += 10;
    parameters.forEach((parameter, i) => {
      pdf.text(x, y + i * 5, ` ${parameter}`);
    });
    if (index !== parameters.length - 1) {
      pdf.addPage();
      y = 10;
    }
  });

  // Save the PDF to the file system
  pdf.output("dataurlnewwindow");
  return;
};

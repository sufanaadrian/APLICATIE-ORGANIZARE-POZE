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
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  // Set the initial position for the text
  let x = 5;
  let y = 20;

  const keys = Object.keys(jsonData);
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const tableX = pageWidth / 4;
  const tableY = y;
  const columnWidth = 100;

  function fillTableContent() {
    pdf.setFillColor(175, 236, 255); // set the fill color for column cells
    pdf.rect(x, tableY, 2 * columnWidth + 5 - x, tableY - tableY + 8, "F"); // fill
    pdf.setFillColor(0, 0, 0);
    pdf.setFillColor(245, 250, 255); // set the fill color for column contents
    pdf.rect(
      x,
      tableY + 8,
      2 * columnWidth + 5 - x,
      pageHeight - 20 - tableY - 8,
      "F"
    ); // draw a filled rectangle
    pdf.setFillColor(0, 0, 0); // reset the fil
  }
  pdf.setFillColor(96, 208, 245); // set the fill color for Title column
  pdf.rect(x, tableY - 15, 2 * columnWidth + 5 - x, tableY - tableY + 15, "F"); // fill
  pdf.setFillColor(0, 0, 0);
  fillTableContent();
  for (let i = 0; i < keys.length; i++) {}
  pdf.text(tableX * 2, tableY - 5, "Your posts data", { align: "center" });
  pdf.line(x, tableY - 15, 2 * columnWidth + 5, tableY - 15); // x Line above column titles
  pdf.line(x, tableY - 15, x, tableY); // y line left
  pdf.line(2 * columnWidth + 5, tableY - 15, 2 * columnWidth + 5, tableY); // y line right
  pdf.setFontSize(8);

  y += 15;
  for (let i = 0; i < keys.length; i++) {
    if (i > 0 && i % 2 === 0) {
      pdf.addPage();
      fillTableContent();
    }

    const key = keys[i];

    // Draw the table lines
    pdf.setFont("helvetica", "bold");

    pdf.line(x, tableY, 2 * columnWidth + 5, tableY); // x Line above column titles
    pdf.line(x, tableY + 8, 2 * columnWidth + 5, tableY + 8); // x line below Title
    pdf.line(x, pageHeight - 20, 2 * columnWidth + 5, pageHeight - 20); // x line below table
    pdf.line(x, tableY, x, pageHeight - 20); // y line left
    pdf.line(2 * columnWidth + 5, tableY, 2 * columnWidth + 5, pageHeight - 20); // y line right
    pdf.line(pageWidth / 2, tableY, pageWidth / 2, pageHeight - 20); // y line between columns
    pdf.setFontSize(15);
    if (i % 2 === 0)
      pdf.text(tableX, tableY + 6, `Post ${key}:`, { align: "center" });
    else
      pdf.text(tableX + columnWidth, tableY + 6, `Post ${key}:`, {
        align: "center",
      });

    const value = JSON.stringify(jsonData[key]).replace(/,/g, "\n");
    const columnX = i % 2 === 0 ? 10 : 110;
    const rowY = i % 2 === 0 ? y : y;

    pdf.setFontSize(8);
    const valueArray = pdf.splitTextToSize(value, 70);
    pdf.text(columnX, rowY + 5, valueArray);
  }

  pdf.output("dataurlnewwindow");
  return;
};

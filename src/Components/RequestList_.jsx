import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import { useSelector, useDispatch } from "react-redux";
import { data } from "./testData";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

function Audit() {
  const state = useSelector((state) => state);
  const rowsPerPage = 10;
  const [list, setList] = useState([
    {
      id: 0,
      name: "",
      tel: "",
      date: "",
      cc: "",
      tikT: "",
      reolvedT: "",
      createT: "",
      status: "",
      assign: false,
      details: "",
    },
  ]);
  const [rowIndex, setRowIndex] = useState(0);
  const [allowedPages, setAllowedPages] = useState(2);
  const [total, setTotal] = useState(10);
  const [page, setPage] = useState(rowIndex + 1);

  const { auditTrail } = state.user;

  useEffect(() => {
    setList(auditTrail);
    console.log("from audit", auditTrail);
    handlePageNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const { showDetail_} = bindActionCreators(actionCreators, dispatch);


  const createData = (
    id,
    name,
    tel,
    date,
    cc,
    tikT,
    reolvedT,
    createT,
    status,
    assign,
    details
  ) => {
    return {
      id,
      name,
      tel,
      date,
      cc,
      tikT,
      reolvedT,
      createT,
      status,
      assign,
      details,
    };
  };
  console.log("list", list);

  const columns = [
    { id: "name", label: "Name" },
    { id: "tel", label: "Mobile Number" },
    { id: "date", label: "Date" },
    { id: "cc", label: "CC Tickect ID" },
    { id: "cat", label: "Ticket Time" },
    { id: "reolveT", label: "Created Time" },
    { id: "mcc", label: "Resolved Time" },
    { id: "mnc", label: "Status" },
    { id: "lac", label: "Assign" },
    { id: "ci", label: "Details" },
  ];
  const rows = data.map((details) =>
    createData(
      0,
      details.name,
      details.tel,
      details.date.day,
      details.cc,
      details.tikT,
      details.reolvedT,
      details.createT,
      details.status,
      details.assign,
      "view"
    )
  );
  // const rows = auditTrail.map((company) =>
  //   createData(
  //     company.id,
  //     company.company.name,
  //     company.phone_number,
  //     `${company.created_at.slice(0, company.created_at.indexOf("T"))}\n
  //     ${company.created_at.slice(
  //       company.created_at.indexOf("T") + 1,
  //       company.created_at.indexOf(".")
  //     )}`,
  //     company.cc_ticket_id,
  //     company.category,
  //     company.complaint,
  //     company.mcc,
  //     company.mnc,
  //     company.lac,
  //     company.ci,
  //     company.status
  //   )
  // );

  const handlePageNumber = () => {
    const remainder = rows.length % 10;
    if (remainder === 0) {
      setAllowedPages(parseInt(rows.length / 10));
    } else {
      console.log(rows / 10 + 1);
      setAllowedPages(parseInt(rows.length / 10) + 1);
    }
  };

  const handleAddPage = (e) => {
    e.preventDefault();
    if (page < allowedPages) {
      setRowIndex(rowIndex + 1);
      setPage(page + 1);
      setTotal(total + rowsPerPage);
    }
  };
  console.log(total);
  console.log("total", total);
  console.log("rowIndex", rowIndex);

  const handleReducePage = (e) => {
    e.preventDefault();
    if (page > 1) {
      setRowIndex(rowIndex - 1);
      setPage(page - 1);
      setTotal(total - rowsPerPage);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          color: "#110C0C",
          height: "3.5rem",
          fontSize: "1rem",
          fontWeight: "600",
          paddingTop: "1rem",
        }}
      >
        Genenral Request
      </Typography>
      <Box>
        <Paper
          sx={{
            width: "100",
            display: "flex",
            justifyContent: "space-evenly",
            padding: "0.7rem 1rem",
            alignItems: "start",
          }}
          elevation={0}
        >
          {columns.map((col) => (
            <Typography
              sx={{
                width: "9%",
                fontSize: "0.75rem",
                fontWeight: "700",
                textTransform: "capitalize",
                pr: "1rem",
              }}
              key={col.id}
            >
              {col.label}{" "}
            </Typography>
          ))}
        </Paper>
        <Box sx={{ pb: "2rem", minHeight: "400px" }}>
          {rows.slice(rowIndex * rowsPerPage, total).map((company) => (
            <Paper
              key={company.name}
              elevation={0}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                padding: "0.5rem 1rem",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <Typography
                sx={{
                  width: "9%",
                  fontSize: "0.7rem",
                  pr: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {company.name}
              </Typography>
              <Typography
                sx={{
                  width: "9%",
                  fontSize: "0.7rem",
                  pr: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {company.tel}
              </Typography>
              <Typography
                sx={{
                  width: "9%",
                  fontSize: "0.7rem",
                  pr: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {company.date}
              </Typography>

              <Typography
                sx={{
                  width: "9%",
                  fontSize: "0.7rem",
                  pr: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {company.cc}
              </Typography>
              <Typography
                sx={{
                  width: "9%",
                  fontSize: "0.7rem",
                  pr: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {company.tikT}
              </Typography>

              <Typography
                sx={{
                  width: "9%",
                  fontSize: "0.7rem",
                  pr: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {company.createT}
              </Typography>
              <Typography
                sx={{
                  width: "9%",
                  fontSize: "0.7rem",
                  pr: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {company.reolvedT}
              </Typography>

              <Box
                sx={{
                  width: "10.1%",
                  fontSize: "0.7rem",
                  pr: "0.5rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {company.status === "pending" ? (
                    <Box
                      sx={{
                        padding: "0.3rem",
                        borderRadius: "50%",
                        mr: "1rem",
                        background: "yellow",
                      }}
                    ></Box>
                  ) : (
                    ""
                  )}
                  {company.status === "resolved" ? (
                    <Box
                      sx={{
                        padding: "0.3rem",
                        borderRadius: "50%",
                        mr: "1rem",
                        background: "green",
                      }}
                    ></Box>
                  ) : (
                    ""
                  )}
                  {company.status === "unresolved" ? (
                    <Box
                      sx={{
                        padding: "0.3rem",
                        borderRadius: "50%",
                        mr: "1rem",
                        background: "#F42C2C",
                      }}
                    ></Box>
                  ) : (
                    ""
                  )}

                  <Typography
                    sx={{
                      width: "10.1%",
                      fontSize: "0.7rem",
                      pr: "0.5rem",
                    }}
                  >
                    {company.status}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "9%",
                  fontSize: "0.7rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Button
                  sx={{
                    color: "#fff",
                    fontSize: "0.7rem",
                    textTransform: "capitalize",
                    background: company.assign === true ? "#F42C2C" : "#C4C4C4",
                  }}
                >
                  accept
                </Button>
              </Box>
              <Box
                sx={{
                  width: "9%",
                  fontSize: "0.7rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Button
                  sx={{
                    fontSize: "0.7rem",
                    textTransform: "capitalize",
                  }}
                  onClick={() => showDetail_()}
                >
                  View
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
        <Box
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: "2rem",
            }}
          >
            <SkipPreviousOutlinedIcon
              className="icon"
              onClick={(e) => handleReducePage(e)}
              style={{
                color: "#0257E6",
                cursor: "pointer",
              }}
            />
            <Typography
              sx={{
                p: " 0.2rem 0.7rem",
                background: page !== 1 ? "#0257E6" : "#C4C4C4",
                color: "#fff",
                borderRadius: "0.3rem",
                m: "0 1rem",
                fontSize: "0.8rem",
              }}
            >
              {page}
            </Typography>
            <Typography>of</Typography>
            <Typography
              sx={{
                p: " 0.2rem 0.7rem",
                background: page !== allowedPages ? "#0257E6" : "#C4C4C4",
                color: "#fff",
                borderRadius: "0.3rem",
                m: "0 1rem",
                fontSize: "0.8rem",
              }}
            >
              {allowedPages}
            </Typography>
            <SkipNextOutlinedIcon
              className="icon"
              onClick={(e) => handleAddPage(e)}
              style={{
                color: "#0257E6",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Audit;

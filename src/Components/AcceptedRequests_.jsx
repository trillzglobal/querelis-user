import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import Moment from "react-moment";

function Accepted() {
  const state = useSelector((state) => state);
  const rowsPerPage = 10;
  // eslint-disable-next-line no-unused-vars
  const [list, setList] = useState([
    {
      id: 0,
      company: { name: "" },
      tel: "",
      date: "",
      cc: "",
      reolvedT: "",
      status: "",
      details: "",
      assigned_to: {
        id: 0,
      },
    },
  ]);
  const [rowIndex, setRowIndex] = useState(0);
  const [allowedPages, setAllowedPages] = useState(2);
  const [total, setTotal] = useState(10);
  const [page, setPage] = useState(rowIndex + 1);
  const { requests } = state.user;
  useEffect(() => {
    setList(requests);
    handlePageNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();
  const { showDetail_, setReqId, setUssd } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const createData = (
    id,
    company,
    tel,
    date,
    cc,
    resolvedT,
    status,
    details,
    ussd,
    createT
  ) => {
    const newName = company.name;
    return {
      id,
      newName,
      tel,
      date,
      cc,
      resolvedT,
      status,
      details,
      ussd,
      createT,
    };
  };

  const columns = [
    { id: "name", label: "Name" },
    { id: "tel", label: "Mobile Number" },
    { id: "date", label: "Date" },
    { id: "cc", label: "CC Tickect ID" },
    { id: "mcc", label: "Resolved Time" },
    { id: "mnc", label: "Status" },
    { id: "ci", label: "Details" },
  ];

  const filter = requests.filter((list_) => {
    return (
      list_.assigned_to !== null &&
      list_.assigned_to.id.toString() === localStorage.id_.toString()
    );
  });
  const rows = filter.map((details) =>
    createData(
      details.id,
      details.company,
      details.phone_number,
      details.date,
      details.cc_ticket_id,
      details.resolved_time,
      details.status,
      "view",
      details.ussd_details,
      details.created_at
    )
  );

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

  const handleReducePage = (e) => {
    e.preventDefault();
    if (page > 1) {
      setRowIndex(rowIndex - 1);
      setPage(page - 1);
      setTotal(total - rowsPerPage);
    }
  };
  // const today = new Date()
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          color: "#110C0C",
          height: "2.7rem",
          fontSize: "1rem",
          fontWeight: "600",
        }}
      >
        Accepted Request
      </Typography>
      <Box>
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "0.7rem 1rem",
            alignItems: "start",
          }}
          elevation={0}
        >
          {columns.map((col) => (
            <Typography
              sx={{
                width: "14.3%",
                fontSize: "0.7rem",
                pr: "1rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              key={col.id}
            >
              {col.label}{" "}
            </Typography>
          ))}
        </Paper>
        <Box sx={{ pb: "2rem", minHeight: "400px" }}>
          {rows.slice(rowIndex * rowsPerPage, total).map((req) => (
            <Paper
              key={req.id}
              elevation={0}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 1rem",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <Typography
                sx={{
                  width: "14.3%",
                  fontSize: "0.7rem",
                  pr: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {req.newName}
              </Typography>
              <Typography
                sx={{
                  width: "14.3%",
                  fontSize: "0.7rem",
                  pr: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {req.tel}
              </Typography>
              <Typography
                sx={{
                  width: "14.3%",
                  fontSize: "0.7rem",
                  pr: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {req.date}
              </Typography>
              <Typography
                sx={{
                  width: "14.3%",
                  fontSize: "0.7rem",
                  pr: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {req.cc}
              </Typography>
              <Box
                sx={{
                  width: "14.3%",
                  display: "flex",
                }}
              >
                {req.status !== "resolved" ? (
                  <HourglassTopOutlinedIcon />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Moment diff={req.createT} unit="hours">
                      {req.resolvedT}
                    </Moment>
                    {"  "}
                    <p style={{ paddingLeft: "0.5rem" }}>hours</p>
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  width: "14.3%",
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
                  {req.status === "pending" ? (
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
                  {req.status === "resolved" ? (
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
                  {req.status === "unresolved" ? (
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
                      fontSize: "0.7rem",
                      pr: "0.5rem",
                    }}
                  >
                    {req.status}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: "14.3%",
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
                  onClick={() => {
                    showDetail_();
                    setUssd(req.ussd);
                    setReqId(req.id);
                  }}
                >
                  View
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
        {rows.length > 10 ? (
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
                {console.log("pages", page)}
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
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default Accepted;

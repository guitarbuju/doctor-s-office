import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  descriptionWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  description: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  headers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "12px",
  },
  trows: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    flexGrow: 1,
    maxWidth: 700,
  },
  td: {
    width: 30,
    textAlign: "left",
  },
  ordersWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    fontSize: "10px",
    borderBottom: "1px solid",
    borderBottomColor: "#E5E7EB",
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    fontSize: "12px",
    borderBottom: "1px solid",
    borderBottomColor: "#E5E7EB",
    fontWeight:"bold"
  },
  orderColumn: {
    flex: 1,
    textAlign: "left",
  },
  chargeTitle: {
    fontSize: "10px",
    width: 100,
    textAlign: "left",
  },
  total: {
    fontWeight: "bold",
    fontSize: "15px",
    textAlign: "left",
    marginTop: "10px",
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },
  downloadLink: {
    backgroundColor: "#FBBF24",
  },
  button: {
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    marginTop: "0.25rem",
    marginLeft: "0.5rem",
    borderRadius: "0.25rem",
    color: "#F3F4F6",
    backgroundColor: "#FBBF24",
    fontSize: "0.75rem",
    lineHeight: "1.5rem",
    height: "1.5rem",
    textAlign: "center",
  },
});

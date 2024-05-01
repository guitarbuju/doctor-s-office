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
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "demibold",
    marginTop: "50px",
  },
  titleContainer: {
    fontSize: 15,
    textAlign: "center",
  },
  headers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
    marginTop: "20px",
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
    maxWidth: 500,
  },
  td: {
    width: 30,
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
    justifyContent: "space-between",
    marginTop: "20px",
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
    fontSize:"0.75rem",
    lineHeight:"1.5rem",
    height:'1.5rem',
    textAlign:'center'
  },
});

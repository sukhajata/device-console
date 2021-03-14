export const colors = {
  purple: "#781FA2",
  amber: "#FFC107",
  black: "#212121",
  indigo: "#303F9F",
  blue: "#536DFE",
  green: "#4CAF50",
  lightOrange: "orange",
  red: "#FF0000",
  white: "#FFFFFF",
  gray: "#939393",
  lightGray: "#D3D3D3",
  lightLightGray: "#DEDEDE",
  paleYellow: "#FFF9C4",
  lime: "#CDDC39",
  markerBlue: "#2E79C9",
  markerPurple: "#473FB0",
  markerYellow: "#CBC325",
  markerRed: "#CB2A3D",
  markerOrange: "#FF8A00",
  markerViolet: "#CF6AD9",
  smoke: "#F5F5F5",
};

const buttonBase = {
  padding: 15,
  marginBottom: 10,
  borderRadius: 5
};

const buttonTextBase = {
  textAlign: "center",
  fontWeight: "bold"
};

const textInputBase = {
  width: "100%",
  padding: 10,
  //height: 40,
  borderWidth: 1,
  marginTop: 5
};

export default {
  textInput: {
    ...textInputBase,
    borderColor: colors.gray,
    marginBottom: 15
  },
  validatedTextInput: {
    ...textInputBase,
    borderColor: colors.gray
  },
  errorTextInput: {
    ...textInputBase,
    borderColor: colors.red
  },
  navigationButton: {
    ...buttonBase,
    backgroundColor: colors.indigo
  },
  whiteButton: {
    ...buttonBase
  },
  headerTypography: {
    //backgroundColor: colors.lightLightGray,
    color: colors.black,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    //width: '100%'
  },
  tableHeader: {
    color: colors.black,
    backgroundColor: colors.lightLightGray,
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonDisabled: {
    ...buttonBase,
    backgroundColor: colors.lightGray
  },
  buttonText: {
    ...buttonTextBase,
    color: colors.white
  },
  buttonTextClear: {
    ...buttonTextBase,
    color: colors.indigo
  },
  errorText: {
    color: colors.red,
    marginTop: 5,
    marginBottom: 15
  },
  messageText: {
    color: colors.green,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 15
  },
  pickerContainer: {
    border: "1px solid lightgrey",
    borderRadius: 5,
    marginBottom: 20,
    padding: 10
  },
  checkBoxLabel: {
    paddingLeft: 15
  },
  map: {
    width: "100%",
    height: 300,
    marginTop: 15,
    marginBottom: 15
  },
  markerIcon: {
    height: 40
  },
  listMenuItem: {
    padding: 20
  },
  listLink: {
    textDecoration: "none"
  },
  enclosure: {
    backgroundColor: colors.lime,
    padding: 10,
    marginBottom: 10
    //boxShadow: `3px 3px ${colors.gray}`
  },
  addDeviceToEnclosure: {
    backgroundColor: colors.paleYellow,
    flex: 1,
    marginBottom: 5,
    padding: 5,
    marginRight: 10,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: colors.gray,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    pointer: "cursor"
  },
  removeEnclosure: {
    backgroundColor: colors.lime,
    flex: 1,
    padding: 5,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  addDeviceToSite: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.paleYellow,
    padding: 5,
    flex: 1,
    marginBottom: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.black,
    borderStyle: "dashed"
  },
  addEnclosure: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.lime,
    padding: 5,
    flex: 1,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.black,
    borderStyle: "dashed"
  }
};

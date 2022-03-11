import { StyleSheet } from "react-native";

export default StyleSheet.create({

    profile_image: {
        width: 100, 
        height: 100,
        display: "flex",
        justifyContent: "flex-start",
        borderRadius: 100,
        margin: "5px"
    },
    profile_text: {
        display: "flex",
        justifyContent: "center",
        marginLeft: "10px"
    },
    profile_view: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10
    },
    post_view: {
        display: "flex",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
    },
    post_likeview: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    post_buttonview: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    post_button: {
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5
    },
    inner_post: {
        padding: 5
    },
    editpost_view: {
        display: "flex",
        paddingTop: 10
    },
    editpost_button: {
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width:50,
        alignSelf: "center"
    },
    editpost_text: {
        paddingLeft: 5
    },
    createpost_view: {
        display: "flex",
        paddingTop: 10
    },
    createpost_button: {
        borderRadius: 15,
        backgroundColor: "lightblue",
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        width: 125
    },
    createpost_buttontext: {
        alignSelf: "center"
    },
    createpost_buttonview: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    createpost_text: {
        paddingLeft: 10
    },
    draft_view: {
        display: "flex",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
    },
    draft_button: {
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 115
    },
    inner_draft: {
        padding: 5
    },
    managedraft_view: {
        display: "flex",
        paddingTop: 10
    },
    managedraft_text: {
        paddingLeft: 5
    },
    managedraft_buttonview: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    managedraft_button: {
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 105,
        marginLeft: 10,
        marginRight: 10
    },
});

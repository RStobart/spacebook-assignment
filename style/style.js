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
        display: "flex",
        alignItems: "center",
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
        display: "flex",
        alignItems: "center",
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
        display: "flex",
        alignItems: "center",
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
        display: "flex",
        alignItems: "center",
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
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 105,
        marginLeft: 10,
        marginRight: 10
    },
    managedraft_returnbutton: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 105,
        marginTop: 10,
        alignSelf: "center"
    },
    friend_view: {
        display: "flex",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
    },
    friend_image: {
        width: 100, 
        height: 100,
        display: "flex",
        justifyContent: "flex-start",
        borderRadius: 100,
        margin: "5px"
    },
    friend_text: {
        display: "flex",
        justifyContent: "center",
        marginLeft: "10px"
    },
    friend_profileview: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10
    },
    viewprofile_button: {
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-end",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        marginLeft: 100,
        width: 100
    },
    search_view: {
        display: "flex",
        paddingTop: 10
    },
    search_button: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 65,
        alignSelf: "center"
    },
    search_text: {
        paddingLeft: 5
    },
    searchresult_view: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
    },
    searchresult_text: {
        paddingLeft: 5
    },
    searchresult_button: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 100,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5 
    },
    friendreq_view: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
    },
    friendreq_text: {
        paddingLeft: 5,
        marginTop: 10
    },
    friendreq_buttonview: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
    },
    friendreq_button: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 60,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5 
    },
    friendreq_defaultview: {
        display: "flex",
        alignItems: "center"
    },
    editprofile_view: {
        display: "flex",
        alignItems: "center",
    },
    editprofile_button: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 125,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5 
    },
    editemail_view: {
        display: "flex",
        paddingTop: 10
    },
    editemail_button: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 110,
        alignSelf: "center",
        marginBottom: 10
    },
    editemail_text: {
        paddingLeft: 5
    },
    editname_view: {
        display: "flex",
        paddingTop: 10
    },
    editname_button: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 110,
        alignSelf: "center",
        marginBottom: 10
    },
    editname_text: {
        paddingLeft: 5
    },
    editpassword_view: {
        display: "flex",
        paddingTop: 10
    },
    editpassword_button: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 150,
        alignSelf: "center",
        marginBottom: 10
    },
    editpassword_text: {
        paddingLeft: 5
    },
    editphoto_view: {
        display: "flex",
        paddingTop: 10
    },
    editphoto_button: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 225,
        alignSelf: "center",
        marginTop: 10
    },
    logout_view: {
        display: "flex",
        paddingTop: 10
    },
    logout_button: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 225,
        alignSelf: "center",
        marginTop: 10
    },
    login_view: {
        display: "flex",
        paddingTop: 10
    },
    login_buttonview: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
    },
    login_button: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 150,
        alignSelf: "center",
        marginLeft: 10,
        marginRight: 10
    },
    login_text: {
        paddingLeft: 5
    },
    signup_view: {
        display: "flex",
        paddingTop: 10
    },
    signup_button: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 225,
        alignSelf: "center",
        marginTop: 10
    },
    signup_text: {
        paddingLeft: 5
    },
    friendprofile_returnbutton: {
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightblue",
        padding: 5,
        width: 105,
        marginTop: 10,
        marginLeft: 100
    },
    headerStyle: {
        backgroundColor: "lightblue"
    }
});

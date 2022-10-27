const { doc } = require("prettier");
const { fetchRequest } = require("../api");
const { ENDPOINT } = require("../common");

const loadUserProfile = async () => {
    const defaultImage = document.querySelector("#default-image");
    const profileButton = document.querySelector("#user-profile-btn");
    const displayNameElement = document.querySelector("#display-name");

    const userInfo = await fetchRequest(ENDPOINT.userInfo);

}
document.addEventListener("DOMContentLoaded", () =>{
    loadUserProfile();
})
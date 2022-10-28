//const { doc } = require("prettier");
//const { fetchRequest } = require("../api");
//const { ENDPOINT } = require("../common");

import { doc } from "prettier";
import { fetchRequest } from "../api";
import { ENDPOINT, logout } from "../common";

const onProfileClick = (event) =>{
    event.stopPropagation();
    const profileMenu = document.querySelector("#profile-menu");
    profileMenu.classList.toggle("hidden");
    if(!profileMenu.classList.contains("hidden")){
        profileMenu.querySelector("li#logout").addEventListener("click", logout);
    }
    
}

const loadUserProfile = async () => {
    const defaultImage = document.querySelector("#default-image");
    const porfileButton = document.querySelector("#user-profile-btn");
    const displayNameElement = document.querySelector("#display-name");

    const { display_name: displayName, images} = await fetchRequest(ENDPOINT.userInfo);
    
    if(images?.length){
        defaultImage.classList.add("hidden");
    }else{
        defaultImage.classList.remove("hidden");
        
    }

    porfileButton.addEventListener("click", onProfileClick)

    displayNameElement.textContent = displayName;
    console.log(images);
}



document.addEventListener("DOMContentLoaded", () =>{
    loadUserProfile();

    document.addEventListener("click", ()=> {
        const profileMenu = document.querySelector("#profile-menu");
        if(!profileMenu.classList.contains("hidden")){
            profileMenu.classList.add("hidden");
        }
    })

})
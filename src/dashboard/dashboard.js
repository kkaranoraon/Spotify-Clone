//const { doc } = require("prettier");
//const { fetchRequest } = require("../api");
//const { ENDPOINT } = require("../common");

import { doc } from "prettier";
import { fetchRequest } from "../api";
import { ENDPOINT, logout } from "../common";

const onProfileClick = (event) => {
  event.stopPropagation();
  const profileMenu = document.querySelector("#profile-menu");
  profileMenu.classList.toggle("hidden");
  if (!profileMenu.classList.contains("hidden")) {
    profileMenu.querySelector("li#logout").addEventListener("click", logout);
  }
};

const loadUserProfile = async () => {
  const defaultImage = document.querySelector("#default-image");
  const porfileButton = document.querySelector("#user-profile-btn");
  const displayNameElement = document.querySelector("#display-name");

  const { display_name: displayName, images } = await fetchRequest(
    ENDPOINT.userInfo
  );

  if (images?.length) {
    defaultImage.classList.add("hidden");
  } else {
    defaultImage.classList.remove("hidden");
  }

  porfileButton.addEventListener("click", onProfileClick);

  displayNameElement.textContent = displayName;
  console.log(images);
};

const onPlaylistItemClicked = (event)=>{
    console.log(event.target);
}

const loadFeaturedPlaylist = async () => {
  const { playlists:{ items } } = await fetchRequest(ENDPOINT.featuredPlaylist);
  //console.log(featuredPlaylist);
  const playlistItemsSection = document.querySelector("#featured-playlist-items");
    
  //let playlistItems = ``;

  for (let { name, description, images, id } of items) {

    const playlistItem = document.createElement("section");
    playlistItem.className = "rounded p-4 border-solid border-2 hover:cursor-pointer";
    playlistItem.id = id;
    console.log(id);
    playlistItem.setAttribute("data-type","playlist");
    playlistItem.addEventListener("click", onPlaylistItemClicked );

    const [{url:imageURL}] = images;
    //playlistItems 
    playlistItem.innerHTML = 
                `<img src="${imageURL}" alt="${name}" class="rounded mb-2 object-contain shadow-md">
                <h2 class="text-sm">${name}</h2>
                <h3 class="text-xs">${description}</h3>`
    playlistItemsSection.appendChild(playlistItem);
  }
  //playlistItemsSection.innerHTML = playlistItems;
  
};

document.addEventListener("DOMContentLoaded", () => {
  loadUserProfile();
  loadFeaturedPlaylist();

  document.addEventListener("click", () => {
    const profileMenu = document.querySelector("#profile-menu");
    if (!profileMenu.classList.contains("hidden")) {
      profileMenu.classList.add("hidden");
    }
  });
});

window.showHueConnectionFailedAlert = () => {
  alert("Failed to retrieve lights from Philips Hue Bridge.");
};

window.showHueConnectionEmptyUsernameIpAlert = () => {
  alert(
    "You must enter a username and ip address to connect to the Philips Hue Bridge."
  );
};

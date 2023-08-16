const buildPowerZonesTable = (ftp) => {
  const tableBody = document.querySelector("#ftp_table_body");
  const rows = tableBody.children;

  window.POWER_ZONES(ftp).forEach(({ low, high }, i) => {
    const range = rows.item(i).children.item(1);
    range.textContent = Math.floor(low) + " - " + Math.floor(high);
  });
};

const renderLights = (lights) => {
  const ids = window.getSelectedLightIds();
  const root = document.querySelector("#lights");

  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  for (id of Object.keys(lights)) {
    const light = lights[id];
    const ele = document.createElement("div");
    ele.style.margin = "5px 0";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = id;
    checkbox.id = id;
    checkbox.setAttribute("disabled", true);
    const label = document.createElement("label");
    label.className = "checkbox-label";
    const span = document.createElement("span");
    span.textContent = light.name;
    span.style.marginLeft = "10px";
    label.appendChild(checkbox);
    label.appendChild(span);

    if (ids.includes(id)) {
      checkbox.checked = true;
    }

    checkbox.onclick = () => {
      if (checkbox.checked) {
        window.addLightId(checkbox.id);
      } else {
        window.removeLightId(checkbox.id);
      }
    };

    ele.appendChild(label);
    root.appendChild(ele);

    document.querySelector("#hue_edit").click();
  }
};

const fetchLights = ({ ip, username }) => {
  return fetch(`/api/lights?ip=${encodeURIComponent(ip)}&username=${encodeURIComponent(username)}`).then((res) => res.json());
}

const retrieveLights = async ({ ip, username }) => {
  document.querySelector("#hue_connect").setAttribute("disabled", true);
  const { success, data } = await fetchLights({ ip, username });
  document.querySelector("#hue_connect").removeAttribute("disabled");

  if (success) return renderLights(data);

  window.showHueConnectionFailedAlert();

  const lightsContainer = document.querySelector("#lights");

  while (lightsContainer.firstChild) {
    lightsContainer.removeChild(lightsContainer.firstChild);
  }
};

const init = async () => {
  const ip = localStorage.getItem("ip");
  const username = localStorage.getItem("username");
  const ftp = getFtp();
  const ipInput = document.querySelector("#ip");
  const ipValue = document.querySelector("#ip_value");
  const usernameInput = document.querySelector("#username");
  const usernameValue = document.querySelector("#username_value");

  if (ip) {
    ipInput.value = ip;
    ipValue.textContent = ip;
  }

  if (username) {
    usernameInput.value = username;
    usernameValue.textContent = username;
  }

  if (ftp) {
    document.querySelector("#ftp").value = ftp;
    document.querySelector("#ftp_value").textContent = ftp;
    buildPowerZonesTable(ftp);
  } else {
    const defaultFTP = 175;
    document.querySelector("#ftp").value = defaultFTP;
    document.querySelector("#ftp_value").textContent = defaultFTP;
    buildPowerZonesTable(defaultFTP);
    window.setFtp(defaultFTP);
  }

  if (ip && username) {
    retrieveLights({ ip, username });
  }
};

document.querySelector("#hue_connect").addEventListener("click", async () => {
  const ip = document.querySelector("#ip").value;
  const username = document.querySelector("#username").value;

  if (!ip || !username) {
    return window.showHueConnectionEmptyUsernameIpAlert();
  }

  retrieveLights({ ip, username });
});

document.querySelector("#edit").addEventListener("click", (e) => {
  const input = document.querySelector("#ftp");
  const value = document.querySelector("#ftp_value");
  if (e.target.textContent.includes("Edit")) {
    e.target.textContent = "Save";
    input.style.display = "block";
    value.style.display = "none";
  } else {
    e.target.textContent = "Edit";
    input.style.display = "none";
    value.style.display = "inline";
    window.setFtp(input.value);
    value.textContent = input.value || "-";
  }
});

document.querySelector("#hue_edit").addEventListener("click", (e) => {
  const ipInput = document.querySelector("#ip");
  const ipValue = document.querySelector("#ip_value");
  const usernameInput = document.querySelector("#username");
  const usernameValue = document.querySelector("#username_value");
  if (e.target.textContent.includes("Edit")) {
    document.querySelector("#hue_connect").setAttribute("disabled", true);
    e.target.textContent = "Save";
    ipInput.style.display = "block";
    ipValue.style.display = "none";
    usernameInput.style.display = "block";
    usernameValue.style.display = "none";
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((item) => {
      item.removeAttribute("disabled");
    });
  } else {
    document.querySelector("#hue_connect").removeAttribute("disabled");
    e.target.textContent = "Edit";
    ipInput.style.display = "none";
    ipValue.style.display = "inline";
    usernameInput.style.display = "none";
    usernameValue.style.display = "inline";

    usernameValue.textContent = usernameInput.value || "-";
    ipValue.textContent = ipInput.value || "-";

    localStorage.setItem("username", usernameInput.value);
    localStorage.setItem("ip", ipInput.value);

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((item) => {
      item.setAttribute("disabled", true);
    });
  }
});

init();

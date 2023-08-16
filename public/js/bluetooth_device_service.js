const getPowerZone = (ftp, power) => {
  return window.POWER_ZONES(ftp).find(({ low, high }) => {
    return power >= low && power <= high;
  });
};

document.querySelector("#connect").addEventListener("click", async () => {
  const device = await navigator.bluetooth.requestDevice({
    filters: [
      {
        services: [0x1818],
      },
    ],
  });

  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(0x1818);
  const characteristic = await service.getCharacteristic(0x2a63);
  let previousPower = 0;

  characteristic.addEventListener("characteristicvaluechanged", async (event) => {
    const value = event.target.value;
    const powerValue = value.getUint8(1);

    const ftp = window.getFtp();
    const { title: previousZoneName } = getPowerZone(ftp, previousPower);
    const { title: currentZoneName, hue } = getPowerZone(ftp, powerValue);
    const ip = localStorage.getItem("ip");
    const username = localStorage.getItem("username");

    if (previousZoneName !== currentZoneName && ip && username) {
      await fetch("/api/lights", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
          ids: window.getSelectedLightIds() || [],
          hue,
          ip,
          username,
        }),
      });
    }

    previousPower = powerValue;
    document.querySelector("#power").textContent = powerValue;
  });

  await characteristic.startNotifications();
  document.querySelector("#connection_status").textContent = "Connected";
});

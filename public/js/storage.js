window.getSelectedLightIds = () => {
    const ids = localStorage.getItem("light_ids");
  
    if (ids) {
      return JSON.parse(ids);
    }
  
    return [];
  };
  
  window.setSelectedLightIds = (ids) => {
    localStorage.setItem("light_ids", JSON.stringify(ids));
  };
  
  window.getFtp = () => {
    return Number(localStorage.getItem("ftp"));
  };
  
  window.setFtp = (ftp) => {
    localStorage.setItem("ftp", ftp);
  
    buildPowerZonesTable(ftp);
  };
  
  window.addLightId = (id) => {
    const ids = getSelectedLightIds();
    ids.push(id);
    setSelectedLightIds(ids);
  };
  
  window.removeLightId = (id) => {
    setSelectedLightIds(
      getSelectedLightIds().filter((selectedId) => selectedId !== id)
    );
  };
  
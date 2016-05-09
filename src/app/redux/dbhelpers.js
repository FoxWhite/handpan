const getPresetById = (db, presetId) => 
  db.presets.filter(function( preset ) {
      return preset.id === presetId;
    })[0]

const getPresetByName = (db, presetName) => 
  db.presets.filter(function( preset ) {
      return preset.name === presetName;
    })[0]

const getSoundByName = (db, soundName) => {
  return db.sounds.filter(function( sound ) {
      return sound.name === soundName;
    })[0]
}

module.exports = {
  getPresetById,
  getPresetByName,
  getSoundByName
}
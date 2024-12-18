export default defineI18nLocale(async (locale) => {
    return {
      title: {
        lang : "Français",
        current: "Météo Instantanée",
        daily: "Prochains Jours",
        hourly: "Prochaines Heures",
        favorites: "Vos Localisations Favorites",
        addLocation: "Ajouter une Localisation"
      },
      label: {
        addLocation: "Nom de la Localisation"
      },
      button: {
        addCurrentLocation: "Ajouter la position actelle"
      }
    }
  })
/* ==== CSE WAHLMODULE DATA ==== */
/* Zentrale Wahlmodule-Daten für das Wahlmodul-System */

// Diese Datei wird automatisch aus den bestehenden Vertiefung- und Wahlfächer-Daten erstellt
window.CSEModuleData = {
  // Vertiefungsgebiete (werden aus vertiefung-data.js geladen)
  vertiefungsgebiete: {},
  
  // Wahlfächer (werden aus wahlfacher-data.js geladen)  
  wahlfaecherBereiche: {},
  
  // Initialisierungsfunktion
  init: function() {
    this.loadVertiefungsgebiete();
    this.loadWahlfaecher();
    return this;
  },
  
  // Lade Vertiefungsgebiete
  loadVertiefungsgebiete: function() {
    if (window.CSE_VertiefungsgebieteModules && window.getVertiefungsgebieteKategorien) {
      const kategorien = window.getVertiefungsgebieteKategorien();
      
      kategorien.forEach(kategorie => {
        const module = window.getVertiefungsgebieteByKategorie(kategorie);
        this.vertiefungsgebiete[kategorie] = module.map(modul => ({
          name: modul.name,
          kp: modul.kp,
          kategorie: "vertiefung",
          themenbereich: modul.themenbereich || "sonstiges",
          kategorie_vertiefung: kategorie,
          jahr: 3,
          semester: 0,
          bereich: "Vertiefungsgebiet"
        }));
      });
      
      console.log('✓ Vertiefungsgebiete für Wahlmodul-System geladen:', Object.keys(this.vertiefungsgebiete));
    }
  },
  
  // Lade Wahlfächer  
  loadWahlfaecher: function() {
    if (window.CSE_WahlfaecherModules) {
      // Gruppiere nach Semester
      const semesters = ["Frühlingssemester 2025", "Herbstsemester 2024"];
      
      semesters.forEach(semester => {
        const module = window.getWahlfaecherBySemester ? window.getWahlfaecherBySemester(semester) : [];
        
        this.wahlfaecherBereiche[semester] = module.map(modul => ({
          name: modul.name,
          kp: modul.kp,
          kategorie: "wahl",
          themenbereich: modul.themenbereich || "sonstiges",
          semester_angebot: semester,
          jahr: 3,
          semester: 0,
          bereich: "Wahlfächer"
        }));
      });
      
      console.log('✓ Wahlfächer für Wahlmodul-System geladen:', Object.keys(this.wahlfaecherBereiche));
    }
  },
  
  // Kombinierte Daten für das zentrale System
  getAllWahlmoduleData: function() {
    return {
      vertiefungsgebiete: this.vertiefungsgebiete,
      wahlfaecherBereiche: this.wahlfaecherBereiche
    };
  },
  
  // Alle Module einer Kategorie
  getModulesForCategory: function(categoryKey) {
    if (categoryKey === 'vertiefungsgebiete') {
      return this.vertiefungsgebiete;
    } else if (categoryKey === 'wahlfaecher') {
      return this.wahlfaecherBereiche;
    }
    return {};
  },
  
  // Statistiken
  getStats: function() {
    const vertiefungCount = Object.values(this.vertiefungsgebiete).reduce((sum, modules) => sum + modules.length, 0);
    const wahlCount = Object.values(this.wahlfaecherBereiche).reduce((sum, modules) => sum + modules.length, 0);
    
    return {
      vertiefungsgebiete: {
        kategorien: Object.keys(this.vertiefungsgebiete).length,
        module: vertiefungCount
      },
      wahlfaecher: {
        semester: Object.keys(this.wahlfaecherBereiche).length,
        module: wahlCount
      },
      total: vertiefungCount + wahlCount
    };
  }
};

// Auto-Initialisierung wenn alle Dependencies geladen sind
if (typeof window !== 'undefined') {
  // Warte auf das Laden der Dependencies
  const initWhenReady = () => {
    if (window.CSE_VertiefungsgebieteModules && window.CSE_WahlfaecherModules) {
      window.CSEModuleData.init();
      console.log('📊 CSE Wahlmodule-System Statistiken:', window.CSEModuleData.getStats());
    } else {
      // Retry nach kurzer Zeit
      setTimeout(initWhenReady, 100);
    }
  };
  
  // Starte Initialisierung nach kurzem Delay
  setTimeout(initWhenReady, 50);
}
// Alle FH-Studiengänge (Fachhochschulen) in der Deutsch-Schweiz
// Datenquellen: BFH, FH Graubünden, FHNW, HSLU, OST, ZHAW, ZHdK

(function (global) {
  const AlleFHStudiengaenge = {
    fachhochschulen: [
      // #region Berner Fachhochschule
      {
        name: "Berner Fachhochschule",
        website: "https://www.bfh.ch/de/studium/alle-studiengaenge/",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Digital Business & AI", grad: "Bachelor of Science" },
              { name: "Betriebsökonomie", grad: "Bachelor of Science" },
              { name: "Food Science & Management", grad: "Bachelor of Science" },
              { name: "International Business Administration", grad: "Bachelor of Science" },
              { name: "Wirtschaftsingenieurwesen", grad: "Bachelor of Science" }
            ]
          },
          {
            name: "5. Medizin",
            studiengaenge: [
              { name: "Ernährung und Diätetik", grad: "Bachelor of Science" },
              { name: "Hebamme", grad: "Bachelor of Science" },
              { name: "Hebamme für dipl. Pflegefachpersonen", grad: "Bachelor of Science" },
              { name: "Pflege", grad: "Bachelor of Science" },
              { name: "Pflege für FaGe und FaBe", grad: "Bachelor of Science" },
              { name: "Physiotherapie", grad: "Bachelor of Science" }
            ]
          },
          {
            name: "2. Naturwissenschaften",
            studiengaenge: [
              { name: "Agronomie", grad: "Bachelor of Science" },
              { name: "Waldwissenschaften", grad: "Bachelor of Science" },
              { name: "Umwelt- und Ressourcenmanagement", grad: "Bachelor of Science" }
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Data Engineering", grad: "Bachelor of Science" },
                  { name: "Informatik", grad: "Bachelor of Science" },
                  { name: "Medizininformatik", grad: "Bachelor of Science" },
                  { name: "Multimedia Production", grad: "Bachelor of Science" }
                ]
              },
              {
                name: "Bauingenieurwesen",
                studiengaenge: [
                  { name: "Architektur", grad: "Bachelor of Arts" },
                  { name: "Bauingenieurwesen", grad: "Bachelor of Science" },
                  { name: "Landschaftsarchitektur", grad: "Bachelor of Arts" }
                ]
              }
            ],
            studiengaenge: [
              { name: "Automobil- und Fahrzeugtechnik", grad: "Bachelor of Science" },
              { name: "Elektrotechnik und Informationstechnologie", grad: "Bachelor of Science" },
              { name: "Maschinentechnik", grad: "Bachelor of Science" },
              { name: "Mechatronik und Systemtechnik", grad: "Bachelor of Science" }
            ]
          },
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Kunstwissenschaften",
                studiengaenge: [
                  { name: "Fine Arts", grad: "Bachelor of Arts" },
                  { name: "Musik Klassik", grad: "Bachelor of Arts" },
                  { name: "Jazz and Contemporary Music", grad: "Bachelor of Arts" },
                  { name: "Musik und Bewegung", grad: "Bachelor of Arts" },
                  { name: "Sound Arts", grad: "Bachelor of Arts" },
                  { name: "Theater/Schauspiel", grad: "Bachelor of Arts" },
                  { name: "Transformation Design", grad: "Bachelor of Arts" },
                  { name: "Visuelle Kommunikation", grad: "Bachelor of Arts" },
                  { name: "Konservierung", grad: "Bachelor of Arts" },
                  { name: "Vermittlung in Kunst und Design", grad: "Bachelor of Arts" },
                  { name: "Literarisches Schreiben", grad: "Bachelor" }
                ]
              }
            ]
          },
          {
            name: "7. Sportwissenschaften",
            studiengaenge: [
              { name: "Sport", grad: "Bachelor of Science" }
            ]
          }
        ]
      },
      // #endregion
      // #region FH Graubünden
      {
        name: "FH Graubünden",
        website: "https://www.fhgr.ch/studium/bachelorangebot/",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Betriebsökonomie", grad: "Bachelor" },
              { name: "Digital Business Management", grad: "Bachelor" },
              { name: "Digital Supply Chain Management", grad: "Bachelor" },
              { name: "Information Science", grad: "Bachelor" },
              { name: "Sport Management", grad: "Bachelor" },
              { name: "Tourismus", grad: "Bachelor" }
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Artificial Intelligence in Software Engineering", grad: "Bachelor" },
                  { name: "Computational and Data Science", grad: "Bachelor" },
                  { name: "Multimedia Production", grad: "Bachelor" }
                ]
              },
              {
                name: "Bauingenieurwesen",
                studiengaenge: [
                  { name: "Architektur", grad: "Bachelor" },
                  { name: "Bauingenieurwesen", grad: "Bachelor" }
                ]
              }
            ],
            studiengaenge: [
              { name: "MedTech", grad: "Bachelor" },
              { name: "Mobile Robotics", grad: "Bachelor" },
              { name: "Optoelectronics", grad: "Bachelor" }
            ]
          }
        ]
      },
      // #endregion
      // #region Fachhochschule Nordwestschweiz
      {
        name: "Fachhochschule Nordwestschweiz",
        website: "https://www.fhnw.ch/de/studium/bachelor",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "International Business Management (trinational)", grad: "Bachelor of Science" },
              { name: "Business Administration (International Management)", grad: "Bachelor of Science" },
              { name: "Betriebsökonomie", grad: "Bachelor of Science" },
              { name: "Wirtschaftsinformatik", grad: "Bachelor of Science" },
              { name: "Business Information Technology", grad: "Bachelor of Science" },
              { name: "Wirtschaftsrecht", grad: "Bachelor of Science" },
              { name: "Business Artificial Intelligence", grad: "Bachelor of Science" },
              { name: "Arbeits-, Organisations- und Personalpsychologie", grad: "Bachelor of Science" },
              { name: "Wirtschaftspsychologie", grad: "Bachelor of Science" },
              { name: "Wirtschaftsingenieurwesen", grad: "Bachelor of Science" }
            ]
          },
          {
            name: "2. Naturwissenschaften",
            studiengaenge: [
              { name: "Life Sciences", grad: "Bachelor" }
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Artificial Intelligence & High Performance Computing", grad: "Bachelor of Science" },
                  { name: "Data Science & Artificial Intelligence", grad: "Bachelor of Science" },
                  { name: "Game Technologies & Extended Reality", grad: "Bachelor of Science" },
                  { name: "iCompetence", grad: "Bachelor of Science" },
                  { name: "Informatik", grad: "Bachelor of Science" },
                  { name: "Security, Platforms & DevOps", grad: "Bachelor of Science" },
                  { name: "Software Engineering & Intelligent Technologies", grad: "Bachelor of Science" }
                ]
              },
              {
                name: "Bauingenieurwesen",
                studiengaenge: [
                  { name: "Architektur", grad: "Bachelor of Arts" },
                  { name: "Bauingenieurwesen", grad: "Bachelor of Science" },
                  { name: "Bauingenieurwesen Trinational", grad: "Bachelor of Science" },
                  { name: "Geomatik", grad: "Bachelor of Science" }
                ]
              }
            ],
            studiengaenge: [
              { name: "Elektro- und Informationstechnik", grad: "Bachelor of Science" },
              { name: "Energie- und Umwelttechnik", grad: "Bachelor of Science" },
              { name: "Maschinenbau", grad: "Bachelor of Science" },
              { name: "Materials Engineering", grad: "Bachelor of Science" },
              { name: "Mechatronik Trinational", grad: "Bachelor of Science" },
              { name: "Optometrie", grad: "Bachelor of Science" },
              { name: "Systemtechnik", grad: "Bachelor of Science" }
            ]
          },
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Kunstwissenschaften",
                studiengaenge: [
                  { name: "Bildende Kunst", grad: "Bachelor of Arts" },
                  { name: "Industrial Design", grad: "Bachelor of Arts" },
                  { name: "Innenarchitektur und Szenografie", grad: "Bachelor of Arts" },
                  { name: "Mode-Design", grad: "Bachelor of Arts" },
                  { name: "Prozessgestaltung am HyperWerk", grad: "Bachelor of Arts" },
                  { name: "Vermittlung in Kunst und Design", grad: "Bachelor of Arts" },
                  { name: "Visuelle Kommunikation und digitale Räume", grad: "Bachelor of Arts" },
                  { name: "Musik und Bewegung", grad: "Bachelor of Arts" },
                  { name: "Musik", grad: "Bachelor of Arts" }
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Soziale Arbeit", grad: "Bachelor of Arts" }
                ]
              },
              {
                name: "Bildungswissenschaften",
                studiengaenge: [
                  { name: "Kindergarten-/Unterstufe", grad: "Bachelor of Arts" },
                  { name: "Primarstufe", grad: "Bachelor of Arts" },
                  { name: "Sekundarstufe I", grad: "Bachelor/Master of Arts" },
                  { name: "Logopädie", grad: "Bachelor of Arts" }
                ]
              }
            ]
          }
        ]
      },
      // #endregion
      // #region Ostschweizer Fachhochschule
      {
        name: "Ostschweizer Fachhochschule",
        website: "https://www.ost.ch/de/studium/bachelor",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Betriebsökonomie", grad: "BSc" },
              { name: "Management und Recht", grad: "BSc" },
              { name: "Wirtschaftsinformatik", grad: "BSc" },
              { name: "Wirtschaftsingenieurwesen", grad: "Bachelor" },
            ]
          },
          {
            name: "5. Medizin",
            studiengaenge: [
              { name: "Ergotherapie", grad: "BSc" },
              { name: "Pflege", grad: "BSc" },
              { name: "Physiotherapie", grad: "BSc" }
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Artificial Intelligence", grad: "Bachelor" },
                  { name: "Digital Design", grad: "BSc" },
                  { name: "Informatik", grad: "BSc" }
                ]
              },
              {
                name: "Bauingenieurwesen",
                studiengaenge: [
                  { name: "Architektur", grad: "BA" },
                  { name: "Bauingenieurwesen", grad: "BSc" },
                  { name: "Landschaftsarchitektur", grad: "BSc" },
                  { name: "Stadt-, Verkehrs- und Raumplanung", grad: "BSc" }
                ]
              }
            ],
            studiengaenge: [
              { name: "Electrical and Computer Engineering", grad: "Bachelor" },
              { name: "Erneuerbare Energien und Umwelttechnik", grad: "Bachelor" },
              { name: "Maschinentechnik", grad: "Bachelor" },
              { name: "Mechatronik", grad: "Bachelor" }
            ]
          },
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Soziale Arbeit", grad: "BSc" }
                ]
              }
            ]
          }
        ]
      },
      // #endregion
      // #region ZHAW
      {
        name: "ZHAW",
        website: "https://www.zhaw.ch/de/studium/bachelorstudiengaenge",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Angewandtes Recht", grad: "BA" },
              { name: "Betriebsökonomie", grad: "BSc" },
              { name: "International Management", grad: "BSc" },
              { name: "Wirtschaftsinformatik", grad: "BSc" },
              { name: "Wirtschaftsingenieurwesen", grad: "BSc" },
              { name: "Wirtschaftsrecht", grad: "BSc" },
              { name: "Facility Management", grad: "BSc" }
            ]
          },
          {
            name: "5. Medizin",
            studiengaenge: [
              { name: "Ergotherapie", grad: "BSc" },
              { name: "Gesundheitsförderung und Prävention", grad: "BSc" },
              { name: "Hebamme", grad: "BSc" },
              { name: "Pflege", grad: "BSc" },
              { name: "Pflege für diplomierte Pflegende", grad: "BSc" },
              { name: "Physiotherapie", grad: "BSc" }
            ]
          },
          {
            name: "2. Naturwissenschaften",
            studiengaenge: [
              { name: "Applied Digital Life Sciences", grad: "BSc" },
              { name: "Biomedizinische Labordiagnostik", grad: "BSc" },
              { name: "Biotechnologie", grad: "BSc" },
              { name: "Chemie", grad: "BSc" },
              { name: "Food Science", grad: "BSc" }            
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Data Science", grad: "BSc" },
                  { name: "Informatik", grad: "BSc" },
                  { name: "Medizininformatik", grad: "BSc" }
                ]
              },
              {
                name: "Bauingenieurwesen",
                studiengaenge: [
                  { name: "Architektur", grad: "BSc" },
                  { name: "Bauingenieurwesen", grad: "BSc" },
                  { name: "Umweltingenieurwesen", grad: "BSc" }
                ]
              }
            ],
            studiengaenge: [
              { name: "Aviatik", grad: "BSc" },
              { name: "Elektrotechnik", grad: "BSc" },
              { name: "Energie- und Umwelttechnik", grad: "BSc" },
              { name: "Maschinentechnik", grad: "BSc" },
              { name: "Mobility Science", grad: "BSc" },
              { name: "Systemtechnik", grad: "BSc" }
            ]
          },
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Kunstwissenschaften",
                studiengaenge: [
                  { name: "Kommunikation und Medien", grad: "BA" },
                  { name: "Mehrsprachige Kommunikation", grad: "BA" }
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Soziale Arbeit", grad: "BA" },
                  { name: "Sprachliche Integration", grad: "BA" }
                ]
              }
            ]
          }
        ]
      },
      // #endregion
      // #region ZHdK
      {
        name: "ZHdK",
        website: "https://www.zhdk.ch/studium/alle-majors-und-minors?bachelorMaster=1&majorMinor=1",
        kategorien: [
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Kunstwissenschaften",
                studiengaenge: [
                  { name: "Art Education", grad: "BA" },
                  { name: "Contemporary Dance", grad: "BA" },
                  { name: "Film", grad: "BA" },
                  { name: "Theater", grad: "BA" },
                  { name: "Design", grad: "BA" },
                  { name: "Fine Arts", grad: "BA" },
                  { name: "Creative Music Practices", grad: "BA" },
                  { name: "Musik", grad: "BA" },
                  { name: "Musik und Bewegung", grad: "BA" }
                ]
              }
            ]
          }
        ]
      },
      // #endregion
      // #region HSLU
      {
        name: "HSLU",
        website: "https://www.hslu.ch/de-ch/hochschule-luzern/studium/#?filters=16",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Business Administration", grad: "Bachelor of Science" },
              { name: "Business IT & Digital Transformation", grad: "Bachelor" },
              { name: "Business Psychology", grad: "Bachelor of Science" },
              { name: "Economics and Data Science in Mobility", grad: "Bachelor of Science" },
              { name: "Hospitality Management", grad: "Bachelor of Science" },
              { name: "International Business Administration", grad: "Bachelor of Science" },
              { name: "International IT Management", grad: "Bachelor" },
              { name: "International Sustainable Tourism", grad: "Bachelor of Science" },
              { name: "Wirtschaftsinformatik", grad: "Bachelor" },
              { name: "Wirtschaftsingenieurwesen", grad: "Bachelor of Science" }
            ]
          },
          {
            name: "5. Medizin",
            studiengaenge: [
              { name: "Pflege", grad: "Bachelor of Science" }
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Artificial Intelligence & Machine Learning", grad: "Bachelor" },
                  { name: "Digital Engineer", grad: "Bachelor" },
                  { name: "Digital Ideation", grad: "Bachelor" },
                  { name: "Immersive Technologies", grad: "Bachelor" },
                  { name: "Informatik", grad: "Bachelor" },
                  { name: "Information & Cyber Security", grad: "Bachelor" }
                ]
              },
              {
                name: "Bauingenieurwesen",
                studiengaenge: [
                  { name: "Architektur", grad: "Bachelor of Arts" },
                  { name: "Bauingenieurwesen", grad: "Bachelor of Science" },
                  { name: "Digital Construction", grad: "Bachelor" }
                ]
              }
            ],
            studiengaenge: [
              { name: "Elektrotechnik und Informationstechnologie", grad: "Bachelor" },
              { name: "Energie- und Umwelttechnik", grad: "Bachelor of Science" },
              { name: "Gebäudetechnik", grad: "Bachelor of Science" },
              { name: "Maschinentechnik", grad: "Bachelor" },
              { name: "Medizintechnik", grad: "Bachelor of Science" }
            ]
          },
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Kunstwissenschaften",
                studiengaenge: [
                  { name: "Innenarchitektur", grad: "Bachelor of Arts" },
                  { name: "Music", grad: "Bachelor of Arts" },
                  { name: "Musik und Bewegung", grad: "Bachelor of Arts" }
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Soziale Arbeit", grad: "Bachelor" },
                  { name: "Soziale Arbeit neue Konzepte und Innovation", grad: "Bachelor" }
                ]
              }
            ]
          }
        ]
      }
      // #endregion
    ]
  };

  // Expose to global scope
  global.AlleFHStudiengaenge = AlleFHStudiengaenge;
})(window);

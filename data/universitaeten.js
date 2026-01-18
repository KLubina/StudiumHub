// Alle Uni-Studiengänge in der Deutsch-Schweiz
// Datenquelle: Alle Uni-Studiengänge in der Deutsch-Schweiz.md

(function (global) {
  const AlleSchweizerStudiengaenge = {
    universitaeten: [
      // #region Universität Basel
      {
        name: "Universität Basel",
        website: "https://www.unibas.ch/de/Studium/Vor-dem-Studium/Studienangebot.html",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Wirtschaftswissenschaften", ects: "180 KP/75 KP" }
            ]
          },
          {
            name: "5. Medizin",
            studiengaenge: [
              { name: "Humanmedizin", ects: "180 KP" },
              { name: "Zahnmedizin", ects: "180 KP" }
            ]
          },
          {
            name: "4. Rechtswissenschaften",
            studiengaenge: [
              { name: "Rechtswissenschaft", ects: "180 KP/75 KP" }
            ]
          },
          {
            name: "2. Naturwissenschaften",
            unterkategorien: [
              {
                name: "Geografie",
                studiengaenge: [
                  { name: "Geographie", ects: "75 KP", beschreibung: "ausserfakultäres Bachelorstudienfach 75 KP" },
                  { name: "Geowissenschaften", ects: "180 KP" }
                ]
              },
              {
                name: "Biologie",
                studiengaenge: [
                  { name: "Biologie", ects: "180 KP/75 KP" }
                ]
              },
              {
                name: "Chemie",
                studiengaenge: [
                  { name: "Chemie", ects: "180 KP/75 KP" },
                  { name: "Nanowissenschaften", ects: "180 KP" },
                  { name: "Pharmazeutische Wissenschaften", ects: "180 KP" }
                ]
              },
              {
                name: "Physik",
                studiengaenge: [
                  { name: "Physik", ects: "180 KP/75 KP" }
                ]
              },
              {
                name: "Mathematik",
                studiengaenge: [
                  { name: "Mathematik", ects: "180 KP/75 KP" }
                ]
              }
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Computational Sciences", ects: "180 KP" },
                  { name: "Informatik", ects: "180 KP/75 KP" }
                ]
              }
            ]
          },
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Sprachwissenschaften",
                studiengaenge: [
                  { name: "Deutsche Philologie", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Englisch", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Französistik", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Hispanistik", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Italianistik", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Nordistik", ects: "75 KP", beschreibung: "anderes Fach 75 KP" }
                ]
              },
              {
                name: "Geschichtswissenschaften",
                studiengaenge: [
                  { name: "Altertumswissenschaften", ects: "150 KP" },
                  { name: "Altertumswissenschaften", ects: "75 KP", beschreibung: "Studienfach 75 KP" },
                  { name: "Geschichte", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Prähistorische und Naturwissenschaftliche Archäologie", ects: "180 KP" }
                ]
              },
              {
                name: "Philosophie",
                studiengaenge: [
                  { name: "Philosophie", ects: "75 KP", beschreibung: "anderes Fach 75 KP" }
                ]
              },
              {
                name: "Kunstwissenschaften",
                studiengaenge: [
                  { name: "Kunstgeschichte", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Medienwissenschaft", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Musikwissenschaft", ects: "75 KP", beschreibung: "anderes Fach 75 KP" }
                ]
              },
              {
                name: "Regionalstudien",
                studiengaenge: [
                  { name: "Nahoststudien", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Osteuropäische Kulturen", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Osteuropa-Studien", ects: "180 KP" }
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Ethnologie", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Geschlechterforschung", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Kulturanthropologie", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Politikwissenschaft", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Soziologie", ects: "75 KP", beschreibung: "anderes Fach 75 KP" }
                ]
              },
              {
                name: "Psychologie",
                studiengaenge: [
                  { name: "Psychologie", ects: "180 KP" }
                ]
              },
              {
                name: "Theologie und Religionswissenschaften",
                studiengaenge: [
                  { name: "Theologie", ects: "180 KP/75 KP" },
                  { name: "Religionswissenschaft", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Jüdische Studien", ects: "75 KP", beschreibung: "anderes Fach 75 KP" }
                ]
              }
            ]
          },
          {
            name: "7. Sportwissenschaften",
            studiengaenge: [
              { name: "Sport, Bewegung & Gesundheit", ects: "180 KP/99 KP" }
            ]
          }
        ]
      },
      // #endregion
      // #region Universität Luzern
      {
        name: "Universität Luzern",
        website: "https://www.unilu.ch/fileadmin/universitaet/dienste/unikomm/dokumente/Studienbroschueren/Studienprogramme_Bachelor.pdf",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Wirtschaftswissenschaften", ects: "180/120/60 ECTS" },
              { name: "Gesundheitswissenschaften", ects: "180 ECTS" }
            ]
          },
          {
            name: "4. Rechtswissenschaften",
            studiengaenge: [
              { name: "Rechtswissenschaft", ects: "180/60 ECTS" }
            ]
          },
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Geschichtswissenschaften",
                studiengaenge: [
                  { name: "Geschichte", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Philosophie",
                studiengaenge: [
                  { name: "Philosophie", ects: "120/60 ECTS" },
                  { name: "Ethik", ects: "60 ECTS" }
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Ethnologie", ects: "120/60 ECTS" },
                  { name: "Gesellschafts- und Kommunikationswissenschaften", ects: "180 ECTS" },
                  { name: "Kulturwissenschaften", ects: "180 ECTS" },
                  { name: "Philosophy, Politics and Economics", ects: "180 ECTS" },
                  { name: "Politikwissenschaft", ects: "120/60 ECTS" },
                  { name: "Soziologie", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Psychologie",
                studiengaenge: [
                  { name: "Psychologie", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Theologie und Religionswissenschaften",
                studiengaenge: [
                  { name: "Theologie", ects: "180/120/60 ECTS" },
                  { name: "Religionspädagogik", ects: "180/60 ECTS" },
                  { name: "Judaistik", ects: "120/60 ECTS" }
                ]
              }
            ]
          }
        ]
      },
      // #endregion
      // #region Universität St. Gallen
      {
        name: "Universität St. Gallen",
        website: "https://www.unisg.ch/de/studium/programme/bachelor/",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Betriebswirtschaftslehre", ects: "180 ECTS" },
              { name: "Volkswirtschaftslehre", ects: "180 ECTS" }
            ]
          },
          {
            name: "4. Rechtswissenschaften",
            studiengaenge: [
              { name: "Rechtswissenschaft", ects: "180 ECTS" },
              { name: "Rechtswissenschaft mit Wirtschaftswissenschaften", ects: "180 ECTS" }
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Informatik", ects: "180 ECTS" }
                ]
              }
            ]
          },
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "International Affairs", ects: "180 ECTS" }
                ]
              }
            ]
          }
        ]
      },
      // #endregion
      // #region Universität Bern
      {
        name: "Universität Bern",
        website: "https://www.unibe.ch/unibe/portal/content/e1006/e251033/e265838/Bachelor-d_25-26_ger.pdf",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Betriebswirtschaftslehre", ects: "120/60/30/15 ECTS" },
              { name: "Volkswirtschaftslehre", ects: "120/60/30/15 ECTS" },
              { name: "Digitalization and Applied Data Science in Business, Economics and the Social Sciences", ects: "30 ECTS" },
              { name: "Wirtschaftsinformatik", ects: "30/15 ECTS" },
              { name: "Obligationenrecht und Wirtschaftsrecht", ects: "30 ECTS" }
            ]
          },
          {
            name: "5. Medizin",
            studiengaenge: [
              { name: "Humanmedizin", ects: "180 ECTS" },
              { name: "Veterinärmedizin", ects: "180 ECTS" },
              { name: "Zahnmedizin", ects: "180 ECTS" }
            ]
          },
          {
            name: "4. Rechtswissenschaften",
            studiengaenge: [
              { name: "Rechtswissenschaft", ects: "180 ECTS" }
            ]
          },
          {
            name: "2. Naturwissenschaften",
            unterkategorien: [
              {
                name: "Geografie",
                studiengaenge: [
                  { name: "Geographie", ects: "120 ECTS" },
                  { name: "Erdwissenschaften", ects: "180/120/60/30/15 ECTS" },
                  { name: "Nachhaltige Entwicklung", ects: "60/30/15 ECTS" }
                ]
              },
              {
                name: "Biologie",
                studiengaenge: [
                  { name: "Biologie", ects: "180 ECTS" },
                  { name: "Biochemie und Molekularbiologie", ects: "180/60/30/15 ECTS" }
                ]
              },
              {
                name: "Chemie",
                studiengaenge: [
                  { name: "Chemie und Molekulare Wissenschaften", ects: "180/60/30/15 ECTS" },
                  { name: "Pharmazeutische Wissenschaften", ects: "180 ECTS" }
                ]
              },
              {
                name: "Physik",
                studiengaenge: [
                  { name: "Physik", ects: "120 ECTS" }
                ]
              },
              {
                name: "Mathematik",
                studiengaenge: [
                  { name: "Mathematik", ects: "120/90/60/30/15 ECTS" }
                ]
              }
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Informatik", ects: "120 ECTS" }
                ]
              }
            ]
          },
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Sprachwissenschaften",
                studiengaenge: [
                  { name: "Basis Antike mit Schwerpunkt Griechisch", ects: "60/30 ECTS" },
                  { name: "Basis Antike mit Schwerpunkt Latein", ects: "60/30 ECTS" },
                  { name: "Deutsche Sprach- und Literaturwissenschaft", ects: "120/60/30 ECTS" },
                  { name: "English", ects: "120 ECTS" },
                  { name: "Französische Sprach- und Literaturwissenschaft", ects: "120/60/30 ECTS" },
                  { name: "Italienische Sprach- und Literaturwissenschaft", ects: "120/60/30 ECTS" },
                  { name: "Klassische Philologie", ects: "120 ECTS" },
                  { name: "Klassische Philologie mit Schwerpunkt Griechisch", ects: "60/30 ECTS" },
                  { name: "Klassische Philologie mit Schwerpunkt Latein", ects: "60/30 ECTS" },
                  { name: "Linguistik", ects: "120 ECTS" },
                  { name: "Slavistik", ects: "120 ECTS" },
                  { name: "Spanische Sprach- und Literaturwissenschaft", ects: "120/60/30 ECTS" }
                ]
              },
              {
                name: "Geschichtswissenschaften",
                studiengaenge: [
                  { name: "Archäologie", ects: "120 ECTS" },
                  { name: "Geschichte", ects: "180/120 ECTS" },
                  { name: "Kulturgeschichte und Archäologie des vorislamischen Palästina/Israel", ects: "60/30 ECTS" }
                ]
              },
              {
                name: "Philosophie",
                studiengaenge: [
                  { name: "Philosophie", ects: "120 ECTS" },
                  { name: "Philosophie des Geistes", ects: "60 ECTS" },
                  { name: "Wissenschaftsphilosophie", ects: "60 ECTS" }
                ]
              },
              {
                name: "Kunstwissenschaften",
                studiengaenge: [
                  { name: "Kunstgeschichte", ects: "120/60/30 ECTS" },
                  { name: "Musikwissenschaft", ects: "120/60/30 ECTS" },
                  { name: "Theaterwissenschaft", ects: "120/60/30 ECTS" }
                ]
              },
              {
                name: "Regionalstudien",
                studiengaenge: [
                  { name: "Chinesische Sprache und Gesellschaft", ects: "30 ECTS" },
                  { name: "Islamic and Middle Eastern Studies", ects: "120 ECTS" },
                  { name: "Osteuropa-Studien", ects: "120 ECTS" }
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Politik- und Verwaltungswissenschaft", ects: "120 ECTS" },
                  { name: "Sozialanthropologie", ects: "120/60/30 ECTS" },
                  { name: "Sozialwissenschaften", ects: "120/60/30/15 ECTS" },
                  { name: "Staatsrecht und Staatstheorie", ects: "30 ECTS" }
                ]
              },
              {
                name: "Bildungswissenschaften",
                studiengaenge: [
                  { name: "Erziehungswissenschaft", ects: "120/60/30 ECTS" }
                ]
              },
              {
                name: "Psychologie",
                studiengaenge: [
                  { name: "Psychologie", ects: "120 ECTS" }
                ]
              },
              {
                name: "Theologie und Religionswissenschaften",
                studiengaenge: [
                  { name: "Theologie", ects: "180 ECTS" },
                  { name: "Interreligiöse Studien", ects: "120 ECTS" },
                  { name: "Religionswissenschaft", ects: "120/60/30 ECTS" }
                ]
              }
            ]
          },
          {
            name: "7. Sportwissenschaften",
            studiengaenge: [
              { name: "Sportwissenschaft", ects: "120/60/30 ECTS" }
            ]
          }
        ]
      },
      // #endregion
      // #region Universität Freiburg
      {
        name: "Universität Freiburg",
        website: "https://studies.unifr.ch/de/studienangebot/courses/",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Betriebswirtschaftslehre", ects: "180/60 ECTS" },
              { name: "Volkswirtschaftslehre", ects: "180/60 ECTS" },
              { name: "Wirtschafts- und Rechtswissenschaftliche Studien", ects: "120 ECTS" },
              { name: "Wirtschaftsinformatik", ects: "180/60 ECTS" }
            ]
          },
          {
            name: "5. Medizin",
            studiengaenge: [
              { name: "Humanmedizin", ects: "180 ECTS" },
            ]
          },
          {
            name: "4. Rechtswissenschaften",
            studiengaenge: [
              { name: "Rechtswissenschaft", ects: "180/60 ECTS" },
              { name: "Rechtswissenschaft im Teilzeitstudium", ects: "180 ECTS" }
            ]
          },
          {
            name: "2. Naturwissenschaften",
            unterkategorien: [
              {
                name: "Geografie",
                studiengaenge: [
                  { name: "Geographie", ects: "120/60 ECTS" },
                  { name: "Erdwissenschaften", ects: "150/60 ECTS" },
                  { name: "Umweltwissenschaften und Umweltgeisteswissenschaften", ects: "60 ECTS" }
                ]
              },
              {
                name: "Biologie",
                studiengaenge: [
                  { name: "Biologie", ects: "120/60 ECTS" },
                  { name: "Biochemie", ects: "120/60 ECTS" },
                  { name: "Biomedizinische Wissenschaften", ects: "120 ECTS" }
                ]
              },
              {
                name: "Chemie",
                studiengaenge: [
                  { name: "Chemie", ects: "150/120/60 ECTS" }
                ]
              },
              {
                name: "Physik",
                studiengaenge: [
                  { name: "Physik", ects: "150/60 ECTS" }
                ]
              },
              {
                name: "Mathematik",
                studiengaenge: [
                  { name: "Mathematik", ects: "120/60 ECTS" }
                ]
              }
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Informatik", ects: "120/60 ECTS" }
                ]
              }
            ]
          },
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Sprachwissenschaften",
                studiengaenge: [
                  { name: "Deutsch als Fremdsprache", ects: "60 ECTS" },
                  { name: "Deutsch und Französisch: Zweisprachigkeit und Kulturkontakt", ects: "180 ECTS" },
                  { name: "Englische Sprache und Literatur", ects: "120/60 ECTS" },
                  { name: "Französisch", ects: "120/60 ECTS" },
                  { name: "Französisch als Fremdsprache", ects: "60 ECTS" },
                  { name: "Germanistik", ects: "120/60 ECTS" },
                  { name: "Germanistische Literaturwissenschaft", ects: "60 ECTS" },
                  { name: "Griechische Sprache und Kultur", ects: "60 ECTS" },
                  { name: "Italienisch", ects: "120/60 ECTS" },
                  { name: "Klassische Philologie", ects: "120 ECTS" },
                  { name: "Lateinische Sprache und Kultur", ects: "60 ECTS" },
                  { name: "Rätoromanisch", ects: "60 ECTS" },
                  { name: "Slavistik", ects: "120/60 ECTS" },
                  { name: "Spanisch", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Geschichtswissenschaften",
                studiengaenge: [
                  { name: "Geschichte", ects: "120/60 ECTS" },
                  { name: "Geschichte der Moderne", ects: "120 ECTS" },
                  { name: "Zeitgeschichte", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Philosophie",
                studiengaenge: [
                  { name: "Philosophie", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Kunstwissenschaften",
                studiengaenge: [
                  { name: "Kunstgeschichte", ects: "120/60 ECTS" },
                  { name: "Musikwissenschaft und Geschichte des Musiktheaters", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Regionalstudien",
                studiengaenge: [
                  { name: "Osteuropa-Studien", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Business Communication", ects: "60 ECTS" },
                  { name: "Kommunikationswissenschaft", ects: "90 ECTS" },
                  { name: "Kommunikationswissenschaft und Medienforschung", ects: "120/60 ECTS" },
                  { name: "Politik und Gesellschaft", ects: "60 ECTS" },
                  { name: "Sozialanthropologie", ects: "120/60 ECTS" },
                  { name: "Sozialarbeit und Sozialpolitik", ects: "120/60 ECTS" },
                  { name: "Sozialarbeit und Sozialpolitik (FR)", ects: "120/60 ECTS" },
                  { name: "Soziologie", ects: "120/60 ECTS" },
                  { name: "Soziologie (FR)", ects: "120 ECTS" }
                ]
              },
              {
                name: "Bildungswissenschaften",
                studiengaenge: [
                  { name: "Erziehungswissenschaften", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "pädagogische Berufe",
                studiengaenge: [
                  { name: "Ausbildung für den Unterricht auf der Primarstufe", ects: "180 ECTS" },
                  { name: "Ausbildung für den Unterricht auf der Sekundarstufe I", ects: "150 ECTS" },
                  { name: "Logopädie", ects: "180 ECTS" },
                  { name: "Pädagogik/Psychologie", ects: "120/60 ECTS" },
                  { name: "Sonderpädagogik", ects: "60 ECTS" },
                  { name: "Sonderpädagogik und Sozialpädagogik", ects: "180 ECTS" }
                ]
              },
              {
                name: "Psychologie",
                studiengaenge: [
                  { name: "Psychologie", ects: "180/60 ECTS" }
                ]
              },
              {
                name: "Theologie und Religionswissenschaften",
                studiengaenge: [
                  { name: "Theologie", ects: "180/60 ECTS" },
                  { name: "Theologische Studien", ects: "120 ECTS" },
                  { name: "Interreligiöse Studien", ects: "120/60 ECTS" },
                  { name: "Religionswissenschaft", ects: "120/60 ECTS" }
                ]
              }
            ]
          },
          {
            name: "7. Sportwissenschaften",
            studiengaenge: [
              { name: "Sport- und Bewegungswissenschaften", ects: "180/120/60 ECTS" }
            ]
          }
        ]
      },
      // #endregion
      // #region ETH Zürich
      {
        name: "ETH Zürich",
        website: "https://ethz.ch/studierende/de/studium/studiengaenge.html",
        kategorien: [
          {
            name: "5. Medizin",
            studiengaenge: [
              { name: "Humanmedizin", ects: "180 ECTS" },
            ]
          },
          {
            name: "2. Naturwissenschaften",
            unterkategorien: [
              {
                name: "Geografie",
                studiengaenge: [
                  { name: "Erd- und Klimawissenschaften", ects: "180 ECTS" },
                  { name: "Umweltnaturwissenschaften", ects: "180 ECTS" }
                ]
              },
              {
                name: "Biologie",
                studiengaenge: [
                  { name: "Biologie", ects: "180 ECTS" },
                  { name: "Biochemie", ects: "180 ECTS" },
                  { name: "Agrarwissenschaften", ects: "180 ECTS" },
                  { name: "Gesundheitswissenschaften und Technologie", ects: "180 ECTS" }
                ]
              },
              {
                name: "Chemie",
                studiengaenge: [
                  { name: "Chemie", ects: "180 ECTS" },
                  { name: "Pharmazeutische Wissenschaften", ects: "180 ECTS" },
                  { name: "Lebensmittelwissenschaften und Ernährung", ects: "180 ECTS" }
                ]
              },
              {
                name: "Physik",
                studiengaenge: [
                  { name: "Physik", ects: "180 ECTS" }
                ]
              },
              {
                name: "Mathematik",
                studiengaenge: [
                  { name: "Mathematik", ects: "180 ECTS" }
                ]
              }
            ],
            studiengaenge: [
              { name: "Interdisziplinäre Naturwissenschaften", ects: "180 ECTS" }
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Informatik", ects: "180 ECTS" },
                  { name: "Rechnergestützte Wissenschaften", ects: "180 ECTS" }
                ]
              },
              {
                name: "Bauingenieurwesen",
                studiengaenge: [
                  { name: "Architektur", ects: "180 ECTS" },
                  { name: "Bauingenieurwissenschaften", ects: "180 ECTS" },
                  { name: "Raumbezogene Ingenieurwissenschaften", ects: "180 ECTS" },
                  { name: "Umweltingenieurwissenschaften", ects: "180 ECTS" }
                ]
              }
            ],
            studiengaenge: [
              { name: "Elektrotechnik und Informationstechnologie", ects: "180 ECTS" },
              { name: "Maschineningenieurwissenschaften", ects: "180 ECTS" },
              { name: "Materialwissenschaft", ects: "180 ECTS" },
              { name: "Chemieingenieurwissenschaften", ects: "180 ECTS" }
            ]
          }
        ]
      },
      // #endregion
      // #region Universität Zürich
      {
        name: "Universität Zürich",
        website: "https://www.uzh.ch/de/studies/programs/bachelor.html",
        kategorien: [
          {
            name: "3. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Banking and Finance", ects: "150 ECTS" },
              { name: "Betriebswirtschaftslehre", ects: "150 ECTS" },
              { name: "Volkswirtschaftslehre", ects: "150 ECTS" },
              { name: "Wirtschaftsinformatik", ects: "150 ECTS" },
              { name: "Wirtschaftschemie", ects: "180 ECTS" }
            ]
          },
          {
            name: "5. Medizin",
            studiengaenge: [
              { name: "Chiropraktik", ects: "180 ECTS" },
              { name: "Humanmedizin", ects: "180 ECTS" },
              { name: "Veterinärmedizin", ects: "180 ECTS" },
              { name: "Zahnmedizin", ects: "180 ECTS" }
            ]
          },
          {
            name: "4. Rechtswissenschaften",
            studiengaenge: [
              { name: "Rechtswissenschaft", ects: "180 ECTS" }
            ]
          },
          {
            name: "2. Naturwissenschaften",
            unterkategorien: [
              {
                name: "Geografie",
                studiengaenge: [
                  { name: "Geographie", ects: "180/150/120 ECTS" },
                  { name: "Erdsystemwissenschaften", ects: "180 ECTS" }
                ]
              },
              {
                name: "Biologie",
                studiengaenge: [
                  { name: "Biologie", ects: "180/150/120 ECTS" },
                  { name: "Biochemie", ects: "180 ECTS" },
                  { name: "Biodiversität", ects: "180/150/120 ECTS" },
                  { name: "Biomedizin", ects: "180/150 ECTS" }
                ]
              },
              {
                name: "Chemie",
                studiengaenge: [
                  { name: "Chemie", ects: "180/150/120 ECTS" }
                ]
              },
              {
                name: "Physik",
                studiengaenge: [
                  { name: "Physik", ects: "180/150/120 ECTS" },
                  { name: "Astronomie und Astrophysik", ects: "180/150 ECTS" }
                ]
              },
              {
                name: "Mathematik",
                studiengaenge: [
                  { name: "Mathematik", ects: "180/150/120 ECTS" }
                ]
              }
            ]
          },
          {
            name: "1. Ingenieurwissenschaften",
            unterkategorien: [
              {
                name: "Informatik",
                studiengaenge: [
                  { name: "Angewandte Mathematik und Machine Learning", ects: "180/150/120 ECTS" },
                  { name: "Softwaresysteme", ects: "150 ECTS" }
                ]
              }
            ]
          },
          {
            name: "6. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Sprachwissenschaften",
                studiengaenge: [
                  { name: "Computerlinguistik und Sprachtechnologie", ects: "120 ECTS" },
                  { name: "Deutsche Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Englische Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Französische Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Griechische Philologie", ects: "120 ECTS" },
                  { name: "Iberoromanische Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Italienische Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Lateinische Philologie", ects: "120 ECTS" },
                  { name: "Slavische Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Vergleichende Romanische Sprachwissenschaft", ects: "120 ECTS" },
                  { name: "Vergleichende Sprachwissenschaft", ects: "120 ECTS" },
                  { name: "Skandinavistik", ects: "120 ECTS" }
                ]
              },
              {
                name: "Geschichtswissenschaften",
                studiengaenge: [
                  { name: "Archäologien", ects: "120 ECTS" },
                  { name: "Geschichte", ects: "120 ECTS" }
                ]
              },
              {
                name: "Philosophie",
                studiengaenge: [
                  { name: "Philosophie", ects: "120 ECTS" }
                ]
              },
              {
                name: "Kunstwissenschaften",
                studiengaenge: [
                  { name: "Filmwissenschaft", ects: "120 ECTS" },
                  { name: "Kunstgeschichte", ects: "120 ECTS" },
                  { name: "Musikwissenschaft", ects: "120 ECTS" }
                ]
              },
              {
                name: "Regionalstudien",
                studiengaenge: [
                  { name: "Indologie", ects: "120 ECTS" },
                  { name: "Japanologie", ects: "120 ECTS" },
                  { name: "Nah- und Mitteloststudien", ects: "120 ECTS" },
                  { name: "Osteuropastudien", ects: "120 ECTS" },
                  { name: "Sinologie", ects: "120 ECTS" },
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Ethnologie", ects: "120 ECTS" },
                  { name: "Kommunikationswissenschaft und Medienforschung", ects: "120 ECTS" },
                  { name: "Politikwissenschaft", ects: "120 ECTS" },
                  { name: "Populäre Kulturen", ects: "120 ECTS" },
                  { name: "Soziologie", ects: "120 ECTS" }
                ]
              },
              {
                name: "Bildungswissenschaften",
                studiengaenge: [
                  { name: "Erziehungswissenschaft", ects: "120 ECTS" },
                  { name: "Fachwissenschaft Pädagogik und Psychologie", ects: "120 ECTS" }
                ]
              },
              {
                name: "Psychologie",
                studiengaenge: [
                  { name: "Psychologie", ects: "120 ECTS" }
                ]
              },
              {
                name: "Theologie und Religionswissenschaften",
                studiengaenge: [
                  { name: "Religionswissenschaft", ects: "120 ECTS" },
                  { name: "Religious Studies and Theology", ects: "180 ECTS" },
                  { name: "Theologie", ects: "180/120 ECTS" }
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
  global.AlleSchweizerStudiengaenge = AlleSchweizerStudiengaenge;
})(window);

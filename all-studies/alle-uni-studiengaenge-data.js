// Alle Uni-Studiengänge in der Deutsch-Schweiz
// Datenquelle: Alle Uni-Studiengänge in der Deutsch-Schweiz.md

(function (global) {
  const AlleSchweizerStudiengaenge = {
    universitaeten: [
      {
        name: "Universität Basel",
        website: "https://www.unibas.ch/de/Studium/Vor-dem-Studium/Studienangebot.html",
        kategorien: [
          {
            name: "1. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Wirtschaftswissenschaften", ects: "180 KP" },
              { name: "Wirtschaftswissenschaften 75 KP", ects: "75 KP", beschreibung: "ausserfakultäres Bachelorstudienfach 75 KP" }
            ]
          },
          {
            name: "2. Medizin und Gesundheitswissenschaften",
            studiengaenge: [
              { name: "Humanmedizin", ects: "180 KP" },
              { name: "Zahnmedizin", ects: "180 KP" }
            ]
          },
          {
            name: "3. Psychologie",
            studiengaenge: [
              { name: "Psychologie", ects: "180 KP" }
            ]
          },
          {
            name: "4. Rechtswissenschaften",
            studiengaenge: [
              { name: "Rechtswissenschaft", ects: "180 KP" },
              { name: "Rechtswissenschaft 75 KP", ects: "75 KP", beschreibung: "ausserfakultäres Bachelorstudienfach 75 KP" }
            ]
          },
          {
            name: "5. Naturwissenschaften",
            studiengaenge: [
              { name: "Biologie", ects: "180 KP" },
              { name: "Biologie 75 KP", ects: "75 KP", beschreibung: "ausserfakultäres Bachelorstudienfach 75 KP" },
              { name: "Chemie", ects: "180 KP" },
              { name: "Chemie 75 KP", ects: "75 KP", beschreibung: "ausserfakultäres Bachelorstudienfach 75 KP" },
              { name: "Geographie 75 KP", ects: "75 KP", beschreibung: "ausserfakultäres Bachelorstudienfach 75 KP" },
              { name: "Geowissenschaften", ects: "180 KP" },
              { name: "Nanowissenschaften", ects: "180 KP" },
              { name: "Pharmazeutische Wissenschaften", ects: "180 KP" },
              { name: "Physik", ects: "180 KP" },
              { name: "Physik 75 KP", ects: "75 KP", beschreibung: "ausserfakultäres Bachelorstudienfach 75 KP" }
            ]
          },
          {
            name: "6. Mathematik und Informatik",
            studiengaenge: [
              { name: "Computational Sciences", ects: "180 KP" },
              { name: "Informatik", ects: "180 KP" },
              { name: "Informatik 75 KP", ects: "75 KP", beschreibung: "ausserfakultäres Bachelorstudienfach 75 KP" },
              { name: "Mathematik", ects: "180 KP" },
              { name: "Mathematik 75 KP", ects: "75 KP", beschreibung: "ausserfakultäres Bachelorstudienfach 75 KP" }
            ]
          },
          {
            name: "8. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Theologie und Religionswissenschaften",
                studiengaenge: [
                  { name: "Theologie", ects: "180 KP" },
                  { name: "Theologie 75 KP", ects: "75 KP", beschreibung: "ausserfakultäres Bachelorstudienfach 75 KP" },
                  { name: "Religionswissenschaft 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Jüdische Studien 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" }
                ]
              },
              {
                name: "Geistes- und Kulturwissenschaften",
                studiengaenge: [
                  { name: "Altertumswissenschaften", ects: "150 KP" },
                  { name: "Altertumswissenschaften 75 KP", ects: "75 KP", beschreibung: "Studienfach 75 KP" },
                  { name: "Deutsche Philologie 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Englisch 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Französistik 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Geschichte 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Geschlechterforschung 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Hispanistik 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Italianistik 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Kunstgeschichte 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Medienwissenschaft 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Musikwissenschaft 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Nahoststudien 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Nordistik 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Osteuropäische Kulturen 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Osteuropa-Studien", ects: "180 KP" },
                  { name: "Philosophie 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Prähistorische und Naturwissenschaftliche Archäologie", ects: "180 KP" }
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Ethnologie 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Kulturanthropologie 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Politikwissenschaft 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" },
                  { name: "Soziologie 75 KP", ects: "75 KP", beschreibung: "anderes Fach 75 KP" }
                ]
              }
            ]
          },
          {
            name: "9. Sportwissenschaften",
            studiengaenge: [
              { name: "Sport, Bewegung & Gesundheit", ects: "180 KP" },
              { name: "Sport, Bewegung & Gesundheit mit Zweitfach", ects: "99 KP", beschreibung: "ausserfakultäres Bachelorstudienfach 75 KP" }
            ]
          }
        ]
      },
      {
        name: "Universität Luzern",
        website: "https://www.unilu.ch/fileadmin/universitaet/dienste/unikomm/dokumente/Studienbroschueren/Studienprogramme_Bachelor.pdf",
        kategorien: [
          {
            name: "1. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Wirtschaftswissenschaften", ects: "180/120/60 ECTS" },
              { name: "Gesundheitswissenschaften", ects: "180 ECTS" }
            ]
          },
          {
            name: "3. Psychologie",
            studiengaenge: [
              { name: "Psychologie", ects: "120/60 ECTS" }
            ]
          },
          {
            name: "4. Rechtswissenschaften",
            studiengaenge: [
              { name: "Rechtswissenschaft", ects: "180/60 ECTS" }
            ]
          },
          {
            name: "8. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Theologie und Religionswissenschaften",
                studiengaenge: [
                  { name: "Theologie", ects: "180/120/60 ECTS" },
                  { name: "Religionspädagogik", ects: "180/60 ECTS" },
                  { name: "Judaistik", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Geistes- und Kulturwissenschaften",
                studiengaenge: [
                  { name: "Geschichte", ects: "120/60 ECTS" },
                  { name: "Philosophie", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Ethnologie", ects: "120/60 ECTS" },
                  { name: "Gesellschafts- und Kommunikationswissenschaften", ects: "180 ECTS" },
                  { name: "Kulturwissenschaften", ects: "180 ECTS" },
                  { name: "Politikwissenschaft", ects: "120/60 ECTS" },
                  { name: "Soziologie", ects: "120/60 ECTS" },
                  { name: "Philosophy, Politics and Economics", ects: "180 ECTS" }
                ]
              },
              {
                name: "Erziehungs- und Bildungswissenschaften",
                studiengaenge: [
                  { name: "Ethik", ects: "60 ECTS" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "Universität St. Gallen",
        website: "https://www.unisg.ch/de/studium/programme/bachelor/",
        kategorien: [
          {
            name: "1. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Betriebswirtschaftslehre", ects: "180 ECTS" },
              { name: "Volkswirtschaftslehre", ects: "180 ECTS" }
            ]
          },
          {
            name: "4. Rechtswissenschaften",
            studiengaenge: [
              { name: "Rechtswissenschaft", ects: "180 ECTS" },
              { name: "Rechtswissenschaft mit Wirtschaftswissenschaften", ects: "" }
            ]
          },
          {
            name: "6. Mathematik und Informatik",
            studiengaenge: [
              { name: "Informatik", ects: "180 ECTS" }
            ]
          },
          {
            name: "8. Wissenschaften vom Menschen und seiner Kultur",
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
      {
        name: "Universität Bern",
        website: "https://www.unibe.ch/unibe/portal/content/e1006/e251033/e265838/Bachelor-d_25-26_ger.pdf",
        kategorien: [
          {
            name: "1. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Betriebswirtschaftslehre", ects: "120/60/30/15 ECTS" },
              { name: "Volkswirtschaftslehre", ects: "120/60/30/15 ECTS" }
            ]
          },
          {
            name: "2. Medizin und Gesundheitswissenschaften",
            studiengaenge: [
              { name: "Humanmedizin", ects: "180 ECTS" },
              { name: "Veterinärmedizin", ects: "180 ECTS" },
              { name: "Zahnmedizin", ects: "180 ECTS" }
            ]
          },
          {
            name: "3. Psychologie",
            studiengaenge: [
              { name: "Psychologie", ects: "120 ECTS" }
            ]
          },
          {
            name: "4. Rechtswissenschaften",
            studiengaenge: [
              { name: "Rechtswissenschaft", ects: "180 ECTS" }
            ]
          },
          {
            name: "5. Naturwissenschaften",
            studiengaenge: [
              { name: "Biochemie und Molekularbiologie", ects: "180/60/30/15 ECTS" },
              { name: "Biologie", ects: "180 ECTS" },
              { name: "Chemie und Molekulare Wissenschaften", ects: "180/60/30/15 ECTS" },
              { name: "Erdwissenschaften (Geologie)", ects: "180/120/60/30/15 ECTS" },
              { name: "Geographie", ects: "120 ECTS" },
              { name: "Physik", ects: "120 ECTS" },
              { name: "Pharmazeutische Wissenschaften", ects: "180 ECTS" }
            ]
          },
          {
            name: "6. Mathematik und Informatik",
            studiengaenge: [
              { name: "Informatik", ects: "120 ECTS" },
              { name: "Mathematik", ects: "120/90/60/30/15 ECTS" }
            ]
          },
          {
            name: "8. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Theologie und Religionswissenschaften",
                studiengaenge: [
                  { name: "Theologie", ects: "180 ECTS" },
                  { name: "Interreligiöse Studien", ects: "120 ECTS" },
                  { name: "Islamic and Middle Eastern Studies", ects: "120 ECTS" },
                  { name: "Religionswissenschaft", ects: "120/60/30 ECTS" }
                ]
              },
              {
                name: "Geistes- und Kulturwissenschaften",
                studiengaenge: [
                  { name: "Archäologie", ects: "120 ECTS" },
                  { name: "Deutsche Sprach- und Literaturwissenschaft", ects: "120/60/30 ECTS" },
                  { name: "English", ects: "120 ECTS" },
                  { name: "Französische Sprach- und Literaturwissenschaft", ects: "120/60/30 ECTS" },
                  { name: "Geschichte", ects: "180/120 ECTS" },
                  { name: "Italienische Sprach- und Literaturwissenschaft", ects: "120/60/30 ECTS" },
                  { name: "Klassische Philologie", ects: "120 ECTS" },
                  { name: "Kunstgeschichte", ects: "120/60/30 ECTS" },
                  { name: "Linguistik", ects: "120 ECTS" },
                  { name: "Musikwissenschaft", ects: "120/60/30 ECTS" },
                  { name: "Osteuropa-Studien", ects: "120 ECTS" },
                  { name: "Philosophie", ects: "120 ECTS" },
                  { name: "Slavistik", ects: "120 ECTS" },
                  { name: "Spanische Sprach- und Literaturwissenschaft", ects: "120/60/30 ECTS" },
                  { name: "Theaterwissenschaft", ects: "120/60/30 ECTS" }
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Sozialanthropologie", ects: "120/60/30 ECTS" },
                  { name: "Sozialwissenschaften", ects: "120/60/30/15 ECTS" },
                  { name: "Politik- und Verwaltungswissenschaft", ects: "120 ECTS" }
                ]
              },
              {
                name: "Erziehungs- und Bildungswissenschaften",
                studiengaenge: [
                  { name: "Erziehungswissenschaft", ects: "120/60/30 ECTS" }
                ]
              }
            ]
          },
          {
            name: "9. Sportwissenschaften",
            studiengaenge: [
              { name: "Sportwissenschaft", ects: "120/60/30 ECTS" }
            ]
          }
        ]
      },
      {
        name: "Universität Freiburg",
        website: "https://studies.unifr.ch/de/studienangebot/courses/",
        kategorien: [
          {
            name: "1. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Betriebswirtschaftslehre", ects: "180/60 ECTS" },
              { name: "Volkswirtschaftslehre", ects: "180/60 ECTS" },
              { name: "Wirtschafts- und Rechtswissenschaftliche Studien", ects: "120 ECTS" },
              { name: "Wirtschaftsinformatik", ects: "180/60 ECTS" }
            ]
          },
          {
            name: "2. Medizin und Gesundheitswissenschaften",
            studiengaenge: [
              { name: "Humanmedizin", ects: "180 ECTS" },
            ]
          },
          {
            name: "3. Psychologie",
            studiengaenge: [
              { name: "Psychologie", ects: "180/60 ECTS" }
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
            name: "5. Naturwissenschaften",
            studiengaenge: [
              { name: "Biochemie", ects: "120/60 ECTS" },
              { name: "Biologie", ects: "120/60 ECTS" },
              { name: "Chemie", ects: "150/120/60 ECTS" },
              { name: "Erdwissenschaften", ects: "150/60 ECTS" },
              { name: "Geographie", ects: "120/60 ECTS" },
              { name: "Physik", ects: "150/60 ECTS" },
              { name: "Umweltwissenschaften und Umweltgeisteswissenschaften", ects: "60 ECTS" },
              { name: "Biomedizinische Wissenschaften", ects: "120 ECTS" }
            ]
          },
          {
            name: "6. Mathematik und Informatik",
            studiengaenge: [
              { name: "Mathematik", ects: "120/60 ECTS" },
              { name: "Informatik", ects: "120/60 ECTS" }
            ]
          },
          {
            name: "8. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Theologie und Religionswissenschaften",
                studiengaenge: [
                  { name: "Theologie", ects: "180/60 ECTS" },
                  { name: "Theologische Studien", ects: "120 ECTS" },
                  { name: "Interreligiöse Studien", ects: "120/60 ECTS" },
                  { name: "Religionswissenschaft", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Geistes- und Kulturwissenschaften",
                studiengaenge: [
                  { name: "Englische Sprache und Literatur", ects: "120/60 ECTS" },
                  { name: "Französisch", ects: "120/60 ECTS" },
                  { name: "Germanistik", ects: "120/60 ECTS" },
                  { name: "Germanistische Literaturwissenschaft", ects: "60 ECTS" },
                  { name: "Griechische Sprache und Kultur", ects: "60 ECTS" },
                  { name: "Italienisch", ects: "120/60 ECTS" },
                  { name: "Klassische Philologie", ects: "120 ECTS" },
                  { name: "Lateinische Sprache und Kultur", ects: "60 ECTS" },
                  { name: "Rätoromanisch", ects: "60 ECTS" },
                  { name: "Slavistik", ects: "120/60 ECTS" },
                  { name: "Spanisch", ects: "120/60 ECTS" },
                  { name: "Deutsch und Französisch: Zweisprachigkeit und Kulturkontakt", ects: "180 ECTS" },
                  { name: "Deutsch als Fremdsprache", ects: "60 ECTS" },
                  { name: "Französisch als Fremdsprache", ects: "60 ECTS" },
                  { name: "Geschichte", ects: "120/60 ECTS" },
                  { name: "Geschichte der Moderne", ects: "120 ECTS" },
                  { name: "Zeitgeschichte", ects: "120/60 ECTS" },
                  { name: "Kunstgeschichte", ects: "120/60 ECTS" },
                  { name: "Musikwissenschaft und Geschichte des Musiktheaters", ects: "120/60 ECTS" },
                  { name: "Philosophie", ects: "120/60 ECTS" }
                ]
              },
              {
                name: "Sozialwissenschaften",
                studiengaenge: [
                  { name: "Soziologie (FR)", ects: "120 ECTS" },
                  { name: "Soziologie", ects: "120/60 ECTS" },
                  { name: "Sozialarbeit und Sozialpolitik (FR)", ects: "120/60 ECTS" },
                  { name: "Sozialarbeit und Sozialpolitik", ects: "120/60 ECTS" },
                  { name: "Osteuropa-Studien", ects: "120/60 ECTS" },
                  { name: "Politik und Gesellschaft", ects: "60 ECTS" },
                  { name: "Sozialanthropologie", ects: "120/60 ECTS" },
                  { name: "Kommunikationswissenschaft und Medienforschung", ects: "120/60 ECTS" },
                  { name: "Kommunikationswissenschaft", ects: "90 ECTS" },
                  { name: "Business Communication", ects: "60 ECTS" }
                ]
              },
              {
                name: "Erziehungs- und Bildungswissenschaften",
                studiengaenge: [
                  { name: "Sonderpädagogik und Sozialpädagogik", ects: "180 ECTS" },
                  { name: "Logopädie", ects: "180 ECTS" },
                  { name: "Sonderpädagogik", ects: "60 ECTS" },
                  { name: "Erziehungswissenschaften", ects: "120/60 ECTS" },
                  { name: "Pädagogik/Psychologie", ects: "120/60 ECTS" },
                  { name: "Ausbildung für den Unterricht auf der Primarstufe", ects: "180 ECTS" },
                  { name: "Ausbildung für den Unterricht auf der Sekundarstufe I", ects: "150 ECTS" }
                ]
              }
            ]
          },
          {
            name: "9. Sportwissenschaften",
            studiengaenge: [
              { name: "Sport- und Bewegungswissenschaften", ects: "180/120/60 ECTS" }
            ]
          }
        ]
      },
      {
        name: "ETH Zürich",
        website: "https://ethz.ch/studierende/de/studium/studiengaenge.html",
        kategorien: [
          {
            name: "2. Medizin und Gesundheitswissenschaften",
            studiengaenge: [
              { name: "Humanmedizin", ects: "180 ECTS" },
            ]
          },
          {
            name: "5. Naturwissenschaften",
            studiengaenge: [
              { name: "Biologie", ects: "180 ECTS" },
              { name: "Biochemie", ects: "180 ECTS" },
              { name: "Chemie", ects: "180 ECTS" },
              { name: "Chemieingenieurwissenschaften", ects: "180 ECTS" },
              { name: "Interdisziplinäre Naturwissenschaften", ects: "180 ECTS" },
              { name: "Pharmazeutische Wissenschaften", ects: "180 ECTS" },
              { name: "Physik", ects: "180 ECTS" },
              { name: "Rechnergestützte Wissenschaften", ects: "180 ECTS" },
              { name: "Agrarwissenschaften", ects: "180 ECTS" },
              { name: "Erd- und Klimawissenschaften", ects: "180 ECTS" },
              { name: "Umweltnaturwissenschaften", ects: "180 ECTS" },
              { name: "Lebensmittelwissenschaften und Ernährung", ects: "180 ECTS" },
              { name: "Gesundheitswissenschaften und Technologie", ects: "180 ECTS" }
            ]
          },
          {
            name: "6. Mathematik und Informatik",
            studiengaenge: [
              { name: "Mathematik", ects: "180 ECTS" },
              { name: "Informatik", ects: "180 ECTS" }
            ]
          },
          {
            name: "7. Ingenieurwissenschaften",
            studiengaenge: [
              { name: "Architektur", ects: "180 ECTS" },
              { name: "Bauingenieurwissenschaften", ects: "180 ECTS" },
              { name: "Raumbezogene Ingenieurwissenschaften", ects: "180 ECTS" },
              { name: "Umweltingenieurwissenschaften", ects: "180 ECTS" },
              { name: "Elektrotechnik und Informationstechnologie", ects: "180 ECTS" },
              { name: "Maschineningenieurwissenschaften", ects: "180 ECTS" },
              { name: "Materialwissenschaft", ects: "180 ECTS" }
            ]
          }
        ]
      },
      {
        name: "Universität Zürich (UZH)",
        website: "https://www.uzh.ch/de/studies/programs/bachelor.html",
        kategorien: [
          {
            name: "1. Wirtschaftswissenschaften",
            studiengaenge: [
              { name: "Banking and Finance", ects: "150 ECTS" },
              { name: "Betriebswirtschaftslehre", ects: "150 ECTS" },
              { name: "Volkswirtschaftslehre", ects: "150 ECTS" },
              { name: "Wirtschaftsinformatik", ects: "150 ECTS" },
              { name: "Wirtschaftschemie", ects: "180 ECTS" }
            ]
          },
          {
            name: "2. Medizin und Gesundheitswissenschaften",
            studiengaenge: [
              { name: "Chiropraktik", ects: "180 ECTS" },
              { name: "Humanmedizin", ects: "180 ECTS" },
              { name: "Veterinärmedizin", ects: "180 ECTS" },
              { name: "Zahnmedizin", ects: "180 ECTS" }
            ]
          },
          {
            name: "3. Psychologie",
            studiengaenge: [
              { name: "Psychologie", ects: "120 ECTS" }
            ]
          },
          {
            name: "4. Rechtswissenschaften",
            studiengaenge: [
              { name: "Rechtswissenschaft", ects: "180 ECTS" }
            ]
          },
          {
            name: "5. Naturwissenschaften",
            studiengaenge: [
              { name: "Astronomie und Astrophysik", ects: "180/150 ECTS" },
              { name: "Biochemie", ects: "180 ECTS" },
              { name: "Biodiversität", ects: "180/150/120 ECTS" },
              { name: "Biologie", ects: "180/150/120 ECTS" },
              { name: "Biomedizin", ects: "180/150 ECTS" },
              { name: "Chemie", ects: "180/150/120 ECTS" },
              { name: "Erdsystemwissenschaften", ects: "180 ECTS" },
              { name: "Geographie", ects: "180/150/120 ECTS" },
              { name: "Physik", ects: "180/150/120 ECTS" },
            ]
          },
          {
            name: "6. Mathematik und Informatik",
            studiengaenge: [
              { name: "Angewandte Mathematik und Machine Learning", ects: "180/150/120 ECTS" },
              { name: "Mathematik", ects: "180/150/120 ECTS" },
              { name: "Softwaresysteme", ects: "150 ECTS" }
            ]
          },
          {
            name: "8. Wissenschaften vom Menschen und seiner Kultur",
            unterkategorien: [
              {
                name: "Theologie und Religionswissenschaften",
                studiengaenge: [
                  { name: "Religionswissenschaft", ects: "120 ECTS" },
                  { name: "Religious Studies and Theology", ects: "180 ECTS" },
                  { name: "Theologie", ects: "180/120 ECTS" }
                ]
              },
              {
                name: "Geistes- und Kulturwissenschaften",
                studiengaenge: [
                  { name: "Archäologien", ects: "120 ECTS" },
                  { name: "Computerlinguistik und Sprachtechnologie", ects: "120 ECTS" },
                  { name: "Deutsche Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Englische Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Filmwissenschaft", ects: "120 ECTS" },
                  { name: "Französische Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Geschichte", ects: "120 ECTS" },
                  { name: "Griechische Philologie", ects: "120 ECTS" },
                  { name: "Iberoromanische Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Indologie", ects: "120 ECTS" },
                  { name: "Italienische Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Japanologie", ects: "120 ECTS" },
                  { name: "Kunstgeschichte", ects: "120 ECTS" },
                  { name: "Lateinische Philologie", ects: "120 ECTS" },
                  { name: "Musikwissenschaft", ects: "120 ECTS" },
                  { name: "Nah- und Mitteloststudien", ects: "120 ECTS" },
                  { name: "Osteuropastudien", ects: "120 ECTS" },
                  { name: "Philosophie", ects: "120 ECTS" },
                  { name: "Sinologie", ects: "120 ECTS" },
                  { name: "Skandinavistik", ects: "120 ECTS" },
                  { name: "Slavische Sprach- und Literaturwissenschaft", ects: "120 ECTS" },
                  { name: "Vergleichende Romanische Sprachwissenschaft", ects: "120 ECTS" },
                  { name: "Vergleichende Sprachwissenschaft", ects: "120 ECTS" }
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
                name: "Erziehungs- und Bildungswissenschaften",
                studiengaenge: [
                  { name: "Erziehungswissenschaft", ects: "120 ECTS" },
                  { name: "Fachwissenschaft Pädagogik und Psychologie", ects: "120 ECTS" }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  // Expose to global scope
  global.AlleSchweizerStudiengaenge = AlleSchweizerStudiengaenge;
})(window);

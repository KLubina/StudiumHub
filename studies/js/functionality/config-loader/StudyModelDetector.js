/* Study Model Detection Logic */

class StudyModelDetector {
    constructor() {
        this.majorMinorPrograms = [
            'sozwi',
            'uzh-polisci',
            'uzh-geschichte',
            'uzh-ethnologie',
            'uzh-kommunikation',
            'uzh-pop-kultur',
            'uzh-soziologie'
        ];
    }

    getStudyModel(studiengang) {
        return this.majorMinorPrograms.includes(studiengang) ? 'major-minor' : 'mono';
    }

    isMajorMinorProgram(studiengang) {
        return this.majorMinorPrograms.includes(studiengang);
    }
}

window.StudyModelDetector = StudyModelDetector;

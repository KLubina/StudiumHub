const centerX = 500;
const centerY = 500;
const outerRadius = 380;
const innerRadius = 120;

const corners = [
    {angle: -90, label: 'Technik &\nInnovation', icon: '⚙️', color: '#6366f1'},
    {angle: -18, label: 'Natur &\nUmwelt', icon: '🌿', color: '#10b981'},
    {angle: 54, label: 'Leben &\nGesundheit', icon: '🧬', color: '#ec4899'},
    {angle: 126, label: 'Mensch &\nGesellschaft', icon: '🧠', color: '#f59e0b'},
    {angle: 198, label: 'Recht &\nNormen', icon: '⚖️', color: '#8b5cf6'}
];

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

const pentagonPoints = corners.map(c => 
    polarToCartesian(centerX, centerY, outerRadius, c.angle)
);

const backgroundGroup = document.getElementById('background');
const structureGroup = document.getElementById('structure');
const labelsGroup = document.getElementById('labels');

corners.forEach((corner, i) => {
    const nextIndex = (i + 1) % corners.length;
    const p1 = pentagonPoints[i];
    const p2 = pentagonPoints[nextIndex];
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${centerX} ${centerY} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} Z`);
    path.setAttribute('fill', corner.color);
    path.setAttribute('class', 'corner-area');
    backgroundGroup.appendChild(path);
});

const pentagonPath = pentagonPoints.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
).join(' ') + ' Z';

const pentagonFill = document.createElementNS('http://www.w3.org/2000/svg', 'path');
pentagonFill.setAttribute('d', pentagonPath);
pentagonFill.setAttribute('class', 'pentagon-fill');
structureGroup.appendChild(pentagonFill);

const pentagonOutline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
pentagonOutline.setAttribute('d', pentagonPath);
pentagonOutline.setAttribute('class', 'pentagon-outline');
structureGroup.appendChild(pentagonOutline);

corners.forEach(corner => {
    const outerPoint = polarToCartesian(centerX, centerY, outerRadius, corner.angle);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', centerX);
    line.setAttribute('y1', centerY);
    line.setAttribute('x2', outerPoint.x);
    line.setAttribute('y2', outerPoint.y);
    line.setAttribute('class', 'sector-line');
    structureGroup.appendChild(line);
});



corners.forEach(corner => {
    const labelPoint = polarToCartesian(centerX, centerY, outerRadius + 50, corner.angle);
    const iconPoint = polarToCartesian(centerX, centerY, outerRadius + 80, corner.angle);
    
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    icon.setAttribute('x', iconPoint.x);
    icon.setAttribute('y', iconPoint.y + 8);
    icon.setAttribute('class', 'corner-icon');
    icon.textContent = corner.icon;
    labelsGroup.appendChild(icon);
    
    const lines = corner.label.split('\n');
    lines.forEach((line, i) => {
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', labelPoint.x);
        label.setAttribute('y', labelPoint.y + (i * 18));
        label.setAttribute('class', 'corner-label');
        label.textContent = line;
        labelsGroup.appendChild(label);
    });
});

const studyPrograms = [
    {name: 'Informatik', angle: -90, distance: 0.85, color: '#ef4444', category: 'eth'},
    {name: 'Elektrotechnik', angle: -95, distance: 0.80, color: '#ef4444', category: 'eth'},
    {name: 'Maschineningenieur', angle: -85, distance: 0.78, color: '#ef4444', category: 'eth'},
    {name: 'Materialwissenschaft', angle: -75, distance: 0.75, color: '#ef4444', category: 'eth'},
    {name: 'Mathematik', angle: -100, distance: 0.88, color: '#ef4444', category: 'eth'},
    {name: 'Physik', angle: -105, distance: 0.85, color: '#ef4444', category: 'eth'},
    {name: 'Rechnergest. Wiss.', angle: -80, distance: 0.82, color: '#ef4444', category: 'eth'},
    {name: 'Softwaresysteme', angle: -70, distance: 0.65, color: '#3b82f6', category: 'uzh'},
    {name: 'Wirtschaftsinformatik', angle: -55, distance: 0.45, color: '#8b5cf6', category: 'biz'},
    
    {name: 'Umweltingenieur', angle: -25, distance: 0.75, color: '#ef4444', category: 'eth'},
    {name: 'Bauingenieur', angle: -40, distance: 0.72, color: '#ef4444', category: 'eth'},
    {name: 'Raumbez. Ingenieur', angle: -15, distance: 0.68, color: '#ef4444', category: 'eth'},
    {name: 'Architektur', angle: 100, distance: 0.60, color: '#ef4444', category: 'eth'},
    {name: 'Agrarwissenschaften', angle: 0, distance: 0.78, color: '#ef4444', category: 'eth'},
    {name: 'Umweltnaturwiss.', angle: -10, distance: 0.82, color: '#ef4444', category: 'eth'},
    {name: 'Erd- u. Klimawiss.', angle: -5, distance: 0.85, color: '#ef4444', category: 'eth'},
    {name: 'Erdsystemwiss.', angle: 5, distance: 0.83, color: '#3b82f6', category: 'uzh'},
    {name: 'Geographie', angle: 15, distance: 0.72, color: '#3b82f6', category: 'uzh'},
    {name: 'Biodiversität', angle: 25, distance: 0.80, color: '#3b82f6', category: 'uzh'},
    
    {name: 'Biologie', angle: 45, distance: 0.82, color: '#ef4444', category: 'eth'},
    {name: 'Biochemie', angle: 55, distance: 0.78, color: '#ef4444', category: 'eth'},
    {name: 'Chemie', angle: -60, distance: 0.75, color: '#ef4444', category: 'eth'},
    {name: 'Chemieingenieur', angle: -50, distance: 0.70, color: '#ef4444', category: 'eth'},
    {name: 'Pharmazie', angle: 65, distance: 0.72, color: '#ef4444', category: 'eth'},
    {name: 'Biomedizin', angle: 60, distance: 0.75, color: '#3b82f6', category: 'uzh'},
    {name: 'Lebensmittelwiss.', angle: 35, distance: 0.65, color: '#ef4444', category: 'eth'},
    {name: 'Gesundheitswiss.', angle: 70, distance: 0.68, color: '#10b981', category: 'med'},
    {name: 'Humanmedizin', angle: 58, distance: 0.85, color: '#10b981', category: 'med'},
    {name: 'Zahnmedizin', angle: 52, distance: 0.80, color: '#10b981', category: 'med'},
    {name: 'Veterinärmedizin', angle: 48, distance: 0.78, color: '#10b981', category: 'med'},
    {name: 'Chiropraktik', angle: 62, distance: 0.76, color: '#10b981', category: 'med'},
    
    {name: 'Psychologie', angle: 115, distance: 0.70, color: '#3b82f6', category: 'uzh'},
    {name: 'Erziehungswiss.', angle: 125, distance: 0.75, color: '#3b82f6', category: 'uzh'},
    {name: 'Soziologie', angle: 135, distance: 0.80, color: '#3b82f6', category: 'uzh'},
    {name: 'Politikwissenschaft', angle: 130, distance: 0.78, color: '#3b82f6', category: 'uzh'},
    {name: 'Kommunikationswiss.', angle: 120, distance: 0.72, color: '#3b82f6', category: 'uzh'},
    {name: 'Ethnologie', angle: 145, distance: 0.82, color: '#3b82f6', category: 'uzh'},
    {name: 'Populäre Kulturen', angle: 140, distance: 0.75, color: '#3b82f6', category: 'uzh'},
    {name: 'Geschichte', angle: 155, distance: 0.85, color: '#3b82f6', category: 'uzh'},
    {name: 'Kunstgeschichte', angle: 150, distance: 0.80, color: '#3b82f6', category: 'uzh'},
    {name: 'Filmwissenschaft', angle: 110, distance: 0.68, color: '#3b82f6', category: 'uzh'},
    {name: 'Musikwissenschaft', angle: 148, distance: 0.77, color: '#3b82f6', category: 'uzh'},
    {name: 'Deutsche Lit.', angle: 160, distance: 0.88, color: '#3b82f6', category: 'uzh'},
    {name: 'Englische Lit.', angle: 165, distance: 0.86, color: '#3b82f6', category: 'uzh'},
    {name: 'Französische Lit.', angle: 170, distance: 0.84, color: '#3b82f6', category: 'uzh'},
    {name: 'Italienische Lit.', angle: 175, distance: 0.82, color: '#3b82f6', category: 'uzh'},
    {name: 'Iberoromanische Lit.', angle: 158, distance: 0.83, color: '#3b82f6', category: 'uzh'},
    {name: 'Slavische Lit.', angle: 152, distance: 0.81, color: '#3b82f6', category: 'uzh'},
    {name: 'Sinologie', angle: 168, distance: 0.87, color: '#3b82f6', category: 'uzh'},
    {name: 'Japanologie', angle: 172, distance: 0.85, color: '#3b82f6', category: 'uzh'},
    {name: 'Indologie', angle: 163, distance: 0.84, color: '#3b82f6', category: 'uzh'},
    {name: 'Computerlinguistik', angle: 105, distance: 0.62, color: '#3b82f6', category: 'uzh'},
    
    {name: 'Philosophie', angle: 195, distance: 0.82, color: '#3b82f6', category: 'uzh'},
    {name: 'Theologie', angle: 205, distance: 0.85, color: '#3b82f6', category: 'uzh'},
    {name: 'Religionswiss.', angle: 200, distance: 0.80, color: '#3b82f6', category: 'uzh'},
    {name: 'Rechtswissenschaft', angle: 190, distance: 0.75, color: '#f59e0b', category: 'law'},
    {name: 'Griechische Philologie', angle: 210, distance: 0.83, color: '#3b82f6', category: 'uzh'},
    {name: 'Lateinische Philologie', angle: 215, distance: 0.81, color: '#3b82f6', category: 'uzh'},
    {name: 'Archäologien', angle: 180, distance: 0.78, color: '#3b82f6', category: 'uzh'},
    
    {name: 'BWL', angle: 0, distance: 0, color: '#8b5cf6', category: 'biz'},
    {name: 'VWL', angle: -30, distance: 0.42, color: '#8b5cf6', category: 'biz'},
    {name: 'Banking & Finance', angle: 30, distance: 0.35, color: '#8b5cf6', category: 'biz'},
    {name: 'Wirtschaftschemie', angle: -45, distance: 0.52, color: '#3b82f6', category: 'uzh'},
];

const studiesGroup = document.getElementById('studies');
const tooltip = document.getElementById('tooltip');
const compassSvg = document.getElementById('compass-svg');

let currentZoom = 1;
const minZoom = 0.5;
const maxZoom = 3;
const zoomStep = 0.2;

const activeFilters = {
    eth: true,
    uzh: true,
    med: true,
    law: true,
    biz: true
};

const studyDots = [];

studyPrograms.forEach(program => {
    const position = polarToCartesian(
        centerX, 
        centerY, 
        outerRadius * program.distance, 
        program.angle
    );
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', position.x);
    circle.setAttribute('cy', position.y);
    circle.setAttribute('r', '6');
    circle.setAttribute('fill', program.color);
    circle.setAttribute('class', 'study-dot');
    circle.dataset.category = program.category;
    
    circle.addEventListener('mouseenter', (e) => {
        const rect = e.target.getBoundingClientRect();
        tooltip.textContent = program.name;
        tooltip.style.opacity = '1';
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top - 35 + 'px';
        tooltip.style.transform = 'translateX(-50%)';
    });
    
    circle.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
    
    studiesGroup.appendChild(circle);
    studyDots.push({element: circle, category: program.category});
});

function toggleFilter(category) {
    const checkbox = document.getElementById(`filter-${category}`);
    checkbox.checked = !checkbox.checked;
    activeFilters[category] = checkbox.checked;
    updateVisibility();
}

function updateVisibility() {
    studyDots.forEach(dot => {
        const isVisible = activeFilters[dot.category];
        dot.element.style.opacity = isVisible ? '1' : '0';
        dot.element.style.pointerEvents = isVisible ? 'auto' : 'none';
    });
}

function zoomIn() {
    if (currentZoom < maxZoom) {
        currentZoom = Math.min(currentZoom + zoomStep, maxZoom);
        applyZoom();
    }
}

function zoomOut() {
    if (currentZoom > minZoom) {
        currentZoom = Math.max(currentZoom - zoomStep, minZoom);
        applyZoom();
    }
}

function resetZoom() {
    currentZoom = 1;
    applyZoom();
}

function applyZoom() {
    compassSvg.style.transform = `scale(${currentZoom})`;
    compassSvg.style.transition = 'transform 0.3s ease';
    document.getElementById('zoom-level').textContent = Math.round(currentZoom * 100) + '%';
}

compassSvg.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
        zoomIn();
    } else {
        zoomOut();
    }
}, { passive: false });

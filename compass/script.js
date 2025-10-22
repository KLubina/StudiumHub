// read configuration from shared data file (compass/data.js)
const {
    centerX = 500,
    centerY = 500,
    outerRadius = 380,
    innerRadius = 120,
    corners = [],
    studyPrograms = []
} = (window.COMPASS || {});

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

// studyPrograms array moved to compass/data.js and read via window.COMPASS

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

const Icons = (() => {
  const getProjectIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    svg.classList.add('project-icon');

    svg.setAttribute('viewBox', '0 0 24 24');
    path.setAttribute('d', 'M12 7a5 5 0 110 10 5 5 0 010-10z');
    path.setAttribute('fill', 'currentColor');

    svg.appendChild(path);

    return svg;
  };

  const getDeleteIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path1 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const path2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const path3 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    g.setAttribute('fill', 'none');
    g.setAttribute('fill-rule', 'evenodd');
    path1.setAttribute('d', 'M0 0h24v24H0z');
    rect.setAttribute('x', '5');
    rect.setAttribute('y', '6');
    rect.setAttribute('fill', 'currentColor');
    rect.setAttribute('rx', '.5');
    path2.setAttribute('fill', 'currentColor');
    path2.setAttribute('d', 'M10 9h1v8h-1V9zm3 0h1v8h-1V9z');
    path3.setAttribute('stroke', 'currentColor');
    path3.setAttribute(
      'd',
      'M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z'
    );

    g.append(path1, rect, path2, path3);
    svg.append(g);

    return svg;
  };

  const getCheckboxIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    path.setAttribute('fill', 'currentColor');
    path.setAttribute(
      'd',
      'M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z'
    );

    svg.appendChild(path);
    return svg;
  };

  const getCalendarIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    svg.setAttribute('viewBox', '0 0 12 12');
    svg.setAttribute('fill', 'none');

    path.setAttribute('fill', 'currentColor');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('clip-rule', 'evenodd');
    path.setAttribute(
      'd',
      'M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z'
    );

    svg.appendChild(path);
    return svg;
  };

  const getEditIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path1 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const path2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const path3 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    g.setAttribute('fill', 'none');
    g.setAttribute('fill-rule', 'evenodd');
    path1.setAttribute('fill', 'currentColor');
    path1.setAttribute('d', 'M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z');
    path2.setAttribute('stroke', 'currentColor');
    path2.setAttribute(
      'd',
      'M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z'
    );

    g.append(path1, path2, path3);
    svg.append(g);

    return svg;
  };

  return {
    getCalendarIcon,
    getCheckboxIcon,
    getDeleteIcon,
    getEditIcon,
    getProjectIcon,
  };
})();

export { Icons };

// export const handleKeyDown = (event, selectedBuilding, buildingMoment, cells, buildings, t, app) => {
//     const key = event.key;
//     if (selectedBuilding.buildingSprite) {
//         console.log(buildingMoment, t, "czxczx");
//         if (key === 'f' && buildingMoment.isContctructionGoingNow && t.buldingObject) {
//             console.log('f');
//             t.buldingObject.clearPatterns();
//             t.buldingObject.clearCellsStatus()
//             t.buldingObject.rotateMatrix(-1);
//             t.buldingObject.renderMatrixPattern(app);
//         } 
//         else if (key === 'g' && buildingMoment.isContctructionGoingNow && t.buldingObject) {
//             console.log('g');
//             t.buldingObject.clearPatterns();
//             t.buldingObject.clearCellsStatus();
//             t.buldingObject.rotateMatrix(1);
//             t.buldingObject.renderMatrixPattern(app);
//         }
//     }
//     if (key === 'a') {
//         cells.forEach(cell => {
//             cell.setDirectPositions(cell.getBounds().x - 50, cell.getBounds().y)
//         })
//         buildings.forEach(build => {
//             build.setPosition(build.getBounds().x - 50, build.getBounds().y)
//         })
//     }
//     else if (key === 'w') {
//         cells.forEach(cell => {
//             cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y - 50)
//         })
//         buildings.forEach(build => {
//             build.setPosition(build.getBounds().x, build.getBounds().y - 50)
//         })
//     }
//     else if (key === 'd') {
//         cells.forEach(cell => {
//             cell.setDirectPositions(cell.getBounds().x + 50, cell.getBounds().y)
//         })
//         buildings.forEach(build => {
//             build.setPosition(build.getBounds().x + 50, build.getBounds().y)
//         })
//     }
//     else if (key === 's') {
//         cells.forEach(cell => {
//             cell.setDirectPositions(cell.getBounds().x, cell.getBounds().y + 50)
//         })
//         buildings.forEach(build => {
//             build.setPosition(build.getBounds().x, build.getBounds().y + 50)
//         })
//     }
// };
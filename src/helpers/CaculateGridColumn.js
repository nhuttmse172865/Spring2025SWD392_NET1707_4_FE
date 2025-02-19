const CaculateGridColumn = (listTitle) => {
    let gridColumnTemplate;
    Array.isArray(listTitle) &&
      listTitle.forEach((item) => {
        const columnTemplate = gridColumnTemplate
          ? gridColumnTemplate + String(item.column) + "fr "
          : String(item.column) + "fr ";
        gridColumnTemplate = columnTemplate;
      });
    return gridColumnTemplate;
}
export default CaculateGridColumn;
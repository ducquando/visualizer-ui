// /*
//  * mydraft.cc
//  *
//  * Do Duc Quan
//  * 15 Oct 2023
// */

// import { InsertRowBelowOutlined, InsertRowRightOutlined, CheckSquareOutlined, TableOutlined, EditOutlined } from '@ant-design/icons';
// import { useDispatch } from 'react-redux';
// import { useEventCallback } from '@app/core';
// import { Button, Tooltip } from 'antd';
// import { getDiagramId, DiagramItem, calculateSelection, getDiagram, selectItems, useStore, DiagramItemSet, Serializer, pasteItems, addShape, getSelectedItems, removeItems, groupItems, ItemRef } from '@app/wireframes/model';
// import * as React from 'react';
// import { parseTableText } from '@app/wireframes/shapes/neutral/table';


// export const TableMenu = React.memo(() => {
//     const dispatch = useDispatch();
//     const selectedDiagram = useStore(getDiagram);
//     const selectedDiagramId = useStore(getDiagramId);
//     const selectedItems = useStore(getSelectedItems);
    
//     const PREFIX = 'my-draft:';
//     const OFFSET = 1;
//     const onCreation = React.useRef(0);
//     const tableInit: React.MutableRefObject<{}> = React.useRef({});
//     const rowContent: React.MutableRefObject<Set<string>> = React.useRef(new Set());
//     const colContent: React.MutableRefObject<Set<string>> = React.useRef(new Set());
//     const tableContent: React.MutableRefObject<Set<string>> = React.useRef(new Set());
//     let tableItems: React.MutableRefObject<Array<ItemRef>> = React.useRef(new Array());


//     const updateRef = (id: string, mode?: string) => {
//         tableItems.current.push(id);
//         mode = (mode) ? mode : '';
//         tableContent.current.add(id);

//         if (mode != 'row') {
//             colContent.current.add(id);
//         }
//         if (mode != 'col') {
//             rowContent.current.add(id);
//         }
//     };

//     function CreateTable(selectedDiagramId: string, row: number , col: number, x: number, y: number){
//     // Creating the table
//         for (let i = 0; i < row; i++) {
//             for (let j = 0; j < col; j++) {
//                 const newShape = dispatch(addShape(selectedDiagramId, 'Cell',
//                 {position: { x: x + j * 100, y: y + i * 39}}));
//                 updateRef(newShape.payload.id);
//             };
//         };
//         saveTable();
//     };




//     const createTable = useEventCallback(() => {
//         CreateTable(selectedDiagramId || '0', 3, 3,  0, 0)
//     });
    
//     const editTable = useEventCallback(() => {
//         for (const selectedItem of selectedItems) {
//             if (selectedItem.renderer == 'Table' && selectedDiagramId) {
//                 const text = selectedItem.text;
//                 const x = selectedItem.transform.left;
//                 const y = selectedItem.transform.top;
//                 const { content, columnCount } = parseTableText(text);
//                 const w = (selectedItem.transform.right - x) / columnCount;
//                 const h = (selectedItem.transform.bottom - y) / content.length;

//                 for (let i = 0; i < content.length; i++) {
//                     for (let j = 0; j < columnCount; j++) {
//                         const newShape = dispatch(addShape(selectedDiagramId, 'Cell', 
//                         { position: { x: x + j * w, y: y + i * h }, size : { x: w, y: h }, 
//                         appearance : { 'TEXT': content[i][j] }}));
//                         updateRef(newShape.payload.id);
//                     }
//                 }

//                 // Save table
//                 tableInit.current['text'] = text;
//                 tableInit.current['x'] = x;
//                 tableInit.current['y'] = y;
//                 tableInit.current['w'] = w * columnCount;
//                 tableInit.current['h'] = h * content.length;
//             }
//         }

//         // Remove table when done
//         if (selectedDiagramId) {
//             dispatch(removeItems(selectedDiagramId, selectedItems));
//         }

//         onCreation.current = 1;
//     });

//     const addColumn = useEventCallback(() => {
//         // Select previous column
//         var columnItems = new Array<DiagramItem>();
//         if (selectedDiagram) {
//             selectedDiagram.items.values.forEach((e: DiagramItem) => {
//                 if (colContent.current.has(e.id)) {
//                     columnItems.push(e);
//                     colContent.current.delete(e.id);
//                 }
//             })

//             const selection = calculateSelection(columnItems, selectedDiagram);
//             dispatch(selectItems(selectedDiagram, selection));
//         }

//         // Copy and paste column
//         if (selectedDiagram) {
//             const set = DiagramItemSet.createFromDiagram(columnItems, selectedDiagram);

//             const text = `${PREFIX}${JSON.stringify(Serializer.serializeSet(set))}` as string;
    
//             if (text) {
//                 const pasteAction = dispatch(pasteItems(selectedDiagram, text.substring(PREFIX.length), OFFSET, 0));
//                 const newItems = JSON.parse(pasteAction.payload.json)['visuals'];
//                 for (let i = 0; i < newItems.length; i++) {
//                     updateRef(newItems[i].id, (i == newItems.length - 1 || newItems.length == 1) ? '' : 'col');
//                 }
//             }
//         }
//     });

//     const addRow = useEventCallback(() => {
//         // Select previous row
//         var rowItems = new Array<DiagramItem>();
//         // Copy and paste row
//         if (selectedDiagram) {
//             const set = DiagramItemSet.createFromDiagram(rowItems, selectedDiagram);

//             const text = `${PREFIX}${JSON.stringify(Serializer.serializeSet(set))}` as string;
    
//             if (text) {
//                 const pasteAction = dispatch(pasteItems(selectedDiagram, text.substring(PREFIX.length), 0, OFFSET));
//                 const newItems = JSON.parse(pasteAction.payload.json)['visuals'];
//                 for (let i = 0; i < newItems.length; i++) {
//                     updateRef(newItems[i].id, (i == newItems.length - 1  || newItems.length == 1) ? '' : 'row');
//                 }
//             }
//         }
//     });

// const saveTable = useEventCallback(() => {        
//         if (selectedDiagramId) {
//             dispatch(groupItems(selectedDiagramId, tableItems.current));
//         };

//         // Restart all refs
//         rowContent.current = new Set();
//         colContent.current = new Set();
//         tableContent.current = new Set();
//         tableItems.current = new Array();
//         onCreation.current = 0;
//     });


//     const Popup = useEventCallback(() => {
//         return (
//     <form>
//         <label>Enter your name:
//         <input type="text" />
//         </label>
//     </form>
//         );
//     });

//     return (
//         <>
//             <Tooltip mouseEnterDelay={1} title={ 'Create Table' }>
//                 <Button size='large' className='menu-item' onClick={ createTable }>
//                     <TableOutlined />
//                 </Button>
//             </Tooltip>
//             <Tooltip mouseEnterDelay={1} title={ 'Save Table' }>
//                 <Button size='large'  className='menu-item' onClick={ Popup}>
//                     <CheckSquareOutlined />
//                 </Button>
//             </Tooltip>
//             <Tooltip mouseEnterDelay={1} title={ 'Edit Table' }>
//                 <Button size='large' disabled={onCreation.current != 0} className='menu-item' onClick={ editTable }>
//                     <EditOutlined />
//                 </Button>
//             </Tooltip>
//             <Tooltip mouseEnterDelay={1} title={ 'New Column' }>
//                 <Button size='large' disabled={onCreation.current == 0} className='menu-item' onClick={ addColumn }>
//                     <InsertRowRightOutlined />
//                 </Button>
//             </Tooltip>
//             <Tooltip mouseEnterDelay={1} title={ 'New Row' }>
//                 <Button size='large' disabled={onCreation.current == 0} className='menu-item' onClick={ addRow }>
//                     <InsertRowBelowOutlined />
//                 </Button>
//             </Tooltip>

//         </>
//     );
// });

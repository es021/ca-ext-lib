//
// CA Gen
// Copyright (C) 2016 CA. All rights reserved.
//
// File Name: ief_Make.js                    Date: 01/11/2002
//
// Purpose: Functions for Make support and Disabled By support
//
//          Change History
//-----+----------+-------------------------------------------------------------
// Who |   When   |  Description
//-----+----------+-------------------------------------------------------------
// JMS | 02/26/02 | Added addABControl and findABControl
// JMS | 02/27/02 | Updated for Classic mode
// yjl | 03/08/02 | Fixed Menu disabled/enabled problem for Netscape 6.2.1
// JMS | 03/15/02 | Added check for undefined in updateWindowList
//skor | 04/25/02 | Added code for Queue Implementation
// JMS | 05/31/02 | Added code for ActiveX and Java Plug-n
// DSX | 08/14/02 | Made Readonly Edit Fields part of Spans
// RJA | 10/29/02 | Client-side js reduction
// JMS | 11/12/02 | History handling fixes
// JMS | 11/18/02 | ActiveX support for Netscape 7.0
// RJA | 11/18/02 | Performance change fixes
// SKOR| 11/19/02 | Fixed Extra Blank Line Problem in DropDownLists-issue 12301668
// JMS | 11/22/02 | Corrected Visibility check in  elementUpdateFocus()
// SKOR| 11/25/02 | Changed doublequotes to SingleQuotes in getArgs()
// SKOR| 12/04/02 | 12273604 Added check for Radio
// JMS | 12/13/02 | 12357260 Corrected focus (MAKE CURSOR)
// RJA | 12/13/02 | 12390028 Fixed WebSphere, WebLogic, IE and NS failure to
//                  work beyond first page and OCX select message events
//                  occuring before controller was loaded.
// RJA | 12/13/02 | 12401040 radio buttons broken in NS for coop07/exits
// tcr | 03/24/03 | Corrected Visibility check in elementUpdateFocus()
// rja/| 04/16/03 | 12520481 Disabled by for listbox
//  fc |
// yjl | 06/004/03| 12653364 updateAttributes() - retrieve control's foreground 
//     |          | color and/or background color from DEFAULTCOLOR.   
// fc  | 06/03/03 | 12638497, 12716079 set end of dropdown listbox
// SKOR| 07/24/03 | 12835558 Added Picture Control
// SKOR| 07/30/03 | 12577598 Added Password type to DisabledBy logic
// yjl | 07/30/03 | 12725384 Fixed Make Cursor problem in elementUpdateFocus()
// jms | 08/08/03 | 12851284 Make sure the Controller is present before processing event
// skor| 08/14/03 | 12761260 Menu not getting Enabled
// jms | 08/21/03 | 12851284 Make sure the Controller is present before processing event...again
// skor| 09/24/03 | Support for HyperText Links
// tcr/| 12/11/03 | 12970210 MAKE PROTECT problem with RadioButtonGroup
// mq  |          | 13021641 MAKE ERROR problem with RadioButtonGroup
// skor| 12/19/03 | Fixed Blank Line Problem in Permitted Value DropDown on IE
// yjl/| 01/28/04 | Listbox toggles its content when associated with disabledby statement
// mq  |          |
// skor| 03/30/04 | 13316854 Fix for Portal
// tcr | 04/12/04 | 13247587 Fixed "has data/does not have data" disabling logic for
//     |          |          drop down lists.
// skor|05/13/04  | 13433432  Fixed Disabled By for Tables
// tcr | 07/14/04 | 13050033 Fixed MAKE...Containing Cursor for Dialogs deployment mode.
// tcr | 07/22/04 | 13395137 Fixed MAKE...Reverse Video for fields which do not have
//     |          |          their foreground/background colors explicitly defined.
// skor|08/06/04  | 13612715  Performance Improvement changes
// SKor| 08/17/04 | 13576026 Mozilla Support
// yjl | 11/03/04 | 13778527 Added isNumeric to ANDLIST
//skor | 11/19/04 | 13757815 Moved doClick and doDblClick from ief_ListBox.js 
// yjl |01/14/05  | 13893601 Mozilla 1.7.5 support - correct probelm in setValue()  
//skor |01/21/05  | 13886648 Fixed sized listbox click event message not appearing. 
// tcr | 03/24/05 | 13757307 Selected row highlighting was lost if listbox had
//     |          |          disabled by conditions defined.
// fc  | 04/15/05 | 14036615 Second event not sent to runtime when response is slow
// skor| 06/07/05 | 14198517 - Button Caption not appearing properly in Mozilla
// yjl | 06/30/05 | 14210315 - used getForegroundColor() and getBackgroundColor() 
// THOD| 07/19/05 | 14228776 - initPage split into initPage and initPageFocus, change
//     |          |           intializeFramePage to call both.
//     |          |           For Mozilla, the set focus code must follow the populating
//     |          |           of the field data otherwise, an extra onChange will
//     |          |           fire.
// skor| 08/01/05 | 13987247 - Change cursor style to default for ie5.5
// yjl | 08/09/05 | 14316349 - added getCurrentDefaultFBColor(), getForegroundColorFromCSS()
//     |          |           and getBackgroundColorFromCSS()
// yjl | 09/01/05 | 13494687 - modified for importing fixed size and varying size table.
// tcr | 09/07/05 | 14262452 Fixed disabled hypertext link logic
// skor| 10/19/05 | 14435139 - Picture Control not getting Focus
// skor| 02/27/06 | 14517560 - Button Caption not changing
// yjl | 03/01/06 | 14407042 - Entering all spaces in text field should be considered as 
//     |          |            no data for 'Disabled By'
// skor| 05/10/06 | 14870668 - ActiveX Controls are not displayed in the browser if they are not installed 
// tcr | 05/23/06 | 14768041 Do not fire the Changed event if the user clicks
//     |          |          the Radio Button that is already selected
// skor| 05/26/06 | Changes to ListBox KeyBoard Navigation
// mq  | 05/29/06 | 14734340 Fixed /varying table problem if no prompt specified
// gaf | 07/27/06 | 14374860 Re-implmented Firefox dialog box support including modal
// fc  | 06/08/06 | 14904450 Data compression error on unbalanced frequency tree
// fc  | 06/15/06 | 14959107 DISABLE in PAD should override UI disabling
// mq  | 08/07/06 | 14869791 Web runtime entry delay problem
// yjl | 03/01/06 | 15315033 support text-decoration (underline or line-through)
// yjl | 06/13/07 | 16070942 CssClass support 
// mq  | 06/25/07 | 15778751 Disabledby does not work if first digit is 0
// yjl | 09/12/07 | 16070942 - CssClass support for Listbox and Table
// yjl | 09/28/07 | 16391208 - Do not call updateControlCssClass if cssClass is null
// raja| 10/01/07 | 16401782 Changes for Tabbed browsing support.
// yjl | 10/16/07 | 16070942 - added findMenuDivId() and updateMenuCssClass() 
// yjl | 10/30/07 | 16070942 - support dynamic CssClass for groupbox line.
// mq  | 11/02/07 | 16233411 Radiobutton problem with SPACE
// mq  | 11/06/07 | 16163900 Disabledby problem with dropdown list with default value
// fc  | 03/28/08 | 16815942 complete page initialization before dialog box display
// mq  | 09/08/08 | 17017144 disabledby problem if field data has decimal places
// fc  | 10/22/08 | 17564682 MAKE cursor in Open event handler ignored
// tcr | 11/24/08 | 17648757 disabledby problem if field data has leading spaces
// mq  | 05/15/09 | 17977781 web radiobutton permitted value is 0 caused problem
// tcr | 09/16/09 | 18607446 disabledby problem after numeric field in error
// fc  | 01/22/10 | Add tests of typeof ... 'unknown' to prevent problems with COM+
// tcr | 04/14/10 | 19093315 Fixed CSS setting of transparent fg/bg color on Firefox
// tcr | 10/11/11 | 20574901 Prevent queueing duplicate events
// tcr | 10/23/12 | 21138069 Browser Controlled History problems
//skor | 01/30/13 | 21102746 Fix error with modelessdialogs in ie9
//skor | 04/03/13 | 21350933 CheckBox not getting selected
//                | 21350823 RadioButton not getting selected
// tcr | 06/23/15 | 00061960 Also check userAgent to identify Internet Explorer
//-----+----------+-------------------------------------------------------------
var hexTable= new Array("00","01","02","03","04","05","06","07","08","09","0A","0B","0C","0D","0E","0F","10","11","12","13","14","15","16","17","18","19","1A","1B","1C","1D","1E","1F","20","21","22","23","24","25","26","27","28","29","2A","2B","2C","2D","2E","2F","30","31","32","33","34","35","36","37","38","39","3A","3B","3C","3D","3E","3F","40","41","42","43","44","45","46","47","48","49","4A","4B","4C","4D","4E","4F","50","51","52","53","54","55","56","57","58","59","5A","5B","5C","5D","5E","5F","60","61","62","63","64","65","66","67","68","69","6A","6B","6C","6D","6E","6F","70","71","72","73","74","75","76","77","78","79","7A","7B","7C","7D","7E","7F","80","81","82","83","84","85","86","87","88","89","8A","8B","8C","8D","8E","8F","90","91","92","93","94","95","96","97","98","99","9A","9B","9C","9D","9E","9F","A0","A1","A2","A3","A4","A5","A6","A7","A8","A9","AA","AB","AC","AD","AE","AF","B0","B1","B2","B3","B4","B5","B6","B7","B8","B9","BA","BB","BC","BD","BE","BF","C0","C1","C2","C3","C4","C5","C6","C7","C8","C9","CA","CB","CC","CD","CE","CF","D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","DA","DB","DC","DD","DE","DF","E0","E1","E2","E3","E4","E5","E6","E7","E8","E9","EA","EB","EC","ED","EE","EF","F0","F1","F2","F3","F4","F5","F6","F7","F8","F9","FA","FB","FC","FD","FE","FF");
var chCodeMap = new Array(17);
var zeroes = "00000000";
var pushed = 0;
var myTimeout = null;
var cancelClick ;
var tblVar = null;

var LBHomekey = 36;   
var LBEndkey = 35;
var LBMovefocus = 39;


try{
 var ie4 = false;
 var ns4 = false;
 var ns6 = false;
 if ((navigator.userAgent.indexOf("Trident") != -1) || (navigator.appName.indexOf("Internet Explorer") != -1)) {
    ie4 = true;
 } else {
    ns4 = ((navigator.appName.indexOf("Netscape") != -1) && (navigator.appVersion.substring(0,1) <= 4));
    ns6 = ((navigator.appName.indexOf("Netscape") != -1) && (navigator.appVersion.substring(0,1) > 4));
 }
var eventinfo = new Array();
var eventinProcess = false;
var prev_eventinfo = new Array() ;
var dataContinue;
var disabledbyChecked = false;


function getData() {
    base.updateWindowData();
}

function genLPK(){
 AppWindow.document.write("<OBJECT CLASSID = 'clsid:5220cb21-c88d-11cf-b347-00aa00a28331' VIEWASTEXT>");
 AppWindow.document.write("<PARAM NAME='LPKPATH' VALUE='genocx.lpk'>");
 AppWindow.document.write("</OBJECT>"); 
}

function isFreed(ctrl) { try{ctrl.update(); return false;}catch(e){return true;}};

function isWindowClosed(val) { try{return eval(val)== null;}catch(e){return true;}};


function instanciate(args) {
   if ( typeof args != 'undefined' && typeof args != 'unknown') {
     baseControlStr = "base."+args[2]+"_"+args[1]+"_"+args[3];
     baseControl = eval(baseControlStr);
     if ( typeof baseControl == "undefined" || typeof baseControl == "unknown" ||
          isFreed(baseControl)) {// if use parent. then when dialog goes away
                                 // js becomes undef, if use base, then when
                                 // base is lost due to transfer js becomes undef
        instanciateStr = baseControlStr+"=new AppWindow.parent."+args[0];
        getArgs(args, 2);
        try {
            baseControl = eval(instanciateStr);
//            baseControl.controlFrame=this;  // store frame owning control
        } catch (e) {
            baseControl = null;
        }
     } else {
        instanciateStr = "baseControl.update";
        getArgs(args, 4);
        eval(instanciateStr);
     }
     return baseControl;
   }
}

function getArgs(args, argsStart ) {
    instanciateStr+="(";

    //instanciateStr+=args[3]+",";

    for ( i = argsStart; i < args.length; i++ ) {
       if ( i > argsStart )
          instanciateStr+=",";
       if ( typeof args[i]=="string" ) {
          instanciateStr+="'"+args[i]+"'";
       } else if ( typeof args[i]=="object" ) { //array
         instanciateStr+='args['+i+']';
       } else {
          instanciateStr+=args[i];
       }
    }
    instanciateStr+=")";
    return instanciateStr;
}
//RJA101502 function LB( fieldName, lastRow, topRow, value ) {
function LB( parentName, fieldName, value, lastRow, topRow, columnCount, tableType, cssClass, pCssClass ) {
    this.update=function update( value, lastRow, topRow, columnCount, tableType, cssClass, pCssClass ) {
//      this.control=newFindElement(this.fieldName);
      this.lastRow = lastRow;
      this.topRow=topRow;
      this.value = value;
      this.position=topRow;
      this.firstRow=topRow+1;      
      try {
        this.firstScroll=eval(fieldName+"firstScroll");
        this.scrollAmount=eval(fieldName+"scrollAmount");
        this.maxVisibleRows = eval(fieldName+"rowDisplay");      
      } catch (e) {
         return null;
      }
      this.columnCount = columnCount;
      this.cssClass = cssClass;    //16070942 
      this.pCssClass = pCssClass;  //16070942 
      if ((this.pCssClass == null) || (typeof this.pCssClass == 'undefined') || (typeof this.pCssClass == 'unknown')) {
        this.pCssClass = new Array();
        for (var i=0; i<this.columnCount; i++)
          this.pCssClass[i] = null; 
      }                           //16070942               
    }
    this.parentName = parentName;
    this.fieldName = fieldName;
//    this.firstScroll=eval(fieldName+"firstScroll");
//    this.scrollAmount=eval(fieldName+"scrollAmount");
    this.window = self;
    this.parentFrame = null;
    this.columnCount = 0;
    this.fcolor = ''; //14210315
    this.bcolor = ''; //14210315 

    this.update(value, lastRow, topRow, columnCount, tableType, cssClass, pCssClass );

    // common attributes    
    this.protect = 0;  
  
    this.getTopRow = function getTopRow() { return this.topRow; }
    this.getLastRow = function getLastRow() { return this.lastRow; }
    this.getFirstRow = function getFirstRow() { return this.firstRow; }
    this.getFirstScroll = function getFirstScroll() { return this.firstScroll; }
    this.getScrollAmount = function getScrollAmount() { return this.scrollAmount; }
    this.getPosition = function getPosition() { return this.position; }
    this.getValue = function getValue() { return this.value; }
    this.getColumnCount = function getColumnCount() { return this.columnCount; }
    this.getParentFrame=function getParentFrame() {return this.parentFrame; }
    this.getMaxVisibleRows = function getMaxVisibleRows() { return this.maxVisibleRows; }
    this.getFcolor = function getFcolor() {
         //16070942 if (this.fcolor == '') this.fcolor = getForegroundColor(this.fieldName); //14210315
         return this.fcolor; }
    this.getBcolor = function getBcolor() {
         //16070942 if (this.bcolor == '') this.bcolor = getBackgroundColor(this.fieldName); //14210315
         return this.bcolor; }
    this.getColorArray = function getColorArray() {return this.colorArray;}
    // visual display attributes and values
    this.getDisplaySelectedIndicator = function getSelectedDisplayIndicator() {return this.selectedDisplayIndicator;}
    this.getSelectedIndicator = function getSelectedIndicator() {return this.selectedIndicator;}
    this.getDisplayValue = function getDisplayValue() {return this.displayValue;}
    this.getDisplayDynamicAttribute = function getDisplayDynamicAttribute() {return this.displayDynamicAttribute;}
    this.getDisplayCssClass = function getDisplayCssClass() {return this.displayCssClass;} //16070942
    this.getDisabled = function getDisabled() { return this.disabled; }
    this.setDisabled = function setDisabled(disabled) { this.disabled = disabled;
    if (typeof this.control != "undefined" && typeof this.control != "unknown")  //12520481
		{this.control.disabled=disabled;} }  //12520481


    this.setAttributes=base.setAttributes;
    this.setTopRow = function setTopRow(topRow) { this.topRow = topRow; }
    this.setFirstRow = function setFirstRow(firstRow) { this.firstRow = firstRow; }
    this.setFirstScroll = function setFirstScroll(firstScroll) { this.firstScroll = firstScroll; }
    this.setScrollAmount = function setScrollAmount(scrollAmount) { this.scrollAmount = scrollAmount; }
    this.setPosition = function setPosition(position) { this.position = position; }
    this.setGetContent = function setGetContent(getContent) { this.getContent = getContent;};
    this.setMaxVisibleRows = function setMaxVisibleRows(maxVisibleRows) { this.maxVisibleRows = maxVisibleRows; }
    this.setFcolor = function setFcolor(fcolor) { this.fcolor = fcolor; }
    this.setBcolor = function setBcolor(bcolor) { this.bcolor = bcolor; }
    this.setDisabled = function setDisabled(disabled) { this.disabled = disabled; }
    
    this.setColorArrayElement = function setColorArrayElement(disDA, row, col) {
      var style  = _getStyleLB(this.fieldName, disDA); //16070942 start
       this.getColorArray()[row][col] = new Array( style[0], style[1] );     
      if (style[4] == '0')         
         return "";       
      else { 
         var s1 = new Array();
         s1.push("style='");
         if (style[0] != '') 
            s1.push("color:#"+style[0]+";");            
         if (style[1] != '') 
            s1.push("background-color:#"+style[1]+";");       
         if (style[2] != '') s1.push("text-decoration:"+style[2]+";");
         s1.push(" '");
         return s1.join("");      
      }
    }   //16070942 ends

    this.setColorArray = function setColorArray()
    {
     if ( typeof this.colorArray == "undefined" || typeof this.colorArray == "unknown") {
       this.colorArray = new Array(this.maxVisibleRows);
     }
     //16070942 if (this.fcolor == '') this.fcolor = getForegroundColor(this.fieldName); //14210315
     //16070942 if (this.bcolor == '') this.bcolor = getBackgroundColor(this.fieldName); //14210315 
     for (var i=0; i<this.maxVisibleRows; i++) {
       this.colorArray[i] = new Array(this.columnCount);
       for (var j=0; j < this.columnCount; j++){
         this.colorArray[i][j] = new Array('','');  //16070942
       }
     }
    }

    this.setParentFrame=function setParentFrame(parentFrame) {this.parentFrame = parentFrame;}
    this.setColumnCount = function setColumnCount(columnCount) { this.columnCount = columnCount; }
    this.setResourceId = function setResourceId(resourceId) { this.resourceId = resourceId; }
   // this.setMultiSelect = function setMultiSelect(multiSelect) { this.multiSelect = (multiSelect=='Y'); }
   this.setMultiSelect = function setMultiSelect(multiSelect) { this.multiSelect = multiSelect; }   
   this.getCssClass = function getCssClass() { return this.cssClass; }  //16070942
   this.getpCssClass = function getpCssClass() { return this.pCssClass; }  //16070942  
    /// Sets values for ListBox
    this.setLBValues=function setLBValues( parentFrame, protect, multipleSelection) {
      this.setParentFrame(parentFrame);     
      this.protect = protect;             
      var arrayStr = "new Array(";
      for (var i=0; i<this.maxVisibleRows; i++) {
         arrayStr += "new Array()";
         if ( i<this.maxVisibleRows-1 )
            arrayStr += ",";
      }
      arrayStr += ")";
      this.displayValue = eval(arrayStr);
      this.displayDynamicAttribute = eval(arrayStr);
      this.displayCssClass = eval(arrayStr); //16070942
      this.selectedDisplayIndicator = new Array();

      this.selectedIndicator = new Array();
      this.disabled=false;
      this.setGetContent(eval("parentFrame."+this.fieldName+"getContent"));

      for (var i=0; i<this.lastRow; i++)
         this.selectedIndicator[i] = ' ';
      len = this.value.length;
      for (var i=0; i<len; i++) {
        this.selectedIndicator[i]=this.value[i][this.columnCount];
      }
      this.setColorArray();
      if ( !this.control ) {
         this.control=newFindElement(this.fieldName);       
      }    
      parentFrame.setCurrentData(this);

      // update the selected items string for the table in prep for getFormData
      parentFrame.updateTABLE(this.fieldName);
      // later could implement above by saving state in our new LB object, or better dynamically retrieving it with a new function
//      control = parentFrame.AppWindow.document.getElementById(this.fieldName);
      if ( this.control ) {
         parentFrame.resetListBoxGetContent( this );
      }     
    } // end setLBValues
}

function doClick(cell, rcid, genTH)
{   
   eventType = 'Click';   
   rowIndex = (genTH? cell.parentNode.rowIndex : cell.parentNode.rowIndex + 1);
   columnIndex = cell.cellIndex + 1;      
   AnyEvent(rcid,"R"+rowIndex+"C"+columnIndex,'Click'); 
}

function doDblClick(cell, rcid, genTH)
{
   eventType = 'DblClick';
   rowIndex = (genTH? cell.parentNode.rowIndex : cell.parentNode.rowIndex + 1);
   columnIndex = cell.cellIndex + 1;   
   AnyEvent(rcid,"R"+rowIndex +"C"+columnIndex ,'DoubleClick');  
}

function VF_Tbl( parentName, fieldName, value, lastRow, topRow, columnCount, tableType, cssClass, pCssClass ) {
   this.update=function update( value, lastRow, topRow, columnCount, tableType, cssClass, pCssClass ) {
     this.lastRow = lastRow;
     this.topRow=topRow;
     this.value = value;
     this.firstRow=topRow+1; 
     this.columnCount = columnCount;     
     this.cssClass = cssClass;    //16070942 
     this.pCssClass = pCssClass;  //16070942                      
   }
   this.parentName = parentName;
   this.fieldName = fieldName;
   this.window = self;
   this.parentFrame = null;
   this.columnCount = 0;
   this.fcolor = ''; //14210315
   this.bcolor = ''; //14210315 
  
   this.update(value, lastRow, topRow, columnCount, tableType, cssClass, pCssClass);

    // common attributes
   this.protect = 0;
   this.getValue = function getValue() { return this.value; }
   this.getLastRow = function getLastRow() { return this.lastRow; }
   this.getColumnCount = function getColumnCount() { return this.columnCount; }
   this.getParentFrame=function getParentFrame() {return this.parentFrame; }    
   this.getFcolor = function getFcolor() { 
         if (this.fcolor == '') this.fcolor = getForegroundColor(this.fieldName); //14210315
         return this.fcolor; }
   this.getBcolor = function getBcolor() { 
         if (this.bcolor == '') this.bcolor = getBackgroundColor(this.fieldName); //14210315
         return this.bcolor; }
   this.getColorArray = function getColorArray() {return this.colorArray;}
    // visual display attributes and values
    this.getDisplaySelectedIndicator = function getSelectedDisplayIndicator() {return this.selectedDisplayIndicator;}
    this.getSelectedIndicator = function getSelectedIndicator() {return this.selectedIndicator;}
    this.getDisplayValue = function getDisplayValue() {return this.displayValue;}
    this.getDisplayDynamicAttribute = function getDisplayDynamicAttribute() {return this.displayDynamicAttribute;}
    this.getDisplayCssClass = function getDisplayCssClass() {return this.displayCssClass;} //16070942
    this.getDisabled = function getDisabled() { return this.disabled; }
    this.setDisabled = function setDisabled(disabled) { this.disabled = disabled; }
    this.setAttributes=base.setAttributes;  
    this.setFcolor = function setFcolor(fcolor) { this.fcolor = fcolor; }
    this.setBcolor = function setBcolor(bcolor) { this.bcolor = bcolor; }
    this.setDisabled = function setDisabled(disabled) { this.disabled = disabled; }   
    this.setColorArrayElement = function setColorArrayElement(disDA, row, col) {
     var style  = _getStyleLB(this.fieldName, disDA);   //16070942 start
       this.getColorArray()[row][col] = new Array( style[0], style[1] );     
      if (style[4] == '0')         
         return "";       
      else { 
         var s1 = new Array();
         s1.push("style='");
         if (style[0] != '') 
            s1.push("color:#"+style[0]+";");            
         if (style[1] != '') 
            s1.push("background-color:#"+style[1]+";");       
         if (style[2] != '') s1.push("text-decoration:"+style[2]+";");
         s1.push(" '");
         return s1.join("");      
      }
    }   //16070942 ends          
       
    this.setColorArray = function setColorArray()
    {
     if ( typeof this.colorArray == "undefined" || typeof this.colorArray == "unknown") {
       this.colorArray = new Array(this.lastRow);
     }
     //16070942 if (this.fcolor == '') this.fcolor = getForegroundColor(this.fieldName); //14210315
     //16070942 if (this.bcolor == '') this.bcolor = getBackgroundColor(this.fieldName); //14210315  
     for (var i=0; i<this.lastRow; i++) {
       this.colorArray[i] = new Array(this.columnCount);
       for (var j=0; j < this.columnCount; j++){
          this.colorArray[i][j] = new Array('','');  //13494687
       }
     }
    }  
    this.setParentFrame=function setParentFrame(parentFrame) {this.parentFrame = parentFrame;}
    this.setColumnCount = function setColumnCount(columnCount) { this.columnCount = columnCount; }
    this.setResourceId = function setResourceId(resourceId) { this.resourceId = resourceId; }
    this.setMultiSelect = function setMultiSelect(multiSelect) { this.multiSelect = multiSelect; }
    //16070942 start    
    this.setClassName = function setClassName(obj) {
     if ((typeof this.cssClass != 'undefined') && (typeof this.cssClass != 'unknown') && (this.cssClass != null) && (this.cssClass != obj.className))       
        obj.className = this.cssClass;    
     var pObj = null;  
     if ((this.pCssClass != null) && (this.pCssClass.length > 0)) {
        for (var i=0; i<this.pCssClass.length; i++)  {  
          if (this.pCssClass[i] != null)  {       
             pObj = AppWindow.document.getElementById(fieldName+"LblSpan"+(i+1));         
             if (pObj != null)
                pObj.className = this.pCssClass[i];
          }  
        }   
     } 
    } //16070942 end
    // Sets values for ListBox
    this.setLBValues=function setLBValues( parentFrame, protect, multipleSelection) {
     this.setParentFrame(parentFrame);    
     this.protect = protect;
     this.setMultiSelect(multipleSelection);
      var arrayStr = "new Array(";
      for (var i=0; i<this.lastRow; i++) {
         arrayStr += "new Array()";
         if ( i<this.lastRow-1 )
            arrayStr += ",";
      }
      arrayStr += ")";
      this.displayValue = eval(arrayStr);
      this.displayDynamicAttribute = eval(arrayStr);
      this.displayCssClass = eval(arrayStr); //16070942
      this.selectedDisplayIndicator = new Array();
      this.selectedIndicator = new Array();
      this.disabled=false;       
      parentFrame.eval(this.fieldName+"getTblContent()"); 
      for (var i=0; i<this.lastRow; i++)
         this.selectedIndicator[i] = ' ';
      len = this.value.length;   
      for (var i=0; i<len; i++) {
        this.selectedIndicator[i]=this.value[i][this.columnCount];
        //this.selectedIndicator[i]=this.value[i];
      }
      //this.setColorArray();- called by initialDrawTable(), setFixedExtListBoxData() instead
      if ( !this.control ) {
         this.control=newFindElement(this.fieldName);
      }     
      if(tableType == 'V')
         parentFrame.setCurrentTblData(this);
      parentFrame.updateTABLE(this.fieldName);
   } // end setLBValues
}

function EntryField( parentName, fieldName, value) {
    setCommon(this, parentName, fieldName, value);
    this.setValue=base.setValue;
    this.update=function update( value ) { this.value = value; }
    return this;
}

function MLE( parentName, fieldName, value) {
    setCommon(this, parentName, fieldName, formattedValue(value));
    this.setValue=base.setValue;
    this.update=function update( value ) { this.value = formattedValue(value); }
    return this;
}

function ComboBox( parentName, fieldName, value ) {
    setCommon(this, parentName, fieldName, value);
    this.setValue=base.setValue;
    this.update=function update( value ) { this.value = value; }
    return this;
}

function CheckBox( parentName, fieldName, value ) {
    setCommon(this, parentName, fieldName, value);
    this.setValue=base.setChecked;
    this.update=function update( value ) { this.value = value; }
    return this;
}

function RadioButton( parentName, fieldName, value, cssClassArray ) {
    setCommon(this, parentName, fieldName, value);
    this.cssClassArray = cssClassArray;
    this.setValue=base.setRadioValue;
    this.update=function update( value, cssClassArray ) {
      this.value = value;
      this.cssClassArray = cssClassArray;   //16070942
      if ((typeof this.cssClassArray != 'undefined') && (typeof this.cssClassArray != 'unknown') && (this.cssClassArray != null)) {
        var obj = null; 
        for (var i=0; i < this.cssClassArray.length; i++) {
          if ((this.cssClassArray[i] != "undefined") && (this.cssClassArray[i] != null)) {
             obj = newFindElement(this.fieldName+'_'+(i+1));
             updateControlCssClass(obj, this.cssClassArray[i]);  
          }            
        } //for  
      } //if
    }
    return this;
}

function DDLB( parentName, fieldName, value, selection ) {
    setCommon(this, parentName, fieldName, value);
    this.selection = selection;
    this.update=function update( value, selection ) {
       this.value = value;
       this.selection=selection;
    }
    this.setValue=base.setDataArray;
}

function CommandButton( parentName, fieldName, caption, visibility, cssClass) {
    setCommon(this, parentName, fieldName, caption);
    this.setValue=base.setCommandButton;
    this.visibility=visibility;
    this.cssClass=cssClass;   //16070942
//Following line causes problems for several pages abgkill\logon;egolf\egolfer1;...
// because findElement fails due to not having loaded the HTML page yet.
// May use a delay to fix this
//    setStyleAttributeText(parent.findElement(this.fieldName, 0), "visibility", this.visibility);
    this.update=function update( value, visibility, cssClass) {
       this.control=newFindElement(this.fieldName);
       if ((this.control == null) || (typeof this.control == "undefined") || (typeof this.control == "unknown")) return; //16070942 
//       this.control=this.controlFrame.newFindElement(this.fieldName);
       if ( typeof value != "undefined" && typeof value != "unknown") {
         if(value!="")
            this.control.innerHTML = value;     //14517560 
         this.visibility=visibility;
         if ( typeof AppWindow == "undefined" || typeof AppWindow == "unknown")
         {
//            alert("parentName="+this.parentName + "  fieldName="+this.fieldName);
//try{
            alert("would have thrown exception");
//}catch(e){}
         } else {
           //control=AppWindow.parent.findElement(this.fieldName, 0);
           this.setValue();
         }
       }  
       this.cssClass=cssClass;   //16070942 
       updateControlCssClass(this.control, this.cssClass); //16070942                                 
    }
    return this;
}

function setCommandButton() {   
    if ( this.value != "" ) {
      this.control.value = this.value;
    }
    setStyleAttributeText(this.control, "visibility", this.visibility);
    setStyleAttributeText(this.control, "type", "button");
}


function genPictKeypress(evt)
{
  var thisEvt = null ;
  var thisEl = null ;
  if (parent.ns6) { thisEvt = evt ; thisEl=thisEvt.target ; }
  else { 
     if (parent.AppWindow != null) {
        thisEvt = parent.AppWindow.event ; }
     else {
        thisEvt = AppWindow.event; }
     thisEl=thisEvt.srcElement ; }    
  if (thisEvt.keyCode==32)             
                genCtrlSPACE(thisEl);    
}

function genSetPictKeyboard( inName ) {
try {    
  thisEl = AppWindow.document.getElementById(inName);  
  thisEl.onkeyup=genPictKeypress ;  
} catch (e) { throw(e) ; }
} // end of function
//

function genCtrlSPACE(thisEl){     
      pushed++;     
      if(pushed < 2){               
            cancelClick = false;    
            ctrlVar = thisEl;                     
            myTimeout = setTimeout("execCtrlClick()",200);                               
      }else {                     
           cancelClick = true;  
           if(ie4) {     
              thisEl.fireEvent('ondblclick');    
           }else{
              if(thisEl.tagName=="IMG")
                 thisEl.ondblclick();
              else
                 thisEl.dblclick();
           }
             clearTimeout(myTimeout);
             pushed = 0;  
     }    
}

function execCtrlClick(){
  if(!cancelClick) {
       if(ie4) {
         ctrlVar.click();
       }else{
         if(ctrlVar.tagName=="IMG")
              ctrlVar.onclick();        
         else
              ctrlVar.click();      
       }
  }
  clearTimeout(myTimeout);
  pushed = 0;  
}
//16070942 - CssClass for window
function updateWindowCssClass(frameSet, name, cssClass) {
  var obj = frameSet.frames[0].document.getElementById(name); 
  if ((obj == null) || (typeof obj == 'undefined') || (typeof obj == 'unknown')) return; 
  if (obj.className != cssClass) obj.className = cssClass;      
}
//16070942 For push button, literal, picture, statusbar and toolbar. 
function updateControlCssClass(control, cssClass) {
  if ((cssClass == null) || (cssClass == 'undefined')) return;
  if ((control == null) || (typeof control == 'undefined') || (typeof control == 'unknown')) return; 
  if (control.className != cssClass) control.className = cssClass;       
}
function Picture( parentName, fieldName, caption, BitmapName, cssClass ) {
 setCommon(this, parentName, fieldName, caption);
 this.cssClass = cssClass;
 this.update = function update(value, BitmapName, cssClass) {
    this.cssClass = cssClass;
    if (((BitmapName != null) && (typeof BitmapName != 'undefined') && (typeof BitmapName != 'unknown') && (BitmapName !=''))
     || ((cssClass != "undefined") && (cssClass != null)))   
       this.control = newFindElement(this.fieldName); 
    if ((this.control == null) || (typeof this.control == "undefined") || (typeof this.control == "unknown")) return; //16070942 
    if ((BitmapName != null) && (typeof BitmapName != 'undefined') && (typeof BitmapName != 'unknown') && (BitmapName !='')) 
      this.control.src = BitmapName;   
    updateControlCssClass(this.control, this.cssClass); //16070942   
 } 
}
//16070942 - added to support dynamic CSS Class 
function StaticText(parentName, fieldName, cssClass) {
 setCommon(this, parentName, fieldName, null); 
 this.update = function update(cssClass) { 
   if ((cssClass == "undefined") || (cssClass == null)) return;    
   this.control = newFindElement(this.fieldName);    
   updateControlCssClass(this.control, cssClass);   
 }  
}
function GroupBox(parentName, fieldName, cssClass, lineCssClass) {
 setCommon(this, parentName, fieldName, null); 
 this.update = function update(cssClass,lineCssClass) {   
   if (((cssClass == "undefined") || (cssClass == null)) 
       && ((lineCssClass == "undefined") || (lineCssClass == null))) return;     
   this.control = newFindElement(this.fieldName);    
   if ((this.control == null) || (typeof this.control == 'undefined') || (typeof this.control == 'unknown')) return; 
   var legend = null;
   if (this.control.tagName == 'FIELDSET')  { 
     if (((lineCssClass != "undefined") && (lineCssClass != null)) && (this.control.className != lineCssClass)) 
       this.control.className = lineCssClass;   
     if (ie4)
       legend = this.control.firstChild; 
     else
       legend = this.control.childNodes[1]; 
     if (((cssClass != "undefined") && (cssClass != null)) && (legend.className != cssClass))
       legend.className = cssClass;   
   }  
 }  
}
function ToolBar(parentName, fieldName, cssClass) {
 setCommon(this, parentName, fieldName, null); 
 this.update = function update(cssClass) { 
    if ((cssClass == "undefined") || (cssClass == null)) return;     
    this.control = newFindElement(this.fieldName);    
    updateControlCssClass(this.control, cssClass);  
 }
}
function StatusBar(parentName, fieldName, cssClass) {
 setCommon(this, parentName, fieldName, null); 
 this.update = function update(cssClass) {  
    if ((cssClass == "undefined") || (cssClass == null)) return;    
    this.control = newFindElement(this.fieldName);    
    updateControlCssClass(this.control, cssClass); 
 }  
}
//CssClass for Menu
function updateMenuCssClass(frameset, menuCssClassArray) {
 if ((menuCssClassArray == 'undefined') || (menuCssClassArray == null)) return;
 if (menuCssClassArray.length == 0) return;
 var obj = null;
 var menu1 = null; 
 var div_id = null;
 for (var i = 0; i<menuCssClassArray.length; i++) {
    menu1 = menuCssClassArray[i];
    if (menu1[1] != null)  {
       if (menu1[0] == 'MENU_BAR') {
          obj = frameset.AppWindow.document.getElementById("Menu1");  
          frameset.AppWindow.updateMenuBarCssClass(obj,menu1[1]);       
       } 
       else {
          div_id = findMenuDivId(menu1[0]);
          obj = frameset.AppWindow.document.getElementById(div_id);
          frameset.AppWindow.updateMenuItemCssClass(obj,menu1[1]);
       }      
    } //if
 } //for
}
//find MenuItem's DIV id in the MENULIST Array.
function findMenuDivId(name)  {
 var div_id = '';
 if ((typeof menulist != 'undefined') && (typeof menulist != 'unknown') && (menulist != null)) {
   for (var k=0; k < menulist.length; k++)  {
      if (menulist[k].menu_name == name)  {
        div_id = menulist[k].div_id;
        break;
      }
   } // for
 } // if 
 return (div_id);
}
//Reset Menu's status flag - called by the JavaScript code from the Controller page
function resetMenuStatus(name, statusflag)  {  
 var div_id = findMenuDivId(name);                       
 if (div_id != '')    {                                      
    var obj = findElement(div_id, -2); 
    var disabled_flag = ((statusflag == "0") || (statusflag == 0))? true:false; 
    if (obj != null)   {                                    
      obj.disabled = disabled_flag;        
      Menu_Disabled(obj, disabled_flag);   
    }                                    
 }                                      
}           
//16070942 - end

function setStyleAttributeText(control, attributeName, value) {
   if (attributeName == "textDecoration") {     
      if (value != 'none') //15315033
         eval( 'control'+(ie4?".runtimeStyle":".style")+"."+attributeName+"='"+value+"'" );   
      else 
         eval( 'control'+(ie4?".runtimeStyle":".style")+".textDecoration=''" );//16070942   
   }
   else
     eval( 'control'+(ie4?".runtimeStyle":".style")+"."+attributeName+"='"+value+"'" );
}

function setCommon(it, parentName, fieldName, value) {
    it.parentName = parentName;
    it.fieldName = fieldName;    
    it.value = value;
    it.fgColor = ''; //14316349
    it.bgColor = ''; //14616349   
    it.setAttributes=base.setAttributes;
}

function setAttributes( protect, bgColor, fgColor, underline, focus, cssClass, pCssClass ) {
    this.protect = protect;
    this.getProtect = function getProtect() { return this.protect; }
    this.fgColor = fgColor;  //16070942 
    this.bgColor = bgColor;  //16070942
    this.underline = underline;
    this.focus =  (focus == "true");
    this.cssClass = cssClass;    //16070942
    this.pCssClass = pCssClass;  //16070942
    this.setCssClass = base.setCssClass; //16070942
    this.updateAttributes=base.updateAttributes;
    return this;
}
//14210315 start
// For Mozilla/Firefox: The colorString is 'rgb(255,255,255)'. Convert it to hexadecimal triplet format.
function RGBtoHex(colorString)  { 
  var hex = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'); 
  var color = colorString.substring(colorString.indexOf('(')+1,colorString.lastIndexOf(')'));
  var cArray = color.split(',');
  var hexaColor = '';
  var c1; 
  for (var i = 0; i < cArray.length; i++) { 
     c1 = cArray[i];
     hexaColor += hex[Math.floor(c1/16)]+hex[c1%16]; 
  } 
  return hexaColor;
}
// retrieve foreground and background colors from current CSS (including user's overriding CSS).
// called by AppWindow's onload event (14316349)  
getCurrentDefaultFBColorDone = false; //used by setAttributes() 
function getCurrentDefaultFBColor() { 
  getCurrentDefaultFBColorDone = false;  
  var f1;
  var b1; 
  var n1;
  if ((typeof defaultFBColor != 'undefined') && (typeof defaultFBColor != 'unknown') && (defaultFBColor.length>0))  {
    for (var i=0; i<defaultFBColor.length; i++) { 
      n1 = defaultFBColor[i].name;
      f1 = getForegroundColorFromCSS(n1);
      b1 = getBackgroundColorFromCSS(n1);
      if ((f1 != '') && (f1 != defaultFBColor[i].fcolor)) defaultFBColor[i].fcolor=f1;
      if ((b1 != '') && (b1 != defaultFBColor[i].bcolor)) defaultFBColor[i].bcolor=b1;  
    }
  } 
  getCurrentDefaultFBColorDone = true;
} 
function getForegroundColorFromCSS(name) { 
  var fcolor = '';   
  var obj1 = newFindElement(name); 
  if ((obj1 != 'undefined') && (obj1 != null)) { 
     if (ie4)   { 
        fcolor = obj1.currentStyle.color;
        if (fcolor != 'transparent')   {             
           if (fcolor.substr(0,1) == '#')  
              fcolor = fcolor.substr(1,6);            
        } 
        else fcolor = '';          
     }
     else {   
       try {
        var style1 = self.window.frames['AppWindow'].document.defaultView.getComputedStyle(obj1,'');
        if ((style1 != 'undefined') && (style1 != null) )  { 
           var fcolor1 = style1.getPropertyValue('color');
           if ((fcolor1 != 'undefined') && (fcolor1 != '') && (fcolor1 != 'transparent'))
              fcolor = RGBtoHex(fcolor1);
           else
              fcolor = '';
        }  
       } catch (e) { return ''; }
     }  
  } 
  return fcolor;  
 }
function getBackgroundColorFromCSS(name) {  
  var bcolor = '';   
  var obj1 = newFindElement(name); 
  if ((obj1 != 'undefined') && (obj1 != null)) {   
     if (ie4)   {
        bcolor = obj1.currentStyle.backgroundColor;
        if (bcolor != 'transparent')  {
           if (bcolor.substr(0,1) == '#') 
           bcolor = bcolor.substr(1,6);
        }
        else bcolor = ''; 
     }
     else {
        try {
         var style1 = self.window.frames['AppWindow'].document.defaultView.getComputedStyle(obj1,''); 
         if ((style1 != 'undefined') && (style1 != null) )  {       
            var bcolor1 = style1.getPropertyValue('background-color');
            if ((bcolor1 != 'undefined') && (bcolor1 != '') && (bcolor1 != 'transparent'))
               bcolor = RGBtoHex(bcolor1);
            else
               bcolor = '';
         }  
        } catch (e) { return ''; }
     } 
  }  
  return bcolor;   
}
//14210315 end 
//16070942 start 
function setCssClass(frame)    {
  // For field's control
  if ((typeof this.cssClass != "undefined") && (typeof this.cssClass != "unknown") && (this.cssClass != null))  {
     var obj = null;
      // radio button control's class attribute 
     if (this.control.type  == "radio") {
        for (var i=0; i < this.control.form.length; i++) {
           if (ie4)
              obj = this.control.form.children[i];
           else
              obj = this.control.form.elements[i].parentNode;
           if (this.cssClass != obj.className) 
              obj.className = this.cssClass; 
        } 
     }
     else {    
        // checkbox control's class attribute is on SPAN tag
        if (this.control.type  == "checkbox") {
           if (ie4)
              obj = this.control.parentElement;
           else
              obj = this.control.parentNode;     
        }
        else // non-check box control
           obj = this.control;      
        if (this.cssClass != obj.className) 
           obj.className = this.cssClass; 
     }    
  }
  // For field's prompt
  if ((typeof this.pCssClass != "undefined") && (typeof this.pCssClass != "unknown") && (this.pCssClass != null)) { 
      this.prompt=frame.newFindElement(this.fieldName+'LblSpan');            
      if ((this.prompt != "undefined") && (this.prompt != null) && (this.pCssClass != this.prompt.className)) 
         this.prompt.className = this.pCssClass; 
  }   
} 

// Usage:  base.SEARCH_ListBox3.updateAttributes()
function updateAttributes(frame) {
	if (typeof this.control == "undefined"
		|| typeof this.control == "unknown") {
		this.control = frame.newFindElement(this.fieldName);
	}
	this.setCssClass(frame); // 16070942
	currentFrame = frame;
	this.control.disabled = this.protect;
	if (typeof this.underline != 'undefined'
		&& typeof this.underline != 'unknown') {
		setStyleAttributeText(this.control, "textDecoration",
				this.underline);
		// retrieve style.color/style.backgroundColor from DEFAULTCOLOR
		if (this.fgColor == "BGColor")
			this.fgColor = getBackgroundColor(this.fieldName);
		if (this.bgColor == "FGColor")
			this.bgColor = getForegroundColor(this.fieldName);

		if (this.fgColor != "none")
			setStyleAttributeText(this.control, "color", this.fgColor);
		if (this.bgColor != "none")
			setStyleAttributeText(this.control, "backgroundColor",
					this.bgColor);
	}
	if (this.focus) {
		frame.lastFocus = this.fieldName;
	}
	if (this.control.type == "select-one"
		&& this.setValue == base.setDataArray) {
		frame.setDataArray(this.control, this); // to fix IE dialog itself
		// must update the control,
		// it can't be done by
		// parent frame window
		// while looking at windowName in debugger, this.setValue switches
		// from the dialog's name to the main window's name
		// this change forces the dialog to do the updating and it is
		// possible that other if not all controls should follow suit
	} else if (this.control.type == "text"){
		frame.setControlValue(this);
	} else {		
		this.setValue();
	}
return this;
}

function setControlValue(ctrl) {
	if ( ctrl.control.canHaveHTML ) {
		ctrl.control.innerHTML = ctrl.value;
	} else {
		ctrl.control.value = ctrl.value;		
	}
}

function setDataArray(control,ctrl) {
   //if ( !control.options[0] ) {      //12301668
      control.options[0] = new Option(NONE, ' ', false, false); //0 OPTION KLUDGE***
   //}
   for (i=0; i< ctrl.value.length; i++) {
      if ( control.options[i+1] == null || control.options[i+1].value != ctrl.value[i] ) {
         control.options[i+1] //0 OPTION KLUDGE***
                = new Option(ctrl.value[i], ctrl.value[i], false, false );
      }
   }

   if ( ctrl.selection >= 0 ) {//0 OPTION KLUDGE***
      control.options[ctrl.selection].selected = ctrl.selection;//0 OPTION KLUDGE***
   } else {
      control.options[0].selected = 'none';
   }
   control.options.length=ctrl.value.length+1;  // 12716079, 12638497
}

function setValue() {
   if ( this.control.canHaveHTML ) {
     this.control.innerHTML = this.value;
   } else {
     this.control.value = this.value;
     if ( ie4 && this.control.type == "select-one" && this.control.value == "")
          this.control.selectedIndex = 0;
     if ( (!ie4) && this.control.type != "select-one" && this.control.type != "textarea" & this.control.type != "text")
     { // but for IE, tsgui007/changed the MLE looses CR-LF if this is done
        try { // For NS6 without this EVENTS main page ReadOnly text fields wont update
          this.control.innerHTML = this.value;  // but if don't catch exception...
        } catch (e) {}
     }
   }
}

function setChecked() {
   this.control.checked = this.value;
}

function setRadioValue() {
  controls = currentFrame.findElement(this.fieldName, -1);
  for (i=0; i<controls.length; i++) {
    controls[i].disabled = this.protect;    //12970210, 13021641
    controls[i].style.color = this.fgColor;  //13021641
    controls[i].style.backgroundColor = this.bgColor;  //13021641
    controls[i].lastValue = this.value;  //14768041
    if (controls[i].value == this.value){
      controls[i].checked = true;
      if (controls[i] == currentFrame.lastFocus) {
        currentFrame.elementUpdateFocus(controls[i]);
      }
    } else {
      controls[i].checked = false;
    }
  }
}

// put Line feed character and Carriage return character back to the value of textarea object.
function formattedValue(valueStr) {
 if ((valueStr == null) || (valueStr.length == 0))
   return(valueStr);
 var char1;
 var entity;
 var index;
 var entityArray = new Array();
 entityArray[0] = new Array("&#13;","\r");
 entityArray[1] = new Array("&#10;","\n");
 for (var i=0; i < entityArray.length; i++) {
   entity = entityArray[i][0];
   char1 = entityArray[i][1];
   index = valueStr.indexOf(entity);
   while (index != -1)  {
     valueStr = valueStr.substring(0, index) + char1 + valueStr.substring(index + entity.length);
     index = valueStr.indexOf(entity, index + char1.length);
   } // while
 } //for
 return(valueStr);
}
/*
function nonDefaultEnterKey(evt) {
  var eventTarget = evt ? evt.target : AppWindow.event.srcElement;
  var isButton = eventTarget.type == 'button';
  var keyCode = ns6 ? evt.which : AppWindow.event.keyCode;
  return !( keyCode == 13 &&
            (isButton ?
             findElement(eventTarget.name,0).disabled :
             eventTarget.type != 'textarea'));
 }
*/

 // 12152505 to fix NS6 doubleClick with singleClick Event support
 function AnyEvent(rcid, v1, eventtype)
 {
	console.log("any event",rcid, v1, eventtype);
   var base = findBase();
   if (eventtype=='Click') {
     if ( base.clickId == null )  {
       base.clickId=setTimeout("DoAnyEvent('"+rcid+"','"+v1+"','Click')",200);
     }
     return; // Never process single click immediately (allow for doubleClick)
   }
   if ( typeof Controller.doEvent != 'undefined' && typeof Controller.doEvent != 'unknown') {
      DoAnyEvent(rcid, v1, eventtype); // DoubleClick
   } else {
       setTimeout("AnyEvent('"+rcid+"','"+v1+"','"+eventtype+"')",200);
  }
 }

 function intializeFramePage() {
    var lastFocusObject = null;
    initPage();
    initialWindowUpdate();
    if ((typeof lastFocus != 'undefined') && (typeof lastFocus != 'unknown') && (lastFocus != null) && (lastFocus.visible != 'hidden')) {
        lastFocusObject = findElement(lastFocus, 0);
    } 
    if (lastFocusObject == null){    
        initPageFocus();
    } 
    if ( typeof Controller.launchNewPage != 'undefined' && typeof Controller.launchNewPage != 'unknown') {  //16815942
       Controller.launchNewPage();                          // 16815942
    }
}

function initialWindowUpdate() {
    if (typeof getData != 'undefined' && typeof getData != 'unknown') {
        getData();
    } else {
        setTimeout("initialWindowUpdate()",200);
    }
}

function closeChildren() {
    if (typeof children != "undefined" && typeof children != "unknown") {
       for (i=0; i<children.length; i++) {
           if (children[i] != null && children[i][1] != self) {
                if (isWindowClosed(children[i][0])) {
                    children[i] = null;
                } else {
                    eval(children[i][0]+"=null;");
                    try {
//eval("base."+children[i][1].windowName+"_"+children[i][1].windowId+"=null");
                      children[i][1].close();
                    } catch (e) {}
                    children[i] = null;
                }
            }  // if
        } // for
    }
    children = new Array(1);
}

/**
 * function - findElement
 * elementName - object's name or id attribute
 * index =  -2   find object via getElementById() method
 *          -1   find an array of objects (for radio button group) via getElementsByName()
 *       >=  0   find an object via getElementsByName(elementName).item(index)
*/
function findElement(elementName, index) {
    var element = null;
    element = findElementWithFrame(elementName, index, self.window);
    //alert(' findElement elementName='+elementName+'     element='+element);
    if (element == null)
      alert(' unable to find the object with name '+elementName+' ???');
    if ((index == -1) && (element != null) && (element.length <= 0))
      alert(' unable to find the object with name '+elementName+' ???');
    return element;
}

function newFindElement(elementName) {
    var element = null;
    element = findElementWithFrame(elementName, 0, self.window);
    if (element == null) {
      element = findElementWithFrame(elementName, -1, self.window);
      if (element != null && element.length <= 0) {
        element = findElementWithFrame(elementName, -2, self.window);
        if (element == null) {
          alert(' unable to find the object with name '+elementName+' ???');
        }
      }
    }
    return element;
}

function findElementWithFrame(elementName, index, checkFrame) {
    var element = null;
    var i = 0;
    var j = 0;

    while ((i<checkFrame.frames.length) && (element == null)) {
	  if (index == -2)
	    element = checkFrame.frames[i].document.getElementById(elementName);
	  else if (index == -1)
	    element = checkFrame.frames[i].document.getElementsByName(elementName);
	  else if (index >= 0) {
	    if ( ie4 ) {
	       element = eval("checkFrame.frames[0].document.documentElement.all."+elementName);
	    } else {
	      element = checkFrame.frames[i].document.getElementsByName(elementName);
	    }
	  }
	  else
	    alert(' Incorrect Index for calling this function ??? ');
	i++;
    }

    if (element != null && element.length > 1 && index >= 0 && element.type != 'select-one') {
       element = element.item(index);
    }
    if ( (!ie4) && index >= 0) {//  radio buttons broken in NS for coop07/exits
      if ( element != null && element.length >= 1 ) {
	 var r = element.length - 1;
	 for ( ; r >=0 ; r-- ) {
	    if ( element.item(r).name == elementName ) {
	       element = element.item(r);
	       break;
	    }
	 }
	 if ( r < 0) {
	   element = checkFrame.frames[0].document.getElementsByName(elementName).item(0);
	 }
      }
    }

    if (element == null) {
	while ((j<checkFrame.frames.length) && (element == null)) {
	    element = findElementWithFrame(elementName, index, checkFrame.frames[j]);
	    j++;
	}
    }
    return element;
}

var abControlNames = new Array(0);
var abControls = new Array(0);
function addABControl(controlName, control) {
    abControlNames[abControlNames.length] = controlName;
    abControls[abControls.length] = control;
}

function findABControl(controlName) {
    var control=null;
    for (i=0; i<abControlNames.length; i++) {
        if (abControlNames[i] == controlName) {
            control = abControls[i];
        }
    }
    return control;
}

function findBase() {
    var baseWindow = self;
    if(ie4){
        if( typeof myopener != 'undefined' && typeof myopener != 'unknown' && myopener != null ) {
           baseWindow=myopener;
        } else if (typeof baseWindow.dialogArguments != "undefined"  && typeof baseWindow.dialogArguments != "unknown"){
            while (baseWindow.dialogArguments != null) {
               baseWindow = baseWindow.dialogArguments[0];
            }
        }
    }else {
      var baseWindowSaved;
      var previousOpener = baseWindow;
      try {
        while (baseWindow.opener != null) {
            basedWindowSaved = baseWindow;
            baseWindow = baseWindow.opener;
            previousOpener = basedWindowSaved;
        } // while
      } // try
      catch (e)  {
        baseWindow = previousOpener;
      }
      if ( !baseWindow.addChildWindow ) {
         baseWindow = previousOpener;
         if ( !baseWindow.addChildWindow ) {
            baseWindow.status="ief_Make.js findBase() problem";
         }
      }
    }
    return baseWindow;
}

function addChildWindow(child) {
    var inserted = 0;

    if (typeof children == "undefined" || typeof children == "unknown") {
        children = new Array();
    }

    // First try to find a vacant spot in the array.
    for (i=0; i<children.length; i++) {
        if (children[i] != null && isWindowClosed(children[i][0])) {
            // If the window is closed then remove it from the list.
            children[i] = null;
        }

        if (children[i] == null) {
            children[i] = new Array("base."+child.windowName+"_"+child.windowId,child);
            inserted = 1;
        }
    }

    // If there were no vacant spots then append to the end.
    if (inserted == 0) {
        children[children.length] = new Array("base."+child.windowName+"_"+child.windowId,child);
    }
}

function updateWindowData() {
   if ((typeof windowUpdateList != 'undefined') && (typeof windowUpdateList != 'unknown') && (windowUpdateList != null)) {
       for (var i=0; i<windowUpdateList.length; i++) {
            if (windowUpdateList[i] != null) {
                if (windowUpdateList[i].closed) {
                    windowUpdateList[i] = null;
                } else {
                   windowUpdateList[i].Controller.updatePage();
                }
            }
        }  // for
    }

    windowUpdateList = new Array();
    // Causes no selection in NS6
    eventinProcess = false;
    processQueueEvent();
}

function closeWindow(windowName, windowId) {
    if (typeof children != "undefined" && typeof children != "unknown") {
        for (i=0; i<children.length; i++) {
            if (children[i] != null) {
                if (isWindowClosed(children[i][0])) {
                    children[i] = null;
                } else {
                    if ((children[i][1].windowName == windowName)
                        && (children[i][1].windowId == windowId)) {
                        eval(children[i][0]+"=null;");
                        eval("base."+children[i][1].windowName+"_"+children[i][1].windowId+"=null");
                        children[i][1].close();
                        children[i] = null;
                    }
                }
            }
        }
    }
    try {
        eval("base."+windowName+"_"+windowId+"=null;");
    } catch (e) {}
}


function disableElement(elementName, statusflag) {
    findElement(elementName, 0).disabled=statusflag != 1;    
	Obj = findElement(elementName,-2); //13316854
    if(Obj.tagName == 'A') {  
        Link_Disabled(Obj,obj_disabled_flag=statusflag != 1);        
    }
}

function addWindowToUpdateList(windowName, windowId) {
    if ((typeof windowUpdateList == "undefined") || (typeof windowUpdateList == "unknown") || (windowUpdateList == null)) {
        windowUpdateList = new Array();
    }

    //alert("Adding " + findWindow(windowName, windowId).document.title);
    fWindow = findWindow(windowName, windowId);
    if ((typeof windowUpdateList != 'undefined') && (typeof windowUpdateList != 'unknown') && (windowUpdateList != null)) {
         for (i=0; i<windowUpdateList.length; i++) {
            if (windowUpdateList[i] != null) {
                if (windowUpdateList[i].closed) {
                    windowUpdateList[i] = null;
                } else if ( fWindow == windowUpdateList[i] ) {
                    fWindow = null;
                }
            }
        }
    }
    if ( fWindow != null ) {
       windowUpdateList[windowUpdateList.length] = fWindow;
    }
}


function findWindow(windowName, windowId) {
    var index = 0;

    if (typeof children != "undefined" && typeof children != "unknown") {
        for (i=0; i<children.length; i++) {
            if (children[i] != null) {
               if (isWindowClosed(children[i][0])){
               //isWindowClosed(windowName,windowId)){//isWindowClosed(children[i])){//children[i].closed) {
                    children[i] = null;
                } else {
                   if ((children[i][1].windowName == windowName)
                        && (children[i][1].windowId == windowId)) {
                        return children[i][1];
                    }
                }
            }
        }
    }
    return null;
}

function updateFocus(lastFocus) {
    if ((typeof lastFocus != 'undefined') && (typeof lastFocus != 'unknown') && (lastFocus != null) && (lastFocus.visible != 'hidden')) {
        var lastFocusObject = findElement(lastFocus, 0);
	elementUpdateFocus(lastFocusObject);
    }
}

function elementUpdateFocus(lastFocusObject) {
    if ((lastFocusObject != null)
            && (!lastFocusObject.disabled)
            && (typeof lastFocusObject.focus != 'undefined') && (typeof lastFocusObject.focus != 'unknown')) {
        if ((typeof lastFocusObject.style != 'undefined') && (typeof lastFocusObject.style != 'unknown') && (typeof lastFocusObject.style.visibility != 'undefined') && (typeof lastFocusObject.style.visibility != 'unknown'))
        { // control's visibility is defined   
           if (lastFocusObject.style.visibility != 'hidden') {
               lastFocusObject.focus();
               if ((lastFocusObject.type == 'text') || (lastFocusObject.type == 'textarea')) {
                   lastFocusObject.select();
               }
           }
        }
        else { // control's visibility is not defined   
           lastFocusObject.focus();
           if ((lastFocusObject.type == 'text') || (lastFocusObject.type == 'textarea')) {
             lastFocusObject.select();
           } 
        }     
    }
}



function launchPage(pageUrl) {
  controlForm = Controller.document.getElementById("DATAFORM");
  controlForm.DYNAMIC.value  = "GETDATA";
  if (typeof parent.subSessionId != 'undefined') {
     controlForm.SUBSESSIONID.value     = parent.subSessionId;
  }
  if (typeof parent.pageName != 'undefined') {
     controlForm.NAME.value     = parent.pageName;
  }
  if (typeof parent.pStepId != 'undefined') {
     controlForm.PSTEPID.value  = parent.pStepId;
  }
  if (typeof parent.windowId != 'undefined') {
     controlForm.WINDOWID.value = parent.windowId;
  }
  controlForm.action = pageUrl;
  controlForm.submit();
}



var MAXURLLEN = ie4?2010:16384;    // fc 7/14/03
var minEncodeLen = 400;
function buildURL(url, pageData, urlParms) {// rewritten for 12646094

  thePath=(typeof base.responsePath!="undefined" && typeof base.responsePath!="unknown")?base.responsePath:location.href.substring(0,location.href.indexOf(location.pathname));
  var purlParms=new Array();
  var hexStrLen=0;
  var multiURL=false;
  var cd = ' ';
  
  if (url.indexOf(";") != -1) {
    urlData = url.split(";");
    url = urlData[0];
    purlParms.push(";");
    purlParms.push(urlData[1]);
    purlParms.push("?");
    purlParms.push(urlParms);
  } else {
    purlParms.push("?");
    purlParms.push(urlParms);
  }
  

  purlParms.push("&PAGEDATA=");
  var partialUrl = thePath+url;
  var purlParmsPreDataLen = purlParms.join("").length;
  var hexStr = hexify(pageData).join("");

  var hexOrigStrLen = hexStr.length;

  var startTime = new Date();
  // To test encoding comment out the conditional here
  if ( hexOrigStrLen < minEncodeLen ) { // if less than this encoding saves nothing, but costs time
    purlParms.push(hexStr);
  } else {
    // create the forest used to create the tree
    buildFreqTree(hexStr);
    buildCodeTree();
    var encodingTree = getEncodingTree().join("");
    var x;
    var xNew="00000000";

    var encodedArrayStr=new Array();
    var hexified1=new Array();
    var TempBuf = "";

    for(var i=0; i < hexStr.length; i++) {
      x = hexStr.charAt(i);
      //encodedArrayStr.push(chCodeMap[x=='u'? 16 : parseInt(x,16) ]);
      xNew = (chCodeMap[x=='u'? 16 : parseInt(x,16) ]);

      TempBuf = TempBuf + xNew; 
      if (TempBuf.length > 7 )
      {
         hexified1.push( hexTable[parseInt(TempBuf.substring(0, 8),2)] );
         TempBuf = TempBuf.substring(8);   //  remove used byte from first of string
      }
    }
    while (TempBuf.length > 0 )
     {
	if (TempBuf.length > 7) {
            hexified1.push( hexTable[parseInt(TempBuf.substring(0, 8),2)] );
            TempBuf = TempBuf.substring(8);   //  remove used byte from first of string
        } else {	
            TempBuf+=zeroes.substring(0,  8-TempBuf.length  );
            hexified1.push( hexTable[parseInt(TempBuf.substring(0, 8),2)] );
            TempBuf = TempBuf.substring(8);   //  remove used byte from first of string
       }
      } 

    hexified=hexified1.join("");

  

    var preDataLen = partialUrl.length + purlParmsPreDataLen;
    var breakpoint = MAXURLLEN-preDataLen;
    var hexStrLen = hexStr.length.toString(16) +"L";
    var fullHexLen = encodingTree.length+1+hexStrLen.length+hexified.length;

    multiURL = fullHexLen + preDataLen > MAXURLLEN;  //  fc 7-14-03

    hexified=encodingTree+(multiURL?"M":"H")+hexStrLen+hexified;
    purlParms.push(hexified);
    if ( multiURL ) {
      var urlParms=purlParms.join("");
      url = partialUrl+urlParms.substring(0,breakpoint);
      partialUrl += "&PAGEDATA=";  // now don't include urlparms anymore
      // Create the continuation array, as long as its length > 0 continue poping and sending data
      dataContinue=new Array();
      var remaining = urlParms;
      var count=2;
      remaining = remaining.substring(breakpoint);
      breakpoint-=purlParmsPreDataLen;// This length not accounted for in the extra data rows


      do {

        dataContinuePart=new Array();
        nextData=remaining.substring(0,breakpoint);
        dataContinuePart.push("&PAGEDATA=");

        remaining = remaining.substring(breakpoint);
        if ( remaining.length ) {
          dataContinuePart.push("M");
        }
        dataContinuePart.push(nextData);

        dataContinue.push(dataContinuePart.join(""));
      } while ( remaining.length > 0 );

      dataContinue.reverse();
      parent.dataContinue = dataContinue;
    }
  }
  if (!multiURL) { // not a multiURL, can be H or non-H at this point
    url = partialUrl+purlParms.join("");
  }
  return url;
}

//----------- Begin compression 12646094 -------------------------




//var hexascii = "0123456789ABCDEF";
var freqArray;// an array of TreeNodes
var mB = false;

function hexify(p) {
  var h = new Array(p.length<<1);
  var c = ' ';
  var b = 0;

  for (i = 0; i < p.length; i++) {
    c = p.charCodeAt(i);
  
    if ( c > 255 ) {
       if ( !mB ) {
          h.push('u');
          mB = true;
       }
       b = c >> 8;
   //    hexStr.push(DecToHex(hiByte));
         h.push(hexTable[b]);
       c = c & 255;
   //    hexStr.push(DecToHex(ch));
         h.push(hexTable[c]);
    } else {
      if ( mB ) {
        h.push('u');
        mB = false;
      }
    //    hexStr.push(DecToHex(ch));
          h.push(hexTable[c]);
    }
  }
  return h;
}





function compareTreeNodes(a, b) {
   return a.freq - b.freq;
}

function findTreeNode(c){ // finds node of char c if exists
  for(var i=0; i < freqArray.length; i++) {
    if(freqArray[i].value == c)
      return freqArray[i];
  }
  return null;
}

function buildFreqTree(hexStr){
  freqArray = new Array();
  var j=0;
  var ch=' ';

  // finds node of char of str[i] if exists and increment frequency, or creates new node with freq one
  for ( var i = hexStr.length-1; i >=0; i-- ){
      ch = hexStr.charAt(i);
//    var node = findTreeNode(ch);// finds node of char ch if exists
    for(j=0;j<freqArray.length;j++) {

           if(freqArray[j].value == ch)
           {
		            freqArray[j].freq++;
                break;
    }
  }
    if(j == freqArray.length) 
      freqArray[freqArray.length] = new TreeNode(ch,1,null,null);
  }

}

function buildCodeTree(){
  while(freqArray.length > 1){
    freqArray.sort(compareTreeNodes);
    var node0 = freqArray.shift(); // first min freq node
    var node1 = freqArray.shift(); // second min freq node
    insertTreeNode(new TreeNode(node0.value+node1.value,node0.freq+node1.freq,node0,node1));
  }
}

function getEncodingTree() {
  encodingTree = new Array();
  freqArray[0].writeEncodingTreeNode(encodingTree);
  return encodingTree;
}

function insertTreeNode( insertNode ) {
  var index = 0;
  while( index < freqArray.length && insertNode.freq > freqArray[index].freq ) {
    index++;
  }
  freqArray.splice(index, 0, insertNode);
}


var mapEncodingTree = new Array();

function TreeNode( value, freq, left, right ){
  this.left = left;
  this.right = right;
  this.freq = freq;
  this.value = value;
  this.toString = function toString() {
    return "" + this.freq + "," + this.value +":";
  }

  this.map = function map(ch) {
    var chEncodeArray = new Array();
    freqArray[0].encode(ch, chEncodeArray);
    chCodeMap[ch=='u'? 16 : parseInt(ch,16) ] = chEncodeArray.join("");
  }

  this.encode = function encode(ch, encodedArrayStr) {
     if(this.left != null && this.left.value.indexOf(ch) != -1) {
       encodedArrayStr.push('0');
       this.left.encode(ch,encodedArrayStr);
     } else if(this.right != null ) {//no need to check indexOf(ch), its either in left or right and we know its not in left
       encodedArrayStr.push('1');
       this.right.encode(ch,encodedArrayStr);
     }
    return;
  }
  this.getEncoding = function getEncoding(ch, encodedArrayStr) {
    encodedArrayStr.push(chCodeMap[ch=='u'? 16 : parseInt(ch,16) ]);
  }
  this.isLeaf = function isLeaf() {
    return this.value.length < 2;
  }
  this.writeEncodingTreeNode = function writeEncodingTreeNode(encodingTree) {
    encodingTree.push(this.isLeaf()?"1":"0");

    if (this.isLeaf()) {
      this.map(this.value);
      encodingTree.push(this.value);
    }
    if(this.left != null) {
       this.left.writeEncodingTreeNode(encodingTree);
    }
    if(this.right != null) {
       this.right.writeEncodingTreeNode(encodingTree);
    }
  }
}
//----------- End compression 12646094 -------------------------

//---------- Disabled By...  starts -------------------------------------

function ANDLIST(state, disablingName, disablingType, disablingIndex, isNumeric)
{
  this.state = state;
  this.disablingName = disablingName;
  this.disablingType = disablingType; /* 'control', 'listbox' or 'listboxF', 'listboxV' */
  this.disablingIndex = disablingIndex; /* >=0 for 'radio', -1 for other 'control' or 'listbox' */
  this.isNumeric = isNumeric;/* true - numeric entry field, false - non-numeric entry field or other type */
}
function DISABLING(disabledbyName, disabledbyType, disabledbyIndex)
{
  this.disabledbyName = disabledbyName;
  this.disabledbyType = disabledbyType; /* 'control','radio','menuitem' ,'listbox' or 'listboxF','listboxV' */
  this.disabledbyIndex = disabledbyIndex;/* >=0 for 'radio', -1 for others */
}
function DISABLEDBY(da, andlist)
{
  this.da = da;
  this.andlist = andlist;
}
function MENULIST(menu_name, div_id)
{
  this.menu_name = menu_name;
  this.div_id = div_id;
}

// called by control's (non-listbox) onChang or onClick event
//
function disabledByChange(control)
{
 var name = control.name;
 if (control.type != 'radio')
   {
   if (typeof name != 'undefined' && typeof name != 'unknown')
     {
     var disablingArray = eval('disabling_'+name);
     if (typeof disablingArray != 'undefined' && typeof disablingArray != 'unknown')
       {
       for (var i=0; i < disablingArray.length; i++)
         {
         disabledBy(disablingArray[i].disabledbyName,disablingArray[i].disabledbyType,
                    disablingArray[i].disabledbyIndex);
         } // for
       } // if
     } // if
   } // if (control.type != 'radio')
 else  // radiobutton
   {
    var new_value = control.value;
    var new_index = 0;
    //var radiolist = top.AppWindow.document.getElementsByName(name);
    var radiolist = findElement(name, -1);
    for (var i=0; i < radiolist.length; i++)
      {
      if (radiolist[i].value == new_value)
        {
        new_index = i;
        break;
        }
      }
    var disablingArray = eval('disabling_'+name+'_'+new_index);
    if ((typeof disablingArray != 'undefined' && typeof disablingArray != 'unknown') || (disablingArray != null))
      {
      // this radio button is the source of a disabledby control
      if (disablingArray.length > 0)
        {
        for (var i=0; i < disablingArray.length; i++)
          {
          disabledBy(disablingArray[i].disabledbyName,disablingArray[i].disabledbyType,
                   disablingArray[i].disabledbyIndex);
          } // for
        }
      // this radio button is not the source of a disabledby control, but other buttons in
      // this group is the source of a disabledby control. The change in this button should
      // cause it to re-evaluate all other radio button's disabledby target control.
      radiobuttonChange(name, radiolist, new_index);
      } // if
   } // else
}

// called by listbox's Click event (Hilite1() function in CoolGen_Listbox.js
//
function disabledByChange_lb(rcid)
{
 var disablingArray = eval('disabling_'+rcid);
 if (typeof disablingArray != 'undefined' && typeof disablingArray != 'unknown')
   {
   for (var i=0; i < disablingArray.length; i++)
     {
     disabledBy(disablingArray[i].disabledbyName,disablingArray[i].disabledbyType,
                disablingArray[i].disabledbyIndex);
     } // for
   } // if
}

function isAllZero(value)
{
  var rc = true;
  for(var i= 0; i < value.length; i++)
  {
    if((value.charAt(i) == '0') || (value.charAt(i) == '.') || (value.charAt(i) == ' ') ||
       (value.charAt(i) == ',') || (value.charAt(i) == '+') || (value.charAt(i) == '-'))
    {
       rc = true;
    }
    else
    {
       rc = false;
       break;
    }
  }
  return rc;
}

function checkDisabledBy(ctrl)
{
  if (!disabledbyChecked && (ctrl.value.length > 0) && !isAllZero(ctrl.value)){
    disabledByChange(ctrl);
    disabledbyChecked = true;
  } else if ((ctrl.value.length == 0) || (isAllZero(ctrl.value))) {
    disabledByChange(ctrl);
    disabledbyChecked = false;
  }	
}

function disabledBy(name, type, index)
{
  var andlist = null;
  var disabled_flag = false;
  var disabledbyObj = null;
  var disabledbyArray;
  if (type == 'radio')
    {
    //disabledbyObj = top.AppWindow.document.getElementsByName(name).item(index);
    disabledbyObj = findElement(name,index);
    disabledbyArray = eval('disabledby_'+name+'_'+index);
    }
  else if ((type == 'menuitem') || (type == 'submenu'))
    {
    var div_id = findMenuDivId(name);  //16070942
    //disabledbyObj = top.AppWindow.document.getElementById(div_id);
    disabledbyObj = findElement(div_id,-2);
    disabledbyArray = eval('disabledby_'+name);
    }
  else if ((type == 'listboxF') || (type == 'listboxV'))
    {
    disabledbyObj = findElement(name, -2);
    disabledbyArray = eval('disabledby_'+name);
    }
  else if(type == 'link')
    {
	disabledbyObj = findElement(name,-2);//13316854
    disabledbyArray = eval('disabledby_'+name); 
    }  
  else
    {
    //disabledbyObj = top.AppWindow.document.getElementsByName(name).item(0);
    disabledbyObj = findElement(name, 0);
    disabledbyArray = eval('disabledby_'+name);
    }
  if ( ie4 && disabledbyObj.tagName == "TD") {  // 12086899 IE problem on disableBy not working
     disabledbyObj = disabledbyObj.firstChild;
  }
  var disabledbyPAD = false;
  if (typeof disabledbyArray != 'undefined' && typeof disabledbyArray != 'unknown')
    {
    //--- run "OR" list until 1 is true ------
    for (var i=0; (!disabled_flag) && (i < disabledbyArray.length); i++)
      {
      if ( ((type == 'menuitem') && (disabledbyArray[i].da == '1'))
         || ((type == 'control') && ((disabledbyObj.type == 'button') || (disabledbyObj.type == 'submit')) && (disabledbyArray[i].da == '1'))
         || ((type == 'control') && ((disabledbyObj.type != 'button') && (disabledbyObj.type != 'submit')) && (disabledbyArray[i].da != true))
         || ((type == 'link') && (disabledbyObj.tagName == 'A') && (disabledbyArray[i].da == '1'))    
         || ((type == 'link') && (disabledbyObj.tagName != 'A') && (disabledbyArray[i].da != true))   
         || ((type == 'radio') && (disabledbyArray[i].da != true))       //12273604
         || ((type == 'listbox') && (disabledbyArray[i].da == 0))
         || ((type == 'listboxV') && (disabledbyArray[i].da == 0))
         || ((type == 'listboxF') && (disabledbyArray[i].da == 0)) )
        {
        andlist = disabledbyArray[i].andlist;
        var disabledAnd_flag = true;
        //--- run "AND" list until 1 is false ----
        for (var j=0; j < andlist.length; j++)
          {
          disabledAnd_flag = getControlState(andlist[j].state,andlist[j].disablingName,
                                             andlist[j].disablingType,andlist[j].disablingIndex,andlist[j].isNumeric);
          if (disabledAnd_flag == false)
            break;
          } // for
        disabled_flag = disabledAnd_flag;
        }  // if (obj is not protected by PAD)
      else
        disabledbyPAD = true;
      }  // for
    } // if
  if (!disabledbyPAD)
    {
    if (disabledbyObj != null)
      disabledbyObj.disabled = disabled_flag;         
     if ((type == 'control') && (disabledbyObj.type == 'button')){        
       try{        
         if(eval(name + '_image')){
			if(disabledbyObj.disabled)
				findElement((name + 'IMG'), 0).src = eval(name + '_image')[1];
			else
				findElement((name + 'IMG'), 0).src = eval(name + '_image')[0];  
		}
	   }catch(e){;}       
    }
    if ((type == 'link') && (disabledbyObj != null)){                        
       try{        
         if(eval(name + '_image')){
			if(disabledbyObj.disabled)
				findElement((name + 'IMG'), 0).src = eval(name + '_image')[1];
			else
				findElement((name + 'IMG'), 0).src = eval(name + '_image')[0];  
		}
       }catch(e){;}    
       Link_Disabled(disabledbyObj,disabled_flag);        
    }
    if ((type == 'menuitem') && (disabledbyObj != null))
      Menu_Disabled(disabledbyObj,disabled_flag);
    if (type == 'listbox')
      Listbox_Disabled(disabledbyObj,name,disabled_flag);
    if (type == 'listboxF'|| type == 'listboxV') 
      Table_Disabled(disabledbyObj,name,disabled_flag);  
    }  
}
//14407042 - check if the value contains all spaces 
function isAllSpaces(value)  {
  var rc = true;
  for (var i=0; i<value.length; i++) {
    if (value.charAt(i) != ' ') {
       rc = false;
       break;
    } 
  }
  return rc;
}
function getControlState(stateVal,cName,cType,cIndex,isNumeric)
{  
  var rc = false;
  if ((cType == 'control') || (cType == 'link'))
    {   
    //var cObj = top.AppWindow.document.getElementsByName(cName).item(0);
      var cObj = findElement(cName, 0);
    switch(stateVal)
      {
      /*-- 0 means entry field does not have data, checkbox/radiobutton is off,
           dropdownlist has none selected  --*/
      case '0':
        if (((cObj.type == 'text') || (cObj.type == 'textarea') || (cObj.type == 'password'))
            && (isAllSpaces(cObj.value) || (isNumeric && isAllZero(cObj.value))))
          rc = true;
        else if ((cObj.nodeName == 'SPAN') && isAllSpaces(cObj.innerHTML))
          rc = true;        
        else if ((cObj.type == 'checkbox') && (cObj.checked == false))
          rc = true;
        else if (cObj.type == 'radio')
          rc = getRadiobuttonState(stateVal,cName,cIndex);
        else if ((cObj.type == 'select-one') && (cObj.selectedIndex == 0) && ((cObj[0].innerText==NONE)||cObj[0].innerText == ""))
          rc = true;
        break;
      /*-- 1 means entry field has data, checkbox/radiobutton is on, dropdown list has one selected  */
      case '1':
        if (((cObj.type == 'text') || (cObj.type == 'textarea') || (cObj.type == 'password')) 
            && ((!isNumeric && !isAllSpaces(cObj.value)) || (isNumeric && !isAllZero(cObj.value))))
          rc = true;
        else if ((cObj.nodeName == 'SPAN') && (!isAllSpaces(cObj.innerHTML)))
          rc = true;
        else if ((cObj.type == 'checkbox') && (cObj.checked == true))
          rc = true;
        else if (cObj.type == 'radio')
          rc = getRadiobuttonState(stateVal,cName,cIndex);
        else if ((cObj.type == 'select-one') && (cObj.selectedIndex > 0))
          rc = true;
        break;
      /*-- 4 means dropdown list has no data other than <NONE> */
      case '4':
        if ((cObj.type == 'select-one') && (cObj.length == 1))
          rc = true;
        break;
      /*-- 8 means dropdown list has data other than <NONE> */
      case '8':
        if ((cObj.type == 'select-one') && (cObj.length > 1))
          rc = true;
        break;
      default:
        break;
      } // switch
    } // if (cType == 'control')
  else if (cType == 'listbox' || cType == 'listboxF' || cType == 'listboxV')
    rc = getListboxState(stateVal,cName);
  return (rc);
}

function getRadiobuttonState(stateVal,cName,cIndex)
{
 var rc = false;
 //var cObj = top.AppWindow.document.getElementsByName(cName);
 var cObj = findElement(cName,-1);
 switch(stateVal)
   {
   case '0':
     if (cObj[cIndex].checked == false)
       rc = true;
     break;
   case '1':
     if (cObj[cIndex].checked == true)
       rc = true;
     break;
   default:
      break;
   }
 return (rc);
}

function radiobuttonChange(name, radiolist, new_index)
{
 for (var j=0; j < radiolist.length; j++)
   {
   if (j != new_index)
     {
     var disablingArray = eval('disabling_'+name+'_'+j);
     if ((typeof disablingArray != 'undefined' && typeof disablingArray != 'unknown') || (disablingArray != null))
       {
       // this radio button is the source of a disabledby control
       if (disablingArray.length > 0)
         {
         for (var i=0; i < disablingArray.length; i++)
           {
           disabledBy(disablingArray[i].disabledbyName,disablingArray[i].disabledbyType,
                    disablingArray[i].disabledbyIndex);
           } // for
         } // if (disablingArray.length > 0)
       } // if (typeof
     } // if (i != new_index)
   } // for
}


function getListboxState(stateVal,cName)
{
 var rc = false;
 var lbox = eval("base."+AppWindow.busWindowName+"_"+AppWindow.parent.windowId+"_"+cName);
 var SC = lbox.getSelectedIndicator();
 var selected_count = 0;
 if (typeof SC != 'undefined' && typeof SC != 'unknown')
   {
   for (var i=0; i < SC.length; i++)
     {
     if (SC[i] == '*')
       selected_count++;
     }
   }
 var lastrow = lbox.getLastRow();
// var lastrow = eval(cName+'lastRow');
 var data_count = 0;
 if (typeof lastrow != 'undefined' && typeof lastrow != 'unknown')
   data_count = lastrow;
 switch (stateVal)
   {
   case '0':  /* listbox has none selected */
     if (selected_count == 0)
       rc = true;
     break;
   case '1':  /* listbox has one selected */
     if (selected_count == 1)
       rc = true;
     break;
   case '2':  /* has many selected */
     if (selected_count  > 1)
       rc = true;
     break;
   case '4':  /* listbox is empty  */
     if (data_count == 0)
       rc = true;
     break;
   case '8':  /* listbox has data  */
     if (data_count > 0)
       rc = true;
     break;
   default:
     break;
   }  // switch
 return(rc);
}


function DTH(r,g,b){
  r =  (r>136)? (r<231 ? r+25 : r-32) : r+120;
  g =  (g>136)? (g<231 ? g+25 : g-32) : g+120;
  b =  (b>136)? (b<231 ? b+25 : b-32) : b+120;   
  return("rgb("+r+","+g+","+b+")");
}

function cutrgb(value){
  for(i=0;i<value.length; i++){
    if(value.charAt(i)=="," )
      break; 
  }   
  return(value.substring(0,i));
}

function RGH(rgb){ 
  var crgb = rgb.charAt(0)=="r" ? rgb.substring(4,rgb.length-1) : rgb;  
  r = cutrgb(crgb);    
  crgb = cutrgb(crgb.substring(0,r.length));
  g = cutrgb(crgb); 
  b = crgb.substring(1,g.length);        
  return(DTH(parseInt(r), parseInt(g), parseInt(b)));
}

function change_color(disabledbyObj,disabled_flag){    
  if (disabled_flag == true) {      
    try{
      if(disabledbyObj.style.color){
        disabledbyObj.oldColor = disabledbyObj.style.color;      
        disabledbyObj.style.color = RGH(disabledbyObj.style.color);
      }else{
        disabledbyObj.oldColor = "original";        
        disabledbyObj.style.color = "grey";
      }
    }catch(e){;};
  }
  else {   
    disabledbyObj.style.color = disabledbyObj.oldColor ? (disabledbyObj.oldColor="original" ? "" :disabledbyObj.oldColor) : disabledbyObj.style.color;
  }
} 


function cancelLink () {
  return false;
}
 
function Link_Disabled(disabledbyObj,disabled_flag)
{    
  var style_obj = disabledbyObj.style;    
  disabledbyObj.disabled = disabled_flag;  
  if (disabled_flag == true){       
     style_obj.cursor = "text";     
     if(!ie4)                                                   
        change_color(disabledbyObj,disabled_flag);                    
     if((disabledbyObj.hash == "") && (disabledbyObj.onclick != cancelLink)) {  //don't swap functions if already swapped
        disabledbyObj.oldOnClick = disabledbyObj.onclick;
     }
     disabledbyObj.onclick = cancelLink;
  }
  else {
     if(ie4)
       style_obj.cursor = "hand";
     else
       style_obj.cursor = "pointer";
     if(!ie4)                     
         change_color(disabledbyObj,disabled_flag);    
     if(disabledbyObj.hash == "") {
        if((typeof disabledbyObj.oldOnClick != 'undefined') && ((typeof disabledbyObj.oldOnClick != 'unknown') && disabledbyObj.oldOnClick != "")) {
           disabledbyObj.onclick = disabledbyObj.oldOnClick;
        }
     }
     else {
       disabledbyObj.onclick = disabledbyObj.hash;
     }
  }
}

function Menu_Disabled(disabledbyObj,disabled_flag)
{
  var style_obj = disabledbyObj.style;
  disabledbyObj.disableItem = disabled_flag; 
  if (ie4)
    {
    if (disabled_flag == true)
      style_obj.cursor = "text";
    else
      {
      if (disabledbyObj.hasSub) // for Sub MenuItem
        style_obj.cursor = "default";
      else // for MenuItem
        style_obj.cursor = "hand";
      }
    } // ie4
  if (!ie4)
    {
    disabledbyObj.disableItem = disabled_flag;
    if (disabled_flag)
      {
      style_obj.cursor = "text";          
      if (disabledbyObj.hasSub)
         disabledbyObj.childNodes[1].style.color = disabledbyObj.disableColor;//16070942
      else
         disabledbyObj.childNodes[0].style.color = disabledbyObj.disableColor;//16070942 
      }
    else
      {
      if (disabledbyObj.hasSub) // for Sub MenuItem
        style_obj.cursor = "default";
      else // for MenuItem
        style_obj.cursor = "pointer";          
      if (disabledbyObj.hasSub)
         disabledbyObj.childNodes[1].style.color = '';//16070942 
      else
         disabledbyObj.childNodes[0].style.color = '';//16070942
      }
    } // ns6
}

function Table_Disabled(disabledbyObj,name,disabled_flag)
{
  var style_obj = disabledbyObj.style; 
  lbox = eval("base."+AppWindow.busWindowName+"_"+AppWindow.parent.windowId+"_"+name);  
  lbox.setDisabled(disabled_flag); 
  if(ie4){
  if(lbox.control.parentNode.id == (lbox.fieldName+"Tbl"))
      lbox.control.parentNode.disabled = disabled_flag;
  }
  var list = findElement(lbox.fieldName,-2);    
  var rows = list.rows;
  var dataRow = 0;
  for (var j = 0; j < rows.length; j++)  {
   var row1 = rows[j].childNodes;
   var cell;
   for (var i = 0;  i < row1.length; i++)   {
       cell = row1[i];  
       if(disabled_flag == true){
          cell.oldonclick = cell.onclick;
          cell.onclick = "";
          cell.oldondblclick = cell.ondblclick;
          cell.ondblclick = "";          
       }else {
          if(typeof cell.oldonclick != 'undefined' && typeof cell.oldonclick != 'unknown'){
            if(cell.oldonclick != ""){       
            cell.onclick = cell.oldonclick;
            cell.oldonclick = "";
            }         
          }
          if(typeof cell.oldondblclick != 'undefined' && typeof cell.oldondblclick != 'unknown'){     
            if(cell.oldondblclick != ""){       
               cell.ondblclick = cell.oldondblclick;
               cell.oldondblclick = "";
            }         
          }
       }
   }
  }   
}

function Listbox_Disabled(obj, rcid, disabled_flag)
{
//  lbox = eval("base."+AppWindow.busWindowName+"_"+rcid);   // replaced for 12520481
  lbox = eval("base."+AppWindow.busWindowName+"_"+AppWindow.parent.windowId+"_"+rcid); //12520481
  // only need to do this if the disabled state of the listbox has changed
  if (lbox.getDisabled() != disabled_flag) {
    lbox.setDisabled(disabled_flag);
//  changeDisabled(name,disabled_flag);    // removed for 12520481
    if (typeof obj != 'undefined' && typeof obj != 'unknown') {
      var temp = lbox.getContent(); //added for 13153080  	
      changeContent(obj,lbox.getContent());
      selectChar(lbox);  //13757307
    }
  }
}

function getFixedExtListboxState(stateVal,cName)
{
 var rc = false;
 var lbox = eval("base."+AppWindow.busWindowName+"_"+AppWindow.parent.windowId+"_"+cName);
// var lastrow = peval('parent.'+cName+'lastRow');
 //var lastrow = eval(cName+'lastRow');
 var lastrow = lbox.getLastRow();
 var data_count = 0;
 if (typeof lastrow != 'undefined' && typeof lastrow != 'unknown')
   data_count = lastrow;
 switch (stateVal)
   {
   case '4':  /* listbox is empty  */
     if (data_count == 0)
       rc = true;
     break;
   case '8':  /* listbox has data  */
     if (data_count > 0)
       rc = true;
     break;
   default:
     break;
   }  // switch
 return(rc);
}

//---------- Disabled By...  ends -------------------------------------

//---------- Queue Events---Start---------------------------------------

function EVENTINFO(rcid, v1, eventtype, windowname){
   this.rcid = rcid;
   this.v1 = v1;
   this.eventtype = eventtype;
   this.windowname = windowname;
}

function processQueueEvent(){
    if (eventinProcess == true || (typeof Controller == 'undefined' || typeof Controller == 'unknown' || typeof Controller.doEvent == 'undefined' || typeof Controller.doEvent == 'unknown') ) {
      if (eventinfo.length > 0 && !emptyQueue()) {
         setTimeout("processQueueEvent()", 250);
      }
    } else if(emptyQueue() == false){
	 if(eventinProcess == false) {
           eventinProcess = true;
           evtinfo = dequeueEvent();
           Controller.doEvent(evtinfo.rcid, evtinfo.v1, evtinfo.eventtype, evtinfo.windowname);
	 }
       processQueueEvent();
    }
}

function processEvent(rcid, v1, eventtype, windowname){
   queueEvent(rcid, v1, eventtype, windowname ); // Must do this to set prev_eventinfo instead of just calling doEvent if the Queue was empty

      processQueueEvent();
}
//=======================  Alert window ========================================
var msgWindow2 = null;
//var alerts = new Array();
function windowOpener() {
   if ( msgWindow2 == null || msgWindow2.closed ) {
      msgWindow2=window.open("","alerts2","scrollbars=yes,resizable=yes,status=yes,top=0,left=0,width=500,height=300")
   }
}
function myAlert(msg) {
//   alerts[alerts.length]= msg;
   windowOpener();
   msgWindow2.document.write(msg + '<br>');
   msgWindow2.window.scrollTo(0, msgWindow2.document.body.scrollHeight);

}
//==============================================================================
function queueEvent(rcid, v1, eventtype, windowname) {
   if((eventinProcess == true)
   && (prev_eventinfo[0].rcid == rcid)
   && (prev_eventinfo[0].v1 == v1)
   && (prev_eventinfo[0].eventtype == eventtype)
   && (prev_eventinfo[0].windowname == windowname)) {
      //ignore duplicate events
      ;
   } else {
      eventinfo[eventinfo.length] = new EVENTINFO(rcid, v1, eventtype, windowname);
      prev_eventinfo[0] = new EVENTINFO(rcid, v1, eventtype, windowname);
   }
}

function dequeueEvent() {
   var evinfo;
   for(i=0;i<=eventinfo.length;i++) {
      if(eventinfo[i] != null){
	 evinfo = eventinfo[i];
         eventinfo[i] = null;
         emptyQueue();
         return evinfo;
      }
   }
}

function emptyQueue(){
   for(i=0;i<=eventinfo.length;i++) {
      if(eventinfo[i] != null){
	     return false;
      }
   }
   if ( eventinfo.length > 0 ) {
     eventinfo=new Array(); // clear the array
   }
   return true;
}
//---------- Queue Events...  ends -------------------------------------

//====================== JavaBean/ActiveX support ======================

function netscapeVersion () {
    var version = 0.0;
    var ua = window.navigator.userAgent;
    var pNetscape6 = ua.indexOf("Netscape6");

    if (pNetscape6 > -1) { // look for Netscape 6
        version = parseFloat(ua.substring(pNetscape6 + 10));
    } else {               // look for Netscape 7
        var pNetscape7 = ua.indexOf("Netscape");
        version = parseFloat(ua.substring(pNetscape7 + 9));
    }
    return version;
}

function np6ActiveXPluginInstalled () {
    var nv = netscapeVersion();
    if (nv >= 7.0) {
        var np7esk32Version = 7.0;
        return navigator.plugins ["Esker ActiveX Plug-in for Netscape 7"] && parseFloat (navigator.plugins ["Esker ActiveX Plug-in for Netscape 7"].description.substring (30, 40)) >= np7esk32Version;
    } else if (nv > 6.0 && nv < 7.0) {
        var np6esk32Version = 6.8;
        return navigator.plugins ["Esker ActiveX Plug-in for Netscape 6"] && parseFloat (navigator.plugins ["Esker ActiveX Plug-in for Netscape 6"].description.substring (30, 40)) >= np6esk32Version;
    }
}

function np6ActiveXPluginInstallation () {
    window.open("http://www.esker.com/esker_com/active_x/index.html");
}

function np6ActiveXRefreshAndReload() {
    navigator.plugins.refresh (true);
    setTimeout ('window.location.reload (false);', 2000);
}

function javaPluginInstalled() {
    return navigator.plugins ["Java(tm) Plugin"];
}

}catch(e) { alert("Javascript exception: " + e + " | " + e.toString );}

function showDialog(url, name, specs, isModal) {
    if (url==null) {
        alert('An attempt was made to show a dialog window with a null URL');
        return;
    }

    if (specs==null) {
        specs='';
    }

    if (isModal) {		
        var base = findBase();         
        var modal = window.open(url, name, 'dependent=yes,modal=yes,dialog=yes,' + specs);

        var keepModal = function(event) {
            event.preventDefault();
            event.stopPropagation();	
             if (event.type == 'click') {
             }  else {
                 if (!modal.closed) {
                     modal.AppWindow.setTimeout('window.focus()', 1);

                 } else { 
                     
                     base.AppWindow.removeEventListener('focus', keepModal, true);
                     base.AppWindow.removeEventListener('click', keepModal, true); 
                     keepModal = null;
                     modal     = null;
                     eventinProcess = false;	
                 }	
             }
			
        };

	base.AppWindow.addEventListener('focus', keepModal, true); 
        base.AppWindow.addEventListener('click', keepModal, true); 
    } else {
         eventinProcess = false;
         return window.open(url, name, 'dependent=yes,dialog=yes,' + specs);
    }
}
 
   
function showModal(url, title, specs) {
    showDialog(url, title, specs , true);
}

function showModeless(url, title, specs) {
    showDialog(url, title, specs, false);
}
////////////////////////////////////////////////////////////////////
//  end of File	: ief_Make.js
////////////////////////////////////////////////////////////////////


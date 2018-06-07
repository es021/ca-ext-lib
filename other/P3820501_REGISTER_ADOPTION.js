//-- CA Gen 8.6 - File Name: P3820501_REGISTER_ADOPTION.js - generated on 2018/06/06 (156) at 12:45:18   -- 
   
 var ie4 = false; 
 var ns4 = false; 
 var ns6 = false; 
 if ((navigator.userAgent.indexOf("Trident") != -1) || (navigator.appName.indexOf("Internet Explorer") != -1)) { 
    ie4 = true; 
 } else { 
    ns4 = ((navigator.appName.indexOf("Netscape") != -1) && (navigator.appVersion.substring(0,1) <= 4)); 
    ns6 = ((navigator.appName.indexOf("Netscape") != -1) && (navigator.appVersion.substring(0,1) > 4)); 
 } 
 if (ns4) 
    alert('Netscape 4.7 is not supported by this application'); 
   
 var oleResult; 
 var oleIndex = 0; 
 var dataPasted=false;
                                
   
function onkeypress_NS6(evt)   
{   
 var eventTarget = evt ? evt.target : AppWindow.event.srcElement;  
 var funcname = "";  
 if(!eventTarget.name) 
    return; 
 funcname = 'onkeypress_'+ eventTarget.name + '(evt)' ;  
 if(eventTarget.type == 'textarea') {  
 var keyCode = evt.keyCode ; 
 specialKey=(keyCode>32&&keyCode<41)||keyCode==46||keyCode==8||keyCode==9 ;  
 if(!eval(funcname)&& (!specialKey)) 
     evt.preventDefault(); 
 } else {                           
 try{eval(funcname);}catch(e){;}  
 }                                
}                                
                                
function disable_image(){ 
 } 
 
function enterKey(evt)
 {
  var eventTarget = evt ? evt.target : AppWindow.event.srcElement;
  var keyCode = ie4 ? AppWindow.event.keyCode : evt.which ;
  var isLink = ( eventTarget.tagName == 'A');
  var isButton = ( eventTarget.tagName == 'BUTTON' ); 
 return !( keyCode == 13 &&
	((isButton || isLink )? findElement(eventTarget.name,0).disabled:eventTarget.type != 'textarea'));
 }
                        
var propertyFileName; 
if (MESSAGEFILE != 'wr') 
  propertyFileName = 'ief_Error_'+MESSAGEFILE+'.js'; 
else  
  propertyFileName = 'ief_Error.js'; 
                                 
var fileContext; 
if (typeof parent.context != 'undefined') 
  fileContext = parent.context; 
else if (typeof context != 'undefined') 
  fileContext = context; 
else  
  fileContext = ""; 
                                 
 document.write("<SCRIPT LANGUAGE=JavaScript SRC='"+fileContext+propertyFileName+"'><\/SCRIPT>"); 
 document.write("<SCRIPT LANGUAGE=JavaScript SRC='"+fileContext+"ief_Validation.js'><\/SCRIPT>"); 
   
 function Validate(control)                       
 {                                                
var PVAL_3601064_DROP_LIST1XXXXXXXX = new Array(	new WIPERMIT('A', ''),	new WIPERMIT('B', ''),	new WIPERMIT('C', ''));
var PVAL_360025F_FLAG = new Array(	new WIPERMIT('Y', ''),	new WIPERMIT('N', ''));
var PVAL_36010DD_JANTINA = new Array(	new WIPERMIT('L', ''),	new WIPERMIT('P', ''),	new WIPERMIT('R', ''));
var PVAL_360155D_TENGAH_HARI_TNGAHq = new Array(	new WIPERMIT('TENGAH HARI', ''),	new WIPERMIT('TENGAH MALAM', ''));
var PVAL_3601560_AM_PM = new Array(	new WIPERMIT('AM', ''),	new WIPERMIT('PM', ''));
var PVAL_360021B_MK_INGIN_MYKID = new Array(	new WIPERMIT('Y', ''),	new WIPERMIT('T', ''));
 var T1_EF_no_permohonanDM = new WIDOMAIN('27','S','27','0','','0','0','1',' ');
 var tab1_ef_tarikh_permohonanDM = new WIDOMAIN('10','D','8','0','dd/mm/yyyy','0','0','0',' ');
 var tab1_ef_no_petisyenDM = new WIDOMAIN('12','S','12','0','','0','0','1',' ');
 var tab1_ef_tarikh_perintahDM = new WIDOMAIN('10','D','8','0','dd/mm/yyyy','0','0','0',' ');
 var tab1_ef_no_fail_rujukanDM = new WIDOMAIN('30','S','30','0','','0','0','1',' ');
 var BRANCH_CODEDM = new WIDOMAIN('8','S','8','0','','0','0','1',' ');
 var OPER_IDDM = new WIDOMAIN('8','S','8','0','','0','0','1',' ');
 var PC_IDDM = new WIDOMAIN('3','S','3','0','','0','0','1',' ');
   var name = control.name; 
   var ret = false; 
   var DM = eval(name+"DM"); 
   if (typeof DM != "undefined") 
      { 
         if (DM.permit != '0') 
            {                  
            var PV = eval(DM.permit); 
            if (typeof PV != "undefined") 
                  ret=validate_EP(name,control.value, DM, PV);   
            else                               
                  ret=validate_EP(name,control.value, DM, null); 
            }                                    
         else                                    
            ret=validate_EP(name,control.value, DM, null); 
         if ((ret == true) && ((errMsg==null) || (errMsg.length==0)))            
           control.value = screenOut; 
      } // DM                                 
    if(ret==false)                            
    {       
		console.log("here alert",errMsg);
     alert(errMsg);                           
     setTimeout("doSelect('"+control.name+"')", 0); 
    }                                         
    return(ret);                              
 }    
 var defaultFBColor = new Array(new DEFAULTCOLOR('CheckBox2','000000','ffffff'),new DEFAULTCOLOR('CheckBox1','000000','ffffff'),new DEFAULTCOLOR('T1_EF_no_permohonan','000000','ffffff'),new DEFAULTCOLOR('hide_j_PENGANGKATAN','000000','ffffff'),new DEFAULTCOLOR('hide_J_PENGANGKATAN_detail','000000','ffffff'),new DEFAULTCOLOR('LB_Jenis_Perintah','000000','ffffff'),new DEFAULTCOLOR('hide_j_perintah','000000','ffffff'),new DEFAULTCOLOR('LB_pejabat_daerah','000000','ffffff'),new DEFAULTCOLOR('LB_jenis_mahkamah','000000','ffffff'),new DEFAULTCOLOR('tab1_ef_tarikh_permohonan','000000','ffffff'),new DEFAULTCOLOR('LB_Jenis_Pengangkatan','000000','ffffff'),new DEFAULTCOLOR('hide_j_Mahkamah','000000','ffffff'),new DEFAULTCOLOR('Field11','000000','ffffff'),new DEFAULTCOLOR('hide_pej_daerah','000000','ffffff'),new DEFAULTCOLOR('hide_j_Mahkamah_detail','000000','ffffff'),new DEFAULTCOLOR('tab1_ef_no_petisyen','000000','ffffff'),new DEFAULTCOLOR('tab1_ef_tarikh_perintah','000000','ffffff'),new DEFAULTCOLOR('tab1_ef_no_fail_rujukan','000000','ffffff'),new DEFAULTCOLOR('hide_j_perintah_detail','000000','ffffff'),new DEFAULTCOLOR('Field12','000000','ffffff'),new DEFAULTCOLOR('hide_pej_daerah_detail','000000','ffffff'),new DEFAULTCOLOR('BRANCH_CODE','0080c0','ffffff'),new DEFAULTCOLOR('OPER_ID','0080c0','ffffff'),new DEFAULTCOLOR('PC_ID','0080c0','ffffff'),new DEFAULTCOLOR('Field16','000000','ffffff'),new DEFAULTCOLOR('LB_kod_mahkamah','000000','ffffff'));
//-- enable/disable state tables  -- 

 function initPage() 
 {
  if(!ie4) 
   AppWindow.document.addEventListener("keypress", onkeypress_NS6, true); 
  if (!ie4) {
    var obj1 = AppWindow.document.getElementById("GroupBox2");
    if ((obj1 != null) && (obj1.tagName == 'FIELDSET')) { 
      if (parseInt(obj1.style.width) <= 20)
        obj1.style.width = '0px';
      else
        obj1.style.width = parseInt(obj1.style.width) - 20 + "px";
      if (parseInt(obj1.style.height) <= 25)
        obj1.style.height = '0px';
      else
        obj1.style.height = parseInt(obj1.style.height) - 25 + "px";
    }
    var obj1 = AppWindow.document.getElementById("GroupBox1");
    if ((obj1 != null) && (obj1.tagName == 'FIELDSET')) { 
      if (parseInt(obj1.style.width) <= 20)
        obj1.style.width = '0px';
      else
        obj1.style.width = parseInt(obj1.style.width) - 20 + "px";
      if (parseInt(obj1.style.height) <= 25)
        obj1.style.height = '0px';
      else
        obj1.style.height = parseInt(obj1.style.height) - 25 + "px";
    }
  }
  findElement('CheckBox2',0).onclick = onclick_CheckBox2; 
  findElement('CheckBox1',0).onclick = onclick_CheckBox1; 
 genSetPictKeyboard("ejpnheader"); 
   findElement('T1_EF_no_permohonan',0).onchange = onchange_T1_EF_no_permohonan; 
  findElement('T1_EF_no_permohonan',0).onblur = onblur_T1_EF_no_permohonan; 
  findElement('T1_EF_no_permohonan',0).onfocus = onfocus_T1_EF_no_permohonan; 
   findElement('LB_Jenis_Perintah',0).onchange = onchange_LB_Jenis_Perintah; 
  findElement('LB_Jenis_Perintah',0).onclick = onclick_LB_Jenis_Perintah; 
   findElement('LB_pejabat_daerah',0).onchange = onchange_LB_pejabat_daerah; 
  findElement('LB_pejabat_daerah',0).onclick = onclick_LB_pejabat_daerah; 
   findElement('LB_jenis_mahkamah',0).onchange = onchange_LB_jenis_mahkamah; 
  findElement('LB_jenis_mahkamah',0).onclick = onclick_LB_jenis_mahkamah; 
   findElement('tab1_ef_tarikh_permohonan',0).onchange = onchange_tab1_ef_tarikh_permohonan; 
  findElement('tab1_ef_tarikh_permohonan',0).onblur = onblur_tab1_ef_tarikh_permohonan; 
  findElement('tab1_ef_tarikh_permohonan',0).onfocus = onfocus_tab1_ef_tarikh_permohonan; 
   findElement('LB_Jenis_Pengangkatan',0).onchange = onchange_LB_Jenis_Pengangkatan; 
  findElement('LB_Jenis_Pengangkatan',0).onclick = onclick_LB_Jenis_Pengangkatan; 
  findElement('tab1_ef_no_petisyen',0).onblur = onblur_tab1_ef_no_petisyen; 
  findElement('tab1_ef_no_petisyen',0).onfocus = onfocus_tab1_ef_no_petisyen; 
  findElement('tab1_ef_tarikh_perintah',0).onblur = onblur_tab1_ef_tarikh_perintah; 
  findElement('tab1_ef_tarikh_perintah',0).onfocus = onfocus_tab1_ef_tarikh_perintah; 
  findElement('tab1_ef_no_fail_rujukan',0).onblur = onblur_tab1_ef_no_fail_rujukan; 
  findElement('tab1_ef_no_fail_rujukan',0).onfocus = onfocus_tab1_ef_no_fail_rujukan; 
  findElement('PB_TAB1',0).onclick = function() { AnyEvent('RC166','on','Click') }; 
  findElement('PB_TAB2',0).onclick = function() { AnyEvent('RC168','on','Click') }; 
  findElement('PB_TAB3',0).onclick = function() { AnyEvent('RC170','on','Click') }; 
  findElement('PB_TAB4',0).onclick = function() { AnyEvent('RC172','on','Click') }; 
  findElement('PB_TAB5',0).onclick = function() { AnyEvent('RC173','on','Click') }; 
  findElement('PB_TAB6',0).onclick = function() { AnyEvent('RC174','on','Click') }; 
  findElement('PB_TAB7',0).onclick = function() { AnyEvent('RC176','on','Click') }; 
  findElement('PB_TAB8',0).onclick = function() { AnyEvent('RC177','on','Click') }; 
  findElement('PB_PREV',0).onclick = function() { AnyEvent('RC178','on','Click') }; 
  findElement('PB_NEXT',0).onclick = function() { AnyEvent('RC180','on','Click') }; 
  findElement('PB_KELUAR',0).onclick = function() { AnyEvent('RC188','on','Click') }; 
  findElement('PB_MENU',0).onclick = function() { AnyEvent('RC189','on','Click') }; 
  findElement('T1_PB_PERTANYAAN',0).onclick = function() { AnyEvent('RC190','on','Click') }; 
  findElement('PB_KEMASKINI',0).onclick = function() { AnyEvent('RC192','on','Click') }; 
  findElement('BRANCH_CODE',0).onblur = onblur_BRANCH_CODE; 
  findElement('BRANCH_CODE',0).onfocus = onfocus_BRANCH_CODE; 
  findElement('OPER_ID',0).onblur = onblur_OPER_ID; 
  findElement('OPER_ID',0).onfocus = onfocus_OPER_ID; 
  findElement('PC_ID',0).onblur = onblur_PC_ID; 
  findElement('PC_ID',0).onfocus = onfocus_PC_ID; 
   findElement('LB_kod_mahkamah',0).onchange = onchange_LB_kod_mahkamah; 
  findElement('LB_kod_mahkamah',0).onclick = onclick_LB_kod_mahkamah; 
  if (findElement('P3820501_REGISTER_ADOPTIONCLOSE',0) != null) 
    findElement('P3820501_REGISTER_ADOPTIONCLOSE',0).onclick = function() { AnyEvent('RC108','on','Close') }; 
  AppWindow.document.onkeydown = enterKey; 
 }

 function initPageFocus() 
 {
  updateFocus('CheckBox2'); 
 }

 function onclick_CheckBox2() 
 {
  if (isFieldinError()) return false; 
 }
 function onclick_CheckBox1() 
 {
  if (isFieldinError()) return false; 
 }
 function onchange_T1_EF_no_permohonan() 
 {
  if (!Validate(this)) return false;
  AnyEvent('RC133','on','Changed');
 }
 function onblur_T1_EF_no_permohonan() 
 {
  disabledbyChecked = false;
  if (lastFocus == 'T1_EF_no_permohonan') lastFocus = null; 
  forceChangeWhenNeeded(this, dataPasted);
  dataPasted = false;
  if (!Validate(this)) return false;
 }
 
 function onfocus_T1_EF_no_permohonan() 
 {
  lastFocus = 'T1_EF_no_permohonan';
  lastFocusValue = this.value;
 }
 function onchange_LB_Jenis_Perintah() 
 {
  AnyEvent('RC139','on','Changed');
 }
 function onclick_LB_Jenis_Perintah() 
 {
  if (isFieldinError()) return false; 
 }
 function onchange_LB_pejabat_daerah() 
 {
  AnyEvent('RC142','on','Changed');
 }
 function onclick_LB_pejabat_daerah() 
 {
  if (isFieldinError()) return false; 
 }
 function onchange_LB_jenis_mahkamah() 
 {
  AnyEvent('RC143','on','Changed');
 }
 function onclick_LB_jenis_mahkamah() 
 {
  if (isFieldinError()) return false; 
 }
 function onchange_tab1_ef_tarikh_permohonan() 
 {
  if (!Validate(this)) return false;
  AnyEvent('RC145','on','Changed');
 }
 function onblur_tab1_ef_tarikh_permohonan() 
 {
  disabledbyChecked = false;
  if (lastFocus == 'tab1_ef_tarikh_permohonan') lastFocus = null; 
  forceChangeWhenNeeded(this, dataPasted);
  dataPasted = false;
  if (!Validate(this)) return false;
 }
 
 function onfocus_tab1_ef_tarikh_permohonan() 
 {
  lastFocus = 'tab1_ef_tarikh_permohonan';
  lastFocusValue = this.value;
 }
 function onchange_LB_Jenis_Pengangkatan() 
 {
  AnyEvent('RC148','on','Changed');
 }
 function onclick_LB_Jenis_Pengangkatan() 
 {
  if (isFieldinError()) return false; 
 }
 function onblur_tab1_ef_no_petisyen() 
 {
  disabledbyChecked = false;
  if (lastFocus == 'tab1_ef_no_petisyen') lastFocus = null; 
  if (!Validate(this)) return false;
 }
 
 function onfocus_tab1_ef_no_petisyen() 
 {
  lastFocus = 'tab1_ef_no_petisyen';
 }
 function onblur_tab1_ef_tarikh_perintah() 
 {
  disabledbyChecked = false;
  if (lastFocus == 'tab1_ef_tarikh_perintah') lastFocus = null; 
  if (!Validate(this)) return false;
 }
 
 function onfocus_tab1_ef_tarikh_perintah() 
 {
  lastFocus = 'tab1_ef_tarikh_perintah';
 }
 function onblur_tab1_ef_no_fail_rujukan() 
 {
  disabledbyChecked = false;
  if (lastFocus == 'tab1_ef_no_fail_rujukan') lastFocus = null; 
  if (!Validate(this)) return false;
 }
 
 function onfocus_tab1_ef_no_fail_rujukan() 
 {
  lastFocus = 'tab1_ef_no_fail_rujukan';
 }
 function onblur_BRANCH_CODE() 
 {
  disabledbyChecked = false;
  if (lastFocus == 'BRANCH_CODE') lastFocus = null; 
  if (!Validate(this)) return false;
 }
 
 function onfocus_BRANCH_CODE() 
 {
  lastFocus = 'BRANCH_CODE';
 }
 function onblur_OPER_ID() 
 {
  disabledbyChecked = false;
  if (lastFocus == 'OPER_ID') lastFocus = null; 
  if (!Validate(this)) return false;
 }
 
 function onfocus_OPER_ID() 
 {
  lastFocus = 'OPER_ID';
 }
 function onblur_PC_ID() 
 {
  disabledbyChecked = false;
  if (lastFocus == 'PC_ID') lastFocus = null; 
  if (!Validate(this)) return false;
 }
 
 function onfocus_PC_ID() 
 {
  lastFocus = 'PC_ID';
 }
 function onchange_LB_kod_mahkamah() 
 {
  AnyEvent('RC203','on','Changed');
 }
 function onclick_LB_kod_mahkamah() 
 {
  if (isFieldinError()) return false; 
 }
 function DoAnyEvent(rcid, v1, eventtype) {	clearClickId();
	if (eventtype !='WinResize' && eventtype != 'WinMove' && isFieldinError())
		return false;  
	processEvent(rcid, v1, eventtype, "P3820501_REGISTER_ADOPTION"); 
 }
  
 function getFormData(rcid, v1, eventtype)
 {
	var formData = "";
	var delimiter='~';

		if (eventtype !='WinResize' && eventtype != 'WinMove' && isFieldinError()) 
	return false;
		formData = rcid+' '+v1+' '+eventtype+delimiter 
			+'RC111'+' '+findElement('CheckBox2',0).checked+delimiter 
			+'RC112'+' '+findElement('CheckBox1',0).checked+delimiter 
			+'RC133'+' '+findElement('T1_EF_no_permohonan',0).value+delimiter 
			+'RC139'+' '+findElement('LB_Jenis_Perintah',0).selectedIndex+delimiter 
			+'RC142'+' '+findElement('LB_pejabat_daerah',0).selectedIndex+delimiter 
			+'RC143'+' '+findElement('LB_jenis_mahkamah',0).selectedIndex+delimiter 
			+'RC145'+' '+findElement('tab1_ef_tarikh_permohonan',0).value+delimiter 
			+'RC148'+' '+findElement('LB_Jenis_Pengangkatan',0).selectedIndex+delimiter 
			+'RC159'+' '+findElement('tab1_ef_no_petisyen',0).value+delimiter 
			+'RC162'+' '+findElement('tab1_ef_tarikh_perintah',0).value+delimiter 
			+'RC164'+' '+findElement('tab1_ef_no_fail_rujukan',0).value+delimiter 
			+'RC193'+' '+findElement('BRANCH_CODE',0).value+delimiter 
			+'RC196'+' '+findElement('OPER_ID',0).value+delimiter 
			+'RC198'+' '+findElement('PC_ID',0).value+delimiter 
			+'RC203'+' '+findElement('LB_kod_mahkamah',0).selectedIndex+delimiter 
	return formData
 }

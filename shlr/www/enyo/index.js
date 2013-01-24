function dump(e){var t="";for(var n in e)t+=n+"\n";alert(t)}function objtostr(e){var t="";for(var n in e)t+=n+": "+e[n]+",\n";return t}function Ajax(e,t,n,r){var i=new XMLHttpRequest;i.open(e,t,!1),i.setRequestHeader("Accept","text/plain"),i.setRequestHeader("Accept","text/html"),i.setRequestHeader("Content-Type","application/x-ww-form-urlencoded; charset=UTF-8"),i.onreadystatechange=function(e){i.status==200?r&&r(i.responseText):console.error("ajax "+i.status)},i.send(n)}enyo.kind({name:"About",kind:"Scroller",style:"background-color:#303030",components:[{tag:"center",components:[{tag:"h1",style:"color:#f0f0f0",content:"About r2wui"},{kind:"Image",src:"icon.png"},{tag:"h2",style:"color:#a0a0a0",content:"author: pancake 2013"},{tag:"h2",style:"color:#a0a0a0",content:"version: 0.9.3git"}]}]}),enyo.kind({name:"Assembler",kind:"Scroller",components:[{tag:"form",style:"margin-top:8px;margin-left:8px",attributes:{action:"javascript:#"},components:[{kind:"FittableRows",fit:!0,components:[{kind:"onyx.InputDecorator",classes:"r2ui-input",components:[{tag:"font",content:"opcode",style:"font-weight:bold;margin-right:20px"},{kind:"Input",value:"",style:"width:89%",onkeydown:"assembleOpcode",attributes:{autocapitalize:"off"},name:"opcode"}]},{kind:"onyx.InputDecorator",classes:"r2ui-input",components:[{tag:"font",content:"bytes",style:"margin-right:20px;font-weight:bold"},{kind:"Input",value:"",style:"width:120px",onkeydown:"assembleOpcode",attributes:{autocapitalize:"off"},name:"bytes"}]},{kind:"onyx.InputDecorator",classes:"r2ui-input",components:[{tag:"font",content:"offset",style:"margin-right:20px;font-weight:bold"},{kind:"Input",value:"entry0",style:"width:120px",onkeydown:"assembleOpcode",attributes:{autocapitalize:"off"},name:"offset"}]}]}]}],assembleOpcode:function(e,t){if(t.keyCode===13){var n=e.getValue(),r=this.$.offset.getValue();switch(e.name){case"opcode":var i=this.$.bytes;r2.assemble(r,n,function(e){i.setValue(e)});break;case"bytes":var s=this.$.opcode;r2.disassemble(r,n,function(e){s.setValue(e)});break;case"offset":}}}});var Config={keys:{"C-1":"this.setIndex(0)","C-2":"this.setIndex(1)","C-3":"this.setIndex(2)"}};enyo.kind({name:"Console",kind:"Scroller",style:"margin-left:8px",components:[{tag:"form",attributes:{action:"javascript:#"},components:[{kind:"FittableRows",fit:!0,classes:"fittable-sample-shadow",components:[{kind:"onyx.InputDecorator",style:"margin-top:8px;background-color:#404040;width: 90%;display:inline-block",components:[{kind:"Input",style:"width:100%;color:white",value:"",onkeydown:"runCommand",attributes:{autocapitalize:"off"},name:"input"}]},{tag:"pre",classes:"r2ui-terminal",style:"width:90%;",fit:!0,allowHtml:!0,name:"output"}]}]}],runCommand:function(e,t){if(t.keyCode===13){var n=this.$.input.getValue();this.$.input.setValue(""),function(e){r2.cmd(n,function(t){e.setContent(t)})}(this.$.output)}}}),enyo.kind({name:"Disassembler",kind:"Scroller",tag:"div",style:"margin-left:16px",data:["pop eax","push ecx","jmp 0x80040","call 0x80404","xor eax, eax","int 0x80"],components:[{tag:"pre",allowHtml:!0,name:"text",content:"TODO : Disasm"}],create:function(){this.inherited(arguments);var e=this.$.text;r2.get_disasm("entry0",1024,function(t){t=r2.filter_asm(t,"pd"),e.setContent(t)})},setupItem:function(e,t){return this.$.msg.setContent(this.data[t.index]),!0}}),enyo.kind({name:"Graph",kind:"Scroller",style:"background-color:#c0c0c0",components:[{tag:"h2",content:"Open graph",style:"margin-left:10px;"},{kind:"Group",classes:"enyo-border-box group",defaultKind:"onyx.Button",components:[{content:"Basic blocks",classes:"onyx-dark menu-button",ontap:"openGraphBB"},{content:"Callgraph",classes:"onyx-dark menu-button",ontap:"openGraphCG"}]}],openGraphBB:function(){window.open("/graph/","_self")},openGraphCG:function(){window.open("/d3/","_self")}}),enyo.kind({name:"Hexdump",kind:"Scroller",style:"background-color:#c0c0c0;padding:8px",components:[{tag:"pre",allowHtml:!0,name:"output"}],create:function(){this.inherited(arguments);var e=this.$.output;r2.cmd("px 8192",function(t){e.setContent(r2.filter_asm(t,"px"))})}}),enyo.kind({name:"LeftPanel",classes:"onyx-toolbar",kind:"Scroller",fit:!0,style:"width: 220px;height:100%",components:[{tag:"h2",content:"crackme01",style:"margin-left:12px; margin-top:0px;margin-bottom:50px;height:10px;width:190px,overflow:hidden"},{kind:"Group",onActivate:"buttonActivated",classes:"enyo-border-box group",defaultKind:"onyx.Button",highlander:!0,components:[{content:"Disassembler",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Disassembler",active:!0},{content:"Assembler",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Assembler"},{content:"Hexdump",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Hexdump"},{content:"Graph",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Graph"},{content:"Search",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Search"},{content:"Console",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Console"},{content:"Logs",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Logs"},{content:"Script",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Script"},{content:"Settings",classes:"onyx-dark menu-button",ontap:"openPanel",name:"Settings"},{content:"About",classes:"onyx-dark menu-button",ontap:"openPanel",name:"About"}]}],openPanel:function(e){enyo.Panels.isScreenNarrow()&&this.ra.setIndex(1),this.openCallback&&this.openCallback(e.name)},ra:null,oldSender:null,rowTap:function(e,t){this.oldSender&&this.oldSender.setStyle("width:100%"),e.setStyle("background-color: #202020;width:100%"),this.oldSender=e,this.openCallback&&this.openCallback(t.index)},openCallback:undefined,data:[],iter:1,refresh:function(){this.iter++}}),enyo.kind({name:"Logs",kind:"Scroller",style:"background-color:#c0c0c0;margin-left:8px",components:[{tag:"form",attributes:{action:"javascript:#"},components:[{kind:"FittableRows",fit:!0,classes:"fittable-sample-shadow",components:[{kind:"onyx.InputDecorator",style:"margin-top:8px;background-color:#404040;width: 90%;display:inline-block",components:[{kind:"Input",style:"width:100%;color:white",value:"",onkeydown:"sendMessage",attributes:{autocapitalize:"off"},name:"input"}]},{tag:"pre",classes:"r2ui-terminal",style:"width:90%;",fit:!0,allowHtml:!0,name:"output"}]}]}],logger:null,create:function(){this.inherited(arguments);var e=this.$.output;this.logger=r2.get_logger().on("message",function(t){e.setContent(e.getContent()+t.text+"\n")}),this.logger.autorefresh(3)},sendMessage:function(e,t){if(t.keyCode===13){var n=this.$.input.getValue();this.$.input.setValue(""),this.logger.send(n)}}}),enyo.kind({name:"RadareApp",kind:"Panels",classes:"panels enyo-unselectable",realtimeFit:!0,arrangerKind:"CollapsingArranger",components:[{name:"lp",kind:"LeftPanel"},{name:"mp",kind:"MainPanel"},{name:"rp",kind:"RightPanel"},{kind:enyo.Signals,onkeypress:"handleKeyPress"}],setPanel0:function(){this.$.RadareApp.setIndex(1)},create:function(){this.inherited(arguments);var e=[{name:"Disassembler",active:!0},{name:"Assembler"},{name:"Hexdump"},{name:"Search"},{name:"Console"},{name:"Logs"},{name:"Script"},{name:"Settings",separator:!0},{name:"About"}];this.$.lp.data=e,this.$.mp.data=e,this.$.mp.ra=this.$.lp.ra=this.$.rp.ra=this;var t=this.$.mp;this.$.lp.openCallback=function(e){t.openPage(e)},this.$.lp.refresh()},handleKeyPress:function(inSender,inEvent){for(var key in Config.keys)if(key.substring(0,2)=="C-"){if(inEvent.ctrlKey){var k=key.substring(2).charCodeAt(0);if(inEvent.charCode==k){var cmd=Config.keys[key];eval(cmd+";")}}}else{var k=key.substring(2).charCodeAt(0);if(inEvent.charCode==k){var cmd=Config.keys[key];eval(cmd+";")}}}}),window.onload=function(){var e=(new RadareApp).renderInto(document.body)},enyo.kind({name:"MainPanel",classes:"onyx",kind:"FittableRows",tag:"div",classes:"enyo-fit",style:"background-color: #c0c0c0",data:null,buttonClicked:function(e){alert("let's play!")},cancelClicked:function(e){alert("nothing to see here! move along.")},components:[{kind:"FittableColumns",noStretch:!0,classes:"onyx-toolbar onyx-toolbar-inline",components:[{kind:"Scroller",thumb:!1,fit:!0,touch:!1,vertical:"hidden",style:"margin: 0;",components:[{classes:"onyx-toolbar-inline",style:"white-space: nowrap;",components:[{kind:"onyx.Button",content:"[",ontap:"openSidebar",style:"padding:8px"},{kind:"onyx.Button",content:"]",ontap:"openSidebar2",style:"padding:8px"},{kind:"onyx.Button",content:"<",ontap:"prevSeek"},{kind:"onyx.Button",content:">",ontap:"nextSeek"},{kind:"onyx.InputDecorator",style:"width: 200px;",components:[{kind:"onyx.Input",value:"entry0",onchange:"gotoSeek"}]},{kind:"onyx.PickerDecorator",components:[{kind:"onyx.Button",content:"Actions"},{kind:"onyx.Picker",components:[{content:"Analyze"},{content:"Rename"},{content:"Comment"},{content:"Flag"},{content:"Copy"},{content:"Paste"}]}]},{kind:"onyx.PickerDecorator",components:[{kind:"onyx.Button",content:"Convert"},{kind:"onyx.Picker",components:[{content:"Data"},{content:"Code"},{content:"String"}]}]},{kind:"onyx.PickerDecorator",components:[{kind:"onyx.Button",content:"Write"},{kind:"onyx.Picker",components:[{content:"File"},{content:"Hexpair"},{content:"String"}]}]}]}]}]},{kind:"Panels",name:"samplePanels",fit:!0,draggable:!1,realtimeFit:!0,classes:"enyo-border-box",components:[{kind:"Disassembler",name:"pageDisassembler"},{kind:"Assembler",name:"pageAssembler"},{kind:"Hexdump",name:"pageHexdump"},{kind:"Graph",name:"pageGraph"},{kind:"Search",name:"pageSearch"},{kind:"Console",name:"pageConsole"},{kind:"Logs",name:"pageLogs"},{kind:"Script",name:"pageScript"},{kind:"Preferences",name:"pagePreferences"},{kind:"About",name:"pageAbout"}]}],create:function(){this.inherited(arguments),this.$.samplePanels.setIndex(0)},ra:null,openSidebar:function(){this.ra.setIndex(this.ra.index?0:1)},openSidebar2:function(){this.ra.setIndex(2)},rendered:function(){this.inherited(arguments)},openPage:function(idx){var str,sp=this.$.samplePanels;eval("var x = this.$.page"+idx);switch(idx){case"Disassembler":idx=0;break;case"Assembler":idx=1;break;case"Hexdump":idx=2;break;case"Graph":idx=3;break;case"Search":idx=4;break;case"Console":idx=5;break;case"Logs":idx=6;break;case"Script":idx=7;break;case"Settings":idx=8;break;case"About":idx=9}sp.setIndex(idx)},seekStack:[],nextSeek:function(){var e="?";alert("nxt "+e)},prevSeek:function(){var e=this.seekStack.pop();alert("pop "+e)},gotoSeek:function(){var e=this.$.input.getValue();this.seekStack.push()}}),enyo.kind({name:"Preferences",classes:"panels-sample-sliding-content",kind:"Scroller",tag:"div",style:"margin-left:16px",components:[{kind:"FittableRows",fit:!1,components:[{tag:"h2",content:"CPU"},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Arch",classes:"rowline"},{kind:"onyx.PickerDecorator",components:[{},{kind:"onyx.Picker",components:[{content:"arc"},{content:"arm"},{content:"avr"},{content:"ppc"},{content:"bf"},{content:"dalvik"},{content:"dcpu16"},{content:"i8080"},{content:"java"},{content:"m68k"},{content:"mips"},{content:"msil"},{content:"rar"},{content:"sh"},{content:"sparc"},{content:"x86",active:!0},{content:"z80"}]}]}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Bits",classes:"rowline"},{kind:"onyx.PickerDecorator",components:[{},{kind:"onyx.Picker",components:[{content:"8"},{content:"16"},{content:"32",active:!0},{content:"64"}]}]}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Endian",classes:"rowline"},{kind:"onyx.PickerDecorator",components:[{},{kind:"onyx.Picker",components:[{content:"little",active:!0},{content:"big"}]}]}]},{tag:"h2",content:"Disassembly"},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Show bytes",classes:"rowline",ontap:"nextPanel"},{kind:"onyx.ToggleButton",name:"toggle_bytes "}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Show offsets",classes:"rowline",ontap:"nextPanel"},{kind:"onyx.ToggleButton",name:"toggle_offset"}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Show lines",classes:"rowline",ontap:"nextPanel"},{kind:"onyx.ToggleButton",name:"toggle_lines"}]},{kind:"onyx.InputDecorator",components:[{tag:"p",content:"Pseudo",classes:"rowline",ontap:"nextPanel"},{kind:"onyx.ToggleButton",name:"toggle_pseudo"}]}]},{tag:"h2",content:"Save changes?"},{tag:"div",style:"margin-left:50px",components:[{kind:"onyx.Button",style:"position:relative;left:0px",content:"Reset"},{kind:"onyx.Button",style:"position:relative;left:50px",content:"Save",classes:"onyx-affirmative"}]},{tag:"div",style:"height:64px"}]});var r2={},backward=!1,next_curoff=0,next_lastoff=0,prev_curoff=0,prev_lastoff=0;r2.root="",r2.assemble=function(e,t,n){var r=e?"@"+e:"";r2.cmd('"pa '+t+'"'+r,n)},r2.disassemble=function(e,t,n){var r=e?"@"+e:"",i="pi @b:"+t+r;r2.cmd(i,n)},r2.get_disasm=function(e,t,n){r2.cmd("b 512;pd",n)},r2.config_set=function(e){},r2.config_get=function(e){},r2.set_flag_space=function(e,t){r2.cmd("fs "+e,t)},r2.set_flag_space=function(e,t){r2.cmd("fs "+e,t)},r2.get_flags=function(e){r2.cmd("fj",function(t){e(t?JSON.parse(t):[])})},r2.get_opcodes=function(e,t,n){r2.cmd("pdj @"+e+"!"+t,function(e){n(JSON.parse(e))})},r2.get_bytes=function(e,t,n){r2.cmd("pcj @"+e+"!"+t,function(e){n(JSON.parse(e))})},r2.get_info=function(e){r2.cmd("ij",function(t){e(JSON.parse(t))})},r2.bin_imports=function(e){r2.cmd("iij",function(t){e(JSON.parse(t))})},r2.bin_symbols=function(e){r2.cmd("isj",function(t){e(JSON.parse(t))})},r2.bin_sections=function(e){r2.cmd("iSj",function(t){e(JSON.parse(t))})},r2.cmd=function(e,t){Ajax("GET",r2.root+"/cmd/"+encodeURI(e),"",function(e){t&&t(e)})},r2.alive=function(e){r2.cmd("b",function(t){var n=!1;t&&t.length()>0&&(n=!0),e&&e(t)})},r2.get_logger=function(e){return typeof e!="object"&&(e={}),e.last=0,e.events={},e.interval=null,r2.cmd("ll",function(t){e.last=+t}),e.load=function(t){r2.cmd("lj "+(e.last+1),function(e){t&&t(JSON.parse(e))})},e.clear=function(e){r2.cmd("l-",e)},e.send=function(e,t){r2.cmd("l "+e,t)},e.refresh=function(t){e.load(function(n){for(var r=0;r<n.length;r++){var i=n[r];e.events.message({id:i[0],text:i[1]}),i[0]>e.last&&(e.last=i[0])}t&&t()})},e.autorefresh=function(t){function n(){return e.refresh(function(){}),setTimeout(n,t*1e3),!0}if(!t){e.interval&&e.interval.stop();return}e.interval=setTimeout(n,t*1e3)},e.on=function(t,n){return e.events[t]=n,e},e},r2.filter_asm=function(e,t){function m(e){return e[0]=="p"&&e[1]=="d"?!0:e.indexOf(";pd")!=-1?!0:!1}var n=backward?prev_curoff:next_curoff,r=backward?prev_lastoff:next_lastoff,i=e.split(/\n/g);r2.cmd("s",function(e){n=e});for(var s=i.length-1;s>0;s--){var o=i[s].match(/0x([a-fA-F0-9]*)/);if(o&&o.length>0){r=o[0].replace(/:/g,"");break}}if(t=="afl"){var u="";for(var s=0;s<i.length;s++){var a=i[s].replace(/\ +/g," ").split(/ /g);u+=a[0]+"  "+a[3]+"\n"}e=u}else if(t[0]=="f"){if(t[1]=="s"){var u="";for(var s=0;s<i.length;s++){var a=i[s].replace(/\ +/g," ").split(/ /g),f=a[1]=="*"?"*":" ",l=a[2]?a[2]:a[1];if(!l)continue;u+=a[0]+" "+f+" <a href=\"javascript:runcmd('fs "+l+"')\">"+l+"</a>\n"}e=u}}else if(t[0]=="i"&&t[1]){var u="";for(var s=0;s<i.length;s++){var c=i[s].split(/ /g),h="",p="";for(var d=0;d<c.length;d++){var v=c[d].split(/=/);v[0]=="addr"&&(p=v[1]),v[0]=="name"&&(h=v[1]),v[0]=="string"&&(h=v[1])}u+=p+"  "+h+"\n"}e=u}return m(t)&&(e=e.replace(/function:/g,"<span style=color:red>function:</span>"),e=e.replace(/;(\s+)/g,";"),e=e.replace(/;(.*)/g,"// <span style='color:red'>$1</span>"),e=e.replace(/(bl|call)/g,"<b style='color:green'>call</b>"),e=e.replace(/(jmp|bne|beq|jnz|jae|jge|jbe|jg|je|jl|jz|jb|ja|jne)/g,"<b style='color:green'>$1</b>"),e=e.replace(/(dword|qword|word|byte|movzx|movsxd|cmovz|mov\ |lea\ )/g,"<b style='color:orange'>$1</b>"),e=e.replace(/(hlt|leave|retn|ret)/g,"<b style='color:red'>$1</b>"),e=e.replace(/(add|sub|mul|div|shl|shr|and|not|xor|inc|dec|sar|sal)/g,"<b style='color:orange'>$1</b>"),e=e.replace(/(push|pop)/g,"<b style='color:magenta'>$1</b>"),e=e.replace(/(test|cmp)/g,"<b style='color:green'>$1</b>"),e=e.replace(/nop/g,"<b style='color:blue'>nop</b>"),e=e.replace(/(sym|fcn|imp|loc).(.*)/g,"<a href='javascript:r2ui.seek(\"$1.$2\")'>$1.$2</a>")),e=e.replace(/0x([a-zA-Z0-9]*)/g,"<a href='javascript:r2ui.seek(\"0x$1\")'>0x$1</a>"),backward?(prev_curoff=n,prev_lastoff=r):(next_curoff=n,next_lastoff=r,prev_curoff||(prev_curoff=next_curoff)),e},enyo.kind({name:"RightPanel",classes:"onyx-toolbar",kind:"Scroller",style:"width:25px",ra:null,components:[{kind:"FittableColumns",components:[{kind:"onyx.Button",content:"[",ontap:"closeSidebar",style:"padding:8px;margin-right:8px"},{kind:"onyx.MenuDecorator",fit:!0,onSelect:"itemSelected",components:[{content:"List elements"},{kind:"onyx.Menu",maxHeight:290,style:"height:300px",components:[{content:"flags",value:"2"},{content:"flagspaces",value:"2"},{classes:"onyx-menu-divider"},{content:"symbols",value:"1"},{content:"imports",value:"1"},{content:"functions",value:"1"},{content:"comments",value:"1"},{classes:"onyx-menu-divider"},{content:"registers",value:"1"},{content:"stack",value:"2"},{content:"backtrace",value:"3"}]}]},{tag:"br"},{tag:"br"},{kind:"List",name:"list",style:"height:400px",realtimeFit:!0,onSetupItem:"setupItem",components:[{kind:"onyx.Item",layoutKind:"HFlexLayout",style:"padding:0px",components:[{name:"separator",tag:"hr",style:"height:1px;visibility:hidden"},{kind:"onyx.Button",name:"msg",style:"width:100%",fit:!0,active:!0,ontap:"rowTap"}]}]},{tag:"pre",style:"font-size:10px",allowHtml:!0,name:"output",content:".."}]}],rowTap:function(){},create:function(){this.inherited(arguments),this.$.list.setCount(3),this.$.list.refresh()},data:[],setupItem:function(e,t){var n=this.data[t.index];if(!n)return!1;var r=n.name+" "+n.offset;return console.log(r),this.$.msg.setContent(r),!0},refresh:function(){this.$.list.setCount(this.data.length),this.$.list.refresh()},itemSelected:function(e,t){var n=this,r=t.originator.content;switch(r){case"functions":r2.cmd("afl",function(e){n.$.output.setContent(e)});break;case"flagspaces":r2.cmd("fs",function(e){n.$.output.setContent(e)});break;case"sections":r2.bin_sections(function(e){var t="List of "+e.length+"\n\n";for(var r=0;r<e.length;r++)t+=e[r].offset+"  "+e[r].name+"\n";n.$.output.setContent(t)});break;case"symbols":r2.bin_symbols(function(e){var t="List of "+e.length+"\n\n";for(var r=0;r<e.length;r++)t+=e[r].offset+"  "+e[r].name+"\n";n.$.output.setContent(t)});break;case"imports":r2.bin_imports(function(e){var t="List of "+e.length+"\n\n";for(var r=0;r<e.length;r++)t+=e[r].offset+"  "+e[r].name+"\n";n.$.output.setContent(t)});break;case"flags":r2.get_flags(function(e){n.data=e,n.$.list.setCount(n.data.length);var t="List of "+n.data.length+"\n\n";for(var r=0;r<e.length;r++)t+=e[r].offset+"  "+e[r].name+"\n";n.$.output.setContent(t),n.$.list.refresh(),n.refresh()})}},closeSidebar:function(){this.ra.setIndex(1)}}),enyo.kind({name:"Script",kind:"Scroller",style:"background-color:#303030",components:[{tag:"center",components:[{tag:"h1",style:"color:#f0f0f0",content:"TODO: Scripting"}]}]}),enyo.kind({name:"Search",kind:"Scroller",style:"background-color:#303030",components:[{tag:"center",components:[{tag:"h1",style:"color:#f0f0f0",content:"TODO: Search"}]}]});
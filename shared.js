/* Jeux de données 100 % fictifs pour la maquette Nabu unifiée.
   Aucun appel serveur, aucune donnée personnelle réelle. */
(function(global){
"use strict";
var ITEMS_KEY="nabu-maquette-v1",ACTIVITIES_KEY="nabu-demo-activities-v1";
var profiles=[
{id:"DEMO-1001",apprentice:"Léa Dubois",company:"Horizon Conseil",apprenticeEmail:"lea.dubois@example.test",maName:"Émilie Perrin",maEmail:"emilie.perrin@example.test",maPhone:"06 00 00 00 11",cp:"Alexandre Perrin",xpe:"Sophie Renaud",coach:"Paul Marchand",admission:"Marie Leroy",course:"Bachelor Commerce",remaining:489,progress:31,modules:3},
{id:"DEMO-1002",apprentice:"Adam Laurent",company:"Maison Nova",apprenticeEmail:"adam.laurent@example.test",maName:"Nicolas Leroy",maEmail:"nicolas.leroy@example.test",maPhone:"06 00 00 00 12",cp:"Iris Bernard",xpe:"Sophie Renaud",coach:"Laura Petit",admission:"Marie Leroy",course:"BTS NDRC",remaining:328,progress:42,modules:4},
{id:"DEMO-1003",apprentice:"Chloé Martin",company:"Agence Atlas",apprenticeEmail:"chloe.martin@example.test",maName:"Camille Rossi",maEmail:"camille.rossi@example.test",maPhone:"06 00 00 00 13",cp:"Alexandre Perrin",xpe:"Sophie Renaud",coach:"Paul Marchand",admission:"Marie Leroy",course:"Bachelor Marketing",remaining:589,progress:25,modules:3},
{id:"DEMO-1004",apprentice:"Noah Petit",company:"Studio Pixel",apprenticeEmail:"noah.petit@example.test",maName:"Julie Garnier",maEmail:"julie.garnier@example.test",maPhone:"06 00 00 00 14",cp:"Iris Bernard",xpe:"Florian Dubreuil",coach:"Laura Petit",admission:"Anna Moreau",course:"BTS SIO",remaining:552,progress:38,modules:3},
{id:"DEMO-1005",apprentice:"Inès Bernard",company:"Cap Horizon",apprenticeEmail:"ines.bernard@example.test",maName:"Thomas Bell",maEmail:"thomas.bell@example.test",maPhone:"06 00 00 00 15",cp:"Alexandre Perrin",xpe:"Florian Dubreuil",coach:"Paul Marchand",admission:"Anna Moreau",course:"Bachelor RH",remaining:295,progress:58,modules:2},
{id:"DEMO-1006",apprentice:"Sara Girard",company:"Espace Conseil",apprenticeEmail:"sara.girard@example.test",maName:"Maxime Lenoir",maEmail:"maxime.lenoir@example.test",maPhone:"06 00 00 00 16",cp:"Iris Bernard",xpe:"Sophie Renaud",coach:"Laura Petit",admission:"Marie Leroy",course:"BTS MCO",remaining:403,progress:36,modules:3},
{id:"DEMO-1007",apprentice:"Camille Martin",company:"Atelier Horizon",apprenticeEmail:"camille.martin@example.test",maName:"Thomas Bernard",maEmail:"thomas.bernard@example.test",maPhone:"06 00 00 00 17",cp:"Alexandre Perrin",xpe:"Sophie Renaud",coach:"Paul Marchand",admission:"Marie Leroy",course:"BTS Support à l’action managériale",remaining:589,progress:25,modules:3}
];
var subject=[
["Faire un point sur les missions confiées","Préparer le compte rendu de suivi","Suivi de l’intégration"],
["Vérifier la satisfaction en entreprise","Relancer le maître d’apprentissage","Bilan d’intégration"],
["Clarifier les missions du contrat","Envoyer la synthèse de l’échange","Rendez-vous de suivi"],
["Contrôler les présences en formation","Préparer le rendez-vous pédagogique","Point de suivi"],
["Vérifier le calendrier de formation","Contacter l’entreprise pour le suivi","Échange avec le MA"],
["Traiter le retour entreprise","Préparer le rendez-vous apprentissage","Entretien de suivi"],
["Faire le point sur les missions","Envoyer le compte rendu de suivi","Entretien de progression"]
];
function dayKey(d){var v=new Date(d);return v.getFullYear()+"-"+String(v.getMonth()+1).padStart(2,"0")+"-"+String(v.getDate()).padStart(2,"0")}
function shift(k,n){var d=new Date(k+"T12:00:00");d.setDate(d.getDate()+n);return dayKey(d)}
function monday(k){var d=new Date(k+"T12:00:00");d.setDate(d.getDate()-((d.getDay()+6)%7));return dayKey(d)}
function read(key){try{return JSON.parse(localStorage.getItem(key))}catch(e){return null}}
function write(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch(e){}}
function findContract(id){return profiles.find(function(x){return x.id===id})||null}
function byName(name,company){return profiles.find(function(c){return String(c.apprentice).toLowerCase()===String(name||"").toLowerCase()&&(company===undefined||c.company===company)})||null}
function task(id,c,title,date,minute,opts){return Object.assign({id:id,kind:"task",title:title,person:c.apprentice,company:c.company,contractId:c.id,date:date,minute:minute,done:false,archived:false,origin:"Nabu"},opts||{})}
function event(id,c,title,date,minute,duration,origin,opts){return Object.assign({id:id,kind:"event",title:title,person:c.apprentice,company:c.company,contractId:c.id,date:date,minute:minute,duration:duration,category:"yellow",origin:origin||"Nabu"},opts||{})}
function initialItems(){
 var now=dayKey(new Date()),m=monday(now),result=[];
 result.push(task("t1",profiles[0],"Relancer le maître d'apprentissage",shift(now,-2),null,{priority:true}));
 result.push(task("t2",profiles[1],"Vérifier le suivi d'intégration M+1",shift(now,-1),null));
 result.push(task("t3",profiles[2],"Préparer la visio tripartite",now,630));
 result.push(task("t4",profiles[3],"Appeler l'apprenti pour suivi d'intégration",now,915,{priority:true}));
 result.push(task("t5",profiles[2],"Envoyer le compte rendu de suivi",now,null));
 result.push(task("t6",profiles[4],"Contrôler le planning de formation",shift(now,2),null));
 result.push(task("t7",profiles[5],"Retour ENKI — dossier entreprise",null,null,{origin:"Enki"}));
 result.push({id:"t8",kind:"task",title:"Préparer la synthèse hebdomadaire",person:"",company:"",date:shift(now,-1),minute:null,done:true,archived:false});
 result.push(event("e1",profiles[2],"Entretien tripartite — Chloé Martin",shift(m,0),570,45,"Nabu"));
 result.push(event("e2",profiles[0],"Rendez-vous maître d'apprentissage",shift(m,1),600,30,"Calendly",{bookerName:"Émilie Perrin",bookerRole:"Maître d'apprentissage",bookerEmail:"emilie.perrin@example.test",bookerPhone:"06 00 00 00 01",bookingSubject:"Suivi du démarrage du contrat",matchStatus:"matched"}));
 result.push(event("e3",profiles[3],"Entretien tripartite — Noah Petit",shift(m,1),840,60,"Nabu"));
 result.push({id:"e4",kind:"event",title:"Réunion interne — suivi qualité",date:shift(m,2),minute:660,duration:45,category:"green",origin:"Outlook",person:"",company:""});
 result.push(event("e5",profiles[5],"Rendez-vous apprenti — Sara Girard",shift(m,3),900,30,"Calendly",{bookerName:"Sara Girard",bookerRole:"Apprenti",bookerEmail:"sara.girard@example.test",bookerPhone:"06 00 00 00 02",bookingSubject:"",matchStatus:"matched"}));
 result.push({id:"e6",kind:"event",title:"Point équipe Expérience Entreprise",date:shift(m,4),minute:540,duration:30,category:"green",origin:"Outlook",person:"",company:""});
 result.push(task("enki-stock-01",profiles[1],"Alerte Enki — Satisfaction intégration faible (score D)",null,null,{priority:true,origin:"Enki"}));
 result.push(task("enki-stock-02",profiles[2],"Alerte Enki — Missions à clarifier (score C)",null,null,{priority:true,origin:"Enki"}));
 result.push(task("enki-stock-03",profiles[4],"Alerte Enki — Accompagnement à sécuriser (score D)",null,null,{priority:true,origin:"Enki"}));
 result.push(event("demo-rdv-today-nabu",profiles[1],"Entretien de suivi — Adam Laurent",now,570,45,"Nabu",{comment:"Faire un point sur les missions de l'apprenti."}));
 result.push(event("demo-rdv-today-calendly",profiles[0],"Rendez-vous maître d’apprentissage — Émilie Perrin",now,870,30,"Calendly",{bookerName:"Émilie Perrin",bookerRole:"Maître d'apprentissage",bookerEmail:"emilie.perrin@example.test",bookerPhone:"06 00 00 00 01",bookingSubject:"Suivi de l'intégration",matchStatus:"matched"}));
 profiles.forEach(function(c,i){
  var v=subject[i],base=5*i,offset=[1,-1,2,3,0,-2,1][i];
  result.push(task("cross-task-"+c.id+"-1",c,v[0],shift(now,offset),offset<0?null:540+(i%4)*60,{activityId:"cross-activity-"+c.id+"-1",comment:"Action de suivi liée à une activité sur le dossier."}));
  result.push(task("cross-task-"+c.id+"-2",c,v[1],shift(now,2+(i%3)),null,{activityId:"cross-activity-"+c.id+"-2"}));
  result.push(event("cross-event-"+c.id,c,v[2]+" — "+c.apprentice,shift(now,i%3),615+(i%4)*75,30,i%2?"Calendly":"Nabu",i%2?{bookerName:c.maName,bookerRole:"Maître d'apprentissage",bookerEmail:c.maEmail,bookerPhone:c.maPhone,bookingSubject:"Suivi du contrat",matchStatus:"matched"}:{}));
  result.push(event("cross-event-followup-"+c.id,c,"Point de suivi pédagogique — "+c.apprentice,shift(now,3+i%4),750+(i%3)*60,45,"Nabu",{comment:"Échange avec le coordinateur pédagogique "+c.cp+"."}));
 });
 result.push(task("cross-camille-done",profiles[6],"Vérifier la réception des documents",shift(now,-3),null,{done:true,activityId:"cross-activity-DEMO-1007-1"}));
 return result;
}
function defaultActivities(){
 var all={};profiles.forEach(function(c,i){
  all[c.id]=[
   {id:"cross-activity-"+c.id+"-1",type:"Suivi",author:c.xpe,role:"Référent expérience entreprise",date:new Date(Date.now()-(2+i)*3600000).toISOString(),text:"Échange de suivi avec "+c.maName+" ("+c.company+") : bilan d'intégration et missions confiées."},
   {id:"cross-activity-"+c.id+"-2",type:"Atteint",author:c.xpe,role:"Référent expérience entreprise",date:new Date(Date.now()-(26+i)*3600000).toISOString(),text:"Appel de suivi réalisé. Une nouvelle action de suivi est programmée."},
   {id:"cross-activity-"+c.id+"-3",type:"Commentaire",author:c.cp,role:"Coordinateur pédagogique",date:new Date(Date.now()-(50+i)*3600000).toISOString(),text:"Avancement pédagogique et calendrier de formation vérifiés."},
   {id:"cross-activity-"+c.id+"-4",type:"Rdv",author:c.coach,role:"Learning coach",date:new Date(Date.now()-(75+i)*3600000).toISOString(),text:"Point de progression sur la formation et les objectifs du prochain module."}
  ];
 });return all;
}
function importOldProfile(items,activities){
 var legacy=read("nabu-fiche-participant-demo-v1"),c=findContract("DEMO-1007");if(!legacy||!Array.isArray(legacy.tasks))return;
 var list=Array.isArray(legacy.activities)?legacy.activities:[];
 list.forEach(function(a){var id="legacy-activity-"+a.id;if(!activities[c.id].some(function(b){return b.id===id}))activities[c.id].push(Object.assign({},a,{id:id}))});
 legacy.tasks.forEach(function(t){var id="legacy-profile-task-"+t.id;if(items.some(function(x){return x.id===id}))return;items.push(task(id,c,t.title,t.date||null,t.time?Number(t.time.slice(0,2))*60+Number(t.time.slice(3,5)):null,{comment:t.comment||"",done:!!t.done,activityId:t.activityId?"legacy-activity-"+t.activityId:null}))});
}
function ensure(){
 var items=read(ITEMS_KEY);if(!Array.isArray(items))items=[];
 var template=initialItems(),existing=new Set(items.map(function(x){return x.id}));
 template.forEach(function(it){if(!existing.has(it.id)){items.push(it);existing.add(it.id)}});
 items.forEach(function(it){if(it.id==="e4"||it.id==="e6"){if(it.kind==="event"&&it.category==="green"&&it.origin==="Nabu")it.origin="Outlook"}if(it.kind==="event"&&it.category==="blue")it.category="yellow";if(!it.contractId&&it.person){var c=byName(it.person,it.company);if(c)it.contractId=c.id}});
 var activities=read(ACTIVITIES_KEY);if(!activities||typeof activities!=="object"||Array.isArray(activities))activities={};
 var defaults=defaultActivities();
 profiles.forEach(function(c){if(!Array.isArray(activities[c.id]))activities[c.id]=[];defaults[c.id].forEach(function(a){if(!activities[c.id].some(function(x){return x.id===a.id}))activities[c.id].push(a)})});
 importOldProfile(items,activities);
 write(ITEMS_KEY,items);write(ACTIVITIES_KEY,activities);
 return {items:items,activities:activities};
}
function getItems(){var data=read(ITEMS_KEY);return Array.isArray(data)?data:ensure().items}
function saveItems(items){write(ITEMS_KEY,items)}
function getActivities(id){var data=read(ACTIVITIES_KEY);return data&&Array.isArray(data[id])?data[id]:ensure().activities[id]||[]}
function saveActivities(id,list){var obj=read(ACTIVITIES_KEY);if(!obj||typeof obj!=="object")obj={};obj[id]=list;write(ACTIVITIES_KEY,obj)}
global.NabuDemo={profiles:profiles,contracts:profiles,findContract:findContract,ensure:ensure,getItems:getItems,saveItems:saveItems,getActivities:getActivities,saveActivities:saveActivities,itemsKey:ITEMS_KEY,dayKey:dayKey,shift:shift};
})(window);

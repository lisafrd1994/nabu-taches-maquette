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
/* Métadonnées de présentation du listing « Mes participants », exclusivement fictives. */
var metadata=[["C","Nouvel entrant","En cours de formation","2026-04-13","2027-06-25","2026-04-14","2027-04-30","vendredi","Aucune"],["D","Nouvel entrant","En cours de formation","2026-06-10","2027-07-31","2026-06-11","2027-06-30","mercredi","Satisfaction intégration"],["C","Nouvel entrant","En cours de formation","2026-09-01","2027-08-31","2026-09-03","2027-07-31","jeudi","Missions à clarifier"],["A","Nouvel entrant","En cours de formation","2026-05-01","2027-08-31","2026-05-04","2027-06-30","lundi","Aucune"],["D","Renouvellement","En cours de formation","2026-03-15","2027-09-30","2026-03-16","2027-07-31","mardi","Accompagnement à sécuriser"],["B","Nouvel entrant","En cours de formation","2026-07-01","2027-06-30","2026-07-02","2027-05-31","jeudi","Aucune"],["B","Nouvel entrant","En cours de formation","2026-09-14","2027-08-31","2026-09-15","2027-07-31","mercredi","Aucune"]];
profiles.forEach(function(p,i){var m=metadata[i];p.score=m[0];p.contractType=m[1];p.trainingStatus=m[2];p.contractStart=m[3];p.contractEnd=m[4];p.trainingStart=m[5];p.trainingEnd=m[6];p.trainingDay=m[7];p.alertName=m[8]});
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
/* Démarrage volontairement vide : aucune tâche ni aucun rendez-vous préchargé. */
function initialItems(){return []}
function defaultActivities(){
 var all={};profiles.forEach(function(c,i){
  all[c.id]=[
   {id:"cross-activity-"+c.id+"-1",type:"Suivi",author:c.xpe,role:"Référent expérience entreprise",date:new Date(Date.now()-(2+i)*3600000).toISOString(),text:"Échange de suivi avec "+c.maName+" ("+c.company+") : bilan d'intégration et missions confiées."},
   {id:"cross-activity-"+c.id+"-2",type:"Atteint",author:c.xpe,role:"Référent expérience entreprise",date:new Date(Date.now()-(26+i)*3600000).toISOString(),text:"Appel de suivi réalisé et éléments consignés au dossier."},
   {id:"cross-activity-"+c.id+"-3",type:"Commentaire",author:c.cp,role:"Coordinateur pédagogique",date:new Date(Date.now()-(50+i)*3600000).toISOString(),text:"Avancement pédagogique et calendrier de formation vérifiés."},
   {id:"cross-activity-"+c.id+"-4",type:"Rdv",author:c.coach,role:"Learning coach",date:new Date(Date.now()-(75+i)*3600000).toISOString(),text:"Point de progression sur la formation et les objectifs du prochain module."}
  ];
 });return all;
}
/* Remise à zéro demandée le 20/10/2026.
   La migration efface UNE SEULE FOIS les anciens items locaux (tâches, rdv,
   rappels Enki et réunions Outlook), puis laisse les créations ultérieures intactes.
   Les dossiers et l'historique d'activités restent disponibles. */
var CLEAN_AGENDA_KEY="nabu-demo-clean-agenda-20261020-v1";
function ensure(){
 var items=read(ITEMS_KEY);
 if(read(CLEAN_AGENDA_KEY)!==true){
  items=[];
  write(ITEMS_KEY,items);
  write(CLEAN_AGENDA_KEY,true);
 }
 if(!Array.isArray(items))items=[];
 items.forEach(function(it){if(it.kind==="event"&&it.category==="blue")it.category="yellow";if(!it.contractId&&it.person){var c=byName(it.person,it.company);if(c)it.contractId=c.id}});
 var activities=read(ACTIVITIES_KEY);if(!activities||typeof activities!=="object"||Array.isArray(activities))activities={};
 var defaults=defaultActivities();
 profiles.forEach(function(c){if(!Array.isArray(activities[c.id]))activities[c.id]=[];defaults[c.id].forEach(function(a){if(!activities[c.id].some(function(x){return x.id===a.id}))activities[c.id].push(a)})});
 write(ITEMS_KEY,items);write(ACTIVITIES_KEY,activities);
 return {items:items,activities:activities};
}
function getItems(){var data=read(ITEMS_KEY);return Array.isArray(data)?data:ensure().items}
function saveItems(items){write(ITEMS_KEY,items)}
function getActivities(id){var data=read(ACTIVITIES_KEY);return data&&Array.isArray(data[id])?data[id]:ensure().activities[id]||[]}
function saveActivities(id,list){var obj=read(ACTIVITIES_KEY);if(!obj||typeof obj!=="object")obj={};obj[id]=list;write(ACTIVITIES_KEY,obj)}
global.NabuDemo={profiles:profiles,contracts:profiles,findContract:findContract,ensure:ensure,getItems:getItems,saveItems:saveItems,getActivities:getActivities,saveActivities:saveActivities,itemsKey:ITEMS_KEY,dayKey:dayKey,shift:shift};
})(window);

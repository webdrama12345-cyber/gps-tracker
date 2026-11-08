let currentLat=0, currentLng=0;
function getLocation(){
  document.getElementById('status').innerText='Getting location... Please allow permission...';
  if(!navigator.geolocation){ document.getElementById('status').innerText='Your browser does not support GPS'; return; }
  navigator.geolocation.getCurrentPosition(showPosition, showError, {enableHighAccuracy:true, timeout:10000});
}
function showPosition(pos){
  currentLat=pos.coords.latitude; currentLng=pos.coords.longitude;
  document.getElementById('lat').innerText=currentLat.toFixed(6);
  document.getElementById('lng').innerText=currentLng.toFixed(6);
  document.getElementById('acc').innerText=pos.coords.accuracy ? pos.coords.accuracy.toFixed(0)+' meters' : 'N/A';
  document.getElementById('alt').innerText=pos.coords.altitude ? pos.coords.altitude.toFixed(1)+' m' : 'N/A';
  document.getElementById('speed').innerText=pos.coords.speed ? (pos.coords.speed*3.6).toFixed(1)+' km/h' : '0 km/h';
  // Simple Grid Reference - UTM style approx
  let zone = Math.floor((currentLng+180)/6)+1;
  let gridRef = 'Zone '+zone+' | E: '+(500000 + currentLng*111320).toFixed(0)+' N: '+(currentLat*110540).toFixed(0);
  document.getElementById('grid').innerText=gridRef;
  document.getElementById('plus').innerText=currentLat.toFixed(4)+', '+currentLng.toFixed(4);
  let link='https://www.google.com/maps?q='+currentLat+','+currentLng;
  let a=document.getElementById('mapLink');
  a.href=link; a.innerText=link;
  document.getElementById('status').innerText='✅ Location Found Successfully!';
}
function showError(err){
  document.getElementById('status').innerText='Error: Please turn ON Location / GPS and Allow Permission. '+err.message;
}
function copyLocation(){
  let txt='My Location: '+currentLat+', '+currentLng+' | Maps: https://www.google.com/maps?q='+currentLat+','+currentLng;
  navigator.clipboard.writeText(txt);
  alert('Location Copied!');
}
function openMap(){
  if(currentLat===0){ alert('Pehle Get My Current Location dabao!'); return; }
  window.open('https://www.google.com/maps?q='+currentLat+','+currentLng,'_blank');
}

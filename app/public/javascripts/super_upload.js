Conf.uuid = null;


function fetchUUID(){
  var e = getIframeDoc().getElementById('uuid');
  return (e == null ? null : e.innerHTML)
};

function isIframeReady(){
  var iframe = document.getElementById('super_iframe')
  if (iframe == null){
    return false;
  } else if (Conf.uuid == null) {
    Conf.uuid = fetchUUID();
    return (Conf.uuid == null ? false : true)
  } else {
    return true;
  }
}

function checkIframeStatus(){
  if ( isIframeReady() ){
    var status = getIframeState();
     if ( status == 'compleated') {
      uploadCompleated();
     } else {
       if (status == 'uploading') {
         updateProgress();
       }
       setTimer();
     }
  } else {
    setTimer();
  }
}

function getIframeState(){
  var e = getIframeDoc().getElementById('state');
  return (e == null ? 'init' : e.innerHTML)
}

function setTimer(){
  setTimeout(checkIframeStatus, 10);
}


function setProgress(p){
  var v = 0;
  if (p['state'] == 'done') {
    v = 100;
  } else {
    v = p['received']/p['size']*100;
  }
  document.getElementById('progress').innerHTML = Math.round(v);
};
 
function uploadCompleated(){
  document.getElementById('progress').innerHTML = "100";
}

function updateProgress(){
  sendJSONP("/progress/"+Conf.uuid, 'setProgress');
}

function getIframeDoc()
{
  return  document.getElementById('super_iframe').contentWindow.document;
}


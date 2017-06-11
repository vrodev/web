var app = {
  author:"Leonard Pauli",
  copyright:"© Leonard Pauli 2015"
};
app.action = {};

var q = function (a,x) {
  if (!x) x = document;
  return x.querySelector(a);
};
app.ui = {
  upload:q('button.upload'),
  download:q('button.download'),
  
  box:q('.box'),
  
  text1:q('.text.t1'),
  text2:q('.text.t2'),
  
  logo:q('.box .logo'),
  back:q('button.back'),
  input:q('input.file'),
  fetchProfile:q('button.fetch'),
  loadVDA:q('button.loadVDA'),
  loadMM:q('button.loadMM'),
  loadIG:q('button.loadIG'),
  loadCustomProfile:q('button.loadCustomProfile')
}

var el = q('.settings');
app.ui.settings = {
  el:el,
  height:q('.height',el),
  t1:q('.t1',el),
  t2:q('.t2',el),
  logo:q('.logo',el),
  t1h:q('.t1h',el),
  t2h:q('.t2h',el)
}
el = null;

app.action.updateLogo = function (input) {
  if (!input.files || !input.files.length)
    return;
  var file = input.files[0];

  var reader = new FileReader();
  reader.onload = function (e) {
    var text = e.target.result;
    app.ui.box.style.backgroundImage = "url("+text+")"
  }
  reader.readAsDataURL(file)
}

app.ui.upload.onclick = function () {
  var input = app.ui.input;
  input.type = "file"
  input.accept = "image/*"
  app.action.updateLogo(input);

  input.onchange = function () {
    app.action.updateLogo(input);
  }

  input.click()
}

app.ui.download.onclick = function () {
  alert('Ta en screenshot och beskär bilden i systemprogramet.');
}

app.ui.settings.height.onmousemove =
app.ui.settings.height.ontouchmove =
app.ui.settings.height.onchange = function (e) {
  var p = this.value/100;
  var v = 100+p*(320*1.7-100);
  app.ui.box.style.height = v+'px';
}

app.ui.settings.t1.onmousemove =
app.ui.settings.t1.ontouchmove =
app.ui.settings.t1.onchange = function (e) {
  var p = this.value/100;
  var v = 20+p*(19*2);
  app.ui.text1.style.fontSize = v+'px';
}

app.ui.settings.t2.onmousemove =
app.ui.settings.t2.ontouchmove =
app.ui.settings.t2.onchange = function (e) {
  var p = this.value/100;
  var v = 15+p*(20);
  app.ui.text2.style.fontSize = v+'px';
}

app.ui.settings.logo.onmousemove =
app.ui.settings.logo.ontouchmove =
app.ui.settings.logo.onchange = function (e) {
  var p = this.value/100;
  var v = 10+p*(90);
  if (p<0.1) v = 0;
  app.ui.logo.style.width = v+'px';
  app.ui.logo.style.height = v+'px';
}

app.ui.settings.t1h.onmousemove =
app.ui.settings.t1h.ontouchmove =
app.ui.settings.t1h.onchange = function (e) {
  var p = this.value/100;
  var v = 40+p*(40);
  app.ui.text1.style.lineHeight = v+'px';
}

app.ui.settings.t2h.onmousemove =
app.ui.settings.t2h.ontouchmove =
app.ui.settings.t2h.onchange = function (e) {
  var p = this.value/100;
  var v = 70+p*(35*2);
  app.ui.text2.style.lineHeight = v+'px';
}


app.ui.back.onclick = function () {
 window.location.href='/admin';
}

app.action.fetchProfile = function () {
  var profile = {
    imageSrc:app.ui.box.style.backgroundImage.slice(4,-1),
    height:app.ui.settings.height.value,
    t1:app.ui.settings.t1.value,
    t2:app.ui.settings.t2.value,
    logo:app.ui.settings.logo.value,
    t1h:app.ui.settings.t1h.value,
    t2h:app.ui.settings.t2h.value,
    t1t:app.ui.text1.innerHTML,
    t2t:app.ui.text2.innerHTML
  };
  return profile;
}

app.action.loadProfile = function (profile) {
  app.ui.box.style.backgroundImage = "url("+profile.imageSrc+")";
  app.ui.settings.height.value = profile.height;
  app.ui.settings.t1.value = profile.t1;
  app.ui.settings.t2.value = profile.t2;
  app.ui.settings.logo.value = profile.logo;
  app.ui.settings.t1h.value = profile.t1h;
  app.ui.settings.t2h.value = profile.t2h;
  app.ui.text1.innerHTML = profile.t1t;
  app.ui.text2.innerHTML = profile.t2t;

  app.ui.settings.height.onchange();
  app.ui.settings.t1.onchange();
  app.ui.settings.t2.onchange();
  app.ui.settings.logo.onchange();
  app.ui.settings.t1h.onchange();
  app.ui.settings.t2h.onchange();

}

app.ui.fetchProfile.onclick = function () {
  alert(JSON.stringify(app.action.fetchProfile()));
}

app.ui.loadVDA.onclick = function () {
  var profile = {"imageSrc":"","height":"27","t1":"39","t2":"50","logo":"38","t1h":"72","t2h":"50","t1t":"Visste du att..?","t2t":""};
  app.action.loadProfile(profile);
}

app.ui.loadMM.onclick = function () {
  var profile = {"imageSrc":"","height":"27","t1":"32","t2":"19","logo":"36","t1h":"88","t2h":"100","t1t":"Månadens Medlem","t2t":"Namn Andersson"};
  app.action.loadProfile(profile);
}

app.ui.loadIG.onclick = function () {
  var profile = {"imageSrc":"","height":"50","t1":"54","t2":"19","logo":"0","t1h":"49","t2h":"63","t1t":"Awesome!","t2t":"Var redo:"};
  app.action.loadProfile(profile);
}

app.ui.loadCustomProfile.onclick = function () {
  var profile = prompt("Klistra in profilkoden i rutan:");
  if (!profile) return;
  profile = JSON.parse(profile);
  if (!profile) return;
  app.action.loadProfile(profile);
}

app.action.loadDefault = function () {
  var profile = {"imageSrc":"","height":"50","t1":"54","t2":"19","logo":"0","t1h":"49","t2h":"63","t1t":"Awesome!","t2t":"Det är klart:"};
  app.action.loadProfile(profile);
}
app.action.loadDefault();

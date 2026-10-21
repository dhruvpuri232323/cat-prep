/* Sends due study reminders as push notifications.
   Runs in GitHub Actions (see .github/workflows/nudges.yml). It reads, for each
   signed-in user, three small documents the app keeps up to date:
     data/users/<uid>/meta/items/notify  → reminder settings + device tokens
     data/users/<uid>/meta/items/status  → today's plan, cards due, streak, …
     data/users/<uid>/meta/items/sent    → what this job already sent (written here)
   and decides what to send with the same rules the app uses (bank.js). */
const admin=require("firebase-admin");
const B=require("./bank.js");
const raw=process.env.FIREBASE_SERVICE_ACCOUNT;
if(!raw){console.error("Missing the FIREBASE_SERVICE_ACCOUNT secret. Add it in GitHub → Settings → Secrets and variables → Actions.");process.exit(1);}
let sa;try{sa=JSON.parse(raw);}catch(e){console.error("FIREBASE_SERVICE_ACCOUNT isn't valid JSON. Paste the whole downloaded .json file as the secret's value.");process.exit(1);}
admin.initializeApp({credential:admin.credential.cert(sa)});
const db=admin.firestore(),fcm=admin.messaging();
const TEST=String(process.env.NUDGE_TEST)==="true";
const SITE=process.env.SITE_URL||"./";
const BAD=new Set(["messaging/registration-token-not-registered","messaging/invalid-registration-token","messaging/invalid-argument","messaging/mismatched-credential"]);
(async()=>{
  const users=await db.doc("data/users").listCollections();
  if(!users.length)console.log("No users yet.");
  for(const col of users){
    const uid=col.id,base=db.collection(`data/users/${uid}/meta/items`);
    const [nS,sS,xS,cS]=await Promise.all(["notify","status","sent","sentc"].map(id=>base.doc(id).get()));
    const notify=nS.exists?nS.data():null;
    if(!notify||!notify.on||!(notify.tokens||[]).length){console.log(`${uid.slice(0,6)}…: reminders off or no device registered`);continue;}
    const status=sS.exists?sS.data():{},sent=xS.exists?xS.data():{},sentc=cS.exists?cS.data():{};
    sent.days=sent.days||{};sent.hist=sent.hist||[];sent.bodies=sent.bodies||[];
    const local=B.localNow(notify.tz||status.tz||"Asia/Kolkata");
    const already={...((sent.days)[local.date]||{}),...(((sentc.days||{})[local.date])||{})};
    let list=TEST?[{id:"test",cat:"random",ctx:{}}]:B.decide(notify,status,local,already);
    list=list.slice(0,2);
    if(!list.length)console.log(`${uid.slice(0,6)}…: nothing due at ${local.date} ${Math.floor(local.min/60)}:${String(local.min%60).padStart(2,"0")}`);
    for(const it of list){
      const msg=B.compose(it.cat,it.ctx,{tones:notify.tones,hist:sent.hist,bodies:sent.bodies});
      if(!msg)continue;
      const tokens=(notify.tokens||[]).map(x=>x.t);
      const res=await fcm.sendEachForMulticast({tokens,
        data:{title:msg.title,body:msg.body,tag:it.id,link:SITE+"#"+(B.LINKS[it.cat]||"today")},
        webpush:{headers:{Urgency:"high",TTL:"21600"}}});
      const bad=[];res.responses.forEach((r,i)=>{if(!r.success){const c=r.error&&r.error.code;console.log("  failed:",c,r.error&&r.error.message);if(BAD.has(c))bad.push(tokens[i]);}});
      if(bad.length){notify.tokens=notify.tokens.filter(x=>!bad.includes(x.t));await base.doc("notify").set({tokens:notify.tokens},{merge:true});console.log(`  removed ${bad.length} expired device(s)`);}
      if(it.id!=="test")(sent.days[local.date]=sent.days[local.date]||{})[it.id]=true;
      sent.hist=[...sent.hist,msg.key].slice(-500);sent.bodies=[...sent.bodies,msg.bodyKey].slice(-40);
      console.log(`${uid.slice(0,6)}…: [${it.id}] “${msg.title}” → ${res.successCount}/${tokens.length} device(s)`);
    }
    Object.keys(sent.days).sort().slice(0,-7).forEach(d=>delete sent.days[d]);
    sent.last=Date.now();sent.lastRun=new Date().toISOString();
    await base.doc("sent").set(sent);
  }
})().catch(e=>{console.error(e);process.exit(1);});

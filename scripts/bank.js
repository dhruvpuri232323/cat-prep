/* =====================================================================
   NUDGE BANK — every reminder the app can send, in six tones.
   Tones: r = savage roast, d = desi family, c = corporate, f = filmy drama,
          k = kind coach, n = CAT nerd, a = works with any tone.
   A message = one title + one body from the same category (and tone), plus
   sometimes a P.S. Titles and bodies mix freely, and the last few hundred
   combinations are remembered so the same one doesn't come back.
   ===================================================================== */
const NUDGE_BANK=(function(){
const T={r:"Savage roast",d:"Desi family",c:"Corporate",f:"Filmy drama",k:"Kind coach",n:"CAT nerd"};
const C={
/* ---------- morning: today's plan ---------- */
morning:{t:{
 a:["☀️ Day {day}. Let's go.","Today's menu: {total} items","Rise and revise","Good morning, future IIM-ite… or TISS-ite","New day, new {total} checkboxes","The plan has spoken: {total} items","Morning briefing: Day {day}"],
 r:["Wake up. The syllabus didn't sleep either.","Snooze button: 1. You: 0.","Your bed is not a study material","Hello, professional alarm-ignorer","Get up. Mediocrity isn't a career plan.","Rise. Your competition already did.","Morning. Your excuses called in sick."],
 d:["Uth ja beta, Sharma ji ka beta is already on Day {day}","Beta, chai ready hai, plan bhi ready hai","Good morning from the family WhatsApp group","Mummy says: phone neeche, books upar","Papa ne poocha: aaj kya padhoge?","Neighbour aunty is asking about your percentile"],
 c:["Agenda for today's stand-up","Calendar invite: Day {day} (mandatory)","Per my last notification…","Quick sync on today's deliverables","Kickoff: Day {day} workstream","Daily standup: you're the only attendee","Hope this finds you well (and awake)"],
 f:["🎬 Day {day}: The Story Continues","Hero ki entry, slow motion mein","Lights, camera, syllabus!","A new episode begins…","Scene 1, Take 1: The Comeback","Every hero has a training montage. Day {day}.","Background music starts…"],
 k:["Good morning! You've got this 🌱","One day at a time. Here's today.","Small steps, every day","You showed up yesterday. Show up today.","Gentle reminder: you're doing well","A fresh page, Day {day}"],
 n:["Let x = today. Maximise x.","Day {day}: the sequence continues","Today's equation has {total} terms","Morning! P(success | you start now) is high","Compounding, Day {day}","Solve for today"]},
b:{
 a:["{total} items today, about {mins} of study. First up: {item}.","Today's plan: {total} items, roughly {mins}. Start with {item}.","Day {day} has {total} items. The first one is {item}. Just that one, then see how you feel.","About {mins} of focused work today. Begin with {item} while your brain is still fresh.","{total} boxes waiting to be ticked. {item} is the easiest door in."],
 r:["{total} items. You'll do them, or you'll write a sad diary entry about not doing them. Your call.","The plan for today is {total} items. Scrolling reels is not one of them. I checked.","{item} won't study itself. I asked it. It refused.","About {mins} of work. That's less than one cricket match you definitely watched fully.","Your phone screen time yesterday could have finished today's {total} items twice.","Today you have {total} items and zero valid excuses. Start with {item}.","CAT doesn't grade on vibes. {total} items, go."],
 d:["Beta, {total} items today. Pehle {item}, phir breakfast. Okay fine, breakfast first, then {item}.","Mummy has already told everyone you're studying. Don't make her a liar. {total} items.","Sharma ji's son finished {item} at 5 am. Not that anyone is comparing. (Everyone is comparing.)","{total} items today. Dadi says if you finish, she'll make kheer. Dadi never lies about kheer.","Your future in-laws will ask for the percentile, not your Instagram. {total} items.","Chachaji at the wedding will ask your percentile in front of everyone. Prepare accordingly: {total} items.","Ghar ka naam roshan karna hai. Start with {item}."],
 c:["Today's deliverables: {total} items (~{mins}). Kicking off with {item}. Let's take the procrastination offline.","Action items: {total}. Owner: you. Deadline: today. Escalation: your future self.","Let's align on priorities: {item} first, then the remaining items. No scope creep into YouTube.","Bandwidth check: {mins} needed. Please block your calendar accordingly.","Per the project plan, Day {day} has {total} deliverables. Status: not started. Let's move it to In Progress.","Circling back on {item}. It's still on your plate. Let's close the loop today.","Quick win available: {item}. Let's capture that value early."],
 f:["Every great comeback starts with a boring morning. Yours starts with {item}.","Picture abhi shuru hui hai. {total} scenes to shoot today, starting with {item}.","Villain: procrastination. Weapon: {total} checkboxes. Hero: you. Interval tak {item} khatam.","The audience (your parents) is watching. {total} items. Make it a blockbuster.","Hero doesn't skip leg day. Or {item}.","Today's script: {total} scenes, {mins} runtime. No retakes on wasted mornings."],
 k:["You have {total} items today. Start with {item} and be proud of every one you finish.","About {mins} today. Take a breath, open {item}, and begin. That's all you need right now.","Progress over perfection. {total} items, one at a time, starting with {item}.","Whatever happened yesterday, today is a fresh start. {item} is a good first step.","You don't need motivation, just the first five minutes. Open {item}.","Be kind to yourself and consistent with the plan. {total} items today."],
 n:["{total} items × ~{mins} = one step closer to 99.x. Start with {item}.","If today's work is a GP, {item} is the first term. Don't let the common ratio be zero.","Expected value of starting now > expected value of starting later. Q.E.D. Open {item}.","Today's plan is a TITA question: no negative marking for trying. {total} items.","Speed × Time = Distance. Time = {mins}. Speed = you decide.","Remainder theorem: whatever you don't finish today remains. Start {item}."]}},
/* ---------- mock day morning ---------- */
mockday:{t:{
 a:["🎯 Mock day","Sunday = Mock day","It's mock o'clock","Today: full-length mock"],
 r:["Mock day. Time to find out what you actually know.","Today the mock mocks you back","Mock day: no hiding behind 'I'll revise later'"],
 d:["Beta, aaj exam hai (practice wala, but still)","Mock day: mummy has kept dahi-cheeni ready","Aaj mock hai, phone do mujhe"],
 c:["Quarterly review: today, 120 minutes","Performance appraisal at your desk today","Stakeholder meeting with VARC, DILR and QA"],
 f:["Climax scene: today","Aaj ki raat… sorry, aaj ka mock","The big fight scene is today"],
 k:["Mock day: it's practice, not a verdict","Today's mock is information, not judgment","Mock day, go gently and go fully"],
 n:["Today: 68 questions, 120 minutes, 1 you","Sample size +1 today","Data collection day (a.k.a. mock)"]},
b:{
 a:["Full-length mock today: 3 × 40 minutes, timed, one sitting. Then about 45 minutes of analysis.","Find a quiet room, a timer and 2 hours. Log the score and every miss afterwards.","Today's mock is the most important item on the list. Everything else can bend around it."],
 r:["120 minutes. No pausing to 'check something on the phone'. We both know what that means.","Your mock score will be honest even if you aren't. Sit for it properly.","Skip the mock and you'll feel ready right up until the real CAT. Then you won't."],
 d:["Mummy will keep everyone quiet for 2 hours. Even the pressure cooker has been told.","Full mock today. Sharma ji ka beta already gave three this week. Bas bata rahe hain.","Do it properly, beta. Pandit ji said Sunday is auspicious for mocks."],
 c:["Please treat this as a client deliverable: full duration, no shortcuts, analysis by EOD.","Block 3 hours on the calendar: mock + analysis. Decline all conflicting meetings (naps).","Post-mock, please log learnings in the Error log so we can action them in the next sprint."],
 f:["The hero has trained all week. Today he steps into the ring. 120 minutes. No stunt doubles.","Whatever the score, the story doesn't end today. But play the scene with full heart.","Background score: intense. Your job: just attempt with full focus."],
 k:["Whatever the score, you'll learn something real today. That's the point.","Breathe, read carefully, move on from stuck questions. You know how to do this.","Treat it like the real thing, then be kind to yourself in the analysis."],
 n:["One more data point on your score curve. Make it a clean measurement: full timing, no breaks.","Attempts × accuracy = score. Today, measure both honestly.","Remember: −1 for wrong MCQs, 0 for TITA. Select questions like an expected-value maximiser."]}},
/* ---------- evening: items still open ---------- */
left:{t:{
 a:["{left} left today","Evening check: {done}/{total} done","Still on the list: {item}","The day's not over yet","{left} to go"],
 r:["{left} items are still staring at you","Your checklist is judging you","The day has {left} items of unfinished business","Status: {done}/{total}. Disappointing, but fixable.","{left} items left. Netflix can wait.","Not done yet? Interesting choice."],
 d:["Beta, {left} kaam baaki hain","Mummy is asking why the checklist isn't ticked","Kitna baaki hai? {left}.","Abhi so mat jana, {left} baaki hai","Sharma ji ka beta finished at 6 pm. Just saying."],
 c:["EOD status: {done}/{total}","Gentle nudge on pending items","Following up on {item}","Before we close out today…","Pending your action: {left} items"],
 f:["Interval ho gaya, second half baaki hai","The hero is down… but not out","Climax pending: {left} scenes","Twist in the story: {left} items left"],
 k:["You've done {done}. A little more?","Nearly there","Evening check-in","Still time for one more"],
 n:["{done}/{total} = not 1 yet","Completion ratio below 1","Limit as tonight → 11:59 pm","Remaining terms: {left}"]},
b:{
 a:["{done} of {total} done. Next: {item}. About {mins} left in total.","{left} items remain, around {mins}. {item} is the next one.","Close the gap tonight: {item} first.","You're {done}/{total} through today. Can {item} be next?"],
 r:["{left} items left and you're reading notifications. Ironic.","You had all day. You still have the evening. {item}, go.","{item} has been waiting so long it's started its own diary.","Your checklist is at {done}/{total}. Even your phone battery has more completion than that.","Fun fact: '{item}' doesn't get easier at 1 am. Do it now.","You can't put 'scrolled 3 hours' on your MBA application.","{left} items. Tomorrow-you is already annoyed with today-you."],
 d:["Beta, {left} items baaki. Khana tab milega jab {item} khatam hoga. (Joke. But do it.)","Mummy says no TV until {item} is done. Papa agrees for once.","Sharma ji ka beta is on his last item. You're on {done}/{total}. Hmm.","Neighbourhood aunties will hear about this. Finish {item}.","Bas thoda sa aur, beta. {item} khatam karo, phir chai milegi.","Dadi says 'jo aaj karna hai woh aaj karo'. She means {item}."],
 c:["Following up on {item}. Can we get this over the line before EOD?","Quick status update: {done}/{total}. Let's push the remaining {left} items to Done.","Per my last notification, {item} is still pending your action.","Let's not let {item} slip to next sprint. It's a {mins} task in total.","Flagging a risk: {left} open items with limited time remaining. Mitigation: start now."],
 f:["The hero always wins in the last 20 minutes. Your last 20 minutes start now: {item}.","Mere paas checklist hai, {done}/{total} hai… tumhare paas kya hai? Hopefully {item} done.","Second half shuru. {item} is the scene everyone's waiting for.","Slow-motion walk to the desk. Dramatic music. Open {item}.","This is the part of the movie where the hero rises. {left} items."],
 k:["You've already done {done} today, that counts. Can you do {item} next?","If you're tired, pick the smallest item: {item}. One more is still progress.","No pressure to be perfect. Even one more tick tonight is a win.","{left} left. Do what you can, and note why if you can't. Both are fine."],
 n:["{done}/{total} isn't simplified enough. Let's get it to 1/1.","Your completion function is increasing but hasn't converged. {left} more iterations.","The probability that {item} gets done tomorrow if not today: historically low.","Remaining: {left}. That's a small number. Smaller than your QA target, definitely.","Work done = Rate × Time. Rate: you. Time: tonight. Item: {item}."]}},
/* ---------- all done ---------- */
done:{t:{
 a:["✅ All {total} done!","Day complete","Full marks today","Checklist: cleared"],
 r:["Okay fine, you did it. I'm not crying.","All done? Who are you and what have you done with the procrastinator?","Wow. Actually done. Screenshot this."],
 d:["Shabash beta! 🎉","Mummy ko bata diya: all done","Aaj toh kheer banti hai"],
 c:["All deliverables closed","Great work team (you)","100% completion: outstanding"],
 f:["Hero ne kar dikhaya!","Standing ovation 👏","Blockbuster day"],
 k:["You did it 🌟","Proud of you","Well done, really"],
 n:["{total}/{total} = 1","100th percentile day","Q.E.D."]},
b:{
 a:["Every item on today's list is ticked. Rest well.","All {total} items done. That's exactly how streaks are built.","Today is complete. Write two lines in the diary while it's fresh."],
 r:["All {total} done. I had a whole roast prepared and now I can't use it. Rude.","Done everything? Fine. Go sleep before you ruin it by doomscrolling.","You finished the plan. Your excuses are now unemployed."],
 d:["Sab {total} done! Mummy is telling the whole colony. Sharma ji ka beta is shaking.","Papa nodded. That's basically a parade in this house.","Dadi blessed you twice. Kheer is on its way."],
 c:["All {total} action items closed. This will look great in your self-appraisal.","Outstanding delivery today. Let's capture the learnings (diary) and log off.","Exceeded expectations. Please take a well-deserved break (not a meeting)."],
 f:["Picture hit hai! All {total} scenes shot. Cut, print, pack-up.","The audience is on its feet. The hero walks into the sunset (to bed).","Full paisa vasool day."],
 k:["You finished all {total} items. Notice how that feels and remember it on harder days.","Every box ticked. Rest is part of the plan too.","That was a complete day. Be proud of it."],
 n:["Completion = {total}/{total}. Your consistency function just got a little steeper.","A perfect day is a nice data point. Two in a row is a trend.","If every day were today, 99.x would be a formality."]}},
/* ---------- flashcards due ---------- */
cards:{t:{
 a:["🧠 {n} flashcards due","Word time: {n} cards","Your roots need watering ({n})","Flashcards ready: {n}"],
 r:["{n} words are about to leave your brain forever","Your vocabulary is evaporating ({n} due)","{n} cards. Your memory has the retention of a goldfish.","Forget these {n} words? Bold strategy."],
 d:["Beta, {n} words yaad karne hain","Dadi remembers all her recipes. You can remember {n} words.","{n} cards. Sharma ji's son knows 'misogamist'."],
 c:["{n} items in your review queue","Knowledge transfer pending: {n} cards","Action required: {n} flashcards"],
 f:["{n} words waiting for their hero","Yaad hai? {n} words.","The memory scene: {n} cards"],
 k:["{n} quick cards today","A few minutes of words","Your daily {n} cards"],
 n:["Spaced repetition says: {n}","Ebbinghaus is calling ({n})","Forgetting curve alert: {n} cards"]},
b:{
 a:["{n} cards due today, about {mins}. Do them now and they come back later at longer gaps.","Five minutes of flashcards beats an hour of rereading. {n} due.","{n} roots and words are due. Each one you remember today comes back in days, then weeks."],
 r:["{n} cards due. You can name every character in that series but not what 'anthropos' means?","Skip today's {n} cards and tomorrow it's {n} plus whatever comes next. Math is cruel.","Your vocab is leaking like a broken tap. {n} cards to fix it.","RC passages will be full of these words. {n} cards. Or guess on exam day. Your choice."],
 d:["Beta, {n} words. Dadi can recite the Hanuman Chalisa without looking. You can do {n} cards.","Mummy says: words yaad karo, phir phone milega.","{n} cards. Sharma ji ka beta uses 'misanthrope' at family dinners. Annoying, but impressive."],
 c:["Your review backlog is {n} cards. Let's burn it down before it becomes technical debt.","Allocating {mins} for flashcard review. High ROI, low effort. Approve?","{n} cards in queue. Please action at your earliest convenience (now)."],
 f:["{n} words are waiting like a heroine at the railway station. Don't let the train leave.","Yaadein (and roots) fade if you don't revisit them. {n} cards.","Every word is a dialogue you'll deliver in the RC climax. Rehearse: {n} cards."],
 k:["{n} cards, a few minutes. It's one of the easiest wins of the day.","Even if today is busy, a quick flashcard round keeps the words alive.","You're building a vocabulary one day at a time. {n} cards today."],
 n:["The forgetting curve drops fastest right after learning. Interrupt it: {n} cards.","Expected retention ↑ when you review on time. Review count: {n}.","{n} cards, ~{mins}. Return on time invested: unusually high."]}},
/* ---------- error-log re-tests ---------- */
retest:{t:{
 a:["🔁 {r} re-tests due","Old mistakes, new chance","Re-test time: {r}"],
 r:["Your mistakes are back for revenge ({r})","{r} questions you got wrong want a rematch","Remember those mistakes? They remember you."],
 d:["Beta, purani galtiyan ({r}) dobara karo","Galti se seekho: {r} re-tests","{r} re-tests. Sudhar jao, beta."],
 c:["Remediation items due: {r}","Root cause follow-up: {r} items","Lessons learned: re-test pending"],
 f:["Purana hisaab: {r} re-tests","The villain returns ({r})","Revenge scene: {r} questions"],
 k:["{r} re-tests waiting","A chance to see your progress","Quick re-test round"],
 n:["{r} re-tests due","Revisiting {r} wrong answers","Error correction: {r}"]},
b:{
 a:["{r} mistakes from your Error log are due for a cold re-test. Try them without looking at the answer.","Re-testing old mistakes is how they stop repeating in mocks. {r} due."],
 r:["{r} questions beat you before. Beat them back.","If you get these {r} wrong again, it's not a mistake anymore, it's a habit.","Your mocks will keep serving these {r} mistakes until you learn them."],
 d:["Beta, {r} purani galtiyan. Ek baar galti maaf, doosri baar nahi.","Mummy also checks your old homework. {r} re-tests."],
 c:["{r} remediation items are due. Let's verify the fix actually works.","Following up on {r} open issues from previous sprints. Please re-test and close."],
 f:["They hurt you once. Now it's {r} rematches. Hero ka badla.","The villains you met in earlier mocks are back. {r} of them."],
 k:["Re-testing is where you see real progress. {r} today.","You learned these once. Let's check they stuck: {r}."],
 n:["Error rate on repeated questions should → 0. Test it: {r} items.","Re-test intervals of 3, 7 and 14 days. You're due for {r}."]}},
/* ---------- diary ---------- */
diary:{t:{
 a:["📓 Diary time","Two lines before bed?","How was today?","Dear diary…"],
 r:["Your diary thinks you ghosted it","The diary is lonelier than your weekend plans","You journal less than you open Instagram","Dear diary: he forgot me again"],
 d:["Beta, din kaisa raha? Likho","Mummy wants to know how your day was","Diary likho, beta, therapy se sasta hai"],
 c:["EOD retrospective","Daily debrief","Please submit today's reflections"],
 f:["Aaj ki kahani, apni zubaani","Voice-over time","Tonight's monologue"],
 k:["How are you, really?","A quiet minute for you","Check in with yourself"],
 n:["Log today's data point","Today: record the observations","Experiment log, Day {day}"]},
b:{
 a:["Write two lines about today and take the 30-second check-in: mood, sleep, energy.","A short entry is better than no entry. What happened today?","One highlight, one thing you learned, and you're done."],
 r:["You remember every comment someone made in 2019 but can't write two lines about today?","The diary has seen fewer updates than your app permissions screen.","Write something. Even 'studied, survived' counts. Barely."],
 d:["Beta, likh do: aaj kya padha, kya khaya, mummy ko kitna yaad kiya.","Dadi wrote letters every night. You can write two lines.","Diary mein likh do, warna mummy poochegi aur phir lambi baat hogi."],
 c:["Please capture today's key learnings and blockers in the diary before logging off.","A brief retrospective helps us improve tomorrow's sprint. Two lines is enough."],
 f:["Every great film has a voice-over. Tonight, write yours.","Aaj ka scene khatam. Ab hero apni diary mein likhega…"],
 k:["How did today feel? A few honest lines can make tomorrow lighter.","No need to be profound. Just write what's on your mind.","Notice one good thing from today and write it down."],
 n:["Mood, sleep, energy: three numbers. Your future pattern analysis will thank you.","Insights needs data. Data needs you to log today."]}},
/* ---------- streak at risk ---------- */
streak:{t:{
 a:["🔥 {streak}-day streak at risk","Save the streak","Don't break the chain"],
 r:["Your {streak}-day streak is about to die","RIP streak? Not on my watch.","{streak} days of effort, about to be wasted"],
 d:["Beta, streak mat todna","{streak} din ki mehnat, aise hi jaane doge?","Mummy is keeping a fast for your streak"],
 c:["Risk: {streak}-day streak may lapse","KPI at risk","Escalation: streak continuity"],
 f:["Streak bachao, hero!","{streak} din ka rishta, ek raat mein khatam?","Climax: save the streak"],
 k:["Keep your {streak}-day streak going","You've built something, protect it","Almost there tonight"],
 n:["Streak = {streak}. Don't reset to 0.","Your run length: {streak}","Don't break the sequence"]},
b:{
 a:["You're on a {streak}-day streak and today isn't at 80% yet. {left} items left.","A little more tonight keeps your {streak}-day streak alive."],
 r:["{streak} days of discipline, undone by one lazy evening? That's a terrible trade.","Breaking a {streak}-day streak takes zero effort. That's exactly why you shouldn't.","Your streak counter is begging. Not a good look for either of you."],
 d:["Beta, {streak} din se acha chal raha hai. Aaj mat todna, nazar lag jayegi.","Mummy put a kaala teeka on your streak. Don't waste it."],
 c:["We've delivered {streak} consecutive days. Let's not miss SLA tonight. {left} items to go.","Continuity matters for the appraisal. {left} items to keep the streak."],
 f:["{streak} din ki dosti, ek raat mein mat todna. {left} items.","The hero has never lost in {streak} days. Tonight is not the night."],
 k:["You've shown up {streak} days in a row. A small push tonight keeps it going.","Even the smallest item helps you reach 80% today."],
 n:["P(streak continues | you start now) ≈ 1. P(streak continues | you scroll) ≈ 0.","Run length {streak}. Expected regret of breaking it: high."]}},
/* ---------- mock tomorrow ---------- */
mockeve:{t:{
 a:["Mock tomorrow 🎯","Tomorrow: full-length mock","Prep for tomorrow's mock"],
 r:["Mock tomorrow. Sleep, don't scroll.","Tomorrow you get tested. Tonight you rest.","Mock eve: phone down, lights out"],
 d:["Kal exam hai beta, jaldi so jao","Mummy has set three alarms for your mock","Kal ka mock, aaj ki neend"],
 c:["Pre-read for tomorrow's review","Prep call: mock tomorrow","Reminder: big meeting tomorrow"],
 f:["Kal climax hai","The night before the big fight","Tomorrow: the main event"],
 k:["Rest well for tomorrow","Tomorrow's mock: you're ready enough","Gentle prep for tomorrow"],
 n:["T-minus 1 day: mock","Tomorrow: 68 questions","Mock eve: optimise sleep"]},
b:{
 a:["Full mock tomorrow. Keep 3 hours free, charge your device, and sleep on time.","Tomorrow is mock day. Light revision tonight, no new topics, and an early night."],
 r:["Staying up late before a mock is like skipping practice before a match. Bold. Stupid, but bold.","Tomorrow's score will include tonight's sleep. Choose wisely."],
 d:["Beta, kal mock hai. Badaam bhigo diye hain. Jaldi so jao.","Mummy will make sure nobody rings the doorbell tomorrow. You make sure you sleep."],
 c:["Please ensure adequate rest ahead of tomorrow's 120-minute session. Calendar blocked.","Pre-mock checklist: sleep, water, quiet room, timer. Please confirm."],
 f:["Kal ka din yaad rakha jayega. Aaj raat bas aaram.","The hero sleeps before the battle. Tomorrow, the fight."],
 k:["You don't need to cram tonight. Rest is the best prep.","Whatever happens tomorrow, it'll teach you something. Sleep well."],
 n:["Sleep is a free +5 marks. Collect it.","Variance in tomorrow's score ↓ with a good night's sleep."]}},
/* ---------- weekly review ---------- */
weekly:{t:{
 a:["🗓 Weekly review time","Sunday review: 15 min","How did the week go?"],
 r:["The week happened. Let's see how badly.","Weekly review: face the numbers","Time to look at the week in the eye"],
 d:["Beta, hafte ka report card","Mummy wants the weekly report","Hafte bhar ka hisaab"],
 c:["Weekly business review","Retro: this week's sprint","WBR is on your calendar"],
 f:["Is hafte ki kahani","Recap: previously on your life","Week ka trailer review"],
 k:["Look back kindly on your week","A gentle weekly check-in","Reflect, then reset"],
 n:["Week {wk}: analyse the data","7 data points to review","Weekly regression time"]},
b:{
 a:["Open Insights → Weekly review. Look at the numbers, rate the week, answer three questions.","15 minutes: what went well, what didn't, what you'll change. It's on the Insights tab."],
 r:["Don't just survive the week, learn from it. Weekly review. 15 minutes.","If you skip the review, next week will be a remix of this one."],
 d:["Beta, report card dikhao: kya acha hua, kya nahi, aur agle hafte kya badloge.","Papa wants a weekly review, not a monthly excuse."],
 c:["Let's run the weekly retro: wins, misses, and one change for next sprint.","Please complete the WBR deck (it's three text boxes) before Monday."],
 f:["Har hafta ek episode hai. Review karo, agle episode ka plot set karo.","The hero studies the last fight before the next one."],
 k:["Notice what worked this week. Plan one small change for next week.","Be honest and kind in the review. Both help."],
 n:["Look at the trend, not the single points. Weekly review in Insights.","One change per week, compounded over a year = a different you."]}},
/* ---------- comeback (not opened for days) ---------- */
comeback:{t:{
 a:["We miss you 👀","It's been {daysout} days","Come back?"],
 r:["Did you elope with Netflix?","{daysout} days of silence. Suspicious.","The plan filed a missing person report"],
 d:["Beta, phone utha lo","Mummy is worried (it's been {daysout} days)","Kahan gayab ho, beta?"],
 c:["Following up (again)","Haven't heard back in {daysout} days","Re: Re: Re: your study plan"],
 f:["Laut aao, hero","Bichhde hue {daysout} din","The hero disappeared after the interval"],
 k:["No guilt, just come back","Ready when you are","Pick up where you left off"],
 n:["{daysout} days of missing data","Gap in the series detected","Resume the sequence"]},
b:{
 a:["It's been {daysout} days since you opened the plan. Start with just one item today.","No need to catch up on everything. Open today's plan and do the first item."],
 r:["{daysout} days away. Your syllabus didn't go anywhere. Neither did CAT.","Your competition didn't take {daysout} days off. Just saying.","Come back before the plan gets attached to someone else."],
 d:["Beta, {daysout} din ho gaye. Mummy ne Sharma aunty ko bola tum padh rahe ho. Izzat ka sawaal hai.","Dadi is asking: 'woh padhai wala app kahan gaya?'"],
 c:["Just following up on my previous {daysout} notifications. Please advise on study status.","Re-engagement required. A 10-minute session today would unblock the project."],
 f:["Hero lautega. Hero hamesha lautta hai. Bas aaj laut aao.","Every comeback story starts with one small scene. Open the app."],
 k:["Breaks happen. What matters is coming back. One small item today is enough.","No judgment. Open the plan and do the smallest thing on it."],
 n:["Restart the sequence: a₁ = one item today.","A missed week is a bad data point, not a trend. Yet."]}},
/* ---------- backup ---------- */
backup:{t:{
 a:["💾 Backup time","Time for a backup","Download a backup"],
 r:["Trusting the cloud blindly? Cute.","Back up your data, you're not invincible","Backup. Before regret."],
 d:["Beta, backup le lo","Mummy keeps copies of all your certificates. Do the same.","Backup karo, beta"],
 c:["Data retention policy reminder","Please archive your work","Compliance: weekly backup"],
 f:["Yaadon ka backup","Kuch yaadein save kar lo","Backup: the safety net scene"],
 k:["A quick safety step","Keep a copy, just in case","One tap backup"],
 n:["Redundancy = 2 copies","Backup interval exceeded","Save state"]},
b:{
 a:["It's been a while since your last backup. Menu → Download backup takes 2 seconds.","Your data syncs to your account, but a downloaded copy is extra peace of mind."],
 r:["Months of words, mocks and diary entries, and zero backups. Living dangerously.","Imagine losing your entire error log. Now download a backup."],
 d:["Mummy has every report card since nursery in a plastic folder. Download one backup, beta.","Backup le lo, warna baad mein rona mat."],
 c:["Per the data retention policy, please download a backup this week.","Archiving your work ensures business continuity. Menu → Download backup."],
 f:["Yaadein mitti nahi hone deni. Download backup.","Every hero has a plan B. Yours is a backup file."],
 k:["Just a small step for peace of mind: download a backup.","Takes two seconds and protects weeks of work."],
 n:["One local copy turns P(data loss) into a much smaller number.","Backup frequency: weekly is optimal for you."]}},
/* ---------- bedtime ---------- */
sleep:{t:{
 a:["🌙 Bedtime","Lights out soon","Sleep is study too"],
 r:["Go to sleep, night owl","Put the phone down. Yes, you.","Your brain needs sleep, not reels"],
 d:["Beta, so jao ab","Mummy: 'kitne baje sooge?'","Lights band karo"],
 c:["Logging off for the day","Out of office: sleep","EOD: please disconnect"],
 f:["Good night, hero","Fade to black","The end (of today)"],
 k:["Rest well","Time to wind down","Sleep well tonight"],
 n:["Memory consolidation: requires sleep","Sleep: the best revision","Recharge cycle"]},
b:{
 a:["Sleep is when your brain files today's learning. Wind down now.","An early night makes tomorrow's first item much easier."],
 r:["You won't learn anything new at this hour. Except more about strangers' lives online.","Your screen time is higher than your percentile target. Sleep."],
 d:["Beta, kal subah uthna hai. Phone charge pe lagao aur so jao.","Mummy can see your light under the door. Go to sleep."],
 c:["Please sign off. Tomorrow's deliverables require a rested resource.","Late-night work has diminishing returns. Logging off is the efficient choice."],
 f:["Hero ko bhi neend chahiye. Kal ka action scene bhaari hai.","Picture abhi baaki hai, but tonight's show is over."],
 k:["You did enough today. Let yourself rest.","Tomorrow will feel easier after proper sleep."],
 n:["8 hours of sleep > 2 extra hours of tired revision. Empirically.","Retention ∝ sleep quality. Optimise accordingly."]}},
/* ---------- random daytime nudge ---------- */
random:{t:{
 a:["Quick thought","Hey, you","Random check-in","Mid-day nudge","Psst"],
 r:["Breaking news: you still haven't started","Your syllabus sent a read receipt","This is your sign. Literally.","Are you studying or just thinking about studying?","Plot twist: you open the plan","Hello from your guilt","Just checking you're not on reels"],
 d:["Mummy ki taraf se reminder","Phupho is asking about your prep","Ghar ka WiFi password badal denge, beta","Beta, khaana khaya?","Mummy ka message","Sharma ji update","Dadi's wisdom of the day"],
 c:["Gentle bump on this","Adding this to your radar","Aligning on priorities","Quick ping","Do you have 5 minutes?","Touching base","FYI","Small ask"],
 f:["Ek chhota sa break… khatam","Dramatic entry needed","Plot twist incoming","Interval mein ek scene","Flashback","Item number: productivity","Mid-movie twist"],
 k:["Checking in on you","One small thing","Just a nudge","A small reminder","You're doing better than you think","Breathe","Kind words"],
 n:["Quick probability check","Today's number","Pop quiz","Fun fact","Math break","Brain teaser","Did you know?"]},
b:{
 a:["Five minutes on one flashcard round or one Error log re-test is a real win.","Drink some water, stretch, then tick one thing.","Small, consistent days beat heroic, rare ones."],
 r:["Your study plan has trust issues now. Rebuild them with one tick.","If procrastination were a CAT section, you'd be at 99.9. Let's move that energy to QA.","You said 'after lunch'. It is after lunch.","Imagine telling your interview panel you were 'about to start'.","Your notes miss you. They're starting to yellow.","The only thing you've finished today is a packet of chips. Prove me wrong.","Your future colleagues are studying. Your future self is unimpressed.","You've opened your phone 40 times today. Open the plan once.","The CAT doesn't care how busy work was. Neither do I. One item.","Your future self is watching. They look tired.","Somewhere, a topper is doing the exact thing you're avoiding.","Every scroll is a QA question you didn't solve."],
 d:["Mummy says the house is quiet because everyone thinks you're studying. Make it true.","Bua ji's son just cleared his mock with 99. She called twice to tell us.","Beta, Papa is pretending not to check if you're studying. He's checking.","Dadi made laddoos 'for exam time'. You have to earn them now.","Your cousin's engagement is in three weeks. Everyone will ask about CAT. Prepare answers and prep.","Mummy said 'jo padhega woh badhega'. She's been saying it since 1998.","Sharma ji ka beta just finished his third mock this week. Coincidence? Mummy thinks not.","Dadi says: 'thoda thoda roz padho, toh bada ho jata hai.' Dadi is right.","Mummy asked: 'tumhara percentile kab aayega?' Please give her something.","Chacha ji's friend's daughter got into IIM. You'll hear about it at Diwali. Prepare.","Beta, paani piyo aur ek chapter khatam karo."],
 c:["Let's leverage your 3 pm slump into a 25-minute power session.","Low-hanging fruit: today's flashcards. High ROI, minimal effort.","Synergy alert: chai + one QA set = a productive afternoon.","Can we get a quick win on the board before EOD? One item is enough.","Bandwidth check: 20 minutes free? Let's allocate it to the plan.","Reminder that this is a marathon, not a sprint. But today is a sprint.","Quick ask: can you take 10 minutes to close one flashcard round?","Leveraging synergies between chai and studying. Thoughts?","Let's take this offline… into your notebook.","Can we park the YouTube discussion and prioritise QA?","Small wins compound. Let's ship one today."],
 f:["Every hero gets a training montage. Background music on, one item, go.","The audience is waiting for the scene where you open the book. Action!","Kahani mein twist: hero ne phone side mein rakh diya.","This is the 'rain, slow motion, determined face' moment. Use it.","Har padhne waale ki ek kahani hoti hai. Yours needs a training montage. Today.","The audience wants a comeback arc. Give them one scene.","Picture abhi baaki hai. But the shooting has to happen."],
 k:["Hydrate, stretch, and do one small thing. That's a good afternoon.","If today feels heavy, pick the lightest item on the list. It still counts.","You've come further than you think. One more step is all today needs.","Rest when you need to, but come back to the plan before the day ends.","Your effort adds up even on days it doesn't feel like it.","You're allowed to have slow days. Just don't make it two in a row.","Whatever you got done today matters.","Take a breath. Then one small step.","Progress you can't see yet is still progress."],
 n:["The sum of interior angles of a hexagon is 720°. The sum of today's small tasks: one big day.","If you solve 3 extra questions a day for 300 days, that's 900 questions. Start with three.","Probability of finishing today's plan if you start in the next 10 minutes: much higher than later.","log₂(1024) = 10. Number of minutes it takes to start a flashcard round: less than that.","A 40-minute section has 2,400 seconds. Today you need far less to make progress.","A 1% daily improvement compounds to about 37× in a year. 1.01^365 ≈ 37.8.","A two-digit number equals 4 times the sum of its digits. Find all of them. (12, 24, 36, 48.)","Sum of 1 to 100 = 5050. Gauss figured that out as a kid. You can figure out today's plan.","In CAT, skipping a hard question is a strategy, not a failure. Same with skipping reels.","Remainder when 2^100 is divided by 3? It's 1. Now go get remainders of your own."]}},
/* ---------- badge earned ---------- */
badge:{t:{
 a:["🏅 New milestone","Achievement unlocked","Milestone: {badge}"],
 r:["Okay, that's actually impressive","Didn't expect this, honestly","Look at you, earning things"],
 d:["Shabash! Mummy is framing this","Badge mila! Mithai baanto","Colony mein announce kar do"],
 c:["Recognition: {badge}","Award: {badge}","Milestone achieved"],
 f:["Award goes to… you!","Filmfare for: {badge}","Hero ko trophy"],
 k:["Celebrate this one","You earned it","Well done"],
 n:["Level up","+1 milestone","New personal best"]},
b:{
 a:["You just unlocked: {badge}. Keep it rolling.","{badge}. Small wins, stacked up."],
 r:["{badge}. I'd roast you, but you've earned a day off from roasting.","{badge}. Don't get cocky, there are more."],
 d:["{badge}! Mummy has already forwarded this to the family group.","{badge}. Sharma ji is reconsidering his life choices."],
 c:["Pleased to recognise: {badge}. This will feature in the town hall.","{badge}. Exceeds expectations."],
 f:["{badge}. The crowd goes wild. Slow clap from the villain.","{badge}. Hero's montage reaches its peak."],
 k:["{badge}. You did the work. Take a moment to enjoy it.","{badge}. Proof that showing up works."],
 n:["{badge}. Your consistency curve is officially trending up.","{badge}. Statistically, you're getting better."]}}
};
const PS={
 a:["P.S. Drink water.","P.S. Posture check.","P.S. You've got this.","P.S. Phone face down helps.","P.S. Tick it, then tell someone.","P.S. Start a 25-minute timer.","P.S. One item is better than none."],
 r:["P.S. Yes, I can see you reading this instead of studying.","P.S. That reel can wait. It's not going anywhere. Neither is your syllabus.","P.S. No, 'just one more video' is never one.","P.S. Your excuses need a revision too.","P.S. Your phone doesn't need you as much as you think.","P.S. Lying in bed thinking about studying is not studying.","P.S. I'm a notification and even I'm more consistent."],
 d:["P.S. Bua ji is still talking about her son.","P.S. Mummy says hi.","P.S. Dadi wants a call.","P.S. Khaana time pe khao.","P.S. Sharma ji ka beta says hi (he doesn't).","P.S. Papa ne kuch nahi kaha. Which is worse.","P.S. Chai thandi ho rahi hai."],
 c:["P.S. Per our SLA, one item before dinner.","P.S. This could have been an email.","P.S. Thanks in advance.","P.S. Let's take this offline.","P.S. Looping in your future self.","P.S. Best regards, the Plan.","P.S. Please do the needful."],
 f:["P.S. The sequel is called 'Tomorrow'. Don't make it necessary.","P.S. Background music: dramatic violins.","P.S. Slow-motion is optional.","P.S. Mogambo… sorry, the plan is pleased.","P.S. Interval ke baad sab theek hoga.","P.S. Sequel loading…"],
 k:["P.S. Small is fine.","P.S. Be kind to yourself.","P.S. Rest is allowed.","P.S. I'm proud of you.","P.S. One step is enough."],
 n:["P.S. 7! = 5040.","P.S. 1.01^365 ≈ 37.8.","P.S. Every TITA attempt is a free lottery ticket.","P.S. Ratios > feelings.","P.S. Unit digit of 7^4 is 1. Fun, right?"]
};
function h32(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function fill(s,ctx){return s.replace(/\{(\w+)\}/g,(m,k)=>ctx[k]==null||ctx[k]===""?m:String(ctx[k]));}
const ok=(s,ctx)=>!/\{(\w+)\}/.test(fill(s,ctx));
function pool(cat,part,tone){const c=C[cat];if(!c)return [];const out=[];[tone,"a"].forEach(t=>((c[part]||{})[t]||[]).forEach((s,i)=>out.push({s,id:`${cat}.${part}.${t}${i}`})));return out;}
/* compose a message. opts: {tones:[...], hist:[keys], rng:()=>0..1, ps:0.35} */
function compose(cat,ctx,opts){opts=opts||{};const rng=opts.rng||Math.random,hist=new Set(opts.hist||[]);ctx=ctx||{};
  const all=Object.keys(T),allowed=(opts.tones&&opts.tones.length?opts.tones:all).filter(t=>all.includes(t));
  const tone=allowed[Math.floor(rng()*allowed.length)]||"k";
  const ts=pool(cat,"t",tone).filter(x=>ok(x.s,ctx)),bs=pool(cat,"b",tone).filter(x=>ok(x.s,ctx));
  if(!ts.length||!bs.length)return null;
  const bodies=new Set(opts.bodies||[]);
  let best=null;for(let tries=0;tries<60;tries++){const t=ts[Math.floor(rng()*ts.length)],b=bs[Math.floor(rng()*bs.length)],key=t.id+"|"+b.id;
    if(!hist.has(key)&&!bodies.has(b.id)){best={t,b,key};break;}if(!best||(!hist.has(key)&&hist.has(best.key)))best={t,b,key};}
  let body=fill(best.b.s,ctx);const psl=(PS[tone]||[]).concat(PS.a);
  if(rng()<(opts.ps==null?0.35:opts.ps)&&body.length<150&&psl.length){const p=psl[Math.floor(rng()*psl.length)];body+=" "+p;}
  return {title:fill(best.t.s,ctx),body,key:best.key,bodyKey:best.b.id,tone,cat};}
function count(){let n=0,combos=0;Object.keys(C).forEach(cat=>{Object.keys(T).forEach(t=>{const a=pool(cat,"t",t).length,b=pool(cat,"b",t).length;combos+=a*b;});["t","b"].forEach(p=>Object.values(C[cat][p]).forEach(l=>{n+=l.length;}));});
  const ps=Object.values(PS).reduce((a,l)=>a+l.length,0);return {lines:n+ps,combos:combos*(1+ps)};}

/* ---------- when to send what (shared by the app and the GitHub job) ---------- */
const REM_DEFS={morning:{time:"07:30",on:true,label:"Morning plan",sub:"Today's items and where to start"},
  cards:{time:"13:00",on:true,label:"Flashcards",sub:"When cards are due"},
  retest:{time:"17:30",on:true,label:"Error-log re-tests",sub:"When re-tests are due"},
  evening:{time:"19:30",on:true,label:"Evening check",sub:"Items still open, or a celebration"},
  streak:{time:"21:00",on:true,label:"Streak saver",sub:"If today is under 80% and you're on a streak"},
  mockeve:{time:"21:30",on:true,label:"Mock tomorrow",sub:"The night before a mock"},
  diary:{time:"22:00",on:true,label:"Diary",sub:"If you haven't written today"},
  weekly:{time:"18:00",on:true,label:"Weekly review",sub:"Sundays"},
  comeback:{time:"12:00",on:true,label:"Come back",sub:"If you haven't opened the app for 2+ days"},
  backup:{time:"11:00",on:true,label:"Backup",sub:"Saturdays, if your last backup is a week old"},
  random:{time:"14:00",on:true,label:"Surprise nudge",sub:"One random nudge, sometime in the 3 hours after this"},
  sleep:{time:"23:30",on:false,label:"Bedtime",sub:"A nudge to sleep"}};
const pad=n=>String(n).padStart(2,"0");
const hm=s=>{const a=String(s||"0:0").split(":").map(Number);return (a[0]||0)*60+(a[1]||0);};
const isoAdd=(iso,n)=>{const [y,m,d]=iso.split("-").map(Number),dt=new Date(Date.UTC(y,m-1,d+n));return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth()+1)}-${pad(dt.getUTCDate())}`;};
const isoDiff=(a,b)=>{const p=s=>{const [y,m,d]=s.split("-").map(Number);return Date.UTC(y,m-1,d);};return Math.round((p(b)-p(a))/864e5);};
const dowISO=iso=>{const [y,m,d]=iso.split("-").map(Number);return (new Date(Date.UTC(y,m-1,d)).getUTCDay()+6)%7;};
const fmtM=m=>m>=60?`${Math.floor(m/60)}h ${pad(m%60)}m`:`${m}m`;
function localNow(tz,date){const d=date||new Date();let f;try{f=new Intl.DateTimeFormat("en-CA",{timeZone:tz||"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"});}catch(e){f=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"});}
  const P={};f.formatToParts(d).forEach(x=>{P[x.type]=x.value;});const date2=`${P.year}-${P.month}-${P.day}`;return {date:date2,min:(+P.hour%24)*60+(+P.minute),dow:dowISO(date2)};}
function inQuiet(min,a,b){return a===b?false:a<b?min>=a&&min<b:min>=a||min<b;}
/* returns [{id,cat,ctx}] for reminders that should go out now */
function decide(notify,status,local,sentToday){notify=notify||{};status=status||{};sentToday=sentToday||{};const out=[];
  const q=notify.quiet||{};if(q.on&&inQuiet(local.min,hm(q.from||"23:45"),hm(q.to||"07:00")))return out;
  const days=status.days||{},day=days[local.date],tom=days[isoAdd(local.date,1)];
  Object.keys(REM_DEFS).forEach(id=>{const def=REM_DEFS[id],r=(notify.rems||{})[id]||{},on=r.on!=null?r.on:def.on;if(!on||sentToday[id])return;
    let tm=hm(r.time||def.time);if(id==="random")tm+=NUDGE_H(local.date)%180;
    if(local.min<tm||local.min>tm+150)return;const m=pickRem(id,status,local,day,tom);if(m)out.push({id,...m});});
  return out;}
function NUDGE_H(s){return h32(s);}
function pickRem(id,st,local,day,tom){const d=local.date;
  const lastOpen=st.lastOpen||d,away=isoDiff(lastOpen,d);
  if(id==="morning"){if(!day||!day.total)return null;return {cat:day.mock?"mockday":"morning",ctx:{day:day.day,total:day.total,mins:fmtM(day.mins||0),item:day.item||""}};}
  if(id==="cards"){const n=(st.cards||{})[d];return n>0?{cat:"cards",ctx:{n,mins:`${Math.max(2,Math.round(n*.4))} min`}}:null;}
  if(id==="retest"){const r=(st.retests||{})[d];return r>0?{cat:"retest",ctx:{r}}:null;}
  if(id==="evening"){if(!day||!day.total)return null;if(day.done>=day.total)return st.celebrated===d?null:{cat:"done",ctx:{total:day.total}};return {cat:"left",ctx:{left:day.total-day.done,done:day.done,total:day.total,item:day.item||"",mins:fmtM(day.mins||0)}};}
  if(id==="streak"){if(!day||!day.total||!(st.streak>=2)||day.done/day.total>=.8)return null;return {cat:"streak",ctx:{streak:st.streak,left:day.total-day.done}};}
  if(id==="mockeve")return tom&&tom.mock?{cat:"mockeve",ctx:{}}:null;
  if(id==="diary")return (st.diary||[]).includes(d)?null:{cat:"diary",ctx:{day:day?day.day:""}};
  if(id==="weekly"){if(local.dow!==6)return null;const ws=isoAdd(d,-6);return st.reviewWeek===ws?null:{cat:"weekly",ctx:{}};}
  if(id==="comeback")return away>=2?{cat:"comeback",ctx:{daysout:away}}:null;
  if(id==="backup"){if(local.dow!==5)return null;const ref=st.lastBackup||st.firstUse;if(!ref)return null;const n=isoDiff(ref,d);return n>=7?{cat:"backup",ctx:{days:n}}:null;}
  if(id==="random")return {cat:"random",ctx:{}};
  if(id==="sleep")return {cat:"sleep",ctx:{}};
  return null;}
const LINKS={morning:"today",mockday:"today",left:"today",done:"today",streak:"today",cards:"words",retest:"errors",diary:"diary",weekly:"insights",mockeve:"mocks",comeback:"today",backup:"today",random:"today",sleep:"today",badge:"insights"};

return {TONES:T,CATS:C,PS,compose,count,h32,fill,REM_DEFS,decide,localNow,LINKS,isoAdd,isoDiff};
})();
if(typeof module!=="undefined"&&module.exports)module.exports=NUDGE_BANK;

import { t } from './i18n/index.js';
import { fetchRecentQuests } from './api/quests.js';
import { fetchWorkoutHistory } from './api/xp.js';
import { computeStreak } from './gamification.js';
import { toDateStr } from './date-utils.js';

const QUOTES = [
  // ===== Original AX.GRIND set =====
  {q:"The only bad workout is the one that didn't happen.",a:"AX.GRIND"},
  {q:"Pain is temporary. Quitting lasts forever.",a:"Lance Armstrong"},
  {q:"If it doesn't challenge you, it won't change you.",a:"Fred DeVito"},
  {q:"The body achieves what the mind believes.",a:"Napoleon Hill"},
  {q:"Sweat is just fat crying.",a:"AX.GRIND"},
  {q:"Don't stop when you're tired. Stop when you're done.",a:"AX.GRIND"},
  {q:"Your only competition is who you were yesterday.",a:"AX.GRIND"},
  {q:"No shortcuts. No excuses. Just work.",a:"AX.GRIND"},
  {q:"Work hard in silence. Let your results make the noise.",a:"Frank Ocean"},
  {q:"Champions aren't made in gyms. They're made from what they have inside.",a:"Muhammad Ali"},
  {q:"One more rep. Always one more rep.",a:"AX.GRIND"},
  {q:"Push yourself because no one else is going to do it for you.",a:"AX.GRIND"},
  {q:"Fall in love with the process and the results will come.",a:"Eric Thomas"},
  {q:"You don't have to be extreme, just consistent.",a:"AX.GRIND"},
  {q:"Discipline is choosing between what you want now and what you want most.",a:"Abraham Lincoln"},

  // ===== Famous people =====
  {q:"Strength does not come from winning. Your struggles develop your strengths.",a:"Arnold Schwarzenegger"},
  {q:"The mind is the limit. As long as the mind can envision the fact that you can do something, you can do it.",a:"Arnold Schwarzenegger"},
  {q:"Everybody wants to be a bodybuilder, but nobody wants to lift no heavy-ass weights.",a:"Ronnie Coleman"},
  {q:"Discipline equals freedom.",a:"Jocko Willink"},
  {q:"You are in danger of living a life so comfortable and soft, that you will die without ever realizing your true potential.",a:"David Goggins"},
  {q:"The most important conversations you'll ever have are the ones you'll have with yourself.",a:"David Goggins"},
  {q:"Suffering is the true test of life.",a:"David Goggins"},
  {q:"You have to build calluses on your brain just like you build calluses on your hands.",a:"David Goggins"},
  {q:"Motivation is crap. Motivation comes and goes. When you're driven, whatever is in front of you will get destroyed.",a:"David Goggins"},
  {q:"It's so much better when you do something that everybody around you thinks is impossible.",a:"David Goggins"},
  {q:"Every morning we're born again. What we do today is what matters most.",a:"David Goggins"},
  {q:"The number one killer of potential is complacency.",a:"David Goggins"},
  {q:"Nobody cares, work harder.",a:"David Goggins"},
  {q:"I'm not put on this earth to look good. I am put on this earth to see how far I can take this body and mind through the use of extreme willpower.",a:"David Goggins"},
  {q:"Adversity is the aphrodisiac of a warrior.",a:"David Goggins"},
  {q:"The only way you can find true self-confidence is by doing something you didn't think you could do.",a:"David Goggins"},
  {q:"Life is one big mental toughness game — if your mind is stronger than your body, you'll excel.",a:"David Goggins"},
  {q:"Stay hard.",a:"David Goggins"},
  {q:"You either get better or you get worse. You never stay the same.",a:"CT Fletcher"},
  {q:"I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",a:"Muhammad Ali"},
  {q:"It's the repetition of affirmations that leads to belief.",a:"Muhammad Ali"},
  {q:"Don't count the days, make the days count.",a:"Muhammad Ali"},
  {q:"Everyone has a plan until they get punched in the mouth.",a:"Mike Tyson"},
  {q:"There's no talent here, this is hard work. This is an obsession.",a:"Conor McGregor"},
  {q:"I've missed more than 9,000 shots in my career. I've failed over and over and over again in my life. And that is why I succeed.",a:"Michael Jordan"},
  {q:"The most important thing is to try and inspire people so that they can be great in whatever they want to do.",a:"Kobe Bryant"},
  {q:"Great things come from hard work and perseverance. No excuses.",a:"Kobe Bryant"},
  {q:"You can't be afraid to fail. It's the only way you succeed.",a:"LeBron James"},
  {q:"I really think a champion is defined not by their wins but by how they can recover when they fall.",a:"Serena Williams"},
  {q:"I don't like to lose — at anything — yet I've grown most not from victories, but setbacks.",a:"Serena Williams"},
  {q:"Talent without working hard is nothing.",a:"Cristiano Ronaldo"},
  {q:"Fatigue makes cowards of us all.",a:"Vince Lombardi"},
  {q:"It's not whether you get knocked down, it's whether you get up.",a:"Vince Lombardi"},
  {q:"The measure of who we are is what we do with what we have.",a:"Vince Lombardi"},
  {q:"When something is important enough, you do it even if the odds are not in your favor.",a:"Elon Musk"},
  {q:"The only way to do great work is to love what you do.",a:"Steve Jobs"},
  {q:"Discipline yourself and others won't need to.",a:"Kevin Hart"},
  {q:"Skills are cheap. Passion is priceless.",a:"Gary Vaynerchuk"},
  {q:"The only thing that I see that is distinctly different about me is I'm not afraid to die on a treadmill.",a:"Will Smith"},
  {q:"Believe you can and you're halfway there.",a:"Theodore Roosevelt"},
  {q:"Success is not final, failure is not fatal: it is the courage to continue that counts.",a:"Winston Churchill"},
  {q:"It always seems impossible until it's done.",a:"Nelson Mandela"},
  {q:"You may encounter many defeats, but you must not be defeated.",a:"Maya Angelou"},
  {q:"It does not matter how slowly you go as long as you do not stop.",a:"Confucius"},
  {q:"I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.",a:"Bruce Lee"},
  {q:"Do not pray for an easy life, pray for the strength to endure a difficult one.",a:"Bruce Lee"},
  {q:"It's not what we get. It's who we become, what we contribute... that gives meaning to our lives.",a:"Tony Robbins"},
  {q:"Too many of us are not living our dreams because we are living our fears.",a:"Les Brown"},
  {q:"When you want to succeed as bad as you want to breathe, then you'll be successful.",a:"Eric Thomas"},
  {q:"You don't have to be great to start, but you have to start to be great.",a:"Zig Ziglar"},
  {q:"Discipline is the bridge between goals and accomplishment.",a:"Jim Rohn"},
  {q:"Success isn't always about greatness. It's about consistency.",a:"Dwayne Johnson"},
  {q:"Only the disciplined ones in life are free.",a:"Eliud Kipchoge"},
  {q:"The most important thing is to believe in yourself and know that you can do it.",a:"Novak Djokovic"},
  {q:"Discipline is doing what you hate to do, but nonetheless doing it like you love it.",a:"Herschel Walker"},
  {q:"The biggest adventure you can take is to live the life of your dreams.",a:"Oprah Winfrey"},
  {q:"The way to get started is to quit talking and begin doing.",a:"Walt Disney"},
  {q:"Whether you think you can or you think you can't, you're right.",a:"Henry Ford"},
  {q:"It's hard to beat a person who never gives up.",a:"Babe Ruth"},
  {q:"I'm a big believer that if you put the work in, the results will come.",a:"Tom Brady"},
  {q:"I'd rather regret the risks that didn't work out than the chances I didn't take.",a:"Simone Biles"},
  {q:"Today I will do what others won't, so tomorrow I can accomplish what others can't.",a:"Jerry Rice"},

  // ===== More AX.GRIND originals =====
  {q:"The gym doesn't care about your excuses.",a:"AX.GRIND"},
  {q:"Motivation gets you started. Discipline keeps you going.",a:"AX.GRIND"},
  {q:"Your body can stand almost anything. It's your mind you have to convince.",a:"AX.GRIND"},
  {q:"Comfort is the enemy of progress.",a:"AX.GRIND"},
  {q:"Nobody ever got stronger by staying the same.",a:"AX.GRIND"},
  {q:"The weight doesn't lie.",a:"AX.GRIND"},
  {q:"Show up even when you don't feel like it. Especially when you don't feel like it.",a:"AX.GRIND"},
  {q:"Progress is progress, no matter how small.",a:"AX.GRIND"},
  {q:"You don't find willpower. You build it, one rep at a time.",a:"AX.GRIND"},
  {q:"The hardest part is showing up. Everything after that is just work.",a:"AX.GRIND"},
  {q:"Excuses don't burn calories.",a:"AX.GRIND"},
  {q:"Train like the person you want to become.",a:"AX.GRIND"},
  {q:"You're not tired. You're uncomfortable. There's a difference.",a:"AX.GRIND"},
  {q:"Every rep you skip is a rep you didn't earn.",a:"AX.GRIND"},
  {q:"Strong isn't a size. Strong is a habit.",a:"AX.GRIND"},
  {q:"The grind doesn't stop because you're tired.",a:"AX.GRIND"},
  {q:"Your future self is watching you right now through your memories.",a:"AX.GRIND"},
  {q:"Discipline is remembering what you want.",a:"AX.GRIND"},
  {q:"Small steps every day beat big steps never.",a:"AX.GRIND"},
  {q:"You don't have to feel motivated. You just have to move.",a:"AX.GRIND"},
  {q:"Consistency beats intensity every single time.",a:"AX.GRIND"},
  {q:"The best workout is the one you actually finish.",a:"AX.GRIND"},
  {q:"Nobody regrets a workout. Everybody regrets skipping one.",a:"AX.GRIND"},
  {q:"Get comfortable being uncomfortable.",a:"AX.GRIND"},
  {q:"Your only job today is to show up better than yesterday.",a:"AX.GRIND"},
  {q:"There is no finish line. There's just the next rep.",a:"AX.GRIND"},
  {q:"Winners train. Everyone else makes excuses.",a:"AX.GRIND"},
  {q:"You can't out-talk hard work.",a:"AX.GRIND"},
  {q:"The pain of discipline weighs ounces. The pain of regret weighs tons.",a:"AX.GRIND"},
  {q:"Champions are built when nobody's watching.",a:"AX.GRIND"},
  {q:"One workout won't change your life. But it starts the one that will.",a:"AX.GRIND"},
  {q:"Stronger today than yesterday. That's the only competition that matters.",a:"AX.GRIND"},
  {q:"Sore is temporary. Quitting is forever.",a:"AX.GRIND"},
  {q:"Do it scared. Do it tired. Just do it.",a:"AX.GRIND"},
  {q:"You don't rise to the occasion. You fall to your training.",a:"AX.GRIND"},
  {q:"Every champion was once a beginner who refused to quit.",a:"AX.GRIND"},
  {q:"Rest when you're done, not when you're tired.",a:"AX.GRIND"},
  {q:"The grind is the reward.",a:"AX.GRIND"},
  {q:"Nobody cares how you feel. Show up anyway.",a:"AX.GRIND"},
  {q:"The only easy day was yesterday.",a:"AX.GRIND"},
  {q:"You are one workout away from a good mood.",a:"AX.GRIND"},
  {q:"Effort is the one thing you fully control. Use it.",a:"AX.GRIND"},
  {q:"Discomfort today. Strength tomorrow.",a:"AX.GRIND"},
  {q:"Train hard. Recover harder. Repeat forever.",a:"AX.GRIND"},
  {q:"You didn't come this far to only come this far.",a:"AX.GRIND"},
  {q:"There's no elevator to success. You take the stairs, one rep at a time.",a:"AX.GRIND"},
  {q:"Some people want it to happen. Others make it happen.",a:"AX.GRIND"},
  {q:"Your body hears everything your mind says. Stay positive.",a:"AX.GRIND"},
  {q:"The gym is the only place where weakness becomes strength.",a:"AX.GRIND"},
  {q:"Quitting lasts forever. Ten more minutes doesn't.",a:"AX.GRIND"},
  {q:"Don't wish for it. Work for it.",a:"AX.GRIND"},
  {q:"Every rep is a vote for the person you want to become.",a:"AX.GRIND"},
  {q:"You're stronger than the excuse you're about to make.",a:"AX.GRIND"},
  {q:"The iron never lies.",a:"AX.GRIND"},
  {q:"It never gets easier. You just get stronger.",a:"AX.GRIND"},
  {q:"Discipline is choosing what you want most over what you want now.",a:"AX.GRIND"},
  {q:"You don't need more time. You need more decision.",a:"AX.GRIND"},
  {q:"The only bad rep is the one you didn't do.",a:"AX.GRIND"},
  {q:"Consistency is a superpower. Most people never unlock it.",a:"AX.GRIND"},
  {q:"Fall in love with the grind, not just the results.",a:"AX.GRIND"},
  {q:"Champions don't make excuses when the workout gets hard. That's when it starts.",a:"AX.GRIND"},
  {q:"Nobody built strength on a comfortable day.",a:"AX.GRIND"},
  {q:"Your limits are just opinions you haven't broken yet.",a:"AX.GRIND"},
  {q:"Show up for yourself the way you show up for everyone else.",a:"AX.GRIND"},
  {q:"The grind doesn't owe you anything. You owe it everything you've got.",a:"AX.GRIND"},
  {q:"One percent better every day adds up to unrecognizable.",a:"AX.GRIND"},
  {q:"Skip the excuse. Do the set.",a:"AX.GRIND"},
  {q:"You're not too tired. You're too used to quitting.",a:"AX.GRIND"},
  {q:"The only workout you regret is the one you didn't do.",a:"AX.GRIND"},
  {q:"Strength is built in silence, one rep at a time.",a:"AX.GRIND"},
  {q:"Discipline looks a lot like doing it anyway.",a:"AX.GRIND"},
  {q:"Your comfort zone is where dreams go to die.",a:"AX.GRIND"},
  {q:"The scoreboard doesn't lie, and neither does the mirror.",a:"AX.GRIND"},
  {q:"You don't get what you wish for. You get what you work for.",a:"AX.GRIND"},
  {q:"Every day you don't train is a day your competition does.",a:"AX.GRIND"},
  {q:"Hard work beats talent when talent doesn't show up.",a:"AX.GRIND"},
  {q:"You are the average of your last ten workouts.",a:"AX.GRIND"},
  {q:"The pump fades. The discipline stays.",a:"AX.GRIND"},
  {q:"Chase progress, not perfection.",a:"AX.GRIND"},
  {q:"You can't build a legacy on days you skipped.",a:"AX.GRIND"},
  {q:"Every set counts. Every rep matters. Every day adds up.",a:"AX.GRIND"},
  {q:"The body you want is on the other side of the workouts you're avoiding.",a:"AX.GRIND"},
  {q:"Motivation is a spark. Discipline is the fire that keeps burning.",a:"AX.GRIND"},
  {q:"You don't have bad days. You have days you didn't show up for yourself.",a:"AX.GRIND"},
  {q:"Nothing changes if nothing changes. Get to work.",a:"AX.GRIND"},
  {q:"The grind doesn't care how you feel about Mondays.",a:"AX.GRIND"},
  {q:"Every excuse you make is a rep you don't.",a:"AX.GRIND"},
  {q:"Train your body. Train your mind. They grow together.",a:"AX.GRIND"},
  {q:"You're one decision away from a completely different life.",a:"AX.GRIND"},
  {q:"Strong people don't wait for motivation. They build the habit.",a:"AX.GRIND"},
  {q:"The weight room doesn't hand out participation trophies.",a:"AX.GRIND"},
  {q:"You'll never regret the workout. You'll only regret skipping it.",a:"AX.GRIND"},
  {q:"Discipline is a form of self-respect.",a:"AX.GRIND"},
  {q:"Growth lives on the other side of hard.",a:"AX.GRIND"},
  {q:"Show up tired. Show up sore. Just show up.",a:"AX.GRIND"},
  {q:"Your excuses are convincing. So is your potential.",a:"AX.GRIND"},
  {q:"The grind isn't glamorous. That's exactly why it works.",a:"AX.GRIND"},
  {q:"Be stubborn about your goals and flexible about your methods.",a:"AX.GRIND"},
  {q:"There's always time for one more set.",a:"AX.GRIND"},
  {q:"The best time to start was yesterday. The next best time is right now.",a:"AX.GRIND"},
];
let quoteIdx = Math.floor(Math.random() * QUOTES.length);

// Set once the user is known (see refreshQuoteForUser, called from main.js
// after login) so the manual refresh button below can also occasionally
// personalize, not just the one re-render right after sign-in.
let statUserId = null;

export function renderQuote() {
  const q = QUOTES[quoteIdx];
  document.getElementById('quote-text').innerHTML = q.q + '<span>— ' + q.a + '</span>';
}
export function newQuote() {
  quoteIdx = (quoteIdx + 1) % QUOTES.length;
  if (statUserId) maybeShowStatQuote(statUserId);
  else renderQuote();
}

// Called once main.js knows who's logged in (quotes.js has no user context
// at boot — renderQuote() above fires unconditionally before login even
// resolves, so guests always get the generic pool). Re-renders the quote
// using the user's real stats when something interesting is available.
export function refreshQuoteForUser(userId) {
  statUserId = userId;
  maybeShowStatQuote(userId);
}

// Roughly 1-in-3 renders show a stat-based quote instead of the generic
// pool, and only when the user actually has something worth bragging about.
async function maybeShowStatQuote(userId) {
  if (!userId || Math.floor(Math.random() * 3) !== 0) {
    renderQuote();
    return;
  }
  try {
    const stat = await computeStatQuote(userId);
    // If a different user logged in while this was in flight, let their own
    // refreshQuoteForUser() call own the render instead of clobbering it here.
    if (userId !== statUserId) return;
    if (stat) {
      document.getElementById('quote-text').innerHTML = stat + '<span>— AX.GRIND</span>';
      return;
    }
  } catch {
    // network hiccup — fall through to the generic pool below
    if (userId !== statUserId) return;
  }
  renderQuote();
}

async function computeStatQuote(userId) {
  const [quests, workouts] = await Promise.all([
    fetchRecentQuests(userId, 60).catch(() => []),
    fetchWorkoutHistory(userId, 90).catch(() => []),
  ]);

  const weekCount = countCompletionsSince(workouts, 7);
  const priorWeeklyAvg = averagePriorWeeklyCompletions(workouts, 6);
  if (weekCount >= 2 && weekCount > priorWeeklyAvg) {
    return t('quotes.bestStart', { n: weekCount });
  }

  const streak = computeStreak(quests);
  if (streak >= 3) {
    return t('quotes.streakGoing', { n: streak });
  }

  return null;
}

function countCompletionsSince(workouts, days) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceStr = toDateStr(since);
  return workouts.filter((w) => w.completed_date >= sinceStr).length;
}

// Average completions per week over the `weeks` weeks before this one
// (excludes the current, in-progress week so it's a fair comparison).
function averagePriorWeeklyCompletions(workouts, weeks) {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const windowStart = new Date();
  windowStart.setDate(windowStart.getDate() - 7 * (weeks + 1));
  const weekAgoStr = toDateStr(weekAgo);
  const windowStartStr = toDateStr(windowStart);
  const priorCount = workouts.filter(
    (w) => w.completed_date >= windowStartStr && w.completed_date < weekAgoStr
  ).length;
  return priorCount / weeks;
}

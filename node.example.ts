import { TauClient } from './build/main/index';

const port = 7400;
const uri = `ws://localhost:${port}/ws/twitch-events/`;
const secretTauApiToken = 'MY_TOKEN';
const tau = new TauClient(uri, secretTauApiToken);
tau.connect();

tau.follows.subscribe((event) => {
  console.log(`Thanks for following @${event.event_data.user_name}.`);
});

tau.subscribes.subscribe((event) => {
  const username = event.event_data.data.message.user_name;
  const streakMonths = event.event_data.data.message.streak_months;
  console.log(
    `AWESOME, @${username}! Thanks for subscribing for ${streakMonths} months in a row!`
  );
});

tau.raids.subscribe((event) => {
  console.log(
    `RAAAAAAAAAIDERSSSS!!! Welcome to all ${event.event_data.viewers} raiders from ${event.event_data.from_broadcaster_user_name}'s stream!!!`
  );
});

// how to unsubscribe a specific callback
const aCheerSubscription = tau.cheers.subscribe((event) => {
  console.log('received a cheer');
});
tau.cheers.unsubscribe(aCheerSubscription);

// how to unsubscribe all callbacks of a specific event
tau.cheers.unsubscribeAll();

// how to end the connection
setTimeout(() => tau.close(), 10000);

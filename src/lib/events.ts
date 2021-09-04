type IsoDateString = string;
interface BaseTauEvent<Type extends string, Data> {
  // TODO verify
  /** Note: null only happens for test events?? */
  id: string | null;
  event_id: string;
  event_type: Type;
  event_source: string;
  event_data: Data;
  created: IsoDateString;
  origin: 'twitch' | 'test';
}

export type FollowEvent = BaseTauEvent<
  'follow',
  {
    user_name: string;
    user_id: string;
    user_login: string;
    broadcaster_user_id: string;
    broadcaster_user_name: string;
    broadcaster_user_login: string;
  }
>;

export type UpdateEvent = BaseTauEvent<
  'update',
  {
    title: string;
    language: string;
    is_mature: boolean;
    category_id: number;
    category_name: string;
    broadcaster_user_id: string;
    broadcaster_user_name: string;
    broadcaster_user_login: string;
  }
>;

export type CheerEvent = BaseTauEvent<
  'cheer',
  {
    is_anonymous: boolean;
    user_id: string;
    user_name: string;
    user_login: string;
    broadcaster_user_id: string;
    broadcaster_user_name: string;
    broadcaster_user_login: string;
    bits: number;
    message: string;
  }
>;

export type RaidEvent = BaseTauEvent<
  'raid',
  {
    from_broadcaster_user_name: string;
    from_broadcaster_user_id: string;
    from_broadcaster_user_login: string;
    to_broadcaster_user_id: string;
    to_broadcaster_user_login: string;
    to_broadcaster_user_name: string;
    viewers: number;
  }
>;

// TODO some properties should be optional
export type SubscribeEvent = BaseTauEvent<
  'subscribe',
  {
    data: {
      topic: string;
      message: {
        benefit_end_month: number;
        user_name: string;
        display_name: string;
        channel_name: string;
        user_id: string;
        channel_id: string;
        time: string;
        sub_message: {
          message: string;
          emotes?: any | null;
        };
        sub_plan: string;
        sub_plan_name: string;
        months: number;
        cumulative_months: number;
        context: string;
        is_gift: boolean;
        multi_month_duration: number;
        streak_months: number;
      };
    };
    type: string;
  }
>;

export type TauEvent =
  | FollowEvent
  | UpdateEvent
  | CheerEvent
  | RaidEvent
  | SubscribeEvent;

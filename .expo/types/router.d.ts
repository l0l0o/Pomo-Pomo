/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/tasks`; params?: Router.UnknownInputParams; } | { pathname: `/settings`; params?: Router.UnknownInputParams; } | { pathname: `/../src/components/atoms/NumberInput`; params?: Router.UnknownInputParams; } | { pathname: `/../src/components/molecules/TimeInput`; params?: Router.UnknownInputParams; } | { pathname: `/../src/components/organisms/SettingsPanel`; params?: Router.UnknownInputParams; } | { pathname: `/../src/components/templates/SettingsTemplate`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/tasks`; params?: Router.UnknownOutputParams; } | { pathname: `/settings`; params?: Router.UnknownOutputParams; } | { pathname: `/../src/components/atoms/NumberInput`; params?: Router.UnknownOutputParams; } | { pathname: `/../src/components/molecules/TimeInput`; params?: Router.UnknownOutputParams; } | { pathname: `/../src/components/organisms/SettingsPanel`; params?: Router.UnknownOutputParams; } | { pathname: `/../src/components/templates/SettingsTemplate`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/tasks${`?${string}` | `#${string}` | ''}` | `/settings${`?${string}` | `#${string}` | ''}` | `/../src/components/atoms/NumberInput${`?${string}` | `#${string}` | ''}` | `/../src/components/molecules/TimeInput${`?${string}` | `#${string}` | ''}` | `/../src/components/organisms/SettingsPanel${`?${string}` | `#${string}` | ''}` | `/../src/components/templates/SettingsTemplate${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/tasks`; params?: Router.UnknownInputParams; } | { pathname: `/settings`; params?: Router.UnknownInputParams; } | { pathname: `/../src/components/atoms/NumberInput`; params?: Router.UnknownInputParams; } | { pathname: `/../src/components/molecules/TimeInput`; params?: Router.UnknownInputParams; } | { pathname: `/../src/components/organisms/SettingsPanel`; params?: Router.UnknownInputParams; } | { pathname: `/../src/components/templates/SettingsTemplate`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}

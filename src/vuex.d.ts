import { Store } from 'vuex';
import { User, Task } from '@/store';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    users: User[],
    tasks: Task[],
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

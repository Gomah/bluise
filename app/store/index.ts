import { ActionContext, ActionTree, MutationTree } from 'vuex';
import { Route } from 'vue-router';
import Vue from 'vue';

export interface State {
  pages: Page[];
  posts: Post[];
  route?: Route;
}

// Initial State
export const appState = {
  pages: [],
  posts: [],
};

export const mutations: MutationTree<State> = {
  SET_PAGES: (state, payload: object): void => {
    Vue.set(state, 'pages', payload);
  },
  SET_POSTS: (state, payload: object): void => {
    Vue.set(state, 'posts', payload);
  },
};

interface Actions<S, R> extends ActionTree<S, R> {
  GET_PAGES_LIST(context: ActionContext<S, R>): Promise<void | Error>;
  GET_POSTS_LIST(context: ActionContext<S, R>): Promise<void | Error>;
  nuxtServerInit(context: ActionContext<S, R>): void;
}

async function getContent({ context, prefix }): Promise<{ slug: string; title: string }[]> {
  const slugs: string[] = [];
  const content: { slug: string; title: string }[] = [];

  function createExcerpt({ text, length = 150 }: { text: string; length?: number }): string {
    return text
      .split('', length)
      .concat(['...'])
      .join('');
  }

  // Get slugs
  for (let index = 0; index < context.keys().length; index += 1) {
    const slug = context.keys()[index].replace(/^.\/|.json$/g, '');
    slugs.push(slug);
  }

  // Get content
  for (let index = 0; index < slugs.length; index += 1) {
    const slug = slugs[index];

    const entry = require(`@/content/${prefix}/${slug}.json`);

    // Add the slug to the post object
    Object.assign(entry, { slug });

    content.push({
      slug,
      title: entry.title,
      ...(prefix === 'blog' && {
        excerpt: createExcerpt({ text: entry.content }),
      }),
    });
  }

  return content;
}

export const actions: Actions<State, State> = {
  async GET_POSTS_LIST({ commit }): Promise<void | Error> {
    // Use webpack to search the blog directory matching .json files
    const context = await require.context('@/content/blog/', false, /\.json$/);
    const posts = await getContent({ context, prefix: 'blog' });
    commit('SET_POSTS', posts);
  },

  async GET_PAGES_LIST({ commit }): Promise<void | Error> {
    // Use webpack to search the blog directory matching .json files
    const context = await require.context('@/content/pages/', false, /\.json$/);
    const pages = await getContent({
      context,
      prefix: 'pages',
    });
    commit('SET_PAGES', pages);
  },

  async nuxtServerInit({ dispatch }): Promise<void> {
    await Promise.all([dispatch('GET_PAGES_LIST'), dispatch('GET_POSTS_LIST')]);
  },
};

export const state = (): State => ({
  ...appState,
});

export const strict = false;

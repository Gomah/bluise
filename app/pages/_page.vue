<template>
  <section class="page" :class="page.slug">
    <h1 class="page__title text-lg md:text-xl lg:text-4xl xl:text-6xl text-center py-8 md:py-16">
      {{ page.title }}
    </h1>

    <div v-html="$md.render(page.content)" class="page__content markdown pt-4 md:pt-6 md:pb-24" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { MetaInfo } from 'vue-meta';

@Component({
  // Called to know which transition to apply
  transition(to, from) {
    if (!from) {
      return 'slide-left';
    }

    return 'slide-right';
  },

  head(): MetaInfo {
    return {
      title: this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.seoDescription,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.page.seoMetaImage,
        },
      ],
    };
  },
})
export default class PageTemplate extends Vue {
  page!: Page;

  async asyncData({ params, payload }): Promise<{ page: Page }> {
    if (payload) {
      return { page: payload };
    }

    try {
      const page = require(`@/content/pages/${params.page}.json`);

      return {
        page,
      };
    } catch (e) {
      throw new Error('Not found');
    }
  }
}
</script>

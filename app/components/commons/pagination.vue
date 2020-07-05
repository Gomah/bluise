<template>
  <nav class="border-t border-gray-200 px-4 mb-10 flex items-center justify-between sm:px-0">
    <div v-if="currentPage > 1" class="w-0 flex-1 flex">
      <nuxt-link
        to="/blog"
        class="-mt-px border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150"
      >
        <svg class="mr-3 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Previous
      </nuxt-link>
    </div>

    <div class="hidden md:flex">
      <nuxt-link to="/blog" class="pagination-link">
        1
      </nuxt-link>
      <nuxt-link
        v-for="page in paginationMax"
        :key="page + 1"
        :to="`/blog/page/${page + 1}`"
        class="pagination-link"
      >
        {{ page + 1 }}
      </nuxt-link>
    </div>
    <div v-if="currentPage < totalPages" class="w-0 flex-1 flex justify-end">
      <nuxt-link
        :to="`/blog/page/${currentPage + 1}`"
        class="-mt-px border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150"
      >
        Next
        <svg class="ml-3 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </nuxt-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Pagination extends Vue {
  @Prop({ required: true, type: Number }) readonly currentPage!: number;

  @Prop({ required: true, type: Number }) readonly totalPages!: number;

  @Prop({ default: 3, type: Number }) readonly max!: number;

  get paginationMax(): number {
    const max = this.totalPages < this.max ? this.totalPages : this.max;
    return max - 1;
  }
}
</script>

<style lang="scss">
.pagination-link {
  @apply -mt-px border-t-2 pt-4 px-4 inline-flex items-center text-sm leading-5 font-medium transition ease-in-out duration-150;

  &:not(.nuxt-link-exact-active) {
    @apply border-transparent text-gray-500;

    &:hover {
      @apply text-gray-700 border-gray-300;
    }

    &:focus {
      @apply outline-none text-gray-700 border-gray-400;
    }
  }

  &.nuxt-link-exact-active {
    @apply border-indigo-500 text-indigo-600;

    &:focus {
      @apply outline-none text-indigo-800 border-indigo-700;
    }
  }
}
</style>
